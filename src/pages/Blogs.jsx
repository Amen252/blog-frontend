import { useEffect, useState } from 'react';
import { getPosts } from '../services/api';
import PostCard from '../components/PostCard';

const Blogs = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const limit = 9;

    // Get unique categories from posts
    const categories = ['all', ...new Set(posts.map(post => post.category).filter(Boolean))];

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await getPosts({ page, limit: 100 }); // Fetch more for filtering
                const data = response.data;

                if (Array.isArray(data)) {
                    setPosts(data);
                    setTotalPages(Math.ceil(data.length / limit));
                } else {
                    setPosts(data.posts || []);
                    setTotalPages(data.pages || 1);
                }
            } catch (err) {
                setError('Failed to fetch posts. Ensure backend is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Filter posts based on search and category
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Paginate filtered posts
    const paginatedPosts = filteredPosts.slice((page - 1) * limit, page * limit);
    const calculatedTotalPages = Math.ceil(filteredPosts.length / limit);

    // Reset to page 1 when filters change
    useEffect(() => {
        setPage(1);
    }, [searchQuery, selectedCategory]);

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center max-w-3xl mx-auto">
                        <span className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
                            The Archive
                        </span>
                        <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase mb-6">
                            All Stories
                        </h1>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            Explore our complete collection of insights, tutorials, and stories from the developer community.
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white border-b border-slate-100 sticky top-[72px] md:top-[80px] z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-md">
                            <svg 
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all text-sm font-medium"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                                        selectedCategory === category
                                            ? 'bg-slate-900 text-white'
                                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Results Count */}
                <div className="mb-8">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                        {loading ? 'Loading...' : `${filteredPosts.length} ${filteredPosts.length === 1 ? 'Story' : 'Stories'} Found`}
                    </p>
                </div>

                {loading && (
                    <div className="text-center py-20 font-bold text-slate-400 animate-pulse">
                        Loading stories...
                    </div>
                )}

                {error && (
                    <div className="text-center text-red-500 py-20 font-bold uppercase tracking-widest text-xs">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {paginatedPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                                {paginatedPosts.map((post) => (
                                    <PostCard key={post._id} post={post} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
                                    <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
                                    No stories found matching your criteria.
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedCategory('all');
                                    }}
                                    className="mt-6 px-6 py-3 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-slate-800 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        {calculatedTotalPages > 1 && paginatedPosts.length > 0 && (
                            <div className="flex justify-center items-center gap-4">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="w-12 h-12 bg-white border border-slate-200 rounded-xl disabled:opacity-20 hover:text-indigo-600 hover:border-indigo-100 transition flex items-center justify-center active:scale-90 transform shadow-sm"
                                    title="Previous page"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-black text-slate-900">{page}</span>
                                    <span className="text-sm font-bold text-slate-300">/</span>
                                    <span className="text-sm font-bold text-slate-400">{calculatedTotalPages}</span>
                                </div>

                                <button
                                    onClick={() => setPage(p => Math.min(calculatedTotalPages, p + 1))}
                                    disabled={page === calculatedTotalPages}
                                    className="w-12 h-12 bg-white border border-slate-200 rounded-xl disabled:opacity-20 hover:text-indigo-600 hover:border-indigo-100 transition flex items-center justify-center active:scale-90 transform shadow-sm"
                                    title="Next page"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Blogs;