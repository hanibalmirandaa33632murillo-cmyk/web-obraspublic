import { Building2, CheckCircle2, XCircle, Clock, Award, TrendingUp, Calendar } from 'lucide-react';

export default function ConcursoConstructoras() {
  const constructoras = [
    {
      name: 'Constructora Infraestructura del Valle S.A.',
      status: 'approved',
      score: 95,
      cost: '$2,350,000',
      experience: '15 años',
      estimatedTime: '90 días',
      projects: 45,
      rating: 4.8
    },
    {
      name: 'Obras y Proyectos del Centro',
      status: 'pending',
      score: 82,
      cost: '$2,680,000',
      experience: '8 años',
      estimatedTime: '105 días',
      projects: 28,
      rating: 4.3
    },
    {
      name: 'Construcciones Rápidas Express',
      status: 'rejected',
      score: 68,
      cost: '$2,120,000',
      experience: '4 años',
      estimatedTime: '120 días',
      projects: 12,
      rating: 3.9
    }
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          label: 'Seleccionada',
          color: 'green',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-500',
          textColor: 'text-green-700',
          icon: CheckCircle2
        };
      case 'pending':
        return {
          label: 'En Evaluación',
          color: 'yellow',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-500',
          textColor: 'text-yellow-700',
          icon: Clock
        };
      case 'rejected':
        return {
          label: 'No Seleccionada',
          color: 'red',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-500',
          textColor: 'text-red-700',
          icon: XCircle
        };
      default:
        return {
          label: 'Pendiente',
          color: 'gray',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-500',
          textColor: 'text-gray-700',
          icon: Clock
        };
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-slate-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">Proceso de Licitación</span>
          <h2 className="text-4xl font-bold text-slate-900 mt-3 mb-4">
            Concurso de Constructoras
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Comparación transparente de propuestas para selección de empresa contratista
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {constructoras.map((constructora, index) => {
            const statusConfig = getStatusConfig(constructora.status);
            const isSelected = constructora.status === 'approved';

            return (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg transition-all ${
                  isSelected
                    ? 'ring-4 ring-green-500/30 border-2 border-green-500 scale-105'
                    : 'border border-gray-200 hover:shadow-xl'
                }`}
              >
                {/* Header */}
                <div className={`${statusConfig.bgColor} rounded-t-2xl p-6 border-b-2 ${statusConfig.borderColor}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-lg mb-2">
                        {constructora.name}
                      </h3>
                    </div>
                    {isSelected && (
                      <Award className="w-8 h-8 text-yellow-500 flex-shrink-0" />
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <statusConfig.icon className={`w-5 h-5 ${statusConfig.textColor}`} />
                    <span className={`font-bold text-sm ${statusConfig.textColor}`}>
                      {statusConfig.label}
                    </span>
                  </div>
                </div>

                {/* Score */}
                <div className="p-6 border-b border-gray-100">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-2">Calificación Final</div>
                    <div className="text-5xl font-bold text-slate-900 mb-3">
                      {constructora.score}
                      <span className="text-2xl text-gray-400">/100</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          constructora.score >= 90 ? 'bg-green-500' :
                          constructora.score >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{width: `${constructora.score}%`}}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Costo Propuesto:</span>
                    <span className="font-bold text-slate-900">{constructora.cost}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Experiencia:</span>
                    <span className="font-semibold text-slate-900">{constructora.experience}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tiempo Estimado:</span>
                    <span className="font-semibold text-slate-900">{constructora.estimatedTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Proyectos Previos:</span>
                    <span className="font-semibold text-slate-900">{constructora.projects}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Rating:</span>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-slate-900">{constructora.rating}</span>
                      <span className="text-yellow-500">★</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="p-6 pt-0">
                  <button
                    className={`w-full py-3 rounded-lg font-medium transition-all ${
                      isSelected
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {isSelected ? 'Empresa Seleccionada' : 'Ver Propuesta Completa'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Criteria Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Building2 className="w-7 h-7 text-cyan-500" />
            Criterios de Evaluación
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <div className="font-bold text-slate-900 mb-1">Experiencia</div>
                <div className="text-sm text-gray-600">30% del puntaje</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold">$</span>
              </div>
              <div>
                <div className="font-bold text-slate-900 mb-1">Precio</div>
                <div className="text-sm text-gray-600">35% del puntaje</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="font-bold text-slate-900 mb-1">Tiempo</div>
                <div className="text-sm text-gray-600">20% del puntaje</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="font-bold text-slate-900 mb-1">Calidad</div>
                <div className="text-sm text-gray-600">15% del puntaje</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
