import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
    return (
        <Link
            to={`/posts/${post._id}`}
            className="group block bg-white border border-slate-200 rounded-2xl p-7 transition-all duration-300 hover:border-slate-400 hover:shadow-xl hover:shadow-slate-100"
        >
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                        {post.category || 'General'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                </div>

                <div className="flex-grow">
                    <h2 className="text-2xl font-black text-slate-900 leading-tight mb-4 group-hover:text-indigo-600 transition-colors">
                        {post.title}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 lowercase tracking-tight">
                        {post.content}
                    </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                        {post.author?.name?.charAt(0) || '?'}
                    </div>
                    <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">
                        {post.author?.name || 'Anonymous'}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default PostCard;
