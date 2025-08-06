import { ReactNode } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";

export default function SubpageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex">  
      <main className="flex-1 p-4">{children}</main>
      <Sidebar  />
    </div>
  );
}