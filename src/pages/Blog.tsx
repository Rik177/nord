import React from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/shared/SEOHelmet';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import Breadcrumbs from '../components/shared/Breadcrumbs';
import { Search, Calendar, User, ArrowRight, Clock, Tag } from 'lucide-react';
import { blogPosts, getAllCategories, getAllTags } from '../data/blogPosts';
import { seoPages } from '../utils/seo';

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('Все посты');
  const [filteredPosts, setFilteredPosts] = React.useState(blogPosts);

  const categories = ['Все посты', ...getAllCategories()];
  const allTags = getAllTags();

  React.useEffect(() => {
    let filtered = blogPosts;

    // Фильтрация по категории
    if (selectedCategory !== 'Все посты') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Фильтрация по поисковому запросу
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Блог НОРДИНЖИНИРИНГ",
    "description": "Полезные статьи о климатических системах и вентиляции",
    "url": "https://nordengineering.ru/blog",
    "publisher": {
      "@type": "Organization",
      "name": "НОРДИНЖИНИРИНГ",
      "url": "https://nordengineering.ru",
      "logo": "https://nordengineering.ru/logo.png"
    },
    "blogPost": filteredPosts.slice(0, 5).map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "url": `https://nordengineering.ru/blog/${post.id}`,
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "image": post.imageUrl
    }))
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHelmet
        {...seoPages.blog}
        structuredData={structuredData}
      />
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              Блог компании
            </h1>
            <p className="text-white/90 text-center max-w-2xl mx-auto">
              Актуальные новости, полезные статьи и экспертные материалы о системах вентиляции и кондиционирования
            </p>
          </div>
        </section>

        {/* Search and Categories */}
        <section className="py-8 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Поиск по блогу..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 px-4 pr-10 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="h-5 w-5 text-gray-400 hover:text-secondary" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredPosts.length === 0 ? (
              <div className="text-center max-w-2xl mx-auto">
                <div className="mb-8">
                  <Search className="h-16 w-16 text-secondary mx-auto" />
                </div>
                <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-4">
                  Статьи не найдены
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  По вашему запросу статьи не найдены. Попробуйте изменить критерии поиска или выберите другую категорию.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('Все посты');
                  }}
                  className="btn btn-primary"
                >
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-card overflow-hidden hover:shadow-card-hover transition-shadow duration-300">
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{formatDate(post.date)}</span>
                        <span className="mx-2">•</span>
                        <User className="h-4 w-4 mr-2" />
                        <span>{post.author}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{post.readTime} мин</span>
                      </div>

                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-secondary/10 text-secondary rounded-full">
                          {post.category}
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-h3-mobile md:text-h3-desktop text-primary dark:text-white mb-3 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center text-secondary hover:text-primary dark:hover:text-white transition-colors"
                      >
                        <span>Читать далее</span>
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white mb-4">
                Подпишитесь на новости
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Будьте в курсе новых статей, технических новинок и полезных советов по климатическому оборудованию
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent dark:bg-gray-900 dark:text-white"
                />
                <button className="btn btn-primary whitespace-nowrap">
                  Подписаться
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;