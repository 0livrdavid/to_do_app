import HeaderComponent from "@/components/header";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        <HeaderComponent />
        {children}
      </>
    );
  }