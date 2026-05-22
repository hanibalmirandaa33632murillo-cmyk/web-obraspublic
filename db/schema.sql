-- ============================================================
--  BASE DE DATOS: Direccion de Obras Publicas - Temascaltepec
--  Motor: PostgreSQL 17
--  Autores: Gonzalez Casiano Uriel / Maldonado Mejia Marco Tulio
-- ============================================================

-- Eliminar tablas si ya existen (en orden inverso de dependencias)
DROP TABLE IF EXISTS public.firmantes        CASCADE;
DROP TABLE IF EXISTS public.acta_entrega     CASCADE;
DROP TABLE IF EXISTS public.permisos         CASCADE;
DROP TABLE IF EXISTS public.financia         CASCADE;
DROP TABLE IF EXISTS public.informes         CASCADE;
DROP TABLE IF EXISTS public.costos           CASCADE;
DROP TABLE IF EXISTS public.presupuesto_obra CASCADE;
DROP TABLE IF EXISTS public.opcion_seleccion CASCADE;
DROP TABLE IF EXISTS public.obra             CASCADE;
DROP TABLE IF EXISTS public.fuente_presupuestaria CASCADE;
DROP TABLE IF EXISTS public.supervisor       CASCADE;
DROP TABLE IF EXISTS public.proyectista      CASCADE;
DROP TABLE IF EXISTS public.personal         CASCADE;
DROP TABLE IF EXISTS public.constructora     CASCADE;
DROP TABLE IF EXISTS public.region           CASCADE;

-- ============================================================
--  ENTIDADES FUERTES (existen de forma independiente)
-- ============================================================

-- REGION: comunidad / barrio / colonia donde se ubica la obra
CREATE TABLE public.region (
    id_region   CHAR(10)     NOT NULL,
    comunidad   VARCHAR(100) NOT NULL,
    barrio      VARCHAR(100),
    colonia     VARCHAR(100),
    CONSTRAINT pk_region PRIMARY KEY (id_region)
);

-- CONSTRUCTORA: empresa que ejecuta la obra
CREATE TABLE public.constructora (
    id_constructora       CHAR(10)     NOT NULL,
    rfc                   VARCHAR(13)  NOT NULL UNIQUE,
    nombre_constructora   VARCHAR(150) NOT NULL,
    empresa               VARCHAR(150),
    tipo_ejecutor         VARCHAR(50),          -- "Empresa" o "H. Ayuntamiento"
    CONSTRAINT pk_constructora PRIMARY KEY (id_constructora)
);

-- PERSONAL: superclase para Supervisor y Proyectista (herencia solapada)
--   Un mismo registro puede ser tanto Supervisor como Proyectista
--   El tipo se controla desde el backend, no con columna discriminadora
CREATE TABLE public.personal (
    codigo_personal  CHAR(20)     NOT NULL,
    nombre           VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(200) NOT NULL,
    apellido_materno VARCHAR(200),
    CONSTRAINT pk_personal PRIMARY KEY (codigo_personal)
);

