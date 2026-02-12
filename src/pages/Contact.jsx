import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram } from 'lucide-react';
import contactData from '../data/contact_ui.json';
import { SiUpwork } from "react-icons/si";

const MediumIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

const UpworkIcon = () => (
  <SiUpwork size={24} />
);

const Contact = () => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

  // State to capture form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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

  const t = contactData.translations[lang] || contactData.translations.en;

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle "Send Message" via mailto
  const handleSendEmail = (e) => {
    e.preventDefault();

    const myEmail = "";
    const subject = encodeURIComponent(`New Portfolio Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );

    // This opens the default email client
    window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;
  };

  const getIcon = (id) => {
    switch (id) {
      case 'github': return <Github size={24} />;
      case 'linkedin': return <Linkedin size={24} />;
      case 'instagram': return <Instagram size={24} />;
      case 'upwork': return <UpworkIcon />;
      default: return null;
    }
  };

  const getHoverColor = (id) => {
    switch (id) {
      case 'github': return 'hover:text-gray-950 dark:hover:text-white';
      case 'linkedin': return 'hover:text-blue-600';
      case 'instagram': return 'hover:text-pink-500';
      case 'upwork': return 'hover:text-emerald-500';
      default: return 'hover:text-blue-500';
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800"
      >
        <h1 className="text-3xl font-bold text-gray-950 dark:text-white mb-2 text-center antialiased">
          {t.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8 font-medium">
          {t.subtitle}
        </p>

        <div className="flex justify-center gap-8 mb-10 pb-8 border-b border-gray-100 dark:border-slate-800">
          {contactData.socials.map((social) => (
            <motion.a
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ opacity: 0.8 }}
              className={`text-gray-400 transition-all duration-300 ${getHoverColor(social.id)}`}
              title={social.name}
            >
              {getIcon(social.id)}
            </motion.a>
          ))}
        </div>

        <form onSubmit={handleSendEmail} className="space-y-4">
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-800 border-none ring-1 ring-gray-200 dark:ring-slate-700 focus:ring-2 focus:ring-blue-500 outline-none text-gray-950 dark:text-white text-start font-medium"
            placeholder={t.name}
          />
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-800 border-none ring-1 ring-gray-200 dark:ring-slate-700 focus:ring-2 focus:ring-blue-500 outline-none text-gray-950 dark:text-white text-start font-medium"
            placeholder={t.email}
          />
          <textarea
            name="message"
            rows="5"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-slate-800 border-none ring-1 ring-gray-200 dark:ring-slate-700 focus:ring-2 focus:ring-blue-500 outline-none text-gray-950 dark:text-white text-start font-medium"
            placeholder={t.message}
          ></textarea>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-colors antialiased"
          >
            {t.send}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;