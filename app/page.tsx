import React from "react";
import styles from "./page.module.css";
import { availableTools } from "@/data/tools";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className={`${styles.page}`}>
        <main className={styles.main}>
          <div className="container is-max-tablet">
            <h3 className="title">Bundle of free tools</h3>
            <h3 className="subtitle">Free Forever</h3>
            <div className="grid is-gap-4 is-col-min-14">
              {availableTools.map((tool, i) => (
                <Link
                  href={tool.base}
                  key={i}
                  className="cell"
                  style={{ height: "100%" }}
                >
                  <div
                    className={`box ${styles.singletool} ${
                      tool.available ? "" : styles.disabled
                    }`}
                  >
                    <h4 className={`title ${styles.title}`}>
                      <span className="icon">
                        <i className={tool.icon}></i>
                      </span>
                      {tool.title}
                    </h4>
                    <h5 className={`subtitle ${styles.subtitle}`}>
                      {tool.description}
                    </h5>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <footer
            className="navbar is-fixed-bottom"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <p>
              <strong>mexar</strong>
              <strong className="orange">.</strong>
              <strong>io</strong> by{" "}
              <strong>
                <a className="orange" target="_blank" href="https://mexar.fr">
                  François Aubeut
                </a>
              </strong>
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
