import kontenLandingPageService from "@/services/kontenLandingPageService";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function History() {
  const [sejarahData, setSejarahData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sejarahResponse = await kontenLandingPageService.getPublicBySection("SEJARAH");
        if (sejarahResponse.success && sejarahResponse.data.length > 0) {
          // Sort by title (assuming title contains year, or just keep order)
          // For now, we keep the order as delivered by API
          setSejarahData(sejarahResponse.data);
        }
      } catch (error) {
        console.error("Error fetching sejarah:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return null; // Let parent handle loading or showing nothing

  if (sejarahData.length === 0) return null;

  return (
    <div className="relative py-20 overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors duration-500">

      {/* Central Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-amber-300 dark:via-amber-800 to-transparent transform -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <div className="space-y-12">
          {sejarahData.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={item.id} className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 group ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                {/* Content Card */}
                <div className="flex-1 w-full pl-8 md:pl-0">
                  <div className={`
                    bg-white dark:bg-gray-900 
                    p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800
                    hover:shadow-xl hover:border-amber-200 dark:hover:border-amber-900/50 
                    transition-all duration-500 relative
                    ${isEven ? 'md:text-right' : 'md:text-left'}
                  `}>

                    {/* Arrow for Desktop */}
                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-gray-900 transform rotate-45 border-b border-l border-gray-100 dark:border-gray-800 ${isEven ? '-right-2 border-r-0 border-t-0' : '-left-2 border-r-0 border-t-0'}`} />

                    <div className="flex flex-col gap-2">
                      <span className={`text-sm font-bold tracking-wider text-amber-600 dark:text-amber-500 uppercase ${isEven ? 'md:self-end' : 'md:self-start'}`}>
                        Periode Sejarah
                      </span>
                      <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
                        {item.judul}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item.konten}
                      </p>
                      {item.deskripsi && (
                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                          <p className="text-sm italic text-gray-500 dark:text-gray-400">
                            "{item.deskripsi}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border-4 border-white dark:border-gray-950 bg-amber-500 text-white shadow-xl z-20">
                  <Star className="w-5 h-5 fill-current" />
                </div>

                {/* Empty Space for Balance */}
                <div className="flex-1 w-full hidden md:block" />

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
