import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SpecialLetterSection from './components/SpecialLetterSection';
import MemoryTimeline from './components/MemoryTimeline';
import CardStudio from './components/CardStudio';
import GratitudeWall from './components/GratitudeWall';
import QuotesCarousel from './components/QuotesCarousel';
import Footer from './components/Footer';
import QrShareModal from './components/QrShareModal';
import WishDetailView from './components/WishDetailView';
import { INITIAL_WALL_POSTS } from './data/wishesData';
import {
  createWallPost,
  fetchWallPosts,
  getLikedIds,
  saveLikedIds,
  updatePostLikes,
} from './services/databaseService';

function encodeCardPayload(post) {
  try {
    const json = JSON.stringify({
      t: post.teacherName,
      s: post.senderName,
      c: post.category,
      th: post.themeId,
      m: post.message,
      d: post.date,
    });
    return btoa(unescape(encodeURIComponent(json)));
  } catch {
    return '';
  }
}

function decodeCardPayload(encoded, id) {
  try {
    const json = decodeURIComponent(escape(atob(encoded)));
    const parsed = JSON.parse(json);
    return {
      id,
      teacherName: parsed.t || 'Quý Thầy Cô',
      senderName: parsed.s || 'Học trò',
      category: parsed.c || 'chu-nhiem',
      themeId: parsed.th || 'chalkboard',
      message: parsed.m || '',
      likes: 1,
      date: parsed.d || '20/11',
    };
  } catch {
    return null;
  }
}

function buildWishUrl(post) {
  const base = `${window.location.origin}${window.location.pathname}`;
  const isBuiltIn = INITIAL_WALL_POSTS.some((p) => p.id === post.id);
  if (isBuiltIn) {
    return `${base}?wish=${encodeURIComponent(post.id)}`;
  }
  const encoded = encodeCardPayload(post);
  return encoded
    ? `${base}?wish=${encodeURIComponent(post.id)}&d=${encodeURIComponent(encoded)}`
    : `${base}?wish=${encodeURIComponent(post.id)}`;
}

export default function App() {
  const [activePage, setActivePage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('wish') ? 'wish' : 'home';
  });
  const [selectedWishId, setSelectedWishId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('wish') || null;
  });
  const [qrState, setQrState] = useState({ open: false, url: '', title: '' });
  const [posts, setPosts] = useState(INITIAL_WALL_POSTS);
  const [likedIds, setLikedIds] = useState(() => getLikedIds());

  useEffect(() => {
    fetchWallPosts().then((loaded) => setPosts(loaded));
  }, []);

  useEffect(() => {
    saveLikedIds(likedIds);
  }, [likedIds]);

  const activeWishPost = useMemo(() => {
    if (!selectedWishId) return null;
    const found = posts.find((p) => p.id === selectedWishId);
    if (found) return found;

    const encoded = new URLSearchParams(window.location.search).get('d');
    return encoded ? decodeCardPayload(encoded, selectedWishId) : null;
  }, [posts, selectedWishId]);

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
    if (page !== 'wish') {
      setSelectedWishId(null);
      window.history.pushState({}, '', window.location.pathname);
    }

    if (page === 'home' && sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleViewPost = (post) => {
    setSelectedWishId(post.id);
    setActivePage('wish');
    window.history.pushState({}, '', buildWishUrl(post));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCardQr = (post) => {
    setQrState({
      open: true,
      url: buildWishUrl(post),
      title: `Mã QR Thiệp Gửi ${post.teacherName}`,
    });
  };

  const handleOpenSiteQr = () => {
    setQrState({
      open: true,
      url: `${window.location.origin}${window.location.pathname}`,
      title: 'Quét Mã Để Mở Trang 20/11',
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1E1D1B]">
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenQr={handleOpenSiteQr}
      />
      <main>
        {activePage === 'studio' ? (
          <CardStudio
            onPinToWall={handlePinToWall}
            onBackHome={() => handleNavigate('home')}
            onViewWall={() => handleNavigate('home', 'luu-but')}
          />
        ) : activePage === 'wish' ? (
          <WishDetailView
            post={activeWishPost}
            isLiked={activeWishPost ? likedIds.includes(activeWishPost.id) : false}
            onToggleLike={handleToggleLike}
            onOpenQr={handleOpenCardQr}
            onBackHome={() => handleNavigate('home')}
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
              onOpenCardQr={handleOpenCardQr}
              onViewPost={handleViewPost}
            />
            <QuotesCarousel />
          </>
        )}
      </main>
      <Footer />
      <QrShareModal
        isOpen={qrState.open}
        onClose={() => setQrState((prev) => ({ ...prev, open: false }))}
        targetUrl={qrState.url}
        title={qrState.title}
      />
    </div>
  );
}
