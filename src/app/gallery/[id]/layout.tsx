import { notFound } from "next/navigation";
import GalleryLayout from "./gallery-layout";

const TOTAL_IMAGES = 16;

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

export default async function GalleryViewerLayout({ children, params }: Props) {
  const { id } = await params;
  const currentId = parseInt(id);

  // Validate the ID
  if (isNaN(currentId) || currentId < 1 || currentId > TOTAL_IMAGES) {
    notFound();
  }

  return <GalleryLayout totalImages={TOTAL_IMAGES}>{children}</GalleryLayout>;
}
