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
    <div className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-amber-600 uppercase bg-amber-100 dark:bg-amber-900/20 rounded-full">
              Warta & Berita
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Kabar Jemaat
            </h2>
          </div>

          <div className="hidden md:block">
            <p className="text-gray-500 dark:text-gray-400 max-w-sm text-right">
              Ikuti perkembangan terkini dan informasi penting seputar pelayanan gereja.
            </p>
          </div>
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
