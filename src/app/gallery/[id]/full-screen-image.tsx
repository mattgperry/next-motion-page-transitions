"use client";

import { AnimateView } from "@/app/AnimateView";
import Image from "next/image";
import styles from "./gallery-viewer.module.css";

type FullScreenImageProps = {
  currentId: number;
  aspectRatio: number;
};

// Animation functions for the MainImage
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

export default function FullScreenImage({
  currentId,
  aspectRatio,
}: FullScreenImageProps) {
  return (
    <AnimateView name={`image-${currentId}`} enter={enter} exit={exit}>
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
