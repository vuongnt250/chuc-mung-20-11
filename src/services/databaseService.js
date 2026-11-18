import { INITIAL_WALL_POSTS } from '../data/wishesData';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '');
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const STORAGE_KEYS = {
  posts: 'trian2011_wall_posts_v1',
  likedIds: 'trian2011_liked_ids_v1',
  letterHearts: 'trian2011_letter_hearts_v1',
  letterSent: 'trian2011_letter_sent_v1',
  cardDraft: 'trian2011_card_draft_v1',
};

export const isCloudDatabaseEnabled = Boolean(SUPABASE_URL && SUPABASE_KEY);

function supabaseHeaders(extra = {}) {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

function readLocal(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors
  }
}

// --- Wall Posts ---
export async function fetchWallPosts() {
  const localPosts = readLocal(STORAGE_KEYS.posts, INITIAL_WALL_POSTS);
  if (!isCloudDatabaseEnabled) return localPosts;

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/wishes?select=*&order=created_at.desc`,
      { headers: supabaseHeaders() }
    );
    if (!res.ok) return localPosts;
    const rows = await res.json();
    if (!Array.isArray(rows) || rows.length === 0) return localPosts;

    const mapped = rows.map((r) => ({
      id: r.id,
      teacherName: r.teacher_name,
      senderName: r.sender_name,
      category: r.category,
      themeId: r.theme_id,
      message: r.message,
      likes: r.likes ?? 0,
      date: r.date_label || '20/11',
    }));
    writeLocal(STORAGE_KEYS.posts, mapped);
    return mapped;
  } catch {
    return localPosts;
  }
}

export async function createWallPost(post) {
  const current = readLocal(STORAGE_KEYS.posts, INITIAL_WALL_POSTS);
  const updated = [post, ...current];
  writeLocal(STORAGE_KEYS.posts, updated);

  if (!isCloudDatabaseEnabled) return post;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/wishes`, {
      method: 'POST',
      headers: supabaseHeaders({ Prefer: 'return=representation' }),
      body: JSON.stringify({
        id: post.id,
        teacher_name: post.teacherName,
        sender_name: post.senderName,
        category: post.category,
        theme_id: post.themeId,
        message: post.message,
        likes: post.likes,
        date_label: post.date,
      }),
    });
    if (res.ok) {
      const [inserted] = await res.json();
      if (inserted) {
        return { ...post, id: inserted.id };
      }
    }
  } catch {
    // Fallback already saved in localStorage
  }
  return post;
}

export async function updatePostLikes(postId, newLikes) {
  const current = readLocal(STORAGE_KEYS.posts, INITIAL_WALL_POSTS);
  const updated = current.map((p) => (p.id === postId ? { ...p, likes: newLikes } : p));
  writeLocal(STORAGE_KEYS.posts, updated);

  if (!isCloudDatabaseEnabled) return;

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/wishes?id=eq.${encodeURIComponent(postId)}`, {
      method: 'PATCH',
      headers: supabaseHeaders(),
      body: JSON.stringify({ likes: newLikes }),
    });
  } catch {
    // Ignore network error; local cache is updated
  }
}

// --- Liked IDs (per browser) ---
export function getLikedIds() {
  return readLocal(STORAGE_KEYS.likedIds, []);
}

export function saveLikedIds(ids) {
  writeLocal(STORAGE_KEYS.likedIds, ids);
}

// --- 12A2 Letter Hearts ---
export async function fetchLetterHearts() {
  const localHearts = readLocal(STORAGE_KEYS.letterHearts, 122);
  if (!isCloudDatabaseEnabled) return localHearts;

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/letter_stats?id=eq.letter-12a2&select=hearts`,
      { headers: supabaseHeaders() }
    );
    if (!res.ok) return localHearts;
    const rows = await res.json();
    if (Array.isArray(rows) && rows[0]?.hearts != null) {
      writeLocal(STORAGE_KEYS.letterHearts, rows[0].hearts);
      return rows[0].hearts;
    }
  } catch {
    // Ignore
  }
  return localHearts;
}

export async function saveLetterHearts(nextHearts) {
  writeLocal(STORAGE_KEYS.letterHearts, nextHearts);
  writeLocal(STORAGE_KEYS.letterSent, true);

  if (!isCloudDatabaseEnabled) return;

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/letter_stats?id=eq.letter-12a2`, {
      method: 'PATCH',
      headers: supabaseHeaders(),
      body: JSON.stringify({ hearts: nextHearts }),
    });
  } catch {
    // Ignore
  }
}

export function getLetterSentStatus() {
  return readLocal(STORAGE_KEYS.letterSent, false);
}

// --- Card Studio Draft ---
export function getCardDraft() {
  return readLocal(STORAGE_KEYS.cardDraft, null);
}

export function saveCardDraft(draft) {
  writeLocal(STORAGE_KEYS.cardDraft, draft);
}
