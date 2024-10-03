import { MenuItem } from "@/types/menu";
import Link from "next/link";

type Props = {
  basePath: string;
  menuItems: MenuItem[];
};

export const Menu: React.FC<Props> = ({ basePath, menuItems }) => {
  return (
    <div
      className="box"
      style={{ marginLeft: 5, minHeight: "calc(100vh - 66px - 24px)" }}
    >
      <aside className="menu">
        {menuItems.map((item) => (
          <>
            <p key={item.title} className="menu-label">
              {item.title}
            </p>
            <ul className="menu-list">
              {item.tools.map((tool) => (
                <li key={tool.title}>
                  <Link href={`${basePath}/${tool.link}`}>{tool.title}</Link>
                </li>
              ))}
            </ul>
          </>
        ))}
      </aside>
    </div>
  );
};
