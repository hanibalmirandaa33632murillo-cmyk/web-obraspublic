import { AlertCircle, Clock, FileX2, TrendingDown, Search, Copy, FileWarning, Database } from 'lucide-react';

export default function ProblemaActual() {
  return (
    <section id="problema" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">Problemática Actual</span>
          <h2 className="text-4xl font-bold text-slate-900 mt-3 mb-4">
            Desafíos del Modelo Tradicional
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            El manejo manual y físico de documentos genera ineficiencias en la gestión de obras públicas
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Description */}
          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-red-500" />
                Problemas Identificados
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>Manejo excesivo de documentos físicos que ocupan espacio y recursos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>Dificultad para buscar y acceder rápidamente a información histórica</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>Problemas de escalabilidad conforme crece el volumen de obras</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>Auditorías lentas y procesos de revisión prolongados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>Desperdicio de recursos humanos y materiales</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl text-white">
              <h4 className="text-xl font-bold mb-4">Impacto Operacional</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <TrendingDown className="w-8 h-8 text-red-400 mb-2" />
                  <div className="text-2xl font-bold">-45%</div>
                  <div className="text-sm text-gray-300">Productividad</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Clock className="w-8 h-8 text-yellow-400 mb-2" />
                  <div className="text-2xl font-bold">72h</div>
                  <div className="text-sm text-gray-300">Tiempo búsqueda</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Problems */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-red-300">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <Search className="w-7 h-7 text-red-600" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Búsqueda Lenta</h4>
              <p className="text-sm text-gray-600">
                Localizar documentos puede tomar horas o días completos
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 h-2 bg-red-200 rounded-full">
                  <div className="w-1/4 h-full bg-red-500 rounded-full"></div>
                </div>
                <span className="text-xs text-red-600 font-medium">25%</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-orange-300">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <Copy className="w-7 h-7 text-orange-600" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Duplicidad de Información</h4>
              <p className="text-sm text-gray-600">
                Múltiples copias físicas generan inconsistencias
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 h-2 bg-orange-200 rounded-full">
                  <div className="w-3/4 h-full bg-orange-500 rounded-full"></div>
                </div>
                <span className="text-xs text-orange-600 font-medium">75%</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-yellow-300">
              <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                <FileWarning className="w-7 h-7 text-yellow-600" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Procesos Manuales</h4>
              <p className="text-sm text-gray-600">
                Tareas repetitivas que podrían automatizarse
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 h-2 bg-yellow-200 rounded-full">
                  <div className="w-5/6 h-full bg-yellow-500 rounded-full"></div>
                </div>
                <span className="text-xs text-yellow-600 font-medium">85%</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-purple-300">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Database className="w-7 h-7 text-purple-600" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Bajo Aprovechamiento Tecnológico</h4>
              <p className="text-sm text-gray-600">
                Falta de herramientas digitales modernas
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 h-2 bg-purple-200 rounded-full">
                  <div className="w-1/5 h-full bg-purple-500 rounded-full"></div>
                </div>
                <span className="text-xs text-purple-600 font-medium">20%</span>
              </div>
            </div>

            {/* Archivero Visual */}
            <div className="col-span-2 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-8 border-2 border-dashed border-gray-400">
              <div className="flex items-center justify-center gap-4">
                <FileX2 className="w-16 h-16 text-gray-500" />
                <div>
                  <div className="text-lg font-bold text-gray-700 mb-1">Archivos Físicos Acumulados</div>
                  <div className="text-sm text-gray-600">Miles de documentos sin clasificación digital</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-5 gap-2">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-400 rounded opacity-60"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
