const testimonials = [
    {
        name: 'Ismail Abdifadil',
        role: 'Senior Software Engineer',
        text: "The developer experience here is second to none. It feels like a platform built by devs, for devs.",
        company: 'Full Stack Developer - JTECH',
        // Updated path to point to your public folder
        avatar: '/images/ismail.jpeg' 
    },
    {
        name: 'Mohamed A.Omar',
        role: 'CEO & Founder of DevBlog',
        text: "Speed and simplicity are at the core of this blog app. It's the perfect medium for technical storytelling.",
        company: 'Devblog-co',
        avatar: '/images/Mao.jpeg'
    },
    {
        name: 'Sadak Mohamed Ali',
        role: 'React Core Team',
        text: "I appreciate the attention to detail in the typography and code snippets. It makes reading technical content a joy.",
        company: 'Full Stack Developer',
        avatar: '/images/sadak.jpeg'
    }
];

const Testimonials = () => {
    return (
        <section className="bg-white py-24 border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-16 block text-center">
                    Community Feedback
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {testimonials.map((t, index) => (
                        <div key={index} className="flex flex-col">
                            <div className="flex items-center gap-3 mb-6">
                                <img
                                    src={t.avatar}
                                    alt={t.name}
                                    // object-cover ensures real photos don't look stretched
                                    className="w-10 h-10 rounded-full border border-slate-100 grayscale hover:grayscale-0 transition-all duration-300 object-cover"
                                />
                                <div>
                                    <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-wider leading-none mb-1">
                                        {t.name}
                                    </h4>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                                        {t.company}
                                    </p>
                                </div>
                            </div>
                            <blockquote className="text-slate-600 text-sm leading-relaxed lowercase tracking-tight">
                                "{t.text}"
                            </blockquote>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;