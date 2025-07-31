"use client";

import { AnimateView } from "@/app/AnimateView";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <AnimateView>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Next.js Page Transitions</h1>
          <p className={styles.description}>
            This starter project demonstrates how to use Motion's upcoming
            <code>AnimateView</code> component to create page transitions with
            the Next.js App Router.
          </p>

          <Link href="/gallery" className={styles.galleryLink}>
            View Gallery
          </Link>
        </main>
      </div>
    </AnimateView>
  );
}
