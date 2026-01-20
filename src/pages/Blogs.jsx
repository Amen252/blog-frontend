import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/posts/${post._id}`)}
      className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
    >
      <div className="p-8 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">
            {post.category}
          </span>
          <span className="text-slate-400 text-xs font-medium">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors line-clamp-2 uppercase tracking-tight">
          {post.title}
        </h3>

        <p className="text-slate-500 leading-relaxed mb-8 line-clamp-3 text-sm">
          {post.content}
        </p>

        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            {post.author?.name?.charAt(0)}
          </div>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {post.author?.name || 'Anonymous'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;