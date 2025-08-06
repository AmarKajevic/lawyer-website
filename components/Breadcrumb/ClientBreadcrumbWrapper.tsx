'use client';

import { usePathname } from "next/navigation";
import Breadcrumb from "./Breadcrumb";

export default function ClientBreadcrumbWrapper() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return <Breadcrumb />;
}
