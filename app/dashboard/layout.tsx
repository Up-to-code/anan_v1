import { AppLayout } from "@/components/layout/AppLayout";
import React, { Suspense } from 'react';
import Loading from './loading';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppLayout>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </AppLayout>
  );
};

export default DashboardLayout;