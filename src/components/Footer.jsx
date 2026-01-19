import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 group mb-6">
                            <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:bg-indigo-700 transition">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <span className="text-xl font-black tracking-tight text-indigo-600">
                                Dev<span className="text-slate-900">Blog</span>
                            </span>
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed lowercase font-medium tracking-tight">
                            The ultimate destination for software engineers to share insights, stories, and the future of code.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 mb-6">Platform</h4>
                        <ul className="space-y-4">
                            <li><Link to="/blogs" className="text-slate-500 hover:text-indigo-600 text-sm font-semibold transition">Feed</Link></li>
                            <li><Link to="/create" className="text-slate-500 hover:text-indigo-600 text-sm font-semibold transition">Write a Story</Link></li>
                            <li><Link to="/register" className="text-slate-500 hover:text-indigo-600 text-sm font-semibold transition">Join Community</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 mb-6">Support</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-slate-500 hover:text-indigo-600 text-sm font-semibold transition">Privacy Policy</a></li>
                            <li><a href="#" className="text-slate-500 hover:text-indigo-600 text-sm font-semibold transition">Terms of Service</a></li>
                            <li><a href="#" className="text-slate-500 hover:text-indigo-600 text-sm font-semibold transition">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 mb-6">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                        © {new Date().getFullYear()} DevBlog. Built with Passion.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Systems Nominal</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
