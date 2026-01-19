import { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Since this is a demo/frontend focus, we just simulate success
        setStatus({ type: 'success', message: 'Message sent! We will get back to you soon.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="bg-white min-h-screen py-24">
            <div className="max-w-2xl mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 block">Contact Us</span>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Get in touch</h1>
                </div>

                {status.message && (
                    <div className={`mb-8 p-4 rounded-xl text-xs font-bold uppercase tracking-widest text-center ${status.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 lowercase tracking-tight">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-medium">
                        <div>
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
                    </div>

                    <div>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full border border-slate-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-slate-50 shadow-sm font-medium"
                            placeholder="subject"
                        />
                    </div>

                    <div>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="5"
                            className="w-full border border-slate-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-slate-50 shadow-sm resize-none font-medium"
                            placeholder="message"
                        ></textarea>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full md:w-auto px-12 py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-[11px] rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-100 transform active:scale-95"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
