import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
                
                {/* Logo - Slightly larger */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-black flex items-center justify-center rounded-md">
                        <span className="text-white font-serif text-xl font-bold">D</span>
                    </div>
                    <span className="font-extrabold tracking-tight text-black text-xl">
                        devblog
                    </span>
                </Link>

                {/* Desktop Links - Larger text and clearer spacing */}
                <div className="hidden md:flex items-center gap-12">
                    <div className="flex gap-10">
                        <Link to="/" className="text-[15px] font-semibold text-slate-600 hover:text-black transition-colors">home</Link>
                        <Link to="/blogs" className="text-[15px] font-semibold text-slate-600 hover:text-black transition-colors">archive</Link>
                        {user && (
                            <Link to="/create" className="text-[15px] font-semibold text-slate-600 hover:text-black transition-colors">write</Link>
                        )}
                    </div>

                    {/* Simple Vertical Divider */}
                    <div className="h-6 w-[1px] bg-slate-200"></div>

                    <div className="flex items-center gap-8">
                        {user ? (
                            <div className="flex items-center gap-8">
                                <span className="text-[15px] font-bold text-black border-b-2 border-black pb-1">{user.name.toLowerCase()}</span>
                                <button
                                    onClick={handleLogout}
                                    className="text-[14px] font-bold text-slate-400 hover:text-red-600 transition-colors uppercase tracking-tighter"
                                >
                                    logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="text-[15px] font-semibold text-slate-600 hover:text-black transition-colors">login</Link>
                                <Link
                                    to="/register"
                                    className="bg-black text-white px-6 py-2.5 text-[14px] font-bold rounded-md hover:bg-slate-800 transition-all active:scale-95"
                                >
                                    sign up
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Icon */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-black focus:outline-none"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu - Simplified */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 px-8 py-10 space-y-8 animate-in fade-in slide-in-from-top-4 duration-200">
                    <Link to="/" className="block text-xl font-bold" onClick={() => setIsOpen(false)}>home</Link>
                    <Link to="/blogs" className="block text-xl font-bold" onClick={() => setIsOpen(false)}>archive</Link>
                    {user && <Link to="/create" className="block text-xl font-bold" onClick={() => setIsOpen(false)}>write</Link>}
                    <hr className="border-slate-100" />
                    {user ? (
                        <button onClick={handleLogout} className="block text-xl font-bold text-red-500">logout</button>
                    ) : (
                        <div className="space-y-6">
                            <Link to="/login" className="block text-xl font-bold" onClick={() => setIsOpen(false)}>login</Link>
                            <Link to="/register" className="block text-xl font-bold text-black" onClick={() => setIsOpen(false)}>sign up</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;