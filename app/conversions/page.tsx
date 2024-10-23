import GenericConverter from "@/components/conversions/Converter";
import { units } from "@/app/conversions/units";

const Page = () => {
  return <GenericConverter units={units["/angles"]} />;
};

export default Page;
