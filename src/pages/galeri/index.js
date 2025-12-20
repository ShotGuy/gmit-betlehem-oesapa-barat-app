import EmptyState from "@/components/common/EmptyState";
import Images from "@/components/gallery/images";
import PageTitle from "@/components/ui/PageTitle";
import axios from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";




export default function Galeri() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGaleri() {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("/galeri");

        if (response.data.success && response.data.data.items.length > 0) {
          setGalleryItems(response.data.data.items);
        } else {
          setGalleryItems([]);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Gagal memuat data galeri");
        setGalleryItems([]);
      } finally {
        setLoading(false);
      }
    }

    fetchGaleri();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-500">
      <PageTitle
        description="Galeri Kegiatan GMIT Jemaat Betlehem Oesapa Barat"
        title="Galeri Kegiatan"
      />

      {/* Elegant Arch Hero */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Image with Arch Mask */}
        <div className="absolute inset-0 z-0">
          <Image
            fill
            priority
            alt="Background"
            src="/header/gallery.webp"
            className="object-cover opacity-30 dark:opacity-20 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white dark:from-gray-950 dark:via-gray-950/80 dark:to-gray-950" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-sm font-bold tracking-wider uppercase mb-4">
            Dokumentasi & Kenangan
          </span>
          <h1 className="font-serif text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Galeri Kehidupan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">Jemaat Kami</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg lg:text-xl font-light">
            Setiap momen adalah berkat. Berikut adalah rekaman sukacita dan pelayanan di GMIT Betlehem Oesapa Barat.
          </p>
        </div>
      </div>

      <div className="min-h-[50vh]">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="loading loading-lg text-amber-500" />
          </div>
        ) : error && galleryItems.length === 0 ? (
          <EmptyState
            actionText="Coba Lagi"
            description={`Terjadi kesalahan: ${error}`}
            title="Gagal Memuat Galeri"
            type="error"
            onAction={() => window.location.reload()}
          />
        ) : (
          <Images galleryItems={galleryItems} />
        )}
      </div>
    </div>
  );
}
