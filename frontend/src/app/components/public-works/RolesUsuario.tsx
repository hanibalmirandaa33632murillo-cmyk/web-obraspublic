import { User, Eye, Pencil, FileText, Shield, CheckCircle, XCircle } from 'lucide-react';

export default function RolesUsuario() {
  const roles = [
    {
      name: 'Director de Obras',
      icon: Shield,
      color: 'cyan',
      bgGradient: 'from-cyan-500 to-blue-600',
      description: 'Máximo nivel de autoridad y control sobre todas las obras',
      permissions: [
        { name: 'Aprobar obras', granted: true },
        { name: 'Asignar presupuesto', granted: true },
        { name: 'Ver reportes globales', granted: true },
        { name: 'Gestionar usuarios', granted: true },
        { name: 'Auditoría completa', granted: true }
      ]
    },
    {
      name: 'Supervisor',
      icon: Eye,
      color: 'purple',
      bgGradient: 'from-purple-500 to-pink-600',
      description: 'Monitoreo y verificación de avance en campo',
      permissions: [
        { name: 'Aprobar obras', granted: false },
        { name: 'Crear informes', granted: true },
        { name: 'Ver obras asignadas', granted: true },
        { name: 'Subir evidencias', granted: true },
        { name: 'Validar avances', granted: true }
      ]
    },
    {
      name: 'Proyectista',
      icon: Pencil,
      color: 'orange',
      bgGradient: 'from-orange-500 to-red-600',
      description: 'Diseño y planificación técnica de proyectos',
      permissions: [
        { name: 'Aprobar obras', granted: false },
        { name: 'Crear proyectos', granted: true },
        { name: 'Editar especificaciones', granted: true },
        { name: 'Ver planos', granted: true },
        { name: 'Calcular presupuestos', granted: true }
      ]
    },
    {
      name: 'Secretariado',
      icon: FileText,
      color: 'green',
      bgGradient: 'from-green-500 to-emerald-600',
      description: 'Gestión administrativa y documental',
      permissions: [
        { name: 'Aprobar obras', granted: false },
        { name: 'Gestionar documentos', granted: true },
        { name: 'Ver información general', granted: true },
        { name: 'Generar reportes', granted: true },
        { name: 'Archivar expedientes', granted: true }
      ]
    }
  ];

  return (
    <section id="roles" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">Control de Acceso</span>
          <h2 className="text-4xl font-bold text-slate-900 mt-3 mb-4">
            Roles de Usuario
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Sistema de permisos diferenciados según el nivel de responsabilidad
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {roles.map((role, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all group"
            >
              {/* Header with Gradient */}
              <div className={`bg-gradient-to-r ${role.bgGradient} p-8 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <role.icon className="w-9 h-9" />
                    </div>
                    <User className="w-12 h-12 opacity-50" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{role.name}</h3>
                  <p className="text-sm opacity-90">{role.description}</p>
                </div>
              </div>

              {/* Permissions List */}
              <div className="p-8">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                  Permisos y Responsabilidades
                </h4>
                <div className="space-y-3">
                  {role.permissions.map((permission, permIndex) => (
                    <div
                      key={permIndex}
                      className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-slate-900 text-sm">{permission.name}</span>
                      {permission.granted ? (
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button className={`w-full mt-6 py-3 bg-gradient-to-r ${role.bgGradient} text-white rounded-lg font-medium hover:scale-105 transition-transform shadow-lg`}>
                  Ver Detalles Completos
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Role Hierarchy */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 text-white">
          <h3 className="text-2xl font-bold mb-8 text-center">Jerarquía Organizacional</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Level 1 */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-cyan-500 rounded-2xl flex items-center justify-center mb-3 shadow-xl shadow-cyan-500/50">
                <Shield className="w-12 h-12" />
              </div>
              <div className="text-center">
                <div className="font-bold">Director</div>
                <div className="text-xs text-gray-400">Nivel 1</div>
              </div>
            </div>

            <div className="hidden md:block text-4xl text-gray-600">→</div>

            {/* Level 2 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-purple-500 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                  <Eye className="w-10 h-10" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-sm">Supervisor</div>
                  <div className="text-xs text-gray-400">Nivel 2</div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-orange-500 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                  <Pencil className="w-10 h-10" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-sm">Proyectista</div>
                  <div className="text-xs text-gray-400">Nivel 2</div>
                </div>
              </div>
            </div>

            <div className="hidden md:block text-4xl text-gray-600">→</div>

            {/* Level 3 */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-green-500 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                <FileText className="w-10 h-10" />
              </div>
              <div className="text-center">
                <div className="font-bold text-sm">Secretariado</div>
                <div className="text-xs text-gray-400">Nivel 3</div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="font-bold mb-1">Autenticación</div>
              <div className="text-xs text-gray-300">JWT Token-based security</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="font-bold mb-1">Autorización</div>
              <div className="text-xs text-gray-300">Role-Based Access Control (RBAC)</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="font-bold mb-1">Auditoría</div>
              <div className="text-xs text-gray-300">Log completo de actividades</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
