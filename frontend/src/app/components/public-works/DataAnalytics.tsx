import { BarChart3, TrendingUp, Zap, Brain, Target, Globe } from 'lucide-react';

export default function DataAnalytics() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Inteligencia de Datos</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
            Transformando la Administración Pública mediante
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Arquitectura de Datos y Análisis Inteligente
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Decisiones basadas en datos en tiempo real para optimización continua de recursos públicos
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="group">
            <div className="bg-white/5 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 hover:bg-white/10 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Dashboards Interactivos</h3>
              <p className="text-gray-400 leading-relaxed">
                Visualización en tiempo real de métricas clave de todas las obras en curso
              </p>
            </div>
          </div>

          <div className="group">
            <div className="bg-white/5 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 hover:bg-white/10 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Auditorías Inteligentes</h3>
              <p className="text-gray-400 leading-relaxed">
                Detección automática de anomalías y análisis predictivo de riesgos
              </p>
            </div>
          </div>

          <div className="group">
            <div className="bg-white/5 backdrop-blur-xl border border-green-500/30 rounded-2xl p-8 hover:bg-white/10 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Automatización</h3>
              <p className="text-gray-400 leading-relaxed">
                Generación automática de reportes y alertas proactivas
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Visual */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Left Panel */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-7 h-7 text-cyan-400" />
              <h3 className="text-2xl font-bold text-white">Análisis de Tendencias</h3>
            </div>

            {/* Simulated Chart Bars */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm">Eficiencia Operativa</span>
                  <span className="text-cyan-400 font-bold">94%</span>
                </div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{width: '94%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm">Cumplimiento de Plazos</span>
                  <span className="text-green-400 font-bold">87%</span>
                </div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{width: '87%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm">Transparencia</span>
                  <span className="text-purple-400 font-bold">100%</span>
                </div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{width: '100%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm">Satisfacción Ciudadana</span>
                  <span className="text-orange-400 font-bold">92%</span>
                </div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{width: '92%'}}></div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
                <div className="text-3xl font-bold text-cyan-400 mb-1">2.5M</div>
                <div className="text-xs text-gray-400">Registros Procesados</div>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                <div className="text-3xl font-bold text-purple-400 mb-1">99.9%</div>
                <div className="text-xs text-gray-400">Precisión de Datos</div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-8">
            {/* Power BI */}
            <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-3xl p-8 text-white shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Power BI Integration</h3>
                  <p className="text-sm text-yellow-100">Business Intelligence avanzado</p>
                </div>
                <Target className="w-12 h-12 opacity-80" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <div className="font-bold mb-1">156</div>
                  <div className="text-xs text-yellow-100">Reportes Activos</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <div className="font-bold mb-1">24/7</div>
                  <div className="text-xs text-yellow-100">Actualización</div>
                </div>
              </div>
            </div>

            {/* Real-time Processing */}
            <div className="bg-white/5 backdrop-blur-xl border border-green-500/30 rounded-2xl p-8">
              <Globe className="w-10 h-10 text-green-400 mb-4" />
              <h4 className="text-xl font-bold text-white mb-3">Procesamiento en Tiempo Real</h4>
              <p className="text-gray-400 mb-4">
                Stream processing para análisis instantáneo de datos entrantes
              </p>
              <div className="flex gap-2">
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-green-400 text-xs font-bold">LIVE</span>
              </div>
            </div>

            {/* Data Pipeline */}
            <div className="bg-white/5 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
              <h4 className="text-white font-bold mb-4">Pipeline de Datos</h4>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="px-3 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 font-mono">
                  Ingest
                </div>
                <div className="w-4 h-0.5 bg-blue-500"></div>
                <div className="px-3 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 font-mono">
                  Transform
                </div>
                <div className="w-4 h-0.5 bg-purple-500"></div>
                <div className="px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 font-mono">
                  Analyze
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4 text-white">
            <Zap className="w-6 h-6 text-cyan-400" />
            <span className="font-semibold">Impulsando la transparencia y eficiencia gubernamental</span>
          </div>
        </div>
      </div>
    </section>
  );
}
