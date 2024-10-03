import React from "react";
import styles from "./page.module.css";
import { availableTools } from "@/data/tools";
import Link from "next/link";
import Brocoli from "@/components/Brocoli";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className={`${styles.page}`}>
        <main className={styles.main}>
          <div className="container is-max-tablet">
            <h3 className="subtitle">Bundle of free apps</h3>
            <div className="fixed-grid">
              <div className="grid is-gap-4">
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
          </div>
          <Brocoli />
        </main>
      </div>
    </>
  );
}
