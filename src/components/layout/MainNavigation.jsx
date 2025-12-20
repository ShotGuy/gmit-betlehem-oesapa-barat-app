"use client";

import { Menu } from "lucide-react";
import Head from "next/head";
import { useEffect, useState } from "react";

import ThemeToggle from "@/components/ui/ThemeToggle";
import useKategoriPengumuman from "@/hooks/useKategoriPengumuman";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function MainNavigation({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { name: "Beranda", path: "/" },
    { name: "Galeri", path: "/galeri" },
    { name: "Tentang", path: "/tentang" },
    { name: "Sejarah", path: "/sejarah" },
    { name: "Profil Pendeta", path: "/profil-pendeta" },
  ];

  const { kategoriOptions: uppItems, loading: uppLoading } = useKategoriPengumuman();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <link as="image" href="/logo-GMIT.png" rel="preload" type="image/png" />
      </Head>
      <div className="drawer text-gray-900 dark:text-white transition-colors duration-300">
        <input className="drawer-toggle" id="my-drawer-3" type="checkbox" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div
            className={`navbar w-full fixed top-0 left-0 z-50 transition-all duration-300 text-gray-900 dark:text-white ${isScrolled
              ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg py-2"
              : "bg-transparent py-4"
              }`}
          >
            <div className="flex-none lg:hidden">
              <label
                aria-label="open sidebar"
                className="btn btn-square btn-ghost text-gray-900 dark:text-white hover:bg-black/10 dark:hover:bg-white/30 transition-colors duration-200"
                htmlFor="my-drawer-3"
              >
                <Menu className="w-8 h-8" />
              </label>
            </div>

            <div className="mx-2 flex-1 px-2 flex items-center gap-3">
              <img
                alt="GMIT Betlehem Oesapa Barat Logo"
                className={`transition-all duration-300 ${isScrolled ? "h-10 w-10" : "h-12 w-12"}`}
                src="/logo-GMIT.png"
              />
              <div className={`transition-all duration-300 ${isScrolled ? "scale-95 origin-left" : "scale-100"}`}>
                <p className="font-extrabold text-xl lg:text-2xl">GMIT Betlehem</p>
                <p className="text-lg lg:text-xl">Oesapa Barat</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Navbar
                menuItems={menuItems}
                uppItems={uppItems}
                uppLoading={uppLoading}
              />
            </div>
          </div>
          {/* Page content here */}
          <main>{children}</main>
        </div>
        <Sidebar
          menuItems={menuItems}
          uppItems={uppItems}
          uppLoading={uppLoading}
        />
      </div>
    </>
  );
}
