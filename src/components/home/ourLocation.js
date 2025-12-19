import { Mail, MapPin } from "lucide-react";

export default function OurLocation() {
  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-500 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-amber-600 uppercase bg-amber-100 dark:bg-amber-900/20 rounded-full">
              Lokasi & Kontak
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Datang & Beribadah <br />
              <span className="text-amber-500">Bersama Kami</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
              Kami menantikan kehadiran Anda. Gereja kami terletak strategis di Oesapa Barat, menjadi rumah doa bagi semua bangsa.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg text-amber-600 dark:text-amber-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Alamat Lengkap</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    Jln. Soverdi, Oesapa Barat, Kec. Kelapa Lima<br />
                    Kota Kupang, Nusa Tenggara Timur
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Hubungi Kami</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    info@gmitjbob.org<br />
                    (0380) 1234567
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Card */}
          <div className="order-1 lg:order-2">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 ring-1 ring-gray-200 dark:ring-gray-700">
              <iframe
                allowFullScreen=""
                className="w-full h-[400px] lg:h-[500px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.4203793668125!2d123.62715267487363!3d-10.14984678996333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2c56833a1bc16a89%3A0x562f5e0fe5a7835!2sGMIT%20Jemaat%20Betlehem%20Oesapa%20Barat!5e1!3m2!1sid!2sid"
                style={{ border: 0 }}
              />

              {/* Floating Badge on Map */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl shadow-lg border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-amber-500 uppercase tracking-wider">Google Maps</p>
                    <p className="font-bold text-gray-900 dark:text-white">GMIT Betlehem Oesapa Barat</p>
                  </div>
                  <a
                    href="https://goo.gl/maps/XYZ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-circle btn-primary text-white"
                  >
                    <MapPin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
