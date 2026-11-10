import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { GrandFinale } from './components/GrandFinale';
import './styles/global.css';
import './styles/animations.css';
import './styles/game.css';

/** Sin router. La página del gran final (último QR) es /dia24 o /#/dia24. */
const isDay24 = () => location.hash.startsWith('#/dia24') || /\/dia24\/?$/.test(location.pathname);

function Root() {
  const [day24, setDay24] = useState(isDay24);
  useEffect(() => {
    const on = () => setDay24(isDay24());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return day24 ? <GrandFinale /> : <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
