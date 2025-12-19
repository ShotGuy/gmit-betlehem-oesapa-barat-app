import Image from "next/image";

import AboutSection from "@/components/home/aboutSection";
import CommunityCallToAction from "@/components/home/cta/CommunityCallToAction";
import HeroSection from "@/components/home/HeroSection";
import NewsRow from "@/components/home/newsRow";
import OurLocation from "@/components/home/ourLocation";
import WorshipSchedule from "@/components/home/schedule/WorshipSchedule";
import ChurchStatisticsHorizontal from "@/components/home/statistics/churchStatisticsHorizontal";
import PageTitle from "@/components/ui/PageTitle";

export default function Home() {
  return (
    <>
      <PageTitle
        description="GMIT Jemaat Betlehem Oesapa Barat (JBOB) - Gereja Masehi Injili di Timor yang melayani jemaat dengan penuh kasih dan dedikasi di Kupang, Nusa Tenggara Timur. Ibadah Minggu, Cell Group, Sidi, Pernikahan, Baptis, Pelayanan Jemaat."
        keywords="GMIT Jemaat Betlehem Oesapa Barat, JBOB, Gereja Kupang, Ibadah Minggu Kupang, Gereja Kristen, Gereja Protestan, Gereja di NTT, Ibadah Gereja, Pelayanan Jemaat, Kegiatan Gereja"
        title="Beranda"
      />
      <div className="bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        {/* Mobile Layout - Vertical Stack */}
        <div className="lg:hidden">
          {/* Hero Section */}
          <div className="relative flex justify-start items-center h-screen">
            <Image
              fill
              priority
              alt="Home Head"
              className="object-cover w-full h-full"
              sizes="100vw"
              src="/hero.png"
            />
            <div className="absolute flex flex-col p-8">
              <p className="text-white text-2xl font-bold">Selamat Datang di</p>
              <h1 className="text-white text-4xl font-bold">
                GMIT Betlehem Oesapa Barat
              </h1>
              <p className="text-white text-base">
                Bersama dalam kasih, bertumbuh dalam iman, melayani dalam
                pengharapan.
              </p>
            </div>
          </div>



          {/* Mobile Statistics - Vertical */}


          {/* Rest of content */}
          <ChurchStatisticsHorizontal />

          {/* About Section */}
          <AboutSection />

          <NewsRow />

          <CommunityCallToAction />

          <WorshipSchedule />

          <div className="w-full p-4">
            <OurLocation />
          </div>
        </div>

        {/* Desktop Layout - Side-by-side */}
        <div className="hidden lg:flex">
          {/* Left Column - Church Statistics (Sidebar) */}


          {/* Right Column - Main Content */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* New Hero Section */}
            <HeroSection />

            {/* Horizontal Statistics - Keeping for now but verify style later */}
            <div className="-mt-12 relative z-20 px-4 max-w-7xl mx-auto">
              <ChurchStatisticsHorizontal />
            </div>

            {/* About Section */}
            <AboutSection />

            {/* News */}
            <NewsRow />

            {/* CTA Community Banner */}
            <CommunityCallToAction />

            {/* Worship Schedule */}
            <WorshipSchedule />

            {/* Location */}
            <div className="w-full p-8">
              <OurLocation />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
