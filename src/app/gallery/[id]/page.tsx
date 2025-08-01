import { Metadata } from "next";
import { notFound } from "next/navigation";
import FullScreenImage from "./full-screen-image";

const TOTAL_IMAGES = 16;

// Static aspect ratio data for each image (width/height)
const IMAGE_ASPECT_RATIOS: Record<number, number> = {
  1: 16 / 9, // Landscape
  2: 4 / 3, // Standard
  3: 3 / 2, // Classic photo
  4: 1 / 1, // Square
  5: 2 / 3, // Portrait
  6: 16 / 9, // Landscape
  7: 4 / 5, // Portrait
  8: 3 / 2, // Classic photo
  9: 16 / 9, // Landscape
  10: 1 / 1, // Square
  11: 2 / 3, // Portrait
  12: 4 / 3, // Standard
  13: 3 / 2, // Classic photo
  14: 16 / 9, // Landscape
  15: 4 / 5, // Portrait
  16: 3 / 2, // Classic photo
};

type Props = {
  params: Promise<{ id: string }>;
};

// Generate metadata for each gallery page (Server Component)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const currentId = parseInt(id);

  if (isNaN(currentId) || currentId < 1 || currentId > TOTAL_IMAGES) {
    return {
      title: "Image Not Found",
    };
  }

  return {
    title: `Gallery Image ${currentId} | Image Collection`,
    description: `Viewing image ${currentId} of ${TOTAL_IMAGES} in the gallery collection`,
  };
}

export default async function GalleryItemPage({ params }: Props) {
  const { id } = await params;
  const currentId = parseInt(id);

  // Validate the ID
  if (isNaN(currentId) || currentId < 1 || currentId > TOTAL_IMAGES) {
    notFound();
  }

  const aspectRatio = IMAGE_ASPECT_RATIOS[currentId];

  return (
    <FullScreenImage
      currentId={currentId}
      aspectRatio={aspectRatio}
      totalImages={TOTAL_IMAGES}
    />
  );
}

// Generate static params for better performance
export async function generateStaticParams() {
  return Array.from({ length: TOTAL_IMAGES }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}
