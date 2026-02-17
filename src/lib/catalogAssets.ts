import monolithImg from "@/assets/monolith-collection.jpg";
import stillnessImg from "@/assets/stillness-collection.jpg";
import originImg from "@/assets/origin-collection.jpg";

const collectionImages: Record<string, string> = {
  monolith: monolithImg,
  stillness: stillnessImg,
  origin: originImg,
};

export const getCollectionImage = (slug?: string, imageUrl?: string | null) => {
  if (imageUrl) return imageUrl;
  if (!slug) return "/placeholder.svg";
  return collectionImages[slug] ?? "/placeholder.svg";
};

export const collectionImageMap = collectionImages;
