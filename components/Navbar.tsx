import Link from "next/link";
import { Mexar } from "./Mexar";
import { DarkModeSwitcher } from "./DarModeSwitcher";
import { availableTools } from "@/data/tools";

export const Navbar = () => {
  return (
    <nav
      className="navbar is-dark is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" href="/">
          <Mexar dark />
        </Link>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start"></div>

        <div className="navbar-end">
          <div className="navbar-item">
            <DarkModeSwitcher />
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
                          className="dropdown-item"
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
          </div>
        </div>
      </div>
    </nav>
  );
};
