import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SpecialLetterSection from './components/SpecialLetterSection';
import MemoryTimeline from './components/MemoryTimeline';
import CardStudio from './components/CardStudio';
import GratitudeWall from './components/GratitudeWall';
import QuotesCarousel from './components/QuotesCarousel';
import Footer from './components/Footer';
import QrShareModal from './components/QrShareModal';
import { INITIAL_WALL_POSTS } from './data/wishesData';

const STORAGE_POSTS_KEY = 'trian2011_wall_posts';
const STORAGE_LIKES_KEY = 'trian2011_liked_ids';

export default function App() {
  const [activePage, setActivePage] = useState('home'); // 'home' | 'studio'
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_POSTS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_WALL_POSTS;
    } catch {
      return INITIAL_WALL_POSTS;
    }
  });

  const [likedIds, setLikedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LIKES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_POSTS_KEY, JSON.stringify(posts));
    } catch {
      // Ignore storage quota errors
    }
  }, [posts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LIKES_KEY, JSON.stringify(likedIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [likedIds]);

  const handlePinToWall = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleToggleLike = (postId) => {
    const alreadyLiked = likedIds.includes(postId);
    setLikedIds((prev) =>
      alreadyLiked ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, likes: Math.max(0, post.likes + (alreadyLiked ? -1 : 1)) }
          : post
      )
    );
  };

  const handleNavigate = (page, sectionId) => {
    setActivePage(page);
    if (page === 'home' && sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1E1D1B]">
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenQr={() => setQrModalOpen(true)}
      />
      <main>
        {activePage === 'studio' ? (
          <CardStudio
            onPinToWall={handlePinToWall}
            onBackHome={() => handleNavigate('home')}
            onViewWall={() => handleNavigate('home', 'luu-but')}
          />
        ) : (
          <>
            <HeroSection onOpenStudio={() => handleNavigate('studio')} />
            <SpecialLetterSection />
            <MemoryTimeline />
            <GratitudeWall
              posts={posts}
              likedIds={likedIds}
              onToggleLike={handleToggleLike}
            />
            <QuotesCarousel />
          </>
        )}
      </main>
      <Footer />
      <QrShareModal isOpen={qrModalOpen} onClose={() => setQrModalOpen(false)} />
    </div>
  );
}
