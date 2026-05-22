import { MapPin, Wallet, FileCheck, Calendar, CalendarCheck, Users, DollarSign, TrendingUp } from 'lucide-react';

export default function InformacionObra() {
  const infoCards = [
    {
      icon: MapPin,
      title: 'Región',
      value: 'Zona Centro',
      detail: 'Temascaltepec Centro',
      color: 'cyan',
      bgColor: 'bg-cyan-50',
      iconColor: 'text-cyan-600'
    },
    {
      icon: Wallet,
      title: 'Fuente de Financiamiento',
      value: 'FISM 2024',
      detail: 'Federal Infraestructura Social',
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: FileCheck,
      title: 'Permisos',
      value: 'Aprobados',
      detail: '5 de 5 autorizaciones',
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: Calendar,
      title: 'Fecha de Inicio',
      value: '15 Marzo 2024',
      detail: 'Inicio de construcción',
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: CalendarCheck,
      title: 'Fecha de Término',
      value: '30 Junio 2024',
      detail: 'Entrega programada',
      color: 'orange',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      icon: Users,
      title: 'Beneficiarios',
      value: '1,250',
      detail: 'Habitantes directos',
      color: 'pink',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600'
    },
    {
      icon: DollarSign,
      title: 'Presupuesto',
      value: '$2,450,000',
      detail: 'MXN Total autorizado',
      color: 'emerald',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      icon: TrendingUp,
      title: 'Estado de Avance',
      value: '67%',
      detail: 'Progreso actual',
      color: 'teal',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">Información Detallada</span>
          <h2 className="text-4xl font-bold text-slate-900 mt-3 mb-4">
            Datos de Obra Pública
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Toda la información relevante centralizada y accesible en un solo lugar
          </p>
        </div>

        {/* Featured Obra */}
        <div className="mb-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-block px-3 py-1 bg-cyan-500 rounded-full text-xs font-bold mb-3">
                EN PROGRESO
              </div>
              <h3 className="text-2xl font-bold mb-2">
                Pavimentación de Av. Benito Juárez
              </h3>
              <p className="text-gray-300">
                Obra de infraestructura vial - Ejercicio fiscal 2024
              </p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-medium transition-colors">
                Ver Detalles
              </button>
              <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-medium transition-colors">
                Descargar
              </button>
            </div>
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {infoCards.map((card, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-cyan-300 group"
            >
              <div className={`w-12 h-12 ${card.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                {card.title}
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">
                {card.value}
              </div>
              <div className="text-sm text-gray-600">
                {card.detail}
              </div>

              {/* Progress bar for Estado de Avance */}
              {card.title === 'Estado de Avance' && (
                <div className="mt-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full" style={{width: '67%'}}></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Details Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
            <h4 className="font-bold text-slate-900 mb-3">Especificaciones Técnicas</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                Longitud: 1.2 km
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                Ancho: 8 metros
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                Material: Concreto hidráulico
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <h4 className="font-bold text-slate-900 mb-3">Documentación</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                Proyecto ejecutivo aprobado
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                Acta de cabildo 045/2024
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                Contrato de obra firmado
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <h4 className="font-bold text-slate-900 mb-3">Estado Actual</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                Supervisión activa
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                Sin retrasos reportados
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                Última inspección: 18 May
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
