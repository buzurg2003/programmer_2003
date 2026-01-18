import { useState, useEffect } from 'react';
import navData from '../data/navigation_ui.json';

const Footer = () => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

  useEffect(() => {
    const handleLangChange = () => {
      setLang(localStorage.getItem('lang') || 'en');
    };
    window.addEventListener('storage', handleLangChange);
    return () => window.removeEventListener('storage', handleLangChange);
  }, []);

  const t = navData.footer[lang] || navData.footer['en'];

  return (
    <footer className="py-10 text-center border-t border-gray-100 dark:border-slate-800 text-gray-500 dark:text-gray-400">
      <p>
        © 2026 {t.name} | {t.text}
      </p>
    </footer>
  );
};

export default Footer;