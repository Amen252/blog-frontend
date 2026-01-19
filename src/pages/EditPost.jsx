import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost, updatePost } from '../services/api';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await getPost(id);
                const { title, content, category } = response.data;
                setFormData({ title, content, category: category || 'General' });
            } catch (err) {
                setError('Failed to load post data');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updatePost(id, formData);
            navigate(`/posts/${id}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update post');
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-indigo-600">Edit Post</h2>
            {error && <p className="text-red-500 mb-4 bg-red-50 p-3 rounded">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-slate-700 font-medium mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-slate-700 font-medium mb-2">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-slate-700 font-medium mb-2">Content</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows="10"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    ></textarea>
                </div>
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="flex-grow bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-lg"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 bg-slate-200 text-slate-700 py-3 rounded-lg font-bold hover:bg-slate-300 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPost;
