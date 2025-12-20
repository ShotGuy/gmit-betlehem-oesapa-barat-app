import VisionAndMission from "@/components/about/visionAndMission";
import PageTitle from "@/components/ui/PageTitle";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Tentang() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-500">
      <PageTitle
        description="Tentang GMIT Jemaat Betlehem Oesapa Barat (JBOB) - Gereja Masehi Injili di Timor yang melayani jemaat dengan penuh kasih dan dedikasi di Kupang, Nusa Tenggara Timur. Sejarah, Visi, dan Misi Gereja."
        title="Tentang Kami"
        keywords="Tentang GMIT Betlehem Oesapa Barat, Sejarah Gereja, Visi Misi Gereja, Profil Gereja, Gereja di Kupang, Gereja Masehi Injili, JBOB Kupang"
      />

      {/* Elegant Arch Hero */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Image with Arch Mask */}
        <div className="absolute inset-0 z-0">
          <Image
            fill
            priority
            alt="Background"
            src="/header/malam2.png"
            className="object-cover opacity-30 dark:opacity-20 blur-sm"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white dark:from-gray-950 dark:via-gray-950/80 dark:to-gray-950" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-sm font-bold tracking-wider uppercase mb-4">
            Profil Gereja
          </span>
          <h1 className="font-serif text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">Kami</span>
          </h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg lg:text-2xl font-light leading-relaxed">
            GMIT Betlehem Oesapa Barat - Gereja yang hidup, bertumbuh dalam iman, pengharapan dan kasih, melayani dengan budaya lokal yang kaya.
          </p>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white leading-tight">
            Selamat Datang di <br />
            <span className="text-amber-600 dark:text-amber-500">GMIT Betlehem Oesapa Barat</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
            Kami adalah komunitas iman yang berkomitmen untuk hidup bersama
            dalam kasih Kristus, melayani sesama, dan melestarikan budaya
            lokal Timor. Bergabunglah dengan keluarga besar kami dalam
            perjalanan iman yang bermakna.
          </p>
        </div>
      </div>

      {/* Vision and Mission (Wrapped to ensure theme consistency) */}
      <div className="bg-gray-50 dark:bg-gray-900 py-20 transition-colors duration-500">
        <VisionAndMission />
      </div>

    </div>
  );
}