-- SUPERVISOR: hereda de personal (herencia solapada)
--   ON DELETE CASCADE porque sin el personal el supervisor no existe
CREATE TABLE public.supervisor (
    codigo_personal  CHAR(20)    NOT NULL,
    telefono         VARCHAR(15),
    CONSTRAINT pk_supervisor     PRIMARY KEY (codigo_personal),
    CONSTRAINT fk_sup_personal   FOREIGN KEY (codigo_personal)
        REFERENCES public.personal (codigo_personal)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- PROYECTISTA: hereda de personal (herencia solapada)
--   Puede ser contratado por una constructora o trabajar en la direccion
CREATE TABLE public.proyectista (
    codigo_personal  CHAR(20)    NOT NULL,
    empresa          VARCHAR(150),
    id_constructora  CHAR(10),                  -- NULL si trabaja en la direccion
    CONSTRAINT pk_proyectista    PRIMARY KEY (codigo_personal),
    CONSTRAINT fk_proy_personal  FOREIGN KEY (codigo_personal)
        REFERENCES public.personal (codigo_personal)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_proy_const     FOREIGN KEY (id_constructora)
        REFERENCES public.constructora (id_constructora)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

-- FUENTE PRESUPUESTARIA: nivel (estatal/municipal/federal) y programa
--   Una misma fuente puede financiar mas de una obra (1:N con obra via tabla intermedia)
CREATE TABLE public.fuente_presupuestaria (
    id_fuente   CHAR(10)     NOT NULL,
    grado_nivel VARCHAR(50)  NOT NULL,   -- estatal / municipal / federal
    programa    VARCHAR(150),
    monto       NUMERIC(15,2),
    CONSTRAINT pk_fuente PRIMARY KEY (id_fuente)
);

-- ============================================================
--  ENTIDAD CENTRAL: OBRA
--   La mayoria de entidades debiles dependen de esta tabla.
--   Sin la obra, los registros huerfanos pierden validez.
-- ============================================================

CREATE TABLE public.obra (
    id_obra              CHAR(20)      NOT NULL,
    id_constructora      CHAR(10),               -- NULL si la hace el Ayuntamiento
    id_region            CHAR(10)      NOT NULL,
    codigo_supervisor    CHAR(20)      NOT NULL,
    codigo_expediente    VARCHAR(50)   NOT NULL UNIQUE,
    nombre_obra          VARCHAR(200)  NOT NULL,
    etapa                SMALLINT      DEFAULT 1 CHECK (etapa >= 1),
    fecha_inicio         DATE          NOT NULL,
    fecha_finalizacion   DATE,
    descripcion          TEXT,
    beneficiarios        INTEGER       CHECK (beneficiarios > 0),
    CONSTRAINT pk_obra            PRIMARY KEY (id_obra),
    CONSTRAINT fk_obra_const      FOREIGN KEY (id_constructora)
        REFERENCES public.constructora (id_constructora)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_obra_region     FOREIGN KEY (id_region)
        REFERENCES public.region (id_region)
        ON UPDATE CASCADE
        ON DELETE NO ACTION,
    CONSTRAINT fk_obra_supervisor FOREIGN KEY (codigo_supervisor)
        REFERENCES public.supervisor (codigo_personal)
        ON UPDATE CASCADE
        ON DELETE NO ACTION
);

-- ============================================================
--  TABLA INTERMEDIA: FINANCIA  (relacion N:M entre Obra y Fuente)
--   Una obra puede tener varias fuentes; una fuente puede financiar varias obras.
--   PK compuesta por las dos FK garantiza que no haya duplicados.
-- ============================================================

CREATE TABLE public.financia (
    id_obra    CHAR(20)  NOT NULL,
    id_fuente  CHAR(10)  NOT NULL,
    CONSTRAINT pk_financia     PRIMARY KEY (id_obra, id_fuente),
    CONSTRAINT fk_fin_obra     FOREIGN KEY (id_obra)
        REFERENCES public.obra (id_obra)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_fin_fuente   FOREIGN KEY (id_fuente)
        REFERENCES public.fuente_presupuestaria (id_fuente)
        ON UPDATE CASCADE
        ON DELETE NO ACTION
);

-- ============================================================
--  ENTIDADES DEBILES (su validez depende de una obra activa)
-- ============================================================

-- OPCION DE SELECCION: registra el concurso de constructoras
--   Minimo 3 propuestas por obra; una queda aprobada
--   Es un "hecho" (registro del evento), no una entidad de la constructora
CREATE TABLE public.opcion_seleccion (
    id_participante      CHAR(20)     NOT NULL,
    id_obra              CHAR(20)     NOT NULL,
    id_constructora      CHAR(10)     NOT NULL,
    aprobado             BOOLEAN      NOT NULL DEFAULT FALSE,
    razones_decision     TEXT,
    porcentaje_propuesta NUMERIC(5,2) CHECK (porcentaje_propuesta BETWEEN 0 AND 100),
    costo_propuesto      NUMERIC(15,2),
    experiencia_anios    SMALLINT,
    tiempo_estimado_dias INTEGER,
    CONSTRAINT pk_opcion     PRIMARY KEY (id_participante),
    CONSTRAINT fk_op_obra    FOREIGN KEY (id_obra)
        REFERENCES public.obra (id_obra)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_op_const   FOREIGN KEY (id_constructora)
        REFERENCES public.constructora (id_constructora)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- PRESUPUESTO DE OBRA: unico por obra; desarrollado por el proyectista
--   Un presupuesto es exclusivo para UNA obra (relacion 1:1)
--   La relacion 1:1 se garantiza con UNIQUE sobre id_obra
CREATE TABLE public.presupuesto_obra (
    id_presupuesto   CHAR(20)     NOT NULL,
    presupuesto_total NUMERIC(15,2) NOT NULL,
    codigo_proyectista CHAR(20)   NOT NULL,
    id_obra          CHAR(20)     NOT NULL,
    CONSTRAINT pk_presupuesto    PRIMARY KEY (id_presupuesto),
    CONSTRAINT uq_pres_obra      UNIQUE (id_obra),          -- garantiza relacion 1:1
    CONSTRAINT fk_pres_proy      FOREIGN KEY (codigo_proyectista)
        REFERENCES public.proyectista (codigo_personal)
        ON UPDATE CASCADE
        ON DELETE NO ACTION,
    CONSTRAINT fk_pres_obra      FOREIGN KEY (id_obra)
        REFERENCES public.obra (id_obra)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- COSTOS: detalle del presupuesto por categoria (materiales, mano de obra, etc.)
--   Entidad debil del presupuesto; sin presupuesto no existe el costo
CREATE TABLE public.costos (
    id_gasto_compuesto  CHAR(20)     NOT NULL,
    id_presupuesto      CHAR(20)     NOT NULL,
    categoria           VARCHAR(100) NOT NULL,   -- materiales / mano obra / equipos / indirectos
    costo               NUMERIC(15,2) NOT NULL,
    descripcion         TEXT,
    CONSTRAINT pk_costos         PRIMARY KEY (id_gasto_compuesto),
    CONSTRAINT fk_costo_pres     FOREIGN KEY (id_presupuesto)
        REFERENCES public.presupuesto_obra (id_presupuesto)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- INFORMES: libro de informes mensual de cada obra
--   Entidad debil de obra; el supervisor asignado los redacta
CREATE TABLE public.informes (
    id_informe                   CHAR(20)    NOT NULL,
    anio                         INTEGER     NOT NULL,
    mes                          CHAR(30)    NOT NULL,
    porcentaje_avance_fisico      SMALLINT    NOT NULL CHECK (porcentaje_avance_fisico BETWEEN 0 AND 100),
    porcentaje_avance_presupuestario SMALLINT NOT NULL CHECK (porcentaje_avance_presupuestario BETWEEN 0 AND 100),
    documento_informe             TEXT,         -- ruta o referencia al archivo
    descripcion                   TEXT,
    id_obra                       CHAR(20)    NOT NULL,
    codigo_supervisor             CHAR(20)    NOT NULL,
    CONSTRAINT pk_informe         PRIMARY KEY (id_informe),
    CONSTRAINT fk_inf_obra        FOREIGN KEY (id_obra)
        REFERENCES public.obra (id_obra)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_inf_supervisor  FOREIGN KEY (codigo_supervisor)
        REFERENCES public.supervisor (codigo_personal)
        ON UPDATE CASCADE
        ON DELETE NO ACTION
);

-- PERMISOS: oficios de instituciones reguladoras (CFE, CONAGUA, etc.)
--   Entidad debil de obra; se asignan al inicio o durante la construccion
CREATE TABLE public.permisos (
    id_oficio                  CHAR(20)     NOT NULL,
    id_obra                    CHAR(20)     NOT NULL,
    nombre_instancia           VARCHAR(150) NOT NULL,   -- CFE / CONAGUA / etc.
    oficio_acreditacion_permiso TEXT,
    CONSTRAINT pk_permiso        PRIMARY KEY (id_oficio),
    CONSTRAINT fk_per_obra       FOREIGN KEY (id_obra)
        REFERENCES public.obra (id_obra)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ACTA DE ENTREGA: valida la finalizacion de la obra (relacion 1:1 con obra)
--   La relacion 1:1 se garantiza con UNIQUE sobre id_obra
CREATE TABLE public.acta_entrega (
    id_acta_entrega  CHAR(20)  NOT NULL,
    id_obra          CHAR(20)  NOT NULL,
    fecha_expedicion DATE      NOT NULL,
    acta_entrega     TEXT,                   -- contenido o ruta del documento
    CONSTRAINT pk_acta           PRIMARY KEY (id_acta_entrega),
    CONSTRAINT uq_acta_obra      UNIQUE (id_obra),          -- garantiza relacion 1:1
    CONSTRAINT fk_acta_obra      FOREIGN KEY (id_obra)
        REFERENCES public.obra (id_obra)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- FIRMANTES: 5 personalidades que firman el acta de entrega
--   Entidad debil del acta; sin acta no hay firmante
--   No se usa herencia porque los 5 roles tienen exactamente los mismos atributos
CREATE TABLE public.firmantes (
    id_firmante      CHAR(20)     NOT NULL,
    id_acta_entrega  CHAR(20)     NOT NULL,
    nombre           VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(200) NOT NULL,
    apellido_materno VARCHAR(200),
    nombre_completo  VARCHAR(400),
    cargo            VARCHAR(100) NOT NULL,   -- Delegado / Rep. Constructora / Presidente / Director / Contralor
    CONSTRAINT pk_firmante       PRIMARY KEY (id_firmante),
    CONSTRAINT fk_fir_acta       FOREIGN KEY (id_acta_entrega)
        REFERENCES public.acta_entrega (id_acta_entrega)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ============================================================
--  DATOS DE EJEMPLO (mock data realista para Temascaltepec)
-- ============================================================

-- Regiones
INSERT INTO public.region VALUES
  ('R001', 'Temascaltepec', 'Centro', 'Col. Centro'),
  ('R002', 'San Cayetano', 'Barrio Norte', NULL),
  ('R003', 'Luvianos', 'Barrio Sur', 'Col. Hidalgo'),
  ('R004', 'Tejupilco', 'Cabecera', 'Col. Morelos');

-- Constructoras
INSERT INTO public.constructora VALUES
  ('C001', 'ABC123456XYZ', 'Constructora Alfa S.A. de C.V.', 'Alfa Corp', 'Empresa'),
  ('C002', 'DEF789012ABC', 'Edificaciones Beta S.A. de C.V.', 'Beta Build', 'Empresa'),
  ('C003', 'GHI345678DEF', 'Grupo Gamma Construcciones', 'Gamma', 'Empresa'),
  ('AYT01', 'HTEM250101000', 'H. Ayuntamiento Temascaltepec', NULL, 'H. Ayuntamiento');

-- Personal
INSERT INTO public.personal VALUES
  ('SUP-001', 'Carlos', 'Ramirez', 'Torres'),
  ('SUP-002', 'Maria', 'Lopez', 'Hernandez'),
  ('PRY-001', 'Luis', 'Gonzalez', 'Perez'),
  ('PRY-002', 'Ana', 'Mendez', 'Ruiz');

-- Supervisores
INSERT INTO public.supervisor VALUES
  ('SUP-001', '7221001001'),
  ('SUP-002', '7221002002');

-- Proyectistas
INSERT INTO public.proyectista VALUES
  ('PRY-001', 'Alfa Corp', 'C001'),
  ('PRY-002', NULL, NULL);    -- proyectista interno del ayuntamiento

-- Fuentes
INSERT INTO public.fuente_presupuestaria VALUES
  ('F001', 'Federal', 'FISM 2024', 1500000.00),
  ('F002', 'Municipal', 'Gasto Publico Municipal', 800000.00),
  ('F003', 'Estatal', 'FAISM Estatal', 600000.00);

-- Obras
INSERT INTO public.obra VALUES
  ('OBR-2024-001', 'C001', 'R001', 'SUP-001', 'EXP-2024-001',
   'Pavimentacion Calle Principal', 1, '2024-03-01', '2024-08-30',
   'Pavimentacion de 500m de calle principal del centro', 1200),
  ('OBR-2024-002', NULL,   'R002', 'SUP-002', 'EXP-2024-002',
   'Alumbrado Publico San Cayetano', 1, '2024-04-15', NULL,
   'Instalacion de 30 luminarias LED', 850),
  ('OBR-2024-003', 'C002', 'R003', 'SUP-001', 'EXP-2024-003',
   'Rehabilitacion Camino Rural Luvianos', 2, '2023-10-01', '2024-05-30',
   'Rehabilitacion de 2.5km de camino rural, etapa 2', 3400);

-- Financiamiento
INSERT INTO public.financia VALUES
  ('OBR-2024-001', 'F001'),
  ('OBR-2024-001', 'F002'),
  ('OBR-2024-002', 'F002'),
  ('OBR-2024-003', 'F001'),
  ('OBR-2024-003', 'F003');

-- Opciones de seleccion (concurso)
INSERT INTO public.opcion_seleccion VALUES
  ('PART-001', 'OBR-2024-001', 'C001', TRUE,  'Mejor relacion costo-calidad y experiencia', 92.5, 1380000.00, 8, 180),
  ('PART-002', 'OBR-2024-001', 'C002', FALSE, 'Costo elevado', 78.0, 1520000.00, 5, 200),
  ('PART-003', 'OBR-2024-001', 'C003', FALSE, 'Tiempo estimado excesivo', 65.0, 1350000.00, 3, 240),
  ('PART-004', 'OBR-2024-003', 'C002', TRUE,  'Experiencia en caminos rurales', 88.0, 1150000.00, 6, 150),
  ('PART-005', 'OBR-2024-003', 'C001', FALSE, 'Sin experiencia en rurales', 70.0, 1200000.00, 8, 160),
  ('PART-006', 'OBR-2024-003', 'C003', FALSE, 'Propuesta incompleta', 55.0, 1050000.00, 4, 180);

-- Presupuestos
INSERT INTO public.presupuesto_obra VALUES
  ('PRES-001', 1380000.00, 'PRY-001', 'OBR-2024-001'),
  ('PRES-002',  750000.00, 'PRY-002', 'OBR-2024-002'),
  ('PRES-003', 1150000.00, 'PRY-001', 'OBR-2024-003');

-- Costos
INSERT INTO public.costos VALUES
  ('COST-001-MAT', 'PRES-001', 'Materiales',          690000.00, 'Asfalto, grava y concreto'),
  ('COST-001-MAN', 'PRES-001', 'Mano de obra',        400000.00, 'Cuadrilla de 12 operarios'),
  ('COST-001-EQU', 'PRES-001', 'Equipos',             200000.00, 'Renta de maquinaria pesada'),
  ('COST-001-IND', 'PRES-001', 'Costos indirectos',    90000.00, 'Administracion e imprevistos'),
  ('COST-002-MAT', 'PRES-002', 'Materiales',          350000.00, 'Luminarias LED y cableado'),
  ('COST-002-MAN', 'PRES-002', 'Mano de obra',        250000.00, 'Electricistas certificados'),
  ('COST-002-IND', 'PRES-002', 'Costos indirectos',   150000.00, 'Tramites y permisos CFE'),
  ('COST-003-MAT', 'PRES-003', 'Materiales',          500000.00, 'Grava y material base'),
  ('COST-003-MAN', 'PRES-003', 'Mano de obra',        380000.00, 'Operarios y topografo'),
  ('COST-003-EQU', 'PRES-003', 'Equipos',             200000.00, 'Motoconformadora y compactadora'),
  ('COST-003-IND', 'PRES-003', 'Costos indirectos',    70000.00, 'Supervision e imprevistos');

-- Informes
INSERT INTO public.informes VALUES
  ('INF-001-MAR', 2024, 'Marzo',    15, 12, NULL, 'Inicio de trabajos de excavacion y preparacion', 'OBR-2024-001', 'SUP-001'),
  ('INF-001-ABR', 2024, 'Abril',    38, 35, NULL, 'Tendido de subbase y base hidraulica', 'OBR-2024-001', 'SUP-001'),
  ('INF-001-MAY', 2024, 'Mayo',     62, 58, NULL, 'Colado de carpeta asfaltica tramo norte', 'OBR-2024-001', 'SUP-001'),
  ('INF-002-MAY', 2024, 'Mayo',     40, 38, NULL, 'Instalacion postes y cableado primario', 'OBR-2024-002', 'SUP-002'),
  ('INF-003-OCT', 2023, 'Octubre',  20, 18, NULL, 'Despalme y nivelacion del camino', 'OBR-2024-003', 'SUP-001'),
  ('INF-003-ENE', 2024, 'Enero',    75, 70, NULL, 'Compactacion de material y cunetas', 'OBR-2024-003', 'SUP-001');

-- Permisos
INSERT INTO public.permisos VALUES
  ('PER-CFE-001', 'OBR-2024-002', 'CFE', 'Oficio CFE-2024-0445 - Autorizacion acometida electrica'),
  ('PER-CNA-001', 'OBR-2024-001', 'CONAGUA', 'Oficio CONAGUA-2024-0118 - Uso de agua en construccion'),
  ('PER-SCT-001', 'OBR-2024-003', 'SCT', 'Oficio SCT-2024-0321 - Intervencion en camino federal');

-- Actas de entrega (solo obra 1 terminada)
INSERT INTO public.acta_entrega VALUES
  ('ACTA-001', 'OBR-2024-001', '2024-09-05', 'Se hace constar que la obra de pavimentacion ha concluido satisfactoriamente.');

-- Firmantes del acta
INSERT INTO public.firmantes VALUES
  ('FIR-001-DEL',  'ACTA-001', 'Jose',    'Martinez',  'Sanchez', 'Jose Martinez Sanchez',  'Delegado'),
  ('FIR-001-CON',  'ACTA-001', 'Roberto', 'Vargas',    'Mora',    'Roberto Vargas Mora',     'Representante de la Constructora'),
  ('FIR-001-PRE',  'ACTA-001', 'Miguel',  'Torres',    'Luna',    'Miguel Torres Luna',      'Presidente Municipal'),
  ('FIR-001-DIR',  'ACTA-001', 'Ernesto', 'Fuentes',   'Diaz',    'Ernesto Fuentes Diaz',   'Director de Obras'),
  ('FIR-001-CTR',  'ACTA-001', 'Patricia','Rios',      'Vega',    'Patricia Rios Vega',      'Contralor');
