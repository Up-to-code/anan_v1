import { AppLayout } from "@/components/layout/AppLayout";


const  DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppLayout>
      {children}
    </AppLayout>
    
  );
};

export default DashboardLayout;