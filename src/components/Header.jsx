import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import navData from '../data/navigation_ui.json';

const Header = () => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const langMenuRef = useRef(null);
  const location = useLocation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    // { code: 'tj', name: 'Тоҷикӣ', flag: '🇹🇯' },
    // { code: 'fa', name: 'تاجیک', flag: '🇹🇯' },
  ];

  // Logic: Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Logic: Handle Language Changes
  useEffect(() => {
    localStorage.setItem('lang', lang);
    window.dispatchEvent(new Event('storage'));
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    setIsMenuOpen(false);
  }, [lang]);

  // Theme Logic
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme === 'dark' || (!savedTheme && prefersDark);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const t = navData.header[lang] || navData.header['en'];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {t.name}
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-8 items-center justify-center">
            {t.links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors ${
                  location.pathname === link.path ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex-1 flex items-center justify-end gap-3">

            {/* Language Dropdown Menu (Restored) */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="text-xs font-bold uppercase">{lang}</span>
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden z-[60]"
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                          lang === l.code
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        <span>{l.flag}</span>
                        <span className="font-medium">{l.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-yellow-400 hover:scale-110 transition-all"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {/* Mobile Burger Button */}
            <button
              className="md:hidden p-2 text-gray-600 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" strokeWidth={2} strokeLinecap="round" />
                ) : (
                  <path d="M4 6h16M4 12h16m-7 6h7" strokeWidth={2} strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-4">
              {t.links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-bold transition-colors px-2 ${
                    location.pathname === link.path ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;