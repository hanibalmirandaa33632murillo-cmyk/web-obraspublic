import { Sparkles, Layers, TrendingUp, Users, ArrowUpRight, Circle } from 'lucide-react';

export default function DesignProposal3() {
  return (
    <div className="min-h-screen bg-white">
      {/* Decorative Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative">
          {/* Navigation */}
          <nav className="container mx-auto px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Circle className="w-3 h-3 fill-current" />
              <Circle className="w-3 h-3 fill-current text-orange-400" />
              <Circle className="w-3 h-3 fill-current text-green-400" />
              <span className="ml-2 font-bold text-lg">InnovateTech</span>
            </div>
            <div className="flex items-center gap-6 text-white/90">
              <a href="#" className="hover:text-white transition-colors text-sm">Soluciones</a>
              <a href="#" className="hover:text-white transition-colors text-sm">Casos de Uso</a>
              <a href="#" className="hover:text-white transition-colors text-sm">Recursos</a>
              <button className="px-5 py-2 bg-accent rounded-full text-sm font-medium hover:bg-orange-600 transition-all hover:scale-105">
                Contactar
              </button>
            </div>
          </nav>

          {/* Hero */}
          <div className="container mx-auto px-6 py-24 text-white">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-8">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">Propuesta 3: Bold & Dynamic</span>
              </div>
              <h1 className="text-6xl font-bold mb-6 leading-tight">
                Innovación que
                <br />
                transforma
                <span className="text-orange-400"> resultados</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
                Combina tecnología de vanguardia con diseño intuitivo para crear experiencias excepcionales.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-4 bg-white text-primary rounded-full font-medium hover:scale-105 transition-all shadow-xl inline-flex items-center gap-2">
                  Iniciar ahora
                  <ArrowUpRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-medium hover:bg-white/20 transition-all">
                  Ver demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Características</span>
          <h2 className="text-4xl font-bold text-foreground mt-2 mb-4">
            Todo lo que necesitas en un solo lugar
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Diseñado para equipos que buscan eficiencia y resultados medibles
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl transform group-hover:scale-105 transition-transform"></div>
            <div className="relative bg-white rounded-3xl p-8 border border-blue-100 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Arquitectura Modular</h3>
              <p className="text-muted-foreground leading-relaxed">
                Componentes reutilizables que se adaptan a tus necesidades específicas.
              </p>
            </div>
          </div>

          {/* Feature Card 2 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-50 rounded-3xl transform group-hover:scale-105 transition-transform"></div>
            <div className="relative bg-white rounded-3xl p-8 border border-orange-100 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Crecimiento Continuo</h3>
              <p className="text-muted-foreground leading-relaxed">
                Analytics en tiempo real para tomar decisiones basadas en datos.
              </p>
            </div>
          </div>

          {/* Feature Card 3 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-50 rounded-3xl transform group-hover:scale-105 transition-transform"></div>
            <div className="relative bg-white rounded-3xl p-8 border border-green-100 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Colaboración Real</h3>
              <p className="text-muted-foreground leading-relaxed">
                Trabaja en equipo sin fricciones con herramientas colaborativas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-16 text-center">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-1/4 w-64 h-64 bg-orange-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-green-500 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-4">
              ¿Listo para comenzar?
            </h2>
            <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
              Únete a cientos de equipos que ya están transformando su forma de trabajar
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-orange-600 transition-all hover:scale-105 shadow-xl">
                Empezar gratis
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-medium hover:bg-white/20 transition-all">
                Agendar demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
