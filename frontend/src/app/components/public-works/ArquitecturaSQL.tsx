import { Database, Container, Server, Code2, Boxes } from 'lucide-react';

export default function ArquitecturaSQL() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-100 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">Infraestructura Tecnológica</span>
          <h2 className="text-4xl font-bold text-slate-900 mt-3 mb-4">
            Arquitectura SQL y Base de Datos
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stack tecnológico robusto para almacenamiento, gestión y análisis de datos
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="max-w-5xl mx-auto">
          {/* Top Layer - Client */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-2xl border-2 border-cyan-500 p-6 shadow-lg w-64 text-center">
              <Code2 className="w-10 h-10 text-cyan-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Frontend Application</h3>
              <p className="text-sm text-gray-600">React + TypeScript</p>
            </div>
          </div>

          {/* Connection Arrow */}
          <div className="flex justify-center mb-8">
            <div className="w-0.5 h-12 bg-gradient-to-b from-cyan-500 to-blue-500"></div>
          </div>

          {/* Middle Layer - Backend */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
              <Server className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Backend API</h3>
              <div className="space-y-2 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Node.js / Express</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>REST API</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Authentication JWT</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Business Logic</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
              <Boxes className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">ORM Layer</h3>
              <div className="space-y-2 text-sm text-purple-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Sequelize / TypeORM</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Model Mapping</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Query Builder</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Migrations</span>
                </div>
              </div>
            </div>
          </div>

          {/* Connection Arrows */}
          <div className="flex justify-center gap-32 mb-8">
            <div className="w-0.5 h-12 bg-gradient-to-b from-blue-500 to-green-500"></div>
            <div className="w-0.5 h-12 bg-gradient-to-b from-purple-500 to-green-500"></div>
          </div>

          {/* Database Layer */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-10 text-white shadow-2xl mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Database className="w-16 h-16" />
                <div>
                  <h3 className="text-3xl font-bold mb-2">PostgreSQL Database</h3>
                  <p className="text-green-100">Sistema de gestión de base de datos relacional</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">v15.2</div>
                <div className="text-sm text-green-100">Latest Stable</div>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="font-bold mb-1">ACID Compliant</div>
                <div className="text-xs text-green-100">Transacciones seguras</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="font-bold mb-1">Advanced Indexing</div>
                <div className="text-xs text-green-100">Búsquedas optimizadas</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="font-bold mb-1">JSON Support</div>
                <div className="text-xs text-green-100">Datos semi-estructurados</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="font-bold mb-1">Replication</div>
                <div className="text-xs text-green-100">Alta disponibilidad</div>
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
              <Container className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Docker Container</h3>
              <p className="text-gray-600 mb-4">
                Entorno containerizado para desarrollo y producción consistente
              </p>
              <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-green-400">
                <div>docker-compose up -d</div>
                <div className="text-gray-500 mt-1"># PostgreSQL + pgAdmin</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
              <Database className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">pgAdmin 4</h3>
              <p className="text-gray-600 mb-4">
                Interfaz gráfica para administración y monitoreo de base de datos
              </p>
              <div className="flex gap-2">
                <div className="flex-1 bg-purple-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-purple-600">156</div>
                  <div className="text-xs text-gray-600">Queries/seg</div>
                </div>
                <div className="flex-1 bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-600">99.9%</div>
                  <div className="text-xs text-gray-600">Uptime</div>
                </div>
              </div>
            </div>
          </div>

          {/* SQL Code Example */}
          <div className="mt-8 bg-slate-900 rounded-2xl p-6 border border-cyan-500/30 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Code2 className="w-6 h-6 text-cyan-400" />
              <h4 className="text-white font-bold">Ejemplo de Consulta SQL</h4>
            </div>
            <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
{`-- Consulta de obras activas con detalles
SELECT
  o.nombre AS obra,
  c.razon_social AS constructora,
  r.nombre AS region,
  p.monto_total,
  i.avance_fisico
FROM obras o
INNER JOIN constructora c ON o.id_constructora = c.id_constructora
INNER JOIN region r ON o.id_region = r.id_region
INNER JOIN presupuesto p ON o.id_obra = p.id_obra
LEFT JOIN informe i ON o.id_obra = i.id_obra
WHERE o.estado = 'activa'
ORDER BY i.avance_fisico DESC;`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
