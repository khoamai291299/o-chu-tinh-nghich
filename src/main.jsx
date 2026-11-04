import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/baloo-2/latin-700.css';
import '@fontsource/baloo-2/latin-800.css';
import '@fontsource/baloo-2/vietnamese-700.css';
import '@fontsource/baloo-2/vietnamese-800.css';
import '@fontsource/be-vietnam-pro/latin-500.css';
import '@fontsource/be-vietnam-pro/latin-700.css';
import '@fontsource/be-vietnam-pro/vietnamese-500.css';
import '@fontsource/be-vietnam-pro/vietnamese-700.css';
import './styles.css';
import App from './App.jsx';
import { gsap } from 'gsap';
gsap.ticker.lagSmoothing(0); // giữ cảnh đồng bộ với đồng hồ 30 giây

createRoot(document.getElementById('root')).render(<App />);
