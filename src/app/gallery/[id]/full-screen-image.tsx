"use client";

import { AnimateView } from "@/app/AnimateView";
import Image from "next/image";
import styles from "./gallery-viewer.module.css";

type FullScreenImageProps = {
  currentId: number;
  aspectRatio: number;
  totalImages: number;
};

const secondary = (types: string[]) => {
  console.log(types);
  if (types.includes("open")) {
    return {
      transition: { duration: 0 },
    };
  }
};

export default function FullScreenImage({
  currentId,
  aspectRatio,
  totalImages,
}: FullScreenImageProps) {
  // Calculate previous and next IDs with wrap-around
  const prevId = currentId === 1 ? totalImages : currentId - 1;
  const nextId = currentId === totalImages ? 1 : currentId + 1;

  return (
    <AnimateView
      name={`image-${currentId}`}
      transition={{ ease: "easeOut", duration: 0.5 }}
    >
      <Image
        src={`/gallery/image-${currentId}.jpg`}
        alt={`Gallery image ${currentId}`}
        fill
        className={styles.mainImage}
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        style={{
          objectFit: "contain",
          aspectRatio: aspectRatio.toString(),
        }}
      />
    </AnimateView>
  );
}
