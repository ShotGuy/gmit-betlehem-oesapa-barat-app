import { Calendar, Clock, MapPin, Mic } from "lucide-react";

export default function ScheduleCard({
  title,
  date,
  time,
  location,
  speaker,
  tema,
  firman,
  jenisIbadah,
  rayon,
  category = "sunday" // "sunday", "family", or "cell"
}) {
  const isSunday = category === "sunday";

  return (
    <div className={`group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full flex flex-col ${isSunday ? 'border-t-4 border-t-amber-500' : ''}`}>

      {/* Top Decor (Arch Curve for Sunday items) */}
      {isSunday && (
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-400 to-amber-600" />
      )}

      <div className="p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${isSunday ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
              {jenisIbadah || "Ibadah"}
            </span>
            {rayon && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                {rayon}
              </span>
            )}
          </div>
          <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-amber-600 transition-colors">
            {title}
          </h3>
        </div>

        {/* Details List */}
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 flex-1">
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 mt-0.5 text-gray-400" />
            <span className="font-medium">{date || 'Jadwal Rutin'}</span>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 mt-0.5 text-amber-500" />
            <span className="font-medium text-gray-900 dark:text-gray-100">{time || 'Waktu Menyesuaikan'}</span>
          </div>

          {(location || speaker) && (
            <div className="pt-2 border-t border-gray-100 dark:border-gray-700 mt-2 space-y-2">
              {location && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>{location}</span>
                </div>
              )}
              {speaker && (
                <div className="flex items-start gap-3">
                  <Mic className="w-4 h-4 mt-0.5 text-gray-400" />
                  <span>{speaker}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Theme/Sermon Footer */}
        {tema && (
          <div className="mt-5 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 italic text-sm text-gray-600 dark:text-gray-300">
            "{tema}"
          </div>
        )}
      </div>
    </div>
  );
}
