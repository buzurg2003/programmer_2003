import {useState, useEffect, useRef} from 'react';
import {useParams, Link} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';
import {MoreHorizontal, X, Search, Github, ExternalLink, Send} from 'lucide-react';

// ✅ Import local PNG files
import googlePlayImg from '../../../public/assets/icons/google_play_store.png';
import appStoreImg from '../../../public/assets/icons/app_store.png';

import projects from '../../data/projects/projects.json';
import detailsUI from '../../data/projects/details_ui.json';

const ProjectDetails = () => {
  const {id} = useParams();
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');
  const [showFullGallery, setShowFullGallery] = useState(false);
  const imageRefs = useRef([]);

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

  useEffect(() => {
    if (showFullGallery) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showFullGallery]);

  const t = detailsUI[lang] || detailsUI['en'];
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) return null;

  const projectImages = project.images || [];
  const heroImageUrl = projectImages[0]?.url || "";
  const previewImages = projectImages.slice(0, 2);
  const hasMore = projectImages.length > 2;

  const openGalleryAt = (index) => {
    setShowFullGallery(true);
    setTimeout(() => {
      imageRefs.current[index]?.scrollIntoView({behavior: 'smooth', block: 'start'});
    }, 100);
  };

  const openGalleryOnly = () => {
    setShowFullGallery(true);
  };

  return (
    <motion.section initial={{opacity: 0}} animate={{opacity: 1}}
                    className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 max-w-6xl mx-auto px-4 py-20 selection:bg-blue-100">

      <Link to="/projects"
            className="text-slate-600 dark:text-slate-400 hover:text-blue-700 mb-8 inline-block font-bold">
        {t.back}
      </Link>

      <motion.div
        className="relative w-full h-64 md:h-[500px] rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
        <img src={heroImageUrl} alt="Hero" className="w-full h-full object-cover"/>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-start">
        <div className="lg:col-span-2">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            {project.title?.[lang] || project.title?.['en']}
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8 font-medium">
            {project.longDesc?.[lang] || project.longDesc?.['en']}
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all">
                <ExternalLink size={20}/> {t.launch}
              </a>
            )}

            {project.googlePlayUrl && (
              <a href={project.googlePlayUrl} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 bg-[#01875f] text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:brightness-110 transition-all">
                <img src={googlePlayImg} alt="Google Play" className="w-5 h-5 object-contain"/>
                {t.playStore}
              </a>
            )}

            {project.appStoreUrl && (
              <a href={project.appStoreUrl} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 bg-blue-800 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-500 transition-all">
                <img src={appStoreImg} alt="App Store" className="w-5 h-5 object-contain"/>
                {t.appStore}
              </a>
            )}

            {project.telegramUrl && (
              <a href={project.telegramUrl} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 bg-[#24A1DE] text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:brightness-110 transition-all">
                <Send size={20}/>
                {t.telegram}
              </a>
            )}

            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-all border border-slate-300 dark:border-transparent">
                <Github size={20}/>
                {t.repo}
              </a>
            )}
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
              {lang === 'fa' ? 'تصاویر پروژه' : 'Project Showcase'}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {previewImages.map((imgObj, idx) => (
                <button
                  key={idx}
                  onClick={() => openGalleryAt(idx)}
                  className="group relative h-40 md:h-52 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-200"
                >
                  <img src={imgObj.url}
                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                       alt={imgObj.title?.[lang]}/>
                  <div
                    className="absolute inset-0 bg-black/0 group-hover:bg-blue-600/20 transition-colors flex items-center justify-center">
                    <Search className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24}/>
                  </div>
                </button>
              ))}

              {hasMore && (
                <button onClick={openGalleryOnly}
                        className="relative h-40 md:h-52 w-full rounded-2xl group overflow-visible">
                  <div
                    className="absolute inset-0 translate-x-3 translate-y-3 scale-90 bg-slate-200 dark:bg-slate-800 rounded-2xl -z-20 opacity-40 transition-transform group-hover:translate-x-5 group-hover:translate-y-5"/>
                  <div
                    className="absolute inset-0 translate-x-1.5 translate-y-1.5 scale-95 rounded-2xl border border-slate-300 dark:border-slate-700 overflow-hidden -z-10 bg-slate-100 dark:bg-slate-800 transition-transform group-hover:translate-x-2.5 group-hover:translate-y-2.5">
                    <img src={projectImages[2]?.url} className="w-full h-full object-cover opacity-50 blur-[1px]"
                         alt="hint"/>
                  </div>
                  <div
                    className="h-full w-full rounded-2xl border-2 border-dashed border-blue-600 dark:border-blue-900 bg-white dark:bg-slate-900 backdrop-blur-sm flex flex-col items-center justify-center gap-2 transition-all">
                    <div className="p-3 bg-blue-700 text-white rounded-full shadow-lg">
                      <MoreHorizontal size={24}/>
                    </div>
                    <span className="text-sm font-black text-blue-700">+{projectImages.length - 2} More</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div
            className="bg-slate-200/50 dark:bg-slate-900 p-8 rounded-[2rem] h-fit border border-slate-200 dark:border-slate-800 sticky top-24">
            <h3
              className="font-black text-slate-400 dark:text-white/50 mb-4 uppercase tracking-widest text-[10px]">
              {t.techHeader}
            </h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.split(/[,&]+/).map(item => (
                <span key={item}
                      className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-950 dark:text-slate-300 font-bold shadow-sm">{item.trim()}</span>
              ))}
            </div>

            <hr className="border-slate-200 dark:border-slate-800 mb-6"/>

            <h3 className="font-black text-slate-400 dark:text-white/50 mb-2 uppercase tracking-widest text-[10px]">
              {t.roleHeader}
            </h3>
            <p className="text-slate-900 dark:text-white font-extrabold text-lg">
              {project.myRole?.[lang] || project.myRole?.['en']}
            </p>
          </div>
        </aside>
      </div>

      <AnimatePresence>
        {showFullGallery && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 z-[100] bg-slate-50 dark:bg-slate-950 overflow-y-auto showcase-scrollbar"
          >
            <div
              className="sticky top-0 z-50 flex justify-between items-center px-6 py-5 bg-slate-50/98 dark:bg-slate-950/98 backdrop-blur-3xl border-b border-slate-200 dark:border-slate-800 shadow-md transition-colors duration-300">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFullGallery(false)}
                  className="p-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-2xl text-slate-950 dark:text-white transition-all active:scale-90"
                >
                  <X size={24}/>
                </button>
                <span className="h-8 w-[1px] bg-slate-300 dark:bg-slate-700"/>
                <div className="flex flex-col text-start">
                  <h3
                    className="font-black text-slate-900 dark:text-white text-base md:text-xl tracking-tight leading-none mb-1">
                    {project.title?.[lang]}
                  </h3>
                  <p
                    className="text-[10px] md:text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-widest">
                    {project.desc?.[lang]}
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-12 md:py-24">
              {projectImages.map((imgObj, idx) => (
                <motion.div key={idx} ref={(el) => (imageRefs.current[idx] = el)} className="mb-40 last:mb-0">
                  <div className="flex flex-col gap-12 text-start">
                    <div
                      className="relative overflow-hidden rounded-[2rem] md:rounded-[3.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                      <img src={imgObj.url} alt="view" className="w-full h-auto"/>
                    </div>
                    <div className="max-w-3xl flex items-start gap-8">
                      <span
                        className="text-7xl md:text-9xl font-black text-slate-200 dark:text-slate-900 select-none leading-none">
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>
                      <div className="pt-4 md:pt-8">
                        <h4 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                          {imgObj.title?.[lang]}
                        </h4>
                        <div className="w-20 h-2 bg-blue-700 rounded-full mb-8"/>
                        <p
                          className="text-xl md:text-2xl text-slate-700 dark:text-slate-400 leading-relaxed font-medium">
                          {imgObj.desc?.[lang]}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <footer className="py-20 text-center">
              <button onClick={() => {
                setShowFullGallery(false);
                window.scrollTo({top: 0, behavior: 'smooth'});
              }}
                      className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-12 py-5 rounded-full font-black text-lg shadow-xl hover:scale-105 transition-transform">
                {lang === 'fa' ? 'بستن و خروج' : 'Close Showcase'}
              </button>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ProjectDetails;