import { Rocket, Zap, Target, ArrowRight } from 'lucide-react';

export default function DesignProposal1() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="font-semibold text-xl text-foreground">TechProject</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Inicio</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Características</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contacto</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-2 bg-orange-100 text-accent rounded-full text-sm font-medium">
            Propuesta 1: Clean & Modern
          </div>
          <h1 className="text-6xl font-bold text-foreground leading-tight">
            Diseño Minimalista
            <br />
            <span className="text-primary">con Impacto Visual</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interfaz limpia y moderna que combina azules profesionales con acentos naranjas para destacar elementos clave.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-4 bg-primary text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 font-medium flex items-center gap-2">
              Comenzar
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white text-foreground rounded-xl hover:bg-gray-50 transition-all border border-border font-medium">
              Ver más
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all border border-border group">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
              <Zap className="w-7 h-7 text-primary group-hover:text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Rápido</h3>
            <p className="text-muted-foreground leading-relaxed">
              Optimizado para rendimiento y velocidad excepcional en todas las operaciones.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all border border-border group">
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:scale-110 transition-all">
              <Target className="w-7 h-7 text-accent group-hover:text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Preciso</h3>
            <p className="text-muted-foreground leading-relaxed">
              Enfocado en resultados exactos y soluciones que cumplen tus objetivos.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all border border-border group">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:scale-110 transition-all">
              <Rocket className="w-7 h-7 text-green-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Escalable</h3>
            <p className="text-muted-foreground leading-relaxed">
              Diseñado para crecer contigo sin comprometer la calidad.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-12 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">99%</div>
              <div className="text-blue-100">Satisfacción</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Disponibilidad</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Usuarios Activos</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
