"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimateView } from "../AnimateView";
import styles from "./gallery.module.css";

// Generate array of image IDs (1-16 for the expected 16 images)
const imageIds = Array.from({ length: 16 }, (_, i) => i + 1);

export default function GalleryPage() {
  return (
    <div className={styles.galleryContainer}>
      <h1 className={styles.galleryTitle}>Gallery</h1>
      <div className={styles.galleryGrid}>
        {imageIds.map((id) => (
          <AnimateView
            key={id}
            name={`image-${id}`}
            share={(types) =>
              types.includes("back") && !types.includes("from-" + id)
                ? { transition: { duration: 0 } }
                : {}
            }
          >
            <Link
              key={id}
              href={`/gallery/${id}`}
              className={styles.galleryItem}
            >
              <Image
                src={`/gallery/image-${id}.jpg`}
                alt={`Gallery image ${id}`}
                width={300}
                height={300}
                className={styles.galleryThumbnail}
                priority={id <= 8} // Priority for first 8 images
              />
            </Link>
          </AnimateView>
        ))}
      </div>
    </div>
  );
}
