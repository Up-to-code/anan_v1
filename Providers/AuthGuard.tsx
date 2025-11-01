// components/AuthGuard.tsx
'use client'; // This is a Client Component

import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import { useSession } from '@/lib/auth-client';
import { Loader2 } from 'lucide-react';

// Define the props for our wrapper component
interface AuthGuardProps {
  children: ReactNode;
  // Optional: The path to redirect to if the user is not authenticated.
  // Defaults to the NextAuth.js sign-in page.
  redirectTo?: string;
}

export default function AuthGuard({ children, redirectTo = '/api/auth/signin' }: AuthGuardProps) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If the session is loading, do nothing yet.
    if (isPending) {
      return;
    }
    // If there is no session (user is not authenticated), redirect them.
    if (!session) {
      router.push(redirectTo);
    }
  }, [isPending, session, router, redirectTo]);

  // 1. Show a loading indicator while the session is being fetched.
  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 fill-blue-600" />
      </div>
    );
  }

  // 2. If the session exists, render the children (the protected content).
  if (session) {
    return <>{children}</>;
  }

  // 3. If there is no session and we are not redirecting, render nothing.
  // The useEffect hook will handle the redirection.
  return null;
}