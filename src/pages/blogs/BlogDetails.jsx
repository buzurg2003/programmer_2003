import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {ArrowLeft, Calendar, Tag, Clock, Quote} from 'lucide-react';
// Import your JSON file
import blogData from '../../data/blog/blog_data.json';

const BlogDetails = () => {
  const {id} = useParams();
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

  useEffect(() => {
    const handleStorageChange = () => {
      const currentLang = localStorage.getItem('lang') || 'en';
      setLang(currentLang);
      // Set direction: Tajik and English = ltr, Persian = rtl
      document.documentElement.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
    };
    window.addEventListener('storage', handleStorageChange);
    handleStorageChange();
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // ✅ THE FIX: Access the language object first, then the "posts" array
  const currentLangData = blogData[lang] || blogData['en'];

  // Now we can use .find() because currentLangData.posts is an ARRAY
  const post = currentLangData.posts?.find((b) => b.id === parseInt(id));

  if (!post) {
    return (
      <div className="p-20 text-center font-bold dark:text-white uppercase tracking-widest">
        Article Not Found
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-20 text-start">
      {/* Back Button */}
      <Link
        to="/blog"
        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 font-bold transition-colors"
      >
        <ArrowLeft size={20} className={lang === 'fa' ? 'rotate-180' : ''}/>
        {currentLangData.backText || (lang === 'fa' ? 'بازگشت' : lang === 'tj' ? 'Бозгашт' : 'Back')}
      </Link>

      <header className="mb-12">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm font-bold text-slate-400">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <Calendar size={14} className="text-blue-600"/>
            <span>{post.date}</span>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg uppercase tracking-wider">
            <Tag size={14} className="text-blue-600"/>
            <span>{post.category}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <Clock size={14} className="text-blue-600"/>
            <span>{post.readTime} {currentLangData.readingTime}</span>
          </div>
        </div>

        {/* Title */}
        <h1
          className="text-4xl md:text-6xl font-black text-slate-950 dark:text-white leading-tight mb-8 tracking-tighter">
          {post.title}
        </h1>

        {/* Hero Image */}
        <div
          className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-video border border-slate-200 dark:border-slate-800 bg-slate-200">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover"/>
        </div>
      </header>

      <div className="space-y-8">
        {/* Quote Section */}
        {post.quote && (
          <motion.div
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-3xl border-l-4 border-blue-600 flex gap-4"
          >
            <Quote className="text-blue-600 shrink-0" size={32}/>
            <p className="text-xl font-bold text-slate-800 dark:text-blue-100 italic leading-relaxed">
              {post.quote}
            </p>
          </motion.div>
        )}

        {/* Content Paragraphs (mapping through the array in JSON) */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {post.content?.map((para, index) => (
            <p key={index} className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium mb-6">
              {para}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
};

export default BlogDetails;