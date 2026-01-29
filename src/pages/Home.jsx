import {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {Download, Zap, Send} from 'lucide-react';
import homeData from '../data/home_ui.json';
import aboutData from '../data/about_ui.json';

const Home = () => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

  useEffect(() => {
    const handleStorageChange = () => {
      const currentLang = localStorage.getItem('lang') || 'en';
      setLang(currentLang);
      document.documentElement.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange();

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const t = homeData.content[lang] || homeData.content['en'];
  const techStack = homeData.techStack;

  const aboutContent = aboutData[lang] || aboutData['en'];
  const services = aboutContent.services || [];
  const servicesTitle = aboutContent.servicesTitle;
  const servicesSubtitle = aboutContent.servicesSubtitle;

  return (
    <div className="overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300 text-start">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16">
          <motion.div initial={{opacity: 0, x: -30}} animate={{opacity: 1, x: 0}} className="flex-1 text-start w-full">
            <div
              className="inline-block px-4 py-1.5 mb-6 text-xs md:text-sm font-semibold tracking-wide text-blue-600 uppercase bg-blue-100 dark:bg-blue-900/30 rounded-full">
              {t.available}
            </div>

            {/* FIXED: Added text-4xl for mobile to prevent Russian name overflow */}
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-[1.1] mb-6 break-words">
              {t.name} <br/>
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                {t.surname}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mb-10 leading-relaxed">
              {t.heroDesc}
            </p>

            {/* FIXED: Flex-col on tiny mobile, flex-row on small devices */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center">
              <Link to="/projects" className="w-full sm:w-auto">
                <motion.button
                  className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all">
                  {t.btnProjects}
                </motion.button>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <motion.button
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-gray-700 dark:text-white border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-900 transition-all">
                  {t.btnStory}
                </motion.button>
              </Link>
              <motion.a
                href="/assets/cv_buzurgmehr.pdf" download
                className="flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer">
                <Download size={20}/>
                <span>{t.btnCV}</span>
              </motion.a>
            </div>
          </motion.div>

          {/* PHOTO SECTION */}
          <div className="flex-1 relative w-full max-w-sm md:max-w-md mt-10 lg:mt-0">
            <div className="relative group">
              <div
                className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-[3rem] rotate-6 opacity-20 group-hover:rotate-3 transition-transform duration-500"></div>
              <div
                className="relative overflow-hidden rounded-[3rem] border-4 border-white dark:border-slate-900 shadow-2xl">
                <img src="/assets/images/profile.jpg" alt="Buzurgmehr"
                     className="w-full h-auto object-cover aspect-[4/5]"/>
              </div>

              {/* FIXED: Responsive positioning for the badge */}
              <motion.div
                animate={{y: [0, -10, 0]}}
                transition={{repeat: Infinity, duration: 3}}
                className="absolute -bottom-4 -start-4 md:-bottom-6 md:-start-6 bg-white dark:bg-slate-800 p-3 md:p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 flex items-center gap-3 max-w-[180px] md:max-w-none">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg shrink-0">
                  <Zap size={20} className="text-yellow-500 fill-yellow-500"/>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium truncate">⚡</p>
                  <p className="text-xs md:text-sm font-bold text-gray-900 dark:text-white leading-tight">{t.hireMe}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* FIXED: Adjusted padding and rounded corners for mobile */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 p-6 md:p-10 bg-gray-50 dark:bg-slate-900/50 rounded-[2rem] md:rounded-[3rem] border border-gray-100 dark:border-slate-800">
          {t.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">{stat.value}</h3>
              <p
                className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider text-[10px] md:text-sm leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TECH MARQUEE */}
      <div className="py-10 border-y border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="flex flex-wrap justify-center gap-x-6 gap-y-6 md:gap-x-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {techStack.map(item => (
              <span key={item}
                    className="text-base md:text-xl font-bold text-gray-800 dark:text-gray-200 tracking-tighter">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 4. SERVICES SECTION */}
      {services.length > 0 && (
        <section className="py-20 md:py-24 max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 px-2">
              {servicesTitle}
            </h2>
            {servicesSubtitle && (
              <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-6 px-4">
                {servicesSubtitle}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                whileHover={{y: -10}}
                className="p-8 md:p-10 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none transition-all"
              >
                <div className="text-4xl md:text-5xl mb-6">
                  {service.icon}
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h4>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 5. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="relative group rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-20 text-center overflow-hidden transition-all duration-500
          bg-gray-50 border border-gray-100 dark:bg-slate-900 dark:border-slate-800 shadow-xl">
          <div className="relative z-10">
            <h2
              className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-gray-900 dark:text-white px-2">
              {t.ctaTitle}
            </h2>
            <p
              className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-gray-500 dark:text-slate-400 font-medium px-4">
              {t.ctaDesc}
            </p>
            <Link to="/contact">
              <motion.button
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 md:px-10 py-4 rounded-2xl font-bold text-base md:text-lg shadow-lg hover:bg-blue-700 transition-all">
                <span>{t.ctaBtn}</span>
                <Send size={18}/>
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;