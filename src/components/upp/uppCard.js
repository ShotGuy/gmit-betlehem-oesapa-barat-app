import { AlertCircle, Bell, Calendar, Info, Pin } from "lucide-react";
import Link from "next/link";

// Helper function to extract text content from JSON konten
const extractTextFromKonten = (konten) => {
  if (!konten) return "No content available";

  try {
    // If konten is string, return it
    if (typeof konten === "string") return konten;

    // If konten is object, try to extract text
    if (typeof konten === "object") {
      // Handle different JSON structures that might be used for content
      if (konten.text) return konten.text;
      if (konten.content) return konten.content;
      if (konten.deskripsi) return konten.deskripsi;
      if (konten.body) return konten.body;

      // If it's an array, join the text
      if (Array.isArray(konten)) {
        return konten
          .map((item) => {
            if (typeof item === "string") return item;
            if (item.text || item.content) return item.text || item.content;
            return "";
          })
          .filter(Boolean)
          .join(" ");
      }

      // Fallback: stringify the object
      return JSON.stringify(konten).substring(0, 200) + "...";
    }

    return String(konten);
  } catch (error) {
    console.error("Error extracting text from konten:", error);
    return "Content unavailable";
  }
};

// Helper function to format date
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return "Date unavailable";
  }
};

// Helper function to get priority styles
const getPriorityStyles = (prioritas) => {
  switch (prioritas) {
    case "HIGH":
      return {
        border: "border-l-4 border-amber-500",
        badge: "bg-amber-100 text-amber-700 border-amber-200",
        icon: "text-amber-500",
        light: "bg-amber-50",
      };
    case "URGENT":
      return {
        border: "border-l-4 border-red-500",
        badge: "bg-red-100 text-red-700 border-red-200",
        icon: "text-red-500",
        light: "bg-red-50",
      };
    case "LOW":
      return {
        border: "border-l-4 border-emerald-500",
        badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
        icon: "text-emerald-500",
        light: "bg-emerald-50",
      };
    default:
      return {
        border: "border-l-4 border-blue-500",
        badge: "bg-blue-100 text-blue-700 border-blue-200",
        icon: "text-blue-500",
        light: "bg-blue-50",
      };
  }
};

export default function UppCard({ pengumuman }) {
  if (!pengumuman) {
    return (
      <div className="max-w-lg mx-auto bg-white/50 backdrop-blur-sm border border-gray-200 shadow-sm rounded-xl overflow-hidden mt-10 p-8 text-center">
        <AlertCircle className="mx-auto mb-4 text-gray-400" size={32} />
        <p className="text-gray-500 font-medium">Belum Ada Pengumuman</p>
      </div>
    );
  }

  const { id, judul, konten, tanggalPengumuman, prioritas, isPinned, jenis, attachments } = pengumuman;

  const description = extractTextFromKonten(konten);
  const formattedDate = formatDate(tanggalPengumuman);
  const truncatedDescription = description.length > 150 ? description.substring(0, 150) + "..." : description;

  const styles = getPriorityStyles(prioritas);

  return (
    <div className="group relative h-full bg-white dark:bg-gray-800 rounded-t-[3rem] rounded-b-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(217,119,6,0.2)] dark:shadow-none dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col border border-gray-100/50 dark:border-gray-700/50 backdrop-blur-sm">

      {/* Arch Header Background */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-amber-50 to-transparent dark:from-amber-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Decorative Top Accent */}
      <div className={`h-2 w-full ${prioritas === 'HIGH' || prioritas === 'URGENT' ? 'bg-red-500' : 'bg-amber-500'}`} />

      {/* Decorative Watermark Icon (Subtle) */}
      <div className="absolute -bottom-8 -right-8 opacity-5 dark:opacity-10 transform -rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-all duration-700 pointer-events-none">
        <Bell className="w-48 h-48 text-gray-900 dark:text-white" />
      </div>

      <div className="p-8 flex flex-col h-full relative z-10">

        {/* Header: Date & Badges */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wide">
            <div className="p-1.5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            {formattedDate}
          </div>

          <div className="flex gap-2">
            {isPinned && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-sm">
                <Pin className="w-3 h-3 mr-1" />
                Pinned
              </span>
            )}
            {/* Priority Badge - Elegant Style */}
            {prioritas !== "LOW" && prioritas !== "MEDIUM" && (
              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${prioritas === 'URGENT'
                ? 'bg-red-50 text-red-600 border-red-200'
                : 'bg-amber-50 text-amber-600 border-amber-200'
                }`}>
                {prioritas}
              </span>
            )}
          </div>
        </div>

        {/* Category Label (if exists) */}
        {jenis && (
          <div className="mb-3">
            <span className="text-amber-600 dark:text-amber-500 text-xs font-bold uppercase tracking-widest">
              {jenis.nama}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2 leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
          <Link href={`/news/${id}`} className="hover:underline decoration-2 underline-offset-4 decoration-current">
            {judul || "Pengumuman Tanpa Judul"}
          </Link>
        </h3>

        {/* Content Preview */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-4 mb-8 flex-grow">
          {truncatedDescription}
        </p>

        {/* Footer Action */}
        <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700/50 flex justify-between items-center relative">
          <Link
            href={`/news/${id}`}
            className="group/btn inline-flex items-center text-sm font-bold text-gray-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            Baca Selengkapnya
            <div className="ml-2 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 group-hover/btn:bg-amber-100 dark:group-hover/btn:bg-amber-900 flex items-center justify-center transition-colors">
              <svg className="w-3 h-3 transform group-hover/btn:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Attachment Indicator */}
          {attachments && attachments.length > 0 && (
            <div className="text-gray-400" title="Ada Lampiran">
              <Info className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
