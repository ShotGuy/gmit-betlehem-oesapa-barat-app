import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/Carousel";
import UppCard from "@/components/upp/uppCard";
import pengumumanService from "@/services/pengumumanService";
import { useEffect, useState } from "react";



export default function NewsRow() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const response = await pengumumanService.getAll({
          limit: 6,
          status: "PUBLISHED",
          sortBy: "tanggalPengumuman",
          sortOrder: "desc",
        });

        if (response.success && response.data.items) {
          setNewsData(response.data.items);
        }

      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  return (
    <div className="relative py-24 lg:py-32 bg-gray-50 dark:bg-gray-900 overflow-hidden">

      {/* Background Decor: Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#d97706 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      {/* Background Decor: Soft Gradient Glows */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent dark:from-gray-900 dark:to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent z-10" />

      {/* Background Decor: Large Blur Blobs */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-amber-200/20 dark:bg-amber-700/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-200/20 dark:bg-blue-700/10 rounded-full blur-3xl" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 lg:px-8">
        {/* Premium Header - Centered & Grand */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-amber-100 dark:border-amber-900/30 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest text-amber-600 dark:text-amber-500 uppercase">
              Warta Jemaat
            </span>
          </div>

          <h2 className="font-serif text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Informasi & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 relative inline-block">
              Pelayanan
              {/* Underline Decoration */}
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-amber-200 dark:text-amber-800/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 font-light leading-relaxed">
            Tetap terhubung dengan kegiatan dan berita terbaru dari Jemaat Betlehem Oesapa Barat.
            Informasi yang transparan untuk pelayanan yang lebih baik.
          </p>
        </div>

        {/* Content */}
        <div className="relative">
          {loading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg text-amber-500"></span>
            </div>
          ) : newsData.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-[2rem] border border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-lg text-gray-500 dark:text-gray-400">Belum ada pengumuman terbaru saat ini.</p>
            </div>
          ) : (
            <Carousel className="w-full">
              <CarouselContent className="-ml-4 pb-4">
                {newsData.map((news) => (
                  <CarouselItem
                    key={news.id}
                    className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="h-full transform transition-transform hover:-translate-y-2 duration-300">
                      <UppCard pengumuman={news} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Custom Navigation */}
              <div className="flex justify-end gap-3 mt-8">
                <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all" />
                <CarouselNext className="static translate-y-0 h-12 w-12 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all" />
              </div>
            </Carousel>
          )}
        </div>
      </div>
    </div>
  );
}
