import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        setIsOpen(false);
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
            {/* Height reduced from h-24 to h-18 for a tighter look */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 md:h-20 flex justify-between items-center">
                
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="w-9 h-9 bg-black flex items-center justify-center rounded-lg transition-transform group-hover:rotate-6">
                        <span className="text-white font-serif text-lg font-bold">D</span>
                    </div>
                    <span className="font-black tracking-tighter text-black text-lg md:text-xl">
                        devblog
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex gap-8">
                        <Link to="/" className="text-sm font-bold text-slate-500 hover:text-black transition-colors">home</Link>
                        <Link to="/blogs" className="text-sm font-bold text-slate-500 hover:text-black transition-colors">archive</Link>
                        {user && (
                            <Link to="/create" className="text-sm font-bold text-slate-500 hover:text-black transition-colors">write</Link>
                        )}
                    </div>

                    <div className="h-5 w-[1px] bg-slate-200"></div>

                    <div className="flex items-center gap-6">
                        {user ? (
                            <div className="flex items-center gap-6">
                                <span className="text-sm font-black text-black bg-slate-100 px-3 py-1 rounded-full">
                                    {user.name.toLowerCase()}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="text-[12px] font-black text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest"
                                >
                                    logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-bold text-slate-500 hover:text-black transition-colors">login</Link>
                                <Link
                                    to="/register"
                                    className="bg-black text-white px-5 py-2 text-sm font-bold rounded-full hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
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
                    className="md:hidden p-2 -mr-2 text-black focus:outline-none"
                >
                    <div className="w-6 h-5 flex flex-col justify-between items-end">
                        <span className={`h-0.5 bg-black transition-all duration-300 ${isOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'}`}></span>
                        <span className={`h-0.5 bg-black transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-4'}`}></span>
                        <span className={`h-0.5 bg-black transition-all duration-300 ${isOpen ? 'w-6 -translate-y-2.5 -rotate-45' : 'w-5'}`}></span>
                    </div>
                </button>
            </div>

            {/* Mobile Menu - Drawer Style */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 fixed inset-x-0 top-[72px] bottom-0 z-40 animate-in slide-in-from-top-2 duration-300">
                    <div className="flex flex-col p-8 space-y-6">
                        <Link to="/" className="text-3xl font-black tracking-tighter" onClick={() => setIsOpen(false)}>home</Link>
                        <Link to="/blogs" className="text-3xl font-black tracking-tighter" onClick={() => setIsOpen(false)}>archive</Link>
                        {user && <Link to="/create" className="text-3xl font-black tracking-tighter" onClick={() => setIsOpen(false)}>write</Link>}
                        
                        <div className="h-[1px] bg-slate-100 w-full my-4"></div>
                        
                        {user ? (
                            <div className="space-y-6">
                                <div className="text-sm text-slate-400 font-bold uppercase tracking-widest">Logged in as {user.name}</div>
                                <button onClick={handleLogout} className="text-3xl font-black tracking-tighter text-red-500">logout</button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6">
                                <Link to="/login" className="text-3xl font-black tracking-tighter" onClick={() => setIsOpen(false)}>login</Link>
                                <Link to="/register" className="text-3xl font-black tracking-tighter text-indigo-600" onClick={() => setIsOpen(false)}>sign up</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;