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
        console.error(err);
        setError(err.response?.data?.message || "Failed to delete post");
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-slate-500 font-medium">
        Loading post...
      </div>
    );
  if (error)
    return (
      <div className="text-center mt-20 text-red-500 font-bold px-4">
        {error}
      </div>
    );
  if (!post)
    return (
      <div className="text-center mt-20 text-slate-600 font-bold px-4">
        Post not found
      </div>
    );

  return (
    <div className="bg-slate-50 min-h-screen pt-6 pb-12 md:pt-12 md:pb-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button - More compact on mobile */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 md:mb-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition font-bold text-sm md:text-base"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Feed
        </button>

        <article className="bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {/* Hero Section - Reduced padding for mobile */}
          <div className="bg-slate-900 px-6 py-10 md:px-16 md:py-16 text-center">
            <span className="inline-block px-3 py-1 bg-indigo-500 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] rounded-full mb-4 md:mb-6">
              {post.category}
            </span>
            <h1 className="text-2xl md:text-5xl font-black text-white leading-tight mb-6 md:mb-8">
              {post.title}
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-slate-400">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold border-2 border-indigo-400 shadow-lg text-sm">
                  {post.author?.name?.charAt(0)}
                </div>
                <span className="text-white font-bold text-sm md:text-base">
                  {post.author?.name}
                </span>
              </div>
              <div className="hidden md:block h-4 border-l border-slate-700"></div>
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>
                  {new Date(post.createdAt).toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section - Responsive horizontal padding */}
          <div className="px-6 py-10 md:px-20 md:py-16">
            <div className="prose prose-slate prose-base md:prose-lg max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>

            {/* Actions Section */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col items-center gap-8">
              {user && post.author && user._id === post.author._id ? (
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                  {/* Full-width buttons on mobile, auto-width on desktop */}
                  <button
                    onClick={() => navigate(`/edit/${post._id}`)}
                    className="w-full sm:flex-1 md:flex-none md:px-10 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 active:scale-95"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit Post
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full sm:flex-1 md:flex-none md:px-10 py-4 text-red-600 font-bold hover:bg-red-50 rounded-xl transition flex items-center justify-center gap-2 active:scale-95"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              ) : (
                <div className="text-slate-400 text-sm italic text-center">
                  Enjoyed this post? Share it with your friends!
                </div>
              )}

              {/* Share Buttons - Responsive Alignment */}
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Share
                </span>
                <div className="flex gap-3">
                  <button className="p-3.5 rounded-full border border-slate-100 hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-90">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </button>
                  <button className="p-3.5 rounded-full border border-slate-100 hover:bg-indigo-50 hover:text-indigo-600 transition-all active:scale-90">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostDetail;
