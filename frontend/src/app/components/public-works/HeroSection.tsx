import { Building2, BarChart3, FileText, MapPin } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 opacity-20">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1774929108861-3eeb61a97be6?q=80&w=1080"
          alt="Construcción e infraestructura"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/95"></div>

      {/* Navbar */}
      <nav className="relative z-20 container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-white text-lg">SIGOP</div>
              <div className="text-xs text-cyan-400">Temascaltepec</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <a href="#problema" className="hover:text-cyan-400 transition-colors">Problema</a>
            <a href="#proceso" className="hover:text-cyan-400 transition-colors">Proceso</a>
            <a href="#dashboard" className="hover:text-cyan-400 transition-colors">Dashboard</a>
            <a href="#modelo" className="hover:text-cyan-400 transition-colors">Modelo</a>
            <a href="#roles" className="hover:text-cyan-400 transition-colors">Roles</a>
          </div>
          <button className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all font-medium text-sm">
            Acceder
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium">
              Gobierno Digital • Temascaltepec
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Sistema Integral de Gestión de
              <span className="text-cyan-400"> Obras Públicas</span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              Plataforma digital para administración, supervisión y auditoría de obras públicas municipales.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all font-medium shadow-lg shadow-cyan-500/20">
                Ver Proyecto
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all font-medium">
                Explorar Modelo
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">156</div>
                <div className="text-sm text-gray-400">Obras Activas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">98%</div>
                <div className="text-sm text-gray-400">Eficiencia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">24/7</div>
                <div className="text-sm text-gray-400">Disponible</div>
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard Mockup */}
          <div className="relative">
            {/* Main Dashboard Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold">Dashboard de Obras</h3>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Mini Chart */}
              <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
                <div className="flex items-end gap-2 h-32">
                  <div className="w-full bg-cyan-500/30 rounded-t" style={{height: '45%'}}></div>
                  <div className="w-full bg-cyan-500/50 rounded-t" style={{height: '70%'}}></div>
                  <div className="w-full bg-cyan-500 rounded-t" style={{height: '100%'}}></div>
                  <div className="w-full bg-cyan-500/60 rounded-t" style={{height: '85%'}}></div>
                  <div className="w-full bg-cyan-500/40 rounded-t" style={{height: '55%'}}></div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-gray-400">Presupuesto</span>
                  </div>
                  <div className="text-lg font-bold text-white">$12.5M</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-gray-400">Informes</span>
                  </div>
                  <div className="text-lg font-bold text-white">234</div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-500/20 rounded-2xl backdrop-blur-xl border border-cyan-500/30 flex items-center justify-center">
              <MapPin className="w-10 h-10 text-cyan-400" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-32 h-20 bg-purple-500/20 rounded-xl backdrop-blur-xl border border-purple-500/30 flex items-center justify-center px-4">
              <div className="text-center">
                <div className="text-xl font-bold text-white">89%</div>
                <div className="text-xs text-purple-300">Avance</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
