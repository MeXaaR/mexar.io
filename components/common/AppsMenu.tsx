"use client";

import Link from "next/link";
import { availableTools } from "@/data/tools";
import { usePathname } from "next/navigation";

export const AppsMenu = () => {
  const pathname = usePathname();
  return (
    <div className="dropdown is-right is-hoverable">
      <div className="dropdown-trigger">
        <button className="button">
          <span className="icon">
            <i className="fa-solid fa-cubes"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {availableTools.map((tool) => {
            if (tool.available) {
              return (
                <Link
                  key={tool.title}
                  href={tool.base}
                  className={`dropdown-item ${
                    pathname.includes(tool.base) ? "is-active" : ""
                  }`}
                >
                  <span className="icon" style={{ marginRight: 5 }}>
                    <i className={tool.icon}></i>
                  </span>
                  {tool.title}
                </Link>
              );
            } else {
              return (
                <a
                  key={tool.title}
                  className="dropdown-item is-disabled"
                  style={{
                    opacity: 0.4,
                  }}
                >
                  <span className="icon" style={{ marginRight: 5 }}>
                    <i className={tool.icon}></i>
                  </span>
                  {tool.title}
                </a>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};
