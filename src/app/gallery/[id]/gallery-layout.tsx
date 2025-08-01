"use client";

import { useParams, useRouter } from "next/navigation";
import {
  unstable_addTransitionType as addTransitionType,
  startTransition,
  useEffect,
} from "react";
import styles from "./gallery-viewer.module.css";

type GalleryLayoutProps = {
  children: React.ReactNode;
  totalImages: number;
};

export default function GalleryLayout({
  children,
  totalImages,
}: GalleryLayoutProps) {
  const router = useRouter();
  const params = useParams();
  const currentId = parseInt(params.id as string);

  // Calculate previous and next IDs with wrap-around
  const prevId = currentId === 1 ? totalImages : currentId - 1;
  const nextId = currentId === totalImages ? 1 : currentId + 1;

  // Navigation functions with transition types
  const navigatePrev = () => {
    startTransition(() => {
      addTransitionType("prev");
      router.push(`/gallery/${prevId}`);
    });
  };

  const navigateNext = () => {
    startTransition(() => {
      addTransitionType("next");
      router.push(`/gallery/${nextId}`);
    });
  };

  const navigateBack = () => {
    startTransition(() => {
      addTransitionType("back");
      router.push("/gallery");
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        navigatePrev();
      } else if (e.key === "ArrowRight") {
        navigateNext();
      } else if (e.key === "Escape") {
        navigateBack();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [prevId, nextId]);

  return (
    <div className={styles.galleryViewer}>
      {/* Floating back button */}
      <button onClick={navigateBack} className={styles.floatingBackButton}>
        ← Back to Gallery
      </button>

      {/* Main image container */}
      <div className={styles.imageContainer}>
        <button
          onClick={navigatePrev}
          className={`${styles.navButton} ${styles.navPrev}`}
          title="Previous image"
        >
          &#8249;
        </button>

        <div className={styles.imageWrapper}>{children}</div>

        <button
          onClick={navigateNext}
          className={`${styles.navButton} ${styles.navNext}`}
          title="Next image"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}
