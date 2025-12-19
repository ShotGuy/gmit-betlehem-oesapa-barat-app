import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import publicStatisticsService from "../../../services/publicStatisticsService";
import StatDonutChart from "./StatDonutChart";

const DUMMY_DATA = [
  {
    title: "Jemaat Kategorial",
    data: [
      { name: "PAR", value: 600 },
      { name: "Remaja", value: 143 },
      { name: "Dewasa", value: 132 },
      { name: "Lansia", value: 324 },
    ]
  },
  {
    title: "Jemaat Rayon 1",
    data: [
      { name: "Rayon 1", value: 132 },
      { name: "Rayon 2", value: 324 },
      { name: "Rayon 3", value: 143 },
      { name: "Rayon 4", value: 600 },
    ]
  },
  {
    title: "Jemaat Rayon 2",
    data: [
      { name: "Rayon 5", value: 200 },
      { name: "Rayon 6", value: 450 },
      { name: "Rayon 7", value: 300 },
      { name: "Rayon 8", value: 150 },
    ]
  },
  {
    title: "Jumlah Jemaat",
    data: [
      { name: "Pria", value: 600 },
      { name: "Wanita", value: 400 },
    ]
  },
  {
    title: "Statistik Profesi",
    data: [
      { name: "PNS", value: 150 },
      { name: "Swasta", value: 300 },
      { name: "TNI/Polri", value: 50 },
      { name: "Lainnya", value: 400 },
    ]
  }
];

export default function ChurchStatisticsHorizontal() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const {
    data: apiData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["churchStatistics"],
    queryFn: async () => {
      try {
        const response = await publicStatisticsService.getChurchStatistics();
        return publicStatisticsService.formatChartData(response);
      } catch (e) {
        console.warn("Using dummy data due to API error", e);
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  // Use API data
  const chartData = apiData || [];

  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative py-16 bg-white dark:bg-gray-900 transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block h-1 w-20 bg-amber-500 rounded-full mb-4"></span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Data Kehidupan Jemaat
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Gambaran umum pertumbuhan dan demografi jemaat kami yang terus bertumbuh dalam kasih Tuhan.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4 touch-pan-y">
              {chartData.map((chart, index) => (
                <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 min-w-0">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow h-full">
                    <StatDonutChart
                      title={chart.title}
                      data={chart.data}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === selectedIndex
                  ? "bg-amber-500 w-8"
                  : "bg-gray-300 dark:bg-gray-700 hover:bg-amber-300"
                  }`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
