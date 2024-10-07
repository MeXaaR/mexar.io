"use client";

import React from "react";
import { MenuItem } from "@/types/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  basePath: string;
  menuItems: MenuItem[];
};

export const Menu: React.FC<Props> = ({ basePath, menuItems }) => {
  const pathname = usePathname();
  return (
    <div
      className="box"
      style={{
        marginLeft: 5,
        height: "calc(100vh - 66px )",
        overflowY: "auto",
      }}
    >
      <aside className="menu">
        {menuItems.map((item) => (
          <>
            <p key={item.title} className="menu-label">
              {item.title}
            </p>
            <ul key={`list-${item.title}`} className="menu-list">
              {item.tools.map((tool) => (
                <li key={tool.title}>
                  <Link
                    className={
                      pathname === `${basePath}${tool.link}` ? "is-active" : ""
                    }
                    style={{ opacity: tool.disabled ? 0.4 : 1 }}
                    href={tool.disabled ? "#" : `${basePath}${tool.link}`}
                  >
                    <span
                      className="icon"
                      style={{ color: "black", marginRight: 5 }}
                    >
                      <i className={tool.icon}></i>
                    </span>
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ))}
      </aside>
    </div>
  );
};
