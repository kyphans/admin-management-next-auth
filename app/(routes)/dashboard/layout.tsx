export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>
    <div className="w-full bg-black text-white">Dashboard layout</div>
    {children}
    </div>;
}
