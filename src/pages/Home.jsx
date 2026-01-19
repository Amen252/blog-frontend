import { useEffect, useState } from 'react';
import { getPosts } from '../services/api';
import PostCard from '../components/PostCard';
import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 6;

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await getPosts({ page, limit });
                const data = response.data;

                if (Array.isArray(data)) {
                    setPosts(data.slice(0, limit));
                    setTotalPages(1);
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
        // scroll to top of posts section, not entire page, when changing pages
        if (page > 1) {
            document.getElementById('latest-posts')?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [page]);

    return (
        <>
            <Hero />
            <div id="latest-posts" className="bg-slate-50 min-h-screen py-20 pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                        <div>
                            <span className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] mb-2 block">The Digest</span>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase whitespace-nowrap">Latest stories</h2>
                        </div>
                        <div className="h-[2px] w-full bg-slate-200 mb-2 hidden md:block ml-8"></div>
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
                            {posts.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                                    {posts.map((post) => (
                                        <PostCard key={post._id} post={post} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-slate-500 py-20">No stories found yet.</p>
                            )}

                            {/* Pagination UI */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-8">
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

                                    <button
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
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
            <Testimonials />
        </>
    );
};

export default Home;
