"use client";

import { AnimateView } from "@/app/AnimateView";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { startTransition, unstable_addTransitionType, useEffect } from "react";
import styles from "./gallery-viewer.module.css";

type GalleryViewerProps = {
  currentId: number;
  totalImages: number;
};

export default function GalleryViewer({
  currentId,
  totalImages,
}: GalleryViewerProps) {
  const router = useRouter();

  // Calculate previous and next IDs with wrap-around
  const prevId = currentId === 1 ? totalImages : currentId - 1;
  const nextId = currentId === totalImages ? 1 : currentId + 1;

  // Navigation functions with transition types
  const navigatePrev = () => {
    startTransition(() => {
      unstable_addTransitionType("prev");
      router.push(`/gallery/${prevId}`);
    });
  };

  const navigateNext = () => {
    startTransition(() => {
      unstable_addTransitionType("next");
      router.push(`/gallery/${nextId}`);
    });
  };

  const navigateBack = () => {
    startTransition(() => {
      unstable_addTransitionType("back");
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

        <div className={styles.imageWrapper}>
          <MainImage currentId={currentId} />
        </div>

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

const enter = (types: string[]) => {
  console.log(types);
  return {
    transform: [
      `translateX(${types.includes("prev") ? "-" : ""}100%)`,
      "translateY(0)",
    ],
  };
};

const exit = (types: string[]) => {
  console.log(types);
  return {
    transform: `translateX(${types.includes("prev") ? "" : "-"}100%)`,
  };
};

function MainImage({ currentId }: { currentId: number }) {
  return (
    <AnimateView name={`image-${currentId}`} enter={enter} exit={exit}>
      <Image
        src={`/gallery/image-${currentId}.jpg`}
        alt={`Gallery image ${currentId}`}
        fill
        className={styles.mainImage}
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
      />
    </AnimateView>
  );
}
