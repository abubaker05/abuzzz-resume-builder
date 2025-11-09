import { Inter } from 'next/font/google';
import './globals.css';
import { VantaBackground } from '@/components/VantaBackground';
// === THE FIX IS HERE: We import the file directly with its extension ===
import Provider from "./Provider.jsx";
 

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Abuzzz Portfolio Builder',
  description: 'Create and deploy your professional portfolio securely.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* We wrap the entire application in the Session Provider */}
        <Provider> 
          {children}
        </Provider>
      </body>
    </html>
  );
}