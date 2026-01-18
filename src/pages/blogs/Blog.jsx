import {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import blogData from '../../data/blog/blog_data.json';

const Blog = () => {
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

  // ✅ Step 1: Get the data for the current language
  const currentLangData = blogData[lang] || blogData['en'];

  // ✅ Step 2: Get the posts array safely
  const posts = currentLangData.posts || [];

  return (
    <section className="max-w-7xl mx-auto px-4 py-20 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-gray-950 dark:text-white uppercase">
          {currentLangData.title}
        </h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 font-medium">
          {currentLangData.subtitle}
        </p>
        <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full mt-6"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-start">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-slate-800 flex flex-col h-full"
          >
            <div className="h-52 overflow-hidden bg-gray-100 dark:bg-slate-800">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-black rounded-full uppercase tracking-widest">
                  {post.category}
                </span>
                <span className="text-gray-400 dark:text-gray-500 text-xs font-bold">
                  {post.date}
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-gray-950 dark:text-white mb-2 leading-tight">
                {post.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 font-medium leading-relaxed">
                {post.excerpt}
              </p>

              <div
                className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                <Link
                  to={`/blog/${post.id}`}
                  className="text-blue-700 dark:text-blue-400 font-black text-sm uppercase hover:underline"
                >
                  {currentLangData.readMore}
                </Link>
                <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase">
                  <span>{post.readTime}</span>
                  <span>{currentLangData.readingTime}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Blog;