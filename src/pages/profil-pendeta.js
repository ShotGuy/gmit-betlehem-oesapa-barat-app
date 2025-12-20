import PageTitle from "@/components/ui/PageTitle";
import { Quote, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilPendetaPage() {
  const [scrollY, setScrollY] = useState(0);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/public/profil-pendeta?active=true");
        const result = await response.json();

        if (result.success && result.data.length > 0) {
          setProfiles(result.data);
        } else {
          setProfiles([]);
        }
      } catch (err) {
        console.error("Error fetching profiles:", err);
        setProfiles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-500">
      <PageTitle
        description="Profil pendeta dan pelayan gereja GMIT Jemaat Betlehem Oesapa Barat yang melayani dengan dedikasi tinggi."
        title="Profil Pendeta GMIT Betlehem Oesapa Barat"
        keywords="Profil Pendeta, Pendeta GMIT, Pendeta Gereja, Pelayan Gereja, Pendeta Kupang"
      />

      {/* Elegant Arch Hero */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Image with Arch Mask */}
        <div className="absolute inset-0 z-0">
          <Image
            fill
            priority
            alt="Background"
            src="/header/malam.png"
            className="object-cover opacity-30 dark:opacity-20 blur-sm"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white dark:from-gray-950 dark:via-gray-950/80 dark:to-gray-950" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-sm font-bold tracking-wider uppercase mb-4">
            Gembala & Pelayan
          </span>
          <h1 className="font-serif text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Profil <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">Pendeta</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg lg:text-xl font-light leading-relaxed">
            Mengenal lebih dekat para hamba Tuhan yang mendedikasikan hidupnya untuk melayani jemaat GMIT Betlehem Oesapa Barat.
          </p>
        </div>
      </div>

      <div className="py-20 px-4 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="loading loading-lg text-amber-500" />
            </div>
          ) : profiles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {profiles.map((profile) => (
                <div key={profile.id} className="group relative">
                  {/* Decorative Arch Background */}
                  <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900 rounded-t-[10rem] rounded-b-3xl transform group-hover:scale-105 transition-transform duration-500 shadow-lg border border-gray-100 dark:border-gray-800" />

                  <div className="relative p-6 flex flex-col items-center text-center">

                    {/* Image Container */}
                    <div className="relative w-48 h-64 mb-6 rounded-t-[5rem] rounded-b-3xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-800">
                      {profile.urlFoto ? (
                        <Image
                          src={profile.urlFoto}
                          alt={profile.nama}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                          <User className="w-16 h-16 text-gray-400" />
                        </div>
                      )}


                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                        {profile.nama}
                      </h3>
                      <p className="text-amber-600 dark:text-amber-500 font-bold text-sm uppercase tracking-wider">
                        {profile.status || "Pendeta Jemaat"}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {profile.periode}
                      </p>

                      {/* Quote Section */}
                      {profile.quote && (
                        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 relative">
                          <Quote className="w-4 h-4 text-amber-300 absolute -top-2 left-1/2 -translate-x-1/2 fill-current" />
                          <p className="text-gray-600 dark:text-gray-300 italic text-sm leading-relaxed">
                            "{profile.quote}"
                          </p>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <User className="w-10 h-10 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-2">
                Belum Ada Data Pendeta
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Data profil pendeta belum tersedia di database.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
