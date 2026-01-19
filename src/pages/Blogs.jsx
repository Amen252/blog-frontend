import { useEffect, useState } from 'react';
import { getPosts } from '../services/api';
import PostCard from '../components/PostCard';

const Blogs = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // limit of 6 posts per page for pagination to kick in after 6 posts
    const limit = 6;

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await getPosts({ page, limit });
                const data = response.data;

                if (Array.isArray(data)) {
                    // Legacy support for array response
                    setPosts(data);
                    setTotalPages(1);
                } else {
                    // Standard paginated response
                    setPosts(data.posts || []);
                    setTotalPages(data.pages || 1);
                }
            } catch (err) {
                setError('Failed to fetch posts.' , err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
        window.scrollTo(0, 0);
    }, [page]);

    return (
        <div className="bg-slate-50 min-h-screen py-20 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-20">
                    <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Archive</span>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase mb-6">All Stories</h1>
                </div>

                {loading && (
                    <div className="text-center py-20 font-bold text-slate-400 animate-pulse">
                        Loading posts...
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
                            <p className="text-center text-slate-500 py-20">No posts found.</p>
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
    );
};

export default Blogs;