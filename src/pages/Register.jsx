import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData.name, formData.email, formData.password);
            navigate('/');
        } catch (err) {
            console.error('Registration Error:', err);
            setError(err.response?.data?.message || 'Registration failed - Check console');
        }
    };

    return (
        <div className="bg-white min-h-screen py-32">
            <div className="max-w-md mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 block">Joining</span>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">New Account</h1>
                </div>

                {error && (
                    <div className="mb-8 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-center bg-red-50 text-red-600">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 lowercase tracking-tight">
                    <div className="space-y-6">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-slate-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-slate-50 shadow-sm"
                                placeholder="name"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-slate-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-slate-50 shadow-sm"
                                placeholder="email"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full border border-slate-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-slate-50 shadow-sm"
                                placeholder="password"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full px-12 py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-[11px] rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-100 transform active:scale-95"
                        >
                            Create Account
                        </button>
                    </div>
                </form>

                <div className="mt-12 text-center">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">Already a member?</p>
                    <Link to="/login" className="text-slate-900 text-xs font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
