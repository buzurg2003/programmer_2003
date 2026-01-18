import {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import projects from '../../data/projects/projects.json';
import projectsUI from '../../data/projects/projects_ui.json';

const Projects = () => {
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

  const t = projectsUI[lang] || projectsUI['en'];

  return (
    <section className="max-w-7xl mx-auto px-4 py-20 min-h-screen">
      <div className="text-center mb-16">
        {/* High Contrast Title */}
        <h1 className="text-4xl md:text-5xl font-black text-gray-950 dark:text-white">
          {t.title}
        </h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 font-medium">
          {t.subtitle}
        </p>
        <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full mt-6"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((proj) => {
          // ✅ Split tech string into an array, slice first 2, and check for remaining
          const techArray = proj.tech ? proj.tech.split(/[,&]+/).map(s => s.trim()) : [];
          const displayTech = techArray.slice(0, 2).join(', ');
          const remainingCount = techArray.length - 2;

          return (
            <motion.div
              key={proj.id}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-slate-800 flex flex-col"
            >
              <div className="h-52 overflow-hidden relative bg-gray-100 dark:bg-slate-800">
                {proj.images && proj.images.length > 0 ? (
                  <img
                    src={proj.images[0].url}
                    alt={proj.title?.en}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                ) : (
                  <div className={`w-full h-full ${proj.color || 'bg-blue-500'} opacity-90`}/>
                )}
              </div>

              <div className="p-6 text-start flex-1 flex flex-col">
                <h3 className="text-xl font-extrabold text-gray-950 dark:text-white">
                  {proj.title?.[lang] || proj.title?.['en']}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm line-clamp-2 flex-1 font-medium">
                  {proj.desc?.[lang] || proj.desc?.['en']}
                </p>

                {/* ✅ Updated Tech Display */}
                <p className="text-blue-700 dark:text-blue-400 text-xs font-bold font-mono mt-3">
                  {displayTech}
                  {remainingCount > 0 && (
                    <span className="opacity-60 font-sans ml-1">
                      + {remainingCount} {lang === 'fa' ? 'مورد دیگر' : 'more'}
                    </span>
                  )}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-800">
                  <Link
                    to={`/projects/${proj.id}`}
                    className="text-blue-700 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
                  >
                    {t.viewBtn}
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;