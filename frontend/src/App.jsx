import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LangProvider } from './lib/i18n.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Dossier from './pages/Dossier.jsx';
import VerifyPage from './pages/VerifyPage.jsx';
import Methodology from './pages/Methodology.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <LangProvider>
      <HashRouter>
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plot/:id" element={<Dossier />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </HashRouter>
    </LangProvider>
  );
}
