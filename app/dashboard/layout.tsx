import { AppLayout } from "@/components/layout/AppLayout";
import React  from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <AppLayout>{children}</AppLayout>;
};

export default DashboardLayout;
