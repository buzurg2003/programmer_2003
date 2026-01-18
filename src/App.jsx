import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import {motion} from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/projects/Projects.jsx';
import ProjectDetails from './pages/projects/ProjectDetails.jsx';
import Contact from './pages/Contact';
import Blog from "./pages/blogs/Blog.jsx";
import BlogDetails from "./pages/blogs/BlogDetails.jsx";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 flex flex-col">
        <Header/>
        <motion.main
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.5}}
          className="pt-20 flex-grow"
        >
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/projects" element={<Projects/>}/>
            <Route path="/projects/:id" element={<ProjectDetails/>}/> {/* Dynamic Route */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/contact" element={<Contact/>}/>

          </Routes>
        </motion.main>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
