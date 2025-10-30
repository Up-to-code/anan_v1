"use server";

import prisma from "@/lib/prisma";
import { getTimeFilter, generateChartColors } from "@/lib/actions/utils";
import { DashboardStats, ChartData } from "@/lib/actions/types";

// Utility type for Prisma aggregate/groupBy result with sum fields
type SumField = {
  tokenCount?: number;
  requestCount?: number;
  userCount?: number;
  cost?: number;
};
type TokenUsageGroup = {
  period: string;
  _sum: Pick<SumField, "tokenCount" | "cost">;
};
type ModelUsageGroup = { modelId: string; _sum: Pick<SumField, "tokenCount"> };
type ClientActivity = {
  date: Date;
  requests: number;
  tokens: number;
  activeUsers: number;
};
type CostAnalysisResult = {
  model: { name: string };
  developmentCost: number;
  inferenceCost: number;
  maintenanceCost: number;
};
type PlatformPerformanceResult = {
  platform: string;
  uptime: number;
  reliability: number;
};

// 1. Dashboard stats for a single project
export async function getDashboardStats(
  projectId: string,
  timeRange: string = "30D"
): Promise<{ data?: DashboardStats; error?: string }> {
  try {
    const { startDate, endDate } = getTimeFilter(timeRange);

    const stats = await prisma.usageMetric.aggregate({
      where: {
        projectId,
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        tokenCount: true,
        requestCount: true,
        userCount: true,
        cost: true,
      },
    });

    // Determine previous period for comparison
    const previousStartDate = new Date(startDate);
    const previousEndDate = new Date(endDate);
    const periodDays = Math.round(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    previousStartDate.setDate(previousStartDate.getDate() - periodDays);
    previousEndDate.setDate(previousEndDate.getDate() - periodDays);

    const previousStats = await prisma.usageMetric.aggregate({
      where: {
        projectId,
        timestamp: {
          gte: previousStartDate,
          lte: previousEndDate,
        },
      },
      _sum: {
        tokenCount: true,
      },
    });

    const currentTokens = stats._sum.tokenCount ?? 0;
    const previousTokens = previousStats._sum.tokenCount ?? 0;
    const changePercentage =
      previousTokens > 0
        ? ((currentTokens - previousTokens) / previousTokens) * 100
        : currentTokens > 0
        ? 100
        : 0;

    return {
      data: {
        totalTokens: currentTokens,
        totalCost: stats._sum.cost ?? 0,
        activeUsers: stats._sum.userCount ?? 0,
        apiRequests: stats._sum.requestCount ?? 0,
        changePercentage,
      },
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return { error: "Failed to fetch dashboard statistics" };
  }
}

// 2. Get chart data for dashboard
export async function getChartData(
  projectId: string,
  timeRange: string = "30D"
): Promise<{ data?: ChartData; error?: string }> {
  try {
    const { startDate, endDate } = getTimeFilter(timeRange);

    const [
      tokenUsageData,
      modelUsageData,
      clientActivityData,
      costAnalysisData,
      platformPerformanceData,
    ] = await Promise.all([
      // Token Usage Data
      prisma.usageMetric.groupBy({
        by: ["period"],
        where: {
          projectId,
          timestamp: { gte: startDate, lte: endDate },
          period: "MONTHLY",
        },
        _sum: {
          tokenCount: true,
          cost: true,
        },
        orderBy: {
          period: "asc",
        },
      }),

      // Model Usage Data
      prisma.usageMetric.groupBy({
        by: ["modelId"],
        where: {
          projectId,
          timestamp: { gte: startDate, lte: endDate },
        },
        _sum: {
          tokenCount: true,
        },
      }),

      // Client Activity Data
      prisma.clientActivity.findMany({
        where: {
          projectId,
          date: { gte: startDate, lte: endDate },
          period: "DAILY",
        },
        orderBy: {
          date: "asc",
        },
      }),

      // Cost Analysis Data
      prisma.costRecord.findMany({
        where: {
          projectId,
          period: { gte: startDate, lte: endDate },
        },
        include: {
          model: true,
        },
      }),

      // Platform Performance Data
      prisma.platformPerformance.findMany({
        where: {
          projectId,
          timestamp: { gte: startDate, lte: endDate },
        },
        orderBy: {
          timestamp: "desc",
        },
        distinct: ["platform"],
      }),
    ]);

    // Model details for modelUsageData
    const usedModelIds = (modelUsageData as Array<ModelUsageGroup>).map(
      (m) => m.modelId
    );
    const models = await prisma.aiModel.findMany({
      where: {
        id: { in: usedModelIds },
      },
    });

    const modelMap: Record<string, { id: string; name: string }> =
      Object.fromEntries(models.map((model) => [model.id, model]));

    const colors = generateChartColors(models.length);

    // Transform data types
    const tokenUsage = (tokenUsageData as Array<TokenUsageGroup>).map(
      (usage) => ({
        period: usage.period,
        tokens: usage._sum.tokenCount ?? 0,
        cost: usage._sum.cost ?? 0,
      })
    );

    const modelUsage = (modelUsageData as Array<ModelUsageGroup>).map(
      (usage, index) => ({
        name: modelMap[usage.modelId]?.name ?? "Unknown",
        tokens: usage._sum.tokenCount ?? 0,
        color: colors[index % colors.length],
      })
    );

    const clientActivity = (clientActivityData as Array<ClientActivity>).map(
      (activity) => ({
        period: activity.date
          ? activity.date.toLocaleDateString("en-US", { weekday: "short" })
          : "",
        requests: activity.requests,
        tokens: activity.tokens,
        activeUsers: activity.activeUsers,
      })
    );

    const costAnalysis = (costAnalysisData as Array<CostAnalysisResult>).map(
      (cost) => ({
        model: cost.model?.name ?? "Unknown",
        development: cost.developmentCost,
        inference: cost.inferenceCost,
        maintenance: cost.maintenanceCost,
      })
    );

    const platformPerformance = (
      platformPerformanceData as Array<PlatformPerformanceResult>
    ).map((perf) => ({
      platform: perf.platform,
      uptime: perf.uptime,
      reliability: perf.reliability,
    }));

    return {
      data: {
        tokenUsage,
        modelUsage,
        clientActivity,
        costAnalysis,
        platformPerformance,
      },
    };
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return { error: "Failed to fetch chart data" };
  }
}

// 3. Get live AI insights for dashboard
import type { Insight } from "@prisma/client";
export async function getAIInsights(
  projectId: string
): Promise<{ data?: Insight[]; error?: string }> {
  try {
    // Show project insights and global insights (projectId: null), hide expired/inactive
    const now = new Date();
    const insights = await prisma.insight.findMany({
      where: {
        AND: [
          {
            OR: [{ projectId }, { projectId: null }],
          },
          { isActive: true },
          {
            OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
          },
        ],
      },
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
      take: 10,
    });

    return { data: insights };
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    return { error: "Failed to fetch AI insights" };
  }
}

// 4. Generate cost-based insights for a project
import type { Prisma } from "@prisma/client";
type InsightCreate = Prisma.InsightCreateManyInput;

export async function generateInsights(
  projectId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Recent usage, with models included for mapping
    const recentUsage = await prisma.usageMetric.findMany({
      where: {
        projectId,
        timestamp: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
      include: {
        model: true,
      },
    });

    // Analyze cost patterns (group by model)
    const modelCosts: Record<
      string,
      { totalCost: number; totalTokens: number }
    > = recentUsage.reduce((acc, usage) => {
      const modelName = usage.model?.name || "Unknown";
      if (!acc[modelName]) {
        acc[modelName] = { totalCost: 0, totalTokens: 0 };
      }
      acc[modelName].totalCost += usage.cost || 0;
      acc[modelName].totalTokens += usage.tokenCount || 0;
      return acc;
    }, {} as Record<string, { totalCost: number; totalTokens: number }>);

    const insights: InsightCreate[] = [];

    // Generate cost optimization insights
    Object.entries(modelCosts).forEach(([model, data]) => {
      const costPerToken =
        data.totalTokens > 0 ? data.totalCost / data.totalTokens : 0;
      if (costPerToken > 0.0001) {
        insights.push({
          title: "High Cost Model Detected",
          description: `${model} is costing $${data.totalCost.toFixed(
            2
          )} with ${data.totalTokens.toLocaleString()} tokens. Consider switching to more cost-effective models.`,
          type: "COST_OPTIMIZATION",
          priority: "HIGH",
          projectId,
          isActive: true,
          conditions: { model, costPerToken, totalCost: data.totalCost },
          actions: [
            "Consider Claude-3 for text tasks",
            "Review model usage patterns",
          ],
          createdAt: new Date(),
          expiresAt: null,
          userId: null,
        });
      }
    });

    // Save insights to database
    if (insights.length > 0) {
      await prisma.insight.createMany({
        data: insights,
        skipDuplicates: true,
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error generating insights:", error);
    return { success: false, error: "Failed to generate insights" };
  }
}
