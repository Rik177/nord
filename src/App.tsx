import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Tools from './pages/Tools';
import NotFound from './pages/NotFound';
import AccessibilityControls from './components/shared/AccessibilityControls';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AccessibilityControls />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;