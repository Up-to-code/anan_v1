"use client";
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { 
  BarChart3, 
  Users, 
  ShoppingCart, 
  TrendingUp,
  Download,
  Plus
} from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    { name: 'Total Revenue', value: '$45,231.89', change: '+20.1%', changeType: 'positive' },
    { name: 'New Customers', value: '2,345', change: '+18.1%', changeType: 'positive' },
    { name: 'Active Users', value: '12,543', change: '-2.1%', changeType: 'negative' },
    { name: 'Conversion Rate', value: '3.2%', change: '+1.2%', changeType: 'positive' },
  ];

  return (
    <AppLayout>
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your business today."
        actions={
          <>
            <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
              Export
            </Button>
            <Button leftIcon={<Plus className="w-4 h-4" />}>
              New Project
            </Button>
          </>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} hover>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
                <div className={`flex items-center ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <Progress value={75} size="sm" className="mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Recent Activity</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'New customer registration', user: 'John Doe', time: '2 minutes ago' },
                { action: 'Subscription upgrade', user: 'Sarah Smith', time: '1 hour ago' },
                { action: 'Support ticket resolved', user: 'Mike Johnson', time: '2 hours ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 border border-slate-200 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{activity.action}</p>
                    <p className="text-sm text-slate-600">by {activity.user}</p>
                  </div>
                  <Badge variant="outline" size="sm">
                    {activity.time}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Quick Actions</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-16 flex-col">
                <Users className="w-6 h-6 mb-1" />
                <span>Customers</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <ShoppingCart className="w-6 h-6 mb-1" />
                <span>Orders</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <BarChart3 className="w-6 h-6 mb-1" />
                <span>Analytics</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <Plus className="w-6 h-6 mb-1" />
                <span>New Item</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}