import HeroSection from './components/public-works/HeroSection';
import ProblemaActual from './components/public-works/ProblemaActual';
import FlujoProceso from './components/public-works/FlujoProceso';
import InformacionObra from './components/public-works/InformacionObra';
import ConcursoConstructoras from './components/public-works/ConcursoConstructoras';
import DashboardSupervision from './components/public-works/DashboardSupervision';
import ModeloER from './components/public-works/ModeloER';
import ArquitecturaSQL from './components/public-works/ArquitecturaSQL';
import RolesUsuario from './components/public-works/RolesUsuario';
import DataAnalytics from './components/public-works/DataAnalytics';
import Footer from './components/public-works/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ProblemaActual />
      <FlujoProceso />
      <InformacionObra />
      <ConcursoConstructoras />
      <DashboardSupervision />
      <ModeloER />
      <ArquitecturaSQL />
      <RolesUsuario />
      <DataAnalytics />
      <Footer />
    </div>
  );
}