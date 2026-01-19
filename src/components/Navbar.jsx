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
        <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 md:h-20 flex justify-between items-center relative z-[60] bg-white">
                
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="w-9 h-9 bg-black flex items-center justify-center rounded-lg">
                        <span className="text-white font-serif text-lg font-bold">D</span>
                    </div>
                    <span className="font-black tracking-tighter text-black text-lg md:text-xl">
                        devblog
                    </span>
                </Link>

                {/* Desktop Links (Hidden on Mobile) */}
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
                                <span className="text-sm font-black text-black bg-slate-100 px-3 py-1 rounded-full uppercase">{user.name}</span>
                                <button onClick={handleLogout} className="text-[12px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest">logout</button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-bold text-slate-500 hover:text-black">login</Link>
                                <Link to="/register" className="bg-black text-white px-5 py-2 text-sm font-bold rounded-full">sign up</Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Hamburger Icon */}
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

            {/* Mobile Drawer - Dropping from top, not full screen */}
            <div className={`
                md:hidden absolute left-0 right-0 bg-white border-b border-slate-100 shadow-2xl shadow-slate-200/50 transition-all duration-300 ease-in-out z-40
                ${isOpen ? 'top-full opacity-100' : '-top-96 opacity-0 pointer-events-none'}
            `}>
                <div className="flex flex-col p-6 space-y-5">
                    <Link to="/" className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-2" onClick={() => setIsOpen(false)}>home</Link>
                    <Link to="/blogs" className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-2" onClick={() => setIsOpen(false)}>archive</Link>
                    {user && <Link to="/create" className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-2" onClick={() => setIsOpen(false)}>write</Link>}
                    
                    <div className="pt-2 flex flex-col gap-4">
                        {user ? (
                            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl">
                                <span className="text-sm font-bold text-slate-500 uppercase">{user.name}</span>
                                <button onClick={handleLogout} className="text-sm font-bold text-red-500">logout</button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Link to="/login" className="w-full py-3 text-center font-bold text-slate-900 bg-slate-50 rounded-xl" onClick={() => setIsOpen(false)}>login</Link>
                                <Link to="/register" className="w-full py-3 text-center font-bold text-white bg-black rounded-xl" onClick={() => setIsOpen(false)}>sign up</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;