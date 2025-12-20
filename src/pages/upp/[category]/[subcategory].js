import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import LoadingScreen from "@/components/ui/LoadingScreen";
import PageTitle from "@/components/ui/PageTitle";
import PasalSection from "@/components/upp/PasalSection";
import UppCardContainer from "@/components/upp/uppCardContainer";
import useKategoriPengumuman from "@/hooks/useKategoriPengumuman";

export default function UppSubcategory() {
  const router = useRouter();
  const { category, subcategory } = router.query;
  const { getCategoryBySlug, getSubcategoryBySlug, loading } =
    useKategoriPengumuman();
  const [categoryData, setCategoryData] = useState(null);
  const [subcategoryData, setSubcategoryData] = useState(null);

  useEffect(() => {
    if (!loading && category && subcategory) {
      const catData = getCategoryBySlug(category);
      const subData = getSubcategoryBySlug(category, subcategory);

      setCategoryData(catData);
      setSubcategoryData(subData);
    }
  }, [category, subcategory, loading, getCategoryBySlug, getSubcategoryBySlug]);

  if (loading) {
    return (
      <LoadingScreen isLoading={true} message="Memuat sub-kategori UPP..." />
    );
  }

  if (!categoryData || !subcategoryData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Category Not Found
          </h1>
          <p className="text-gray-600">
            The requested UPP category or subcategory could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageTitle
        description={`Unit Pelayanan Persekutuan (UPP) ${categoryData.nama} - ${subcategoryData.nama} di GMIT Jemaat Imanuel Oepura Kupang, Nusa Tenggara Timur.`}
        keywords={`UPP ${categoryData.nama}, ${subcategoryData.nama}, Unit Pelayanan Persekutuan, Pelayanan Gereja, GMIT Imanuel Oepura, Gereja Kupang`}
        title={`UPP ${categoryData.nama} - ${subcategoryData.nama} - GMIT Imanuel Oepura`}
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
              UPP {categoryData.nama}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold text-white mb-8 leading-tight drop-shadow-2xl animate-fade-in-up delay-100">
            {subcategoryData.nama}
          </h1>

          {subcategoryData.deskripsi && (
            <div className="animate-fade-in-up delay-200">
              <div className="w-24 h-1 bg-amber-500 mx-auto mb-8 rounded-full" />
              <p className="text-gray-200 text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto text-shadow-sm">
                {subcategoryData.deskripsi}
              </p>
            </div>
          )}
        </div>


      </div>

      {/* Pasal Section - Show category pasal if exists, otherwise show subcategory pasal */}
      <PasalSection
        categoryName={`${categoryData.nama} - ${subcategoryData.nama}`}
        pasalDeskripsi={
          categoryData.pasalDeskripsi || subcategoryData.pasalDeskripsi
        }
      />

      {/* UPP cards filtered by jenisId */}
      <UppCardContainer
        emptyStateMessage={`Belum ada pengumuman untuk ${subcategoryData.nama}.`}
        jenisId={subcategoryData.id}
      />
    </div>
  );
}
