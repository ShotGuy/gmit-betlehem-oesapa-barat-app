import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import LoadingScreen from "@/components/ui/LoadingScreen";
import PageTitle from "@/components/ui/PageTitle";
import PasalSection from "@/components/upp/PasalSection";
import UppCardContainer from "@/components/upp/uppCardContainer";
import useKategoriPengumuman from "@/hooks/useKategoriPengumuman";

export default function UppCategory() {
  const router = useRouter();
  const { category } = router.query;
  const { getCategoryBySlug, loading } = useKategoriPengumuman();
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    if (!loading && category) {
      const catData = getCategoryBySlug(category);

      setCategoryData(catData);
    }
  }, [category, loading, getCategoryBySlug]);

  if (loading) {
    return (
      <LoadingScreen
        isLoading={true}
        message="Memuat kategori UPP..."
      />
    );
  }

  if (!categoryData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Category Not Found
          </h1>
          <p className="text-gray-600">
            The requested UPP category could not be found.
          </p>
        </div>
      </div>
    );
  }

  const hasSubcategories =
    categoryData.jenisPengumuman && categoryData.jenisPengumuman.length > 0;

  return (
    <div>
      <PageTitle
        title={`UPP ${categoryData.nama} - GMIT Imanuel Oepura`}
        description={`Unit Pelayanan Persekutuan (UPP) ${categoryData.nama} di GMIT Jemaat Imanuel Oepura Kupang, Nusa Tenggara Timur.`}
        keywords={`UPP ${categoryData.nama}, Unit Pelayanan Persekutuan, Pelayanan Gereja, GMIT Imanuel Oepura, Gereja Kupang, Pelayanan Jemaat`}
      />
      <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">

        {/* Premium Abstract Background (No Image) */}
        <div className="absolute inset-0 z-0 bg-gray-900 overflow-hidden">
          {/* Base Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-amber-950/30" />

          {/* Animated Orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/20 rounded-full blur-[100px] animate-pulse-slow mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000 mix-blend-screen" />

          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          {/* Depth Vignette */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-gray-900/50 to-gray-900" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center justify-center gap-3 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-200 text-sm font-bold tracking-[0.2em] uppercase">
              Unit Pelayanan Persekutuan
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold text-white mb-8 leading-tight drop-shadow-2xl animate-fade-in-up delay-100">
            {categoryData.nama}
          </h1>

          {categoryData.deskripsi && (
            <div className="animate-fade-in-up delay-200">
              <div className="w-24 h-1 bg-amber-500 mx-auto mb-8 rounded-full" />
              <p className="text-gray-200 text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto text-shadow-sm">
                {categoryData.deskripsi}
              </p>
            </div>
          )}
        </div>


      </div>

      {/* Pasal Section - Always show if exists */}
      <PasalSection
        pasalDeskripsi={categoryData.pasalDeskripsi}
        categoryName={categoryData.nama}
      />

      {/* Show subcategories if available, otherwise show all pengumuman from this category */}
      {hasSubcategories ? (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
              Pilih Kategori {categoryData.nama}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryData.jenisPengumuman.map((jenis) => (
                <Link
                  key={jenis.id}
                  className="group relative bg-white dark:bg-gray-800 rounded-t-[2.5rem] rounded-b-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 text-center border border-gray-100 dark:border-gray-700 overflow-hidden"
                  href={`/upp/${category}/${jenis.nama.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {/* Decorative Top Accent */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-300 to-amber-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#d97706 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <div className="w-16 h-16 mb-6 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                      {/* Dynamic Icon placeholder (using first letter if no icon) */}
                      <span className="font-serif text-2xl font-bold">{jenis.nama.charAt(0)}</span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
                      {jenis.nama}
                    </h3>

                    {jenis.deskripsi && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6">
                        {jenis.deskripsi}
                      </p>
                    )}

                    <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-amber-500 opacity-60 group-hover:opacity-100 transition-opacity mt-auto">
                      Lihat Detail
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <UppCardContainer
          kategoriId={categoryData.id}
          emptyStateMessage={`Belum ada pengumuman untuk kategori ${categoryData.nama}.`}
        />
      )}
    </div>
  );
}
