import { ReactNode } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";

export default function Bloglayout({children} :{children: ReactNode}) {
  return (
    <div className="flex gap-6 max-w-9xl mx-auto px-4 py-8">
      <div className="flex-1">{children}</div>
      <div className="sticky top-8">
      <Sidebar />
      </div>
      
    </div>
  )
}