import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";

interface GalleryProps {
  galleryData: {
    image: {
      alt: string;
      url: string;
    };
  }[];
}

interface GalleryDataType {
  original: string;
  thumbnail: string;
}

function ProductGallery({ galleryData }: GalleryProps) {
  const [gallery, setGallery] = useState<GalleryDataType[]>([]);

  useEffect(() => {
    let galleryPictures: GalleryDataType[] = [];

    galleryData.forEach((picture) => {
      galleryPictures.push({
        original: picture.image.url,
        thumbnail: picture.image.url,
      });
    });

    setGallery(galleryPictures);
  }, [setGallery, galleryData]);

  return (
    <section>
      {gallery.length > 0 && (
        <ImageGallery items={gallery} thumbnailPosition="left" />
      )}
    </section>
  );
}

export default ProductGallery;
