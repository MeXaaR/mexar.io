import Link from "next/link";
import { Mexar } from "./Mexar";
import { DarkModeSwitcher } from "../DarModeSwitcher";
import { AppsMenu } from "./AppsMenu";
import Brocoli from "./Brocoli";

export const Navbar = () => {
  return (
    <nav className="navbar is-dark" role="navigation">
      <div className="navbar-start">
        <Link className="navbar-item" href="/">
          <Mexar dark />
        </Link>
      </div>

      <div className="navbar-end">
        <div className="navbar-item buttons">
          <DarkModeSwitcher />
          <AppsMenu />
          <Brocoli />
          <a
            href="https://github.com/MeXaaR/mexar.io"
            target="_blank"
            className="button"
          >
            <span className="icon">
              <i className="fa-brands fa-github"></i>
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
};
