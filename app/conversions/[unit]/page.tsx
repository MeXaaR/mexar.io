"use client";

import GenericConverter, { Unit } from "@/components/conversions/Converter";
import { units } from "@/app/conversions/units";
import { usePathname } from "next/navigation";

const Page = () => {
  const pathname = usePathname();
  const currentUnit: Unit[] = units[pathname.replace("/conversions", "")];
  if (!currentUnit) return null;
  return <GenericConverter units={currentUnit} />;
};

export default Page;
