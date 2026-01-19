
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative bg-slate-900 pt-32 pb-24 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 mb-8 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">The Future of Tech Writing</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 text-white leading-[1.1]">
                    Where Code Meets <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400 animate-gradient-x">Human Creativity</span>
                </h1>

                <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Join thousands of developers sharing their journey, technical insights, and the stories behind the code.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                    <Link
                        to="/register"
                        className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:-translate-y-1"
                    >
                        Start Your Story
                    </Link>
                    <a
                        href="#latest-posts"
                        className="w-full sm:w-auto px-10 py-4 bg-slate-800 text-white border border-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-700 transition-all backdrop-blur-sm"
                    >
                        Explore Feed
                    </a>
                </div>

                {/* Stat Icons or Social Proof */}
                <div className="mt-20 pt-10 border-t border-slate-800/50 flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-white">50k+</span>
                        <span className="text-sm text-slate-500 uppercase tracking-widest">Readers</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-white">10k+</span>
                        <span className="text-sm text-slate-500 uppercase tracking-widest">Articles</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-white">100%</span>
                        <span className="text-sm text-slate-500 uppercase tracking-widest">Developer Focused</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
