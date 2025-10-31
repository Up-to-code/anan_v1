"use client";

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { useEffect } from 'react';

export default function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only initialize in browser and production
    if (typeof window === 'undefined' || process.env.NODE_ENV === 'development') {
      return;
    }

    if (process.env.NEXT_PUBLIC_POSTHOG_KEY && !posthog.__loaded) {
      try {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
          api_host: '/ingest',
          ui_host: 'https://us.posthog.com',
          person_profiles: 'identified_only', // Recommended for performance
          capture_pageview: false, // Disable automatic pageview capture (handle manually)
          capture_pageleave: true,
          capture_exceptions: true,
          request_batching: true,
          autocapture: true,
        });
      } catch (error) {
        console.warn('PostHog initialization failed:', error);
      }
    }
  }, []);

  // Don't render PostHogProvider in development
  if (process.env.NODE_ENV === 'development') {
    return <>{children}</>;
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}