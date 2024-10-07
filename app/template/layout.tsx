import { menuItems } from "./menuItems";
import MainLayout from "@/components/common/MainLayout";

export const ToolLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  return (
    <MainLayout menuItems={menuItems} basePath="/template">
      {children}
    </MainLayout>
  );
};

export default ToolLayout;
