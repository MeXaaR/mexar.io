import { Navbar } from "@/components/Navbar";
import styles from "./layout.module.css";
import { Menu } from "./Menu";
import { MenuItem } from "@/types/menu";

export const MainLayout = ({
  children, // will be a page or nested layout
  menuItems,
  basePath,
}: {
  children: React.ReactNode;
  menuItems: MenuItem[];
  basePath: string;
}) => {
  return (
    <div className="">
      <Navbar />
      <div className={`columns ${styles.main}`}>
        <div className="column is-one-fifth">
          <Menu basePath={basePath} menuItems={menuItems} />
        </div>
        <div className="column is-four-fifths container">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
