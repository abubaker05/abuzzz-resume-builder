// src/app/portfolio/[userId]/page.js

import { getDbCollections } from '@/lib/db-utils'; // Use the getDbCollections utility
import { initialPortfolio } from '@/lib/default-portfolio';
import { ObjectId } from 'mongodb';

// Function to fetch data by user ID
async function getPortfolioData(userId) {
    if (!userId) return null;

    try {
        const { portfoliosCollection } = await getDbCollections(); // Use the corrected utility
        
        // Find the portfolio using the user's ID
        const portfolio = await portfoliosCollection.findOne({ 
            userId: new ObjectId(userId) 
        });

        if (portfolio) {
            // Merge with default to ensure no missing keys and remove the MongoDB _id
            const { _id, userId: dbUserId, ...data } = portfolio;
            return { ...initialPortfolio, ...data };
        } else {
            return null; // 404 not found
        }
    } catch (error) {
        console.error("Public Page DB Error:", error);
        return null; 
    }
}

// Main component that renders the final page
export default async function PublicPortfolioPage({ params }) {
    const { userId } = params;
    
    // Server-side fetching of data
    const data = await getPortfolioData(userId);

    if (!data) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-red-500">
                <h1 className="text-4xl font-extrabold mb-4">404 Portfolio Not Found</h1>
                <p className="text-gray-400">The requested user ID ({userId}) does not exist or has no published data.</p>
            </div>
        );
    }
    
    // --- Final Portfolio Rendering (Dark Theme for consistency) ---
    const { name, title, about, resumeUrl, skills, contactEmail } = data;
    const skillTags = (skills || '').split(',').filter(s => s.trim()).map(s => 
        `<span class="bg-gray-800 text-cyan-400 text-sm font-medium px-4 py-1.5 rounded-full shadow-md">${s.trim()}</span>`
    ).join('');

    return (
        <div className="bg-gray-950 min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto bg-gray-900 text-white shadow-2xl rounded-3xl overflow-hidden border border-cyan-400/50">
                
                <header className="bg-gray-800 text-white p-6 md:p-10 rounded-t-3xl text-center border-b border-cyan-400/50">
                    <div className="w-32 h-32 bg-gray-900 rounded-full mx-auto mb-4 border-4 border-cyan-400 flex items-center justify-center text-cyan-400 text-4xl font-extrabold shadow-lg">
                        {name ? name.charAt(0).toUpperCase() : 'J'}
                    </div>
                    <h1 className="text-4xl font-extrabold mb-1 tracking-wider text-cyan-400">{name || 'John Doe'}</h1>
                    <p className="text-cyan-400 text-xl font-light italic mb-4">{title || 'Creative Developer'}</p>
                    
                    {resumeUrl && (
                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-cyan-600 text-gray-900 px-5 py-2 rounded-full font-bold hover:bg-cyan-700 transition duration-150 shadow-lg">
                            View Resume
                        </a>
                    )}
                </header>
                
                <main className="p-6 md:p-10 space-y-12">
                    
                    <section className="p-5 bg-gray-800 rounded-xl shadow-md border border-cyan-400/30">
                        <h2 className="text-2xl font-bold text-cyan-400 mb-4 border-b border-gray-700 pb-2">About Me</h2>
                        <p className="text-gray-300 leading-relaxed">{about || 'No summary provided.'}</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold text-cyan-400 mb-4 border-b border-gray-700 pb-2">Core Skills</h2>
                        <div className="flex flex-wrap gap-3" dangerouslySetInnerHTML={{ __html: skillTags }}></div>
                    </section>

                </main>
                
                <footer className="pt-6 border-t border-cyan-400/30 mt-10 text-center p-6">
                    <h2 className="text-xl font-bold text-white mb-3">Contact</h2>
                    {contactEmail && (
                        <a href={`mailto:${contactEmail}`} className="text-cyan-400 hover:text-cyan-300 font-medium">
                            {contactEmail}
                        </a>
                    )}
                    <p className="text-sm text-gray-500 mt-4">Built with Abuzzz Portfolio Builder.</p>
                </footer>
            </div>
        </div>
    );
}

// Set dynamic segment behavior (required by Next.js)
export const dynamic = 'force-dynamic';