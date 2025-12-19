import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Fetch SEJARAH content from API
import kontenLandingPageService from "@/services/kontenLandingPageService";
import { useQuery } from "@tanstack/react-query";

// Default hardcoded data (fallback)
const defaultHistory = [
  {
    judul: "Awal Mula",
    konten: "GMIT Betlehem Oesapa Barat didirikan sebagai bagian dari pelayanan gereja di wilayah Timor, lahir dari semangat penyebaran Injil dan kebutuhan masyarakat lokal.",
    urutan: "1950",
    colorFrom: "from-blue-500",
    colorTo: "to-indigo-600",
  },
  {
    judul: "Pertumbuhan",
    konten: "Masa pembangunan gedung gereja yang lebih besar dan pengembangan berbagai pelayanan seperti sekolah minggu dan persekutuan pemuda.",
    urutan: "1970",
    colorFrom: "from-green-500",
    colorTo: "to-emerald-600",
  },
  {
    judul: "Era Modern",
    konten: "Mengintegrasikan teknologi dalam pelayanan dan keterlibatan aktif dalam pembangunan masyarakat serta pelestarian budaya Timor.",
    urutan: "2024",
    colorFrom: "from-purple-500",
    colorTo: "to-pink-600",
  }
];

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Fetch dynamic content
  const { data: historyResponse } = useQuery({
    queryKey: ["publicContent", "SEJARAH"],
    queryFn: () => kontenLandingPageService.getPublicBySection("SEJARAH"),
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  const historyData = historyResponse?.data;

  // Use API data if available, otherwise use default
  const displayHistory = historyData?.length > 0
    ? historyData.map((item, index) => ({
      ...item,
      // Assign colors cyclically based on index
      colorFrom: index % 3 === 0 ? "from-blue-500" : index % 3 === 1 ? "from-green-500" : "from-purple-500",
      colorTo: index % 3 === 0 ? "to-indigo-600" : index % 3 === 1 ? "to-emerald-600" : "to-pink-600",
    }))
    : defaultHistory;

  useEffect(() => {
    // Add fallback timeout to ensure content shows even if IntersectionObserver fails
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          clearTimeout(fallbackTimer);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px 0px", // Trigger earlier
      }
    );

    const element = sectionRef.current;

    if (element) {
      observer.observe(element);
    }

    return () => {
      clearTimeout(fallbackTimer);
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="py-16 lg:py-32 bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden"
      id="about-section"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left - Content */}
          <div
            className={`lg:col-span-6 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 transform translate-x-0" : "opacity-0 transform -translate-x-8"}`}
          >
            <div className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-amber-600 uppercase bg-amber-50 dark:bg-amber-900/20 rounded-full">
              Tentang Kami
            </div>

            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-8 text-gray-900 dark:text-white leading-[1.2]">
              Gereja yang Hidup <br />
              <span className="italic text-gray-500 dark:text-gray-400">Dalam Kasih & Pelayanan</span>
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-10 font-light">
              GMIT Betlehem Oesapa Barat hadir sebagai rumah bagi setiap jiwa untuk bertumbuh, berakar, dan berbuah. Kami berkomitmen untuk menjadi saksi kasih Kristus di tengah masyarakat.
            </p>

            {/* Timeline / Highlights - Minimalist */}
            <div className="space-y-6 border-l-2 border-amber-100 dark:border-amber-900/30 pl-8 ml-2">
              {displayHistory.slice(0, 3).map((item, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -left-[39px] top-1.5 w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 bg-amber-400 group-hover:bg-amber-600 transition-colors shadow-sm" />
                  <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-amber-600 transition-colors">
                    {item.judul}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                    {item.konten}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-5">
              <Link className="group" href="/tentang">
                <div className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white transition-all duration-300 bg-gray-900 border border-transparent rounded-full hover:bg-amber-600 hover:scale-105 shadow-xl">
                  Pelajari Lebih Lanjut
                </div>
              </Link>
            </div>
          </div>

          {/* Right - Visual Arch */}
          <div
            className={`lg:col-span-6 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 transform translate-x-0" : "opacity-0 transform translate-x-8"}`}
          >
            <div className="relative mx-auto max-w-md lg:max-w-full">
              {/* Background pattern similar to Hero */}
              <div className="absolute inset-0 bg-amber-50 dark:bg-amber-900/20 rounded-t-[10rem] rounded-b-[2rem] transform rotate-3 scale-105 opacity-50" />

              {/* The Arch Image */}
              <div className="relative z-10 aspect-[3/4] bg-gray-200 dark:bg-gray-800 rounded-t-[10rem] rounded-b-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-900">
                <Image
                  fill
                  alt="GMIT Betlehem Oesapa Barat"
                  className="object-cover transform hover:scale-110 transition-transform duration-[1.5s]"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  src="/header/IMG_5867.JPG"
                />

                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 pt-24 text-white">
                  <div className="flex justify-between items-end border-b border-white/20 pb-4 mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-amber-300 mb-1">Anggota Jemaat</p>
                      <p className="font-serif text-3xl font-bold">500+</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-widest text-amber-300 mb-1">Tahun Melayani</p>
                      <p className="font-serif text-3xl font-bold">70+</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/80 font-light italic">
                    "Melayani dengan hati, bertumbuh dalam iman."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
