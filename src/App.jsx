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
import {
  createWallPost,
  fetchWallPosts,
  getLikedIds,
  saveLikedIds,
  updatePostLikes,
} from './services/databaseService';

export default function App() {
  const [activePage, setActivePage] = useState('home'); // 'home' | 'studio'
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [posts, setPosts] = useState(INITIAL_WALL_POSTS);
  const [likedIds, setLikedIds] = useState(() => getLikedIds());

  useEffect(() => {
    fetchWallPosts().then((loaded) => setPosts(loaded));
  }, []);

  useEffect(() => {
    saveLikedIds(likedIds);
  }, [likedIds]);

  const handlePinToWall = async (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
    const saved = await createWallPost(newPost);
    if (saved.id !== newPost.id) {
      setPosts((prev) => prev.map((p) => (p.id === newPost.id ? saved : p)));
    }
  };

  const handleToggleLike = (postId) => {
    const alreadyLiked = likedIds.includes(postId);
    setLikedIds((prev) =>
      alreadyLiked ? prev.filter((id) => id !== postId) : [...prev, postId]
    );

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const nextLikes = Math.max(0, post.likes + (alreadyLiked ? -1 : 1));
        updatePostLikes(postId, nextLikes);
        return { ...post, likes: nextLikes };
      })
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
