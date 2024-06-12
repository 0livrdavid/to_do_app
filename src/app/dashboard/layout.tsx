import HeaderComponent from "@/components/header";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="flex flex-col w-screen">
        <HeaderComponent />
        {children}
      </div>
    );
  }