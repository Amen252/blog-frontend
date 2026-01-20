import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, deletePost } from "../services/api";
import AuthContext from "../context/AuthContext";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPost(id);
        setPost(response.data);
      } catch (err) {
        setError("Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id);
        navigate("/");
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete post");
      }
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen text-slate-400 font-bold uppercase tracking-widest animate-pulse">Loading Story...</div>;
  if (error || !post) return <div className="text-center mt-20 text-red-500 font-bold px-4">{error || "Post not found"}</div>;

  // Check if the current user is the owner of the post
  const isOwner = user && post.author && user._id === post.author._id;

  return (
    <div className="bg-slate-50 min-h-screen pt-12 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition font-black text-xs uppercase tracking-widest"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Feed
        </button>

        <article className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {/* Hero Header */}
          <div className="bg-slate-900 px-6 py-16 md:px-16 md:py-24 text-center">
            <span className="inline-block px-4 py-1.5 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-6xl font-black text-white leading-tight mb-8 tracking-tighter uppercase">
              {post.title}
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-slate-400">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold border-2 border-indigo-400 shadow-lg">
                  {post.author?.name?.charAt(0)}
                </div>
                <span className="text-white font-bold uppercase tracking-wider text-sm">{post.author?.name}</span>
              </div>
              <div className="hidden md:block h-4 border-l border-slate-700"></div>
              <div className="text-xs font-bold uppercase tracking-widest">
                {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="px-6 py-12 md:px-20 md:py-20">
            <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">
              {post.content}
            </div>

            {/* Ownership Actions */}
            {isOwner && (
              <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate(`/edit/${post._id}`)}
                  className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
                >
                  Edit Story
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-4 bg-white text-red-500 border-2 border-red-50 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-50 hover:border-red-100 transition flex items-center justify-center gap-2"
                >
                  Delete Story
                </button>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostDetail;