import History from "@/components/about/history";
import PageTitle from "@/components/ui/PageTitle";
import { BookOpen, Heart, Users } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SejarahPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-500">
      <PageTitle
        description="Sejarah perjalanan GMIT Jemaat Betlehem Oesapa Barat dari masa ke masa. Mengenal jejak pelayanan dan perkembangan jemaat dalam melayani Tuhan dan sesama di Kupang, Nusa Tenggara Timur."
        title="Sejarah GMIT Betlehem Oesapa Barat"
        keywords="Sejarah GMIT Betlehem Oesapa Barat, Sejarah Gereja di Kupang, Perjalanan Gereja, Sejarah Jemaat, Gereja Masehi Injili di Timor, Misi Gereja, Sejarah JBOB"
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
            Warisan Iman
          </span>
          <h1 className="font-serif text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Sejarah Perjalanan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">Iman Kami</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg lg:text-xl font-light leading-relaxed">
            Perjalanan panjang GMIT Betlehem Oesapa Barat dalam melayani dan berkarya untuk kemuliaan Tuhan dan kebaikan sesama.
          </p>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">
            Warisan Iman Yang Berkelanjutan
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-12">
            Lebih dari tujuh dekade, GMIT Betlehem Oesapa Barat telah menjadi saksi
            perubahan zaman sambil tetap mempertahankan nilai-nilai iman
            Kristen dan budaya lokal Timor. Setiap era membawa tantangan dan
            berkat tersendiri, namun komitmen untuk melayani tetap menjadi
            fondasi yang kokoh.
          </p>

          <div className="bg-amber-50 dark:bg-amber-900/10 rounded-[2rem] p-10 lg:p-14 border border-amber-100 dark:border-amber-900/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 text-[10rem] text-amber-500/10 font-serif leading-none -mt-10 -ml-10">“</div>
            <blockquote className="relative z-10 text-2xl lg:text-3xl font-serif text-amber-900 dark:text-amber-100 italic">
              "Kami tidak hanya mewarisi gedung dan tradisi, tetapi juga
              semangat melayani yang telah diteruskan dari generasi ke
              generasi."
            </blockquote>
            <p className="relative z-10 text-amber-600 dark:text-amber-400 font-bold mt-6 tracking-wide uppercase text-sm">
              — Majelis GMIT Betlehem Oesapa Barat
            </p>
          </div>
        </div>
      </div>

      {/* Main History Timeline */}
      <History />

      {/* Legacy Section (Arch Cards) */}
      <div className="py-24 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="block h-1 w-20 bg-amber-500 rounded-full mx-auto mb-6"></span>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Warisan Yang Kami Jaga
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Nilai-nilai dan tradisi yang terus kami lestarikan untuk generasi mendatang.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tradisi Ibadah */}
            <div className="bg-white dark:bg-gray-800 rounded-t-[4rem] rounded-b-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 group text-center">
              <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-amber-500 transition-colors duration-300">
                <BookOpen className="w-8 h-8 text-amber-600 dark:text-amber-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Tradisi Ibadah
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Liturgi dan tatacara ibadah yang memadukan unsur Reformed
                dengan kearifan lokal Timor, menciptakan pengalaman spiritual
                yang autentik.
              </p>
            </div>

            {/* Budaya Lokal */}
            <div className="bg-white dark:bg-gray-800 rounded-t-[4rem] rounded-b-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 group text-center mt-0 lg:-mt-8">
              <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-amber-500 transition-colors duration-300">
                <Users className="w-8 h-8 text-amber-600 dark:text-amber-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Budaya Lokal
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Pelestarian bahasa, adat istiadat, dan nilai-nilai budaya
                Timor yang diintegrasikan dengan ajaran Kristen dalam
                kehidupan sehari-hari.
              </p>
            </div>

            {/* Pelayanan Sosial */}
            <div className="bg-white dark:bg-gray-800 rounded-t-[4rem] rounded-b-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 group text-center">
              <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-amber-500 transition-colors duration-300">
                <Heart className="w-8 h-8 text-amber-600 dark:text-amber-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Pelayanan Sosial
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Komitmen dalam melayani masyarakat melalui berbagai program
                sosial, pendidikan, dan pemberdayaan ekonomi yang
                berkelanjutan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gray-900 dark:bg-black">
          <Image
            fill
            alt="Community"
            src="/header/sore3.png"
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
            Mari Menjadi Bagian dari Sejarah Ini
          </h2>
          <p className="text-lg md:text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
            Sejarah tidak berhenti di masa lalu. Anda bisa menjadi bagian dari
            perjalanan iman dan pelayanan GMIT Betlehem Oesapa Barat ke depan.
          </p>
          <a
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-900 transition-all duration-200 bg-amber-500 border border-transparent rounded-full hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            href="/tentang"
          >
            Pelajari Lebih Lanjut
          </a>
        </div>
      </div>
    </div>
  );
}
