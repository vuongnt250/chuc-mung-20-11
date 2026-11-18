import { useMemo, useState } from 'react';
import { Heart, MessageSquareHeart, Search } from 'lucide-react';
import { CARD_THEMES, WISH_CATEGORIES } from '../data/wishesData';

export default function GratitudeWall({ posts, onToggleLike, likedIds }) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      const matchCat = filterCategory === 'all' || post.category === filterCategory;
      const matchQuery =
        !q ||
        post.teacherName.toLowerCase().includes(q) ||
        post.senderName.toLowerCase().includes(q) ||
        post.message.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [posts, filterCategory, searchQuery]);

  return (
    <section id="luu-but" className="border-b border-[#1E1D1B]/10 bg-[#F3ECE0]/50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C85A32] uppercase">
              <MessageSquareHeart className="h-3.5 w-3.5" />
              Bức Tường Lưu Bút
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#1E1D1B] sm:text-4xl">
              Những Lời Nhắn Gửi Yêu Thương
            </h2>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#66615B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tên thầy cô, học trò..."
              className="w-full rounded-full border border-[#1E1D1B]/15 bg-[#FFFDF9] py-2.5 pr-4 pl-10 text-sm text-[#1E1D1B] outline-none transition focus:border-[#1B3B2B]"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-7 flex flex-wrap gap-2">
          {WISH_CATEGORIES.map((cat) => {
            const active = filterCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilterCategory(cat.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  active
                    ? 'bg-[#1B3B2B] text-[#FAF6EE] shadow-sm'
                    : 'border border-[#1E1D1B]/12 bg-[#FFFDF9] text-[#57524C] hover:border-[#C85A32]/40 hover:text-[#1E1D1B]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-[#1E1D1B]/20 bg-[#FAF6EE] p-12 text-center">
            <p className="font-serif text-lg text-[#57524C]">
              Chưa tìm thấy lưu bút nào phù hợp. Hãy là người đầu tiên viết lời chúc nhé!
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {filteredPosts.map((post) => {
              const theme =
                CARD_THEMES.find((t) => t.id === post.themeId) || CARD_THEMES[1];
              const isLiked = likedIds.includes(post.id);
              const catLabel =
                WISH_CATEGORIES.find((c) => c.id === post.category)?.label || 'Tri Ân';

              return (
                <article
                  key={post.id}
                  className="flex flex-col justify-between rounded-3xl border border-[#1E1D1B]/10 bg-[#FFFDF9] p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-7"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="inline-block h-2.5 w-8 rounded-full"
                        style={{ backgroundColor: theme.canvasBg[0] }}
                        title={theme.name}
                      />
                      <span className="text-[11px] font-semibold tracking-wider text-[#C85A32] uppercase">
                        {catLabel}
                      </span>
                    </div>

                    <h3 className="mt-4 font-serif text-xl font-bold text-[#1E1D1B]">
                      Kính gửi {post.teacherName}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-[#4A4640]">
                      “{post.message}”
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#1E1D1B]/10 pt-4">
                    <div>
                      <span className="font-script text-xl font-bold text-[#1B3B2B]">
                        {post.senderName}
                      </span>
                      <span className="ml-2 text-xs text-[#66615B]">• {post.date}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleLike(post.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                        isLiked
                          ? 'border-[#C85A32]/40 bg-[#C85A32]/10 text-[#C85A32]'
                          : 'border-[#1E1D1B]/12 bg-[#FAF6EE] text-[#57524C] hover:border-[#C85A32]/40 hover:text-[#C85A32]'
                      }`}
                      aria-label="Thả tim lời chúc"
                    >
                      <Heart
                        className={`h-3.5 w-3.5 ${isLiked ? 'fill-[#C85A32] text-[#C85A32]' : ''}`}
                      />
                      <span>{post.likes}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
