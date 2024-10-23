import { menuItems } from "./menuItems";
import MainLayout from "@/components/common/MainLayout";

const ToolLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  return (
    <MainLayout menuItems={menuItems} basePath="/conversions">
      {children}
    </MainLayout>
  );
};

export default ToolLayout;
