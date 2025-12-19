import { useTheme } from "@/contexts/ThemeContext";
import { Facebook, Heart, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className="bg-gray-950 text-gray-300 pt-20 pb-10 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo-dark.png" // Always use dark mode logo style for dark footer, or keep dynamic if needed. Assuming white text logo for dark bg.
                  alt="Logo GMIT"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-white leading-none">GMIT Betlehem</h3>
                <p className="text-sm text-gray-400">Oesapa Barat</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Gereja yang memuliakan Tuhan, membangun jemaat yang dewasa, dan menjadi berkat bagi sesama.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-6">Tautan Cepat</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-amber-500 transition-colors">Beranda</Link></li>
              <li><Link href="/tentang" className="hover:text-amber-500 transition-colors">Tentang Kami</Link></li>
              <li><Link href="/warta" className="hover:text-amber-500 transition-colors">Warta Jemaat</Link></li>
              <li><Link href="/jadwal" className="hover:text-amber-500 transition-colors">Jadwal Ibadah</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-6">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-amber-500">📍</span>
                <span>Jln. Soverdi, Oesapa Barat, Kec. Kelapa Lima, Kota Kupang, NTT</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500">📞</span>
                <span>(0380) 1234567</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500">📧</span>
                <span>secretariat@gmitjbob.org</span>
              </li>
            </ul>
          </div>


        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} GMIT Betlehem Oesapa Barat. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Dibuat dengan <Heart className="w-4 h-4 text-red-500 fill-current" /> untuk Kemuliaan Tuhan
          </p>
        </div>
      </div>
    </footer>
  );
}
