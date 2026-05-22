import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Column 1 - Branding */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="font-bold text-xl">SIGOP</div>
                <div className="text-sm text-cyan-400">Sistema Integral de Gestión de Obras Públicas</div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Plataforma digital desarrollada para la Dirección de Obras Públicas del Municipio de Temascaltepec,
              Estado de México. Transformando la gestión gubernamental mediante tecnología e innovación.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-cyan-500 rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-cyan-500 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-cyan-500 rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-cyan-500 rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Enlaces Rápidos</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#problema" className="hover:text-cyan-400 transition-colors">Problemática</a>
              </li>
              <li>
                <a href="#proceso" className="hover:text-cyan-400 transition-colors">Proceso de Obras</a>
              </li>
              <li>
                <a href="#dashboard" className="hover:text-cyan-400 transition-colors">Dashboard</a>
              </li>
              <li>
                <a href="#modelo" className="hover:text-cyan-400 transition-colors">Modelo de Datos</a>
              </li>
              <li>
                <a href="#roles" className="hover:text-cyan-400 transition-colors">Roles de Usuario</a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Contacto</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  Dirección de Obras Públicas<br />
                  Palacio Municipal, Temascaltepec<br />
                  Estado de México, C.P. 51300
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span className="text-sm">(722) 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span className="text-sm">obras@temascaltepec.gob.mx</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
            <div>
              <p>
                &copy; 2024 Municipio de Temascaltepec. Todos los derechos reservados.
              </p>
            </div>
            <div className="md:text-right space-x-6">
              <a href="#" className="hover:text-cyan-400 transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Términos de Uso</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Ayuda</a>
            </div>
          </div>

          {/* Credits */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-xs text-gray-500">
              <span>Desarrollado con</span>
              <span className="text-cyan-400">React</span>
              <span>+</span>
              <span className="text-cyan-400">TypeScript</span>
              <span>+</span>
              <span className="text-cyan-400">PostgreSQL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
