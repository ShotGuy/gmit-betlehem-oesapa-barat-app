import EmptyState from "../common/EmptyState";
import GalleryImage from "./galleryImage";

export default function Images({ galleryItems }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {galleryItems && galleryItems.length > 0 ? (
        // Masonry Layout using CSS Columns
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item) => (
            <GalleryImage key={item.id} galleryItem={item} />
          ))}
        </div>
      ) : (
        <EmptyState
          description="Belum ada foto atau gambar yang tersedia untuk ditampilkan."
          size="lg"
          title="Galeri Kosong"
          type="gallery"
        />
      )}
    </div>
  );
}
