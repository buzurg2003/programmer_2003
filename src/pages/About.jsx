import {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {MapPin, Baby, Cake, Briefcase} from 'lucide-react';
import aboutUI from '../data/about_ui.json';
import homeUI from '../data/home_ui.json';

const About = () => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setLang(localStorage.getItem('lang') || 'en');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const t = aboutUI[lang] || aboutUI['en'];

  // Get stats from home_ui.json based on language
  const homeStats = homeUI.content[lang]?.stats || homeUI.content['en'].stats;

  // Extract specific values from the stats array
  const yearsExpValue = homeStats[0]?.value || "1";
  const projectsDoneValue = homeStats[1]?.value || "2+";

  const skills = t.skills || [];
  const services = t.services || [];
  const certificates = t.certificates || [];
  const education = t.education || [];
  const experience = t.experience || []; // New Experience Data
  const personal = t.personalInfo || {};

  return (
    <section className="max-w-6xl mx-auto px-4 py-24 min-h-screen">

      {/* 1. Header Section */}
      <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">{t.title}</h1>
        <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full"></div>
      </motion.div>

      {/* 2. Profile Section */}
      <div className="grid md:grid-cols-3 gap-12 items-start mb-32">
        <div className="space-y-6">
          <motion.div initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}}
                      className="relative group mx-auto md:mx-0 w-64 h-64 md:w-full md:h-auto">
            <div
              className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div
              className="relative aspect-square overflow-hidden rounded-full border-4 border-white dark:border-slate-800 shadow-2xl">
              <img src="/assets/images/profile.jpg" alt="Profile"
                   className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 transform hover:scale-105"/>
            </div>
          </motion.div>

          {/* Personal Info Card */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.2}}
            className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm space-y-4"
          >
            <div className="flex items-center gap-4 text-start">
              <div
                className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                <MapPin size={20}/>
              </div>
              <div>
                <p
                  className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">{personal.locationLabel}</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{personal.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-start">
              <div
                className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                <Baby size={20}/>
              </div>
              <div>
                <p
                  className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">{personal.birthPlaceLabel}</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{personal.birthPlace}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-start">
              <div
                className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
                <Cake size={20}/>
              </div>
              <div>
                <p
                  className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">{personal.birthdayLabel}</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{personal.birthday}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <motion.div initial={{opacity: 0, x: lang === 'fa' ? -20 : 20}} animate={{opacity: 1, x: 0}}
                      className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-blue-400 mb-4 text-start">{t.storyTitle}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-start">{t.intro}</p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-start">{t.journey}</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <div
              className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl text-center border border-blue-100 dark:border-blue-800/30">
              <span className="block text-3xl font-bold text-blue-600">{yearsExpValue}</span>
              <span
                className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold">{t.expLabel}</span>
            </div>
            <div
              className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl text-center border border-indigo-100 dark:border-indigo-800/30">
              <span className="block text-3xl font-bold text-indigo-600">{projectsDoneValue}</span>
              <span
                className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold">{t.projectLabel}</span>
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3 text-start">
              <span
                className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center rounded-xl text-blue-600 text-lg">⚡</span>
              {t.skillsTitle}
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.span whileHover={{y: -2}} key={index}
                             className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-sm">
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. NEW Experience Section */}
      <div className="mb-32">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 flex items-center gap-3 text-start">
          <span
            className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center rounded-2xl text-blue-600 text-xl">
            <Briefcase size={24}/>
          </span>
          {t.experienceTitle}
        </h2>

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{opacity: 0, x: -30}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              className="relative pl-8 border-l-2 border-gray-100 dark:border-slate-800 hover:border-blue-600 transition-colors duration-500"
            >
              <div
                className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-2 border-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>

              <div
                className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all text-start">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">{exp.role}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-bold">{exp.company}</p>
                  </div>
                  <span
                    className="inline-block px-4 py-1.5 rounded-full bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400 text-xs font-black border border-gray-100 dark:border-slate-700 w-fit">
                    {exp.duration}
                  </span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {exp.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. Education Section */}
      <div className="mb-32">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 flex items-center gap-3 text-start">
          <span
            className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center rounded-2xl text-emerald-600 text-xl">🎓</span>
          {t.educationTitle}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{opacity: 0, y: 30}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: index * 0.1}}
              className="relative group h-full"
            >
              <div
                className="absolute -inset-2 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <div
                className="relative h-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-500 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                    </svg>
                  </div>
                  <span
                    className="text-xs font-black bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400 px-4 py-1.5 rounded-full border border-gray-100 dark:border-slate-700 tracking-tighter">
                    {edu.duration}
                  </span>
                </div>

                <div className="text-start flex-1">
                  <h3
                    className="text-xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-emerald-500 transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-bold text-sm mb-4">
                    {edu.school}
                  </p>
                  <div
                    className="w-8 h-1 bg-emerald-500 rounded-full mb-4 group-hover:w-16 transition-all duration-500"></div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {edu.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 5. Services Section */}
      <div className="mb-32">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-start">
          <span
            className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center rounded-2xl text-indigo-600 inline-flex mr-3">🛠️</span>
          {t.servicesTitle}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10 text-start ml-1 mr-1">{t.servicesSubtitle}</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div key={index} whileHover={{y: -5}}
                        className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl group text-start">
              <div
                className="text-4xl mb-6 w-16 h-16 bg-gray-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 6. Certificates Section */}
      <div className="pt-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 flex items-center gap-3 text-start">
          <span
            className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center rounded-2xl text-amber-600 text-xl">📜</span>
          {t.certificatesTitle}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              className="group bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col"
            >
              <div onClick={() => setSelectedCert(cert)}
                   className="relative aspect-[4/3] overflow-hidden cursor-zoom-in">
                <img src={cert.image} alt={cert.title}
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                <div
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span
                    className="text-white font-bold bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">{t.certificatesViewDetailsButton}</span>
                </div>
              </div>
              <div className="p-6 text-start flex-1 flex flex-col justify-between">
                <div>
                  <span
                    className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest">{cert.org}</span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2 leading-tight">{cert.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm font-medium">{cert.date}</p>
                </div>
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer"
                     className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 bg-gray-50 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-gray-700 dark:text-gray-300 rounded-xl transition-all font-semibold text-sm border border-gray-100 dark:border-slate-700">
                    <span>{t.certificatesLinkText}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                      onClick={() => setSelectedCert(null)}
                      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out">
            <motion.div initial={{scale: 0.8, opacity: 0}} animate={{scale: 1, opacity: 1}}
                        exit={{scale: 0.8, opacity: 0}}
                        className="relative max-w-5xl w-full flex flex-col items-center gap-6"
                        onClick={(e) => e.stopPropagation()}>
              <img src={selectedCert.image} alt={selectedCert.title} className="w-full h-auto rounded-xl shadow-2xl"/>
              <div className="flex gap-4">
                {selectedCert.link && (
                  <a href={selectedCert.link} target="_blank" rel="noopener noreferrer"
                     className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold shadow-xl flex items-center gap-2">
                    {t.certificatesLinkText}
                  </a>
                )}
                <button onClick={() => setSelectedCert(null)}
                        className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-bold backdrop-blur-md border border-white/20 transition-all">
                  {t.certificatesCloseButton}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;