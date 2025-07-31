import { Metadata } from "next";
import { notFound } from "next/navigation";
import GalleryViewer from "./gallery-viewer";

const TOTAL_IMAGES = 16;

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

  return <GalleryViewer currentId={currentId} totalImages={TOTAL_IMAGES} />;
}

// Generate static params for better performance
export async function generateStaticParams() {
  return Array.from({ length: TOTAL_IMAGES }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}
