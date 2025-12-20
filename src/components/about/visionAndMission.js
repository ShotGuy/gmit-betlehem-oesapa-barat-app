import kontenLandingPageService from "@/services/kontenLandingPageService";
import { CheckCircle2, Compass, Target } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// Mapping gambar statis berdasarkan section
const sectionImages = {
  VISI: "/header/sore2.png", // Updated to cleaner image
  MISI: "/header/img_5867.jpg", // Updated to clearer image
};

export default function VisionAndMission() {
  const [visiData, setVisiData] = useState(null);
  const [misiData, setMisiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Visi
        const visiResponse = await kontenLandingPageService.getPublicBySection("VISI");
        if (visiResponse.success && visiResponse.data.length > 0) {
          setVisiData(visiResponse.data[0]);
        }

        // Fetch Misi
        const misiResponse = await kontenLandingPageService.getPublicBySection("MISI");
        if (misiResponse.success && misiResponse.data.length > 0) {
          setMisiData(misiResponse.data[0]);
        }
      } catch (error) {
        console.error("Error fetching visi misi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-20">
        <div className="loading loading-lg text-amber-500"></div>
      </div>
    );
  }

  // Parse misi list jika ada metadata
  const misiList = misiData?.metadata?.list || [];

  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 px-4 md:px-8 py-10 max-w-7xl mx-auto">

      {/* Vision Section */}
      {visiData && (
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 mb-24">
          <div className="w-full md:w-1/2 relative group">
            {/* Arch Image Frame */}
            <div className="relative h-[400px] md:h-[500px] w-full rounded-t-[10rem] rounded-b-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
              <Image
                alt={visiData.judul}
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                src={sectionImages.VISI}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 lg:right-10 bg-amber-500 text-white p-6 rounded-2xl shadow-xl transform rotate-3 group-hover:rotate-0 transition-all duration-300">
              <Target className="w-8 h-8" />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <span className="text-amber-600 dark:text-amber-500 font-bold tracking-widest uppercase text-sm mb-2 block">
              Tujuan Kami
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-8 text-gray-900 dark:text-white">
              {visiData.judul}
            </h2>
            <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>{visiData.konten}</p>
            </div>
          </div>
        </div>
      )}

      {/* Mission Section */}
      {misiData && (
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
          <div className="w-full md:w-1/2 relative group">
            {/* Arch Image Frame (Inverted) */}
            <div className="relative h-[400px] md:h-[500px] w-full rounded-b-[10rem] rounded-t-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
              <Image
                alt={misiData.judul}
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                src={sectionImages.MISI}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-6 -left-6 lg:left-10 bg-amber-500 text-white p-6 rounded-2xl shadow-xl transform -rotate-3 group-hover:rotate-0 transition-all duration-300">
              <Compass className="w-8 h-8" />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <span className="text-amber-600 dark:text-amber-500 font-bold tracking-widest uppercase text-sm mb-2 block">
              Langkah Kami
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-8 text-gray-900 dark:text-white">
              {misiData.judul}
            </h2>

            {misiList.length > 0 ? (
              <ul className="space-y-4">
                {misiList.map((item, index) => (
                  <li key={index} className="flex items-start group">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mr-4 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 mt-1">
                      <CheckCircle2 className="w-5 h-5" />
                    </span>
                    <span className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed pt-1">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>{misiData.konten}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
