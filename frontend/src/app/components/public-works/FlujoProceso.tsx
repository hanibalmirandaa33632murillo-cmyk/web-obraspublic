import { Users, Clipboard, Building, Award, DollarSign, Eye, FileText, CheckCircle2 } from 'lucide-react';

export default function FlujoProceso() {
  const steps = [
    {
      icon: Users,
      title: 'Solicitud Ciudadana',
      description: 'Registro de necesidades comunitarias',
      color: 'cyan'
    },
    {
      icon: Clipboard,
      title: 'Evaluación del Cabildo',
      description: 'Análisis y aprobación de viabilidad',
      color: 'blue'
    },
    {
      icon: Building,
      title: 'Definición de Obra',
      description: 'Especificaciones técnicas y alcance',
      color: 'purple'
    },
    {
      icon: Award,
      title: 'Concurso de Constructoras',
      description: 'Licitación y selección de empresa',
      color: 'orange'
    },
    {
      icon: DollarSign,
      title: 'Presupuesto',
      description: 'Asignación y control financiero',
      color: 'green'
    },
    {
      icon: Eye,
      title: 'Supervisión',
      description: 'Monitoreo continuo de avances',
      color: 'yellow'
    },
    {
      icon: FileText,
      title: 'Informes',
      description: 'Reportes periódicos de progreso',
      color: 'pink'
    },
    {
      icon: CheckCircle2,
      title: 'Acta de Entrega',
      description: 'Finalización y entrega oficial',
      color: 'teal'
    }
  ];

  const colorClasses = {
    cyan: { bg: 'bg-cyan-500', light: 'bg-cyan-100', text: 'text-cyan-600', ring: 'ring-cyan-500/20' },
    blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600', ring: 'ring-blue-500/20' },
    purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600', ring: 'ring-purple-500/20' },
    orange: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-600', ring: 'ring-orange-500/20' },
    green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600', ring: 'ring-green-500/20' },
    yellow: { bg: 'bg-yellow-500', light: 'bg-yellow-100', text: 'text-yellow-600', ring: 'ring-yellow-500/20' },
    pink: { bg: 'bg-pink-500', light: 'bg-pink-100', text: 'text-pink-600', ring: 'ring-pink-500/20' },
    teal: { bg: 'bg-teal-500', light: 'bg-teal-100', text: 'text-teal-600', ring: 'ring-teal-500/20' }
  };

  return (
    <section id="proceso" className="py-24 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">Flujo Operativo</span>
          <h2 className="text-4xl font-bold text-slate-900 mt-3 mb-4">
            Proceso de Gestión de Obras
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Desde la solicitud inicial hasta la entrega final, cada etapa está digitalizada y monitoreada
          </p>
        </div>

        {/* Timeline Desktop */}
        <div className="hidden lg:block relative">
          {/* Connecting Line */}
          <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-cyan-300 via-purple-300 to-teal-300 opacity-30"></div>

          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const colors = colorClasses[step.color as keyof typeof colorClasses];
              return (
                <div key={index} className="relative group">
                  {/* Connection Node */}
                  <div className="absolute top-24 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-4 border-cyan-500 rounded-full z-10"></div>

                  {/* Card */}
                  <div className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border border-gray-200 hover:border-${step.color}-300 mt-32 ring-4 ${colors.ring} hover:ring-8`}>
                    <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="absolute -top-8 left-0 right-0 text-center">
                        <span className="inline-block px-3 py-1 bg-slate-800 text-white text-xs font-bold rounded-full">
                          {index + 1}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Mobile */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => {
            const colors = colorClasses[step.color as keyof typeof colorClasses];
            return (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-cyan-300 to-purple-300 my-2"></div>
                  )}
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm flex-1 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block w-6 h-6 bg-slate-800 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                    <h3 className="font-bold text-slate-900">{step.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-cyan-200 shadow-sm">
            <div className="text-3xl font-bold text-cyan-600 mb-2">100%</div>
            <div className="text-slate-900 font-medium mb-1">Digital</div>
            <div className="text-sm text-gray-600">Proceso completamente digitalizado</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-purple-200 shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
            <div className="text-slate-900 font-medium mb-1">Etapas</div>
            <div className="text-sm text-gray-600">Fases del ciclo de vida de obras</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-green-200 shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-2">Real-time</div>
            <div className="text-slate-900 font-medium mb-1">Monitoreo</div>
            <div className="text-sm text-gray-600">Seguimiento en tiempo real</div>
          </div>
        </div>
      </div>
    </section>
  );
}
