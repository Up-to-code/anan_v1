// lib/actions/dashboard-actions.ts
'use server';

import { auth } from '@/auth';
 import prisma from '@/lib/prisma';
import { headers } from 'next/headers';
 
export async function getDashboardStats() {
  try {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })

    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    const userId = session.user.id;

    // Get current user data
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        sessions: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });

    if (!currentUser) {
      throw new Error('User not found');
    }

    return {
      success: true,
      data: {
        currentUser: {
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          image: currentUser.image,
          lastActive: currentUser.sessions[0]?.createdAt || currentUser.createdAt
        }
      }
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      success: false,
      error: 'Failed to fetch dashboard data'
    };
  }
}

// Get user profile data
export async function getUserProfile() {
  try {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })

    if (!session?.user?.id) {
      return { success: false, error: 'No session found' };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        sessions: {
          orderBy: { createdAt: 'desc' },
          take: 5,
          select: {
            id: true,
            createdAt: true,
            ipAddress: true,
            userAgent: true
          }
        },
        accounts: {
          select: {
            id: true,
            providerId: true,
            createdAt: true
          }
        }
      }
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    return {
      success: true,
      data: user
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { success: false, error: 'Failed to fetch user data' };
  }
}

// Update user profile
export async function updateUserProfile(data: { name: string; image?: string }) {
  try {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })

    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name,
        ...(data.image && { image: data.image }),
        updatedAt: new Date()
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        updatedAt: true
      }
    });

    return {
      success: true,
      data: updatedUser,
      message: 'Profile updated successfully'
    };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { success: false, error: 'Failed to update profile' };
  }
}

// Get user sessions
export async function getUserSessions() {
  try {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })

    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const sessions = await prisma.session.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        createdAt: true,
        expiresAt: true,
        ipAddress: true,
        userAgent: true
      }
    });

    return {
      success: true,
      data: sessions
    };
  } catch (error) {
    console.error('Error fetching user sessions:', error);
    return { success: false, error: 'Failed to fetch sessions' };
  }
}

// Revoke session
export async function revokeSession(sessionId: string) {
  try {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    // Verify the session belongs to the current user
    const userSession = await prisma.session.findFirst({
      where: {
        id: sessionId,
        userId: session.user.id
      }
    });

    if (!userSession) {
      return { success: false, error: 'Session not found' };
    }

    await prisma.session.delete({
      where: { id: sessionId }
    });

    return {
      success: true,
      message: 'Session revoked successfully'
    };
  } catch (error) {
    console.error('Error revoking session:', error);
    return { success: false, error: 'Failed to revoke session' };
  }
}