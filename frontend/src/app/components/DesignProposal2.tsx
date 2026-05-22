import { Code2, Database, Shield, ChevronRight, Star } from 'lucide-react';

export default function DesignProposal2() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 px-6 text-sm text-center">
        Propuesta 2: Tech & Professional - Estilo Dashboard
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg"></div>
            <span className="font-bold text-lg">EngineeringHub</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm text-foreground hover:text-primary font-medium transition-colors">Dashboard</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Proyectos</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Equipo</a>
            <button className="px-5 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
              Acción Principal
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Hero Cards */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm mb-4">
                <Star className="w-4 h-4 fill-current" />
                Destacado
              </div>
              <h2 className="text-3xl font-bold mb-4">Sistema Completo de Ingeniería</h2>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Plataforma integral para gestionar proyectos técnicos con herramientas profesionales.
              </p>
              <button className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
                Explorar
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-rows-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-border flex items-center gap-6 hover:border-primary transition-all">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Code2 className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Desarrollo Ágil</h3>
                <p className="text-sm text-muted-foreground">Metodologías modernas implementadas</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-border flex items-center gap-6 hover:border-primary transition-all">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Seguro y Confiable</h3>
                <p className="text-sm text-muted-foreground">Protección de datos garantizada</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Tabs */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="border-b border-border bg-slate-50 px-6 py-4">
            <h3 className="font-semibold text-lg">Características Principales</h3>
          </div>
          <div className="grid md:grid-cols-3 divide-x divide-border">
            <div className="p-8 hover:bg-blue-50 transition-colors cursor-pointer">
              <Database className="w-10 h-10 text-primary mb-4" />
              <h4 className="font-semibold mb-2">Base de Datos</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Gestión eficiente de información con tecnología de punta.
              </p>
              <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                Ver detalles
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
            <div className="p-8 hover:bg-blue-50 transition-colors cursor-pointer">
              <Code2 className="w-10 h-10 text-primary mb-4" />
              <h4 className="font-semibold mb-2">Desarrollo</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Herramientas completas para el ciclo de desarrollo.
              </p>
              <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                Ver detalles
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
            <div className="p-8 hover:bg-blue-50 transition-colors cursor-pointer">
              <Shield className="w-10 h-10 text-primary mb-4" />
              <h4 className="font-semibold mb-2">Seguridad</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Protocolos avanzados para proteger tu proyecto.
              </p>
              <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                Ver detalles
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mt-12">
          <div className="bg-white rounded-xl p-6 border border-border text-center">
            <div className="text-4xl font-bold text-primary mb-1">156</div>
            <div className="text-sm text-muted-foreground">Proyectos Activos</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-border text-center">
            <div className="text-4xl font-bold text-accent mb-1">98%</div>
            <div className="text-sm text-muted-foreground">Tasa de Éxito</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-border text-center">
            <div className="text-4xl font-bold text-green-600 mb-1">45</div>
            <div className="text-sm text-muted-foreground">Miembros del Equipo</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-border text-center">
            <div className="text-4xl font-bold text-purple-600 mb-1">24h</div>
            <div className="text-sm text-muted-foreground">Tiempo de Respuesta</div>
          </div>
        </div>
      </div>
    </div>
  );
}
