import BlankCard from "@/components/page/dashboard/blank_card";
import Card from "@/components/page/dashboard/card";

export default function Dashboard() {
  return <div className="flex flex-col gap-4 p-10">
    <BlankCard />
    <Card />
  </div>;
}

