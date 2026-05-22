import { Database, GitBranch } from 'lucide-react';

export default function ModeloER() {
  const entities = [
    { id: 'obras', name: 'Obras', x: 50, y: 50, color: 'cyan' },
    { id: 'constructora', name: 'Constructora', x: 250, y: 50, color: 'blue' },
    { id: 'supervisor', name: 'Supervisor', x: 450, y: 50, color: 'purple' },
    { id: 'region', name: 'Región', x: 50, y: 200, color: 'green' },
    { id: 'informe', name: 'Informe', x: 250, y: 200, color: 'orange' },
    { id: 'permiso', name: 'Permiso', x: 450, y: 200, color: 'pink' },
    { id: 'acta', name: 'Acta de Entrega', x: 150, y: 350, color: 'teal' },
    { id: 'presupuesto', name: 'Presupuesto', x: 350, y: 350, color: 'yellow' },
    { id: 'costos', name: 'Costos', x: 250, y: 500, color: 'red' }
  ];

  const connections = [
    { from: 'obras', to: 'constructora', label: '1:N' },
    { from: 'obras', to: 'supervisor', label: '1:N' },
    { from: 'obras', to: 'region', label: 'N:1' },
    { from: 'obras', to: 'informe', label: '1:N' },
    { from: 'obras', to: 'permiso', label: '1:N' },
    { from: 'obras', to: 'acta', label: '1:1' },
    { from: 'obras', to: 'presupuesto', label: '1:1' },
    { from: 'presupuesto', to: 'costos', label: '1:N' }
  ];

  const colorClasses: Record<string, { bg: string; border: string; glow: string }> = {
    cyan: { bg: 'bg-cyan-500', border: 'border-cyan-500', glow: 'shadow-cyan-500/50' },
    blue: { bg: 'bg-blue-500', border: 'border-blue-500', glow: 'shadow-blue-500/50' },
    purple: { bg: 'bg-purple-500', border: 'border-purple-500', glow: 'shadow-purple-500/50' },
    green: { bg: 'bg-green-500', border: 'border-green-500', glow: 'shadow-green-500/50' },
    orange: { bg: 'bg-orange-500', border: 'border-orange-500', glow: 'shadow-orange-500/50' },
    pink: { bg: 'bg-pink-500', border: 'border-pink-500', glow: 'shadow-pink-500/50' },
    teal: { bg: 'bg-teal-500', border: 'border-teal-500', glow: 'shadow-teal-500/50' },
    yellow: { bg: 'bg-yellow-500', border: 'border-yellow-500', glow: 'shadow-yellow-500/50' },
    red: { bg: 'bg-red-500', border: 'border-red-500', glow: 'shadow-red-500/50' }
  };

  return (
    <section id="modelo" className="py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Arquitectura de Datos</span>
          <h2 className="text-4xl font-bold text-white mt-3 mb-4">
            Modelo Entidad-Relación
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Estructura de base de datos diseñada para gestión integral de obras públicas
          </p>
        </div>

        {/* ER Diagram Container */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-12 shadow-2xl shadow-cyan-500/10">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Database className="w-8 h-8 text-cyan-400" />
              <h3 className="text-xl font-bold text-white">Esquema de Base de Datos</h3>
            </div>
            <div className="flex items-center gap-3">
              <GitBranch className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400 text-sm">9 Entidades • 8 Relaciones</span>
            </div>
          </div>

          {/* Simplified Grid Layout */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Row 1 */}
            <div className="space-y-4">
              <div className={`bg-slate-800/80 border-2 ${colorClasses.cyan.border} rounded-xl p-6 ${colorClasses.cyan.glow} shadow-lg hover:scale-105 transition-transform`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-3 h-3 ${colorClasses.cyan.bg} rounded-full`}></div>
                  <h4 className="text-white font-bold">Obras</h4>
                </div>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• id_obra (PK)</div>
                  <div>• nombre</div>
                  <div>• descripcion</div>
                  <div>• estado</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className={`bg-slate-800/80 border-2 ${colorClasses.blue.border} rounded-xl p-6 ${colorClasses.blue.glow} shadow-lg hover:scale-105 transition-transform`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-3 h-3 ${colorClasses.blue.bg} rounded-full`}></div>
                  <h4 className="text-white font-bold">Constructora</h4>
                </div>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• id_constructora (PK)</div>
                  <div>• razon_social</div>
                  <div>• rfc</div>
                  <div>• contacto</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className={`bg-slate-800/80 border-2 ${colorClasses.purple.border} rounded-xl p-6 ${colorClasses.purple.glow} shadow-lg hover:scale-105 transition-transform`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-3 h-3 ${colorClasses.purple.bg} rounded-full`}></div>
                  <h4 className="text-white font-bold">Supervisor</h4>
                </div>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• id_supervisor (PK)</div>
                  <div>• nombre</div>
                  <div>• especialidad</div>
                  <div>• telefono</div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="space-y-4">
              <div className={`bg-slate-800/80 border-2 ${colorClasses.green.border} rounded-xl p-6 ${colorClasses.green.glow} shadow-lg hover:scale-105 transition-transform`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-3 h-3 ${colorClasses.green.bg} rounded-full`}></div>
                  <h4 className="text-white font-bold">Región</h4>
                </div>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• id_region (PK)</div>
                  <div>• nombre</div>
                  <div>• coordenadas</div>
                  <div>• poblacion</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className={`bg-slate-800/80 border-2 ${colorClasses.orange.border} rounded-xl p-6 ${colorClasses.orange.glow} shadow-lg hover:scale-105 transition-transform`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-3 h-3 ${colorClasses.orange.bg} rounded-full`}></div>
                  <h4 className="text-white font-bold">Informe</h4>
                </div>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• id_informe (PK)</div>
                  <div>• fecha</div>
                  <div>• avance_fisico</div>
                  <div>• observaciones</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className={`bg-slate-800/80 border-2 ${colorClasses.pink.border} rounded-xl p-6 ${colorClasses.pink.glow} shadow-lg hover:scale-105 transition-transform`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-3 h-3 ${colorClasses.pink.bg} rounded-full`}></div>
                  <h4 className="text-white font-bold">Permiso</h4>
                </div>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• id_permiso (PK)</div>
                  <div>• tipo</div>
                  <div>• fecha_emision</div>
                  <div>• vigencia</div>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="md:col-start-1 space-y-4">
              <div className={`bg-slate-800/80 border-2 ${colorClasses.teal.border} rounded-xl p-6 ${colorClasses.teal.glow} shadow-lg hover:scale-105 transition-transform`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-3 h-3 ${colorClasses.teal.bg} rounded-full`}></div>
                  <h4 className="text-white font-bold">Acta de Entrega</h4>
                </div>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• id_acta (PK)</div>
                  <div>• fecha_entrega</div>
                  <div>• firmantes</div>
                  <div>• documento</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className={`bg-slate-800/80 border-2 ${colorClasses.yellow.border} rounded-xl p-6 ${colorClasses.yellow.glow} shadow-lg hover:scale-105 transition-transform`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-3 h-3 ${colorClasses.yellow.bg} rounded-full`}></div>
                  <h4 className="text-white font-bold">Presupuesto</h4>
                </div>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• id_presupuesto (PK)</div>
                  <div>• monto_total</div>
                  <div>• fuente</div>
                  <div>• ejercido</div>
                </div>
              </div>
            </div>

            <div className="md:col-start-2 space-y-4">
              <div className={`bg-slate-800/80 border-2 ${colorClasses.red.border} rounded-xl p-6 ${colorClasses.red.glow} shadow-lg hover:scale-105 transition-transform`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-3 h-3 ${colorClasses.red.bg} rounded-full`}></div>
                  <h4 className="text-white font-bold">Costos</h4>
                </div>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• id_costo (PK)</div>
                  <div>• concepto</div>
                  <div>• monto</div>
                  <div>• fecha</div>
                </div>
              </div>
            </div>
          </div>

          {/* Relationship Legend */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
            <h4 className="text-white font-semibold mb-4">Relaciones del Modelo</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span>Obras → Constructora (1:N)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Obras → Supervisor (1:N)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Obras → Región (N:1)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span>Obras → Informe (1:N)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span>Obras → Permiso (1:N)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span>Obras → Acta (1:1)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Obras → Presupuesto (1:1)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span>Presupuesto → Costos (1:N)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
