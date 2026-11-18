import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Flower2, Heart, Sparkles } from 'lucide-react';
import {
  fetchLetterHearts,
  getLetterSentStatus,
  saveLetterHearts,
} from '../services/databaseService';

const LETTER_PARAGRAPHS = [
  'Có lẽ trong quãng đời học sinh, điều đáng nhớ nhất không chỉ là những bài học trên lớp, những giờ ra chơi hay những kỷ niệm cùng bạn bè, mà còn là sự xuất hiện của những người thầy, người cô đã âm thầm đồng hành và dìu dắt chúng em trưởng thành. Và đối với chúng em, cô chính là một người đặc biệt như thế.',
  'Nhân ngày Nhà giáo Việt Nam 20/11, chúng em muốn dành tặng cô những lời chúc chân thành nhất. Cảm ơn cô vì đã luôn tận tình dạy dỗ, quan tâm và đồng hành cùng tập thể 12A2. Cảm ơn cô vì những lần nhắc nhở, những lời khuyên, cả những lúc nghiêm khắc khi chúng em mắc lỗi. Chúng em hiểu rằng, đằng sau những lời trách mắng ấy luôn là sự quan tâm và mong muốn học trò của mình ngày một tốt hơn.',
  'Chúng em biết 12A2 không phải lúc nào cũng ngoan ngoãn hay hoàn hảo. Đôi khi lớp còn ồn ào, nghịch ngợm, mỗi người một tính cách, có những lúc vô tình khiến cô phải buồn lòng và lo lắng. Có thể chúng em chưa đủ trưởng thành để hiểu hết những vất vả của một người giáo viên chủ nhiệm, nhưng chắc chắn chúng em luôn trân trọng những điều cô đã dành cho lớp. Cảm ơn cô vì dù có những lúc không dễ dàng, cô vẫn luôn ở đó, kiên nhẫn chỉ bảo và không ngừng quan tâm đến chúng em.',
  'Ngày 20/11, chúng em chúc cô luôn mạnh khỏe, bình an và gặp thật nhiều may mắn trong cuộc sống. Chúc cô ngày càng xinh đẹp, trẻ trung, rạng rỡ, lúc nào cũng giữ được nụ cười thật tươi trên môi. Mong rằng con đường cô đã chọn sẽ luôn có thật nhiều niềm vui, những cố gắng của cô được đền đáp xứng đáng và mỗi ngày đến trường đều là một ngày hạnh phúc.',
  'Rồi một ngày nào đó, chúng em sẽ phải rời xa mái trường, mỗi người sẽ có một hành trình riêng, không còn được gặp cô mỗi ngày, không còn những lời nhắc nhở quen thuộc hay những giờ học đầy ắp tiếng cười. Có thể sau này chúng em sẽ quên đi một vài bài học, nhưng những kỷ niệm về cô và tập thể 12A2 chắc chắn sẽ luôn được giữ lại trong một góc thanh xuân. Bởi có những người chỉ đồng hành cùng ta trong một khoảng thời gian, nhưng những điều họ để lại lại theo ta suốt cả chặng đường trưởng thành.',
  'Cô là thanh xuân của nghề giáo, là nét đẹp trong lòng học trò và là một phần ký ức không thể thiếu trong những năm tháng tuổi trẻ của 12A2.',
  'Một lần nữa, chúc cô giáo chủ nhiệm của chúng em có một ngày 20/11 thật ý nghĩa, ngập tràn hoa, quà, niềm vui và những lời yêu thương. Cảm ơn cô vì đã là cô giáo của 12A2, cảm ơn vì đã trở thành một phần thật đẹp trong những năm tháng học trò của chúng em.',
];

export default function SpecialLetterSection() {
  const [hearts, setHearts] = useState(122);
  const [sent, setSent] = useState(() => getLetterSentStatus());

  useEffect(() => {
    fetchLetterHearts().then((count) => setHearts(count));
  }, []);

  const handleSendHeart = () => {
    const nextHearts = hearts + 1;
    setHearts(nextHearts);
    setSent(true);
    saveLetterHearts(nextHearts);
    confetti({
      particleCount: 55,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#C85A32', '#E8C57B', '#F28B82', '#1B3B2B'],
    });
  };

  return (
    <section
      id="thu-12a2"
      className="border-b border-[#1E1D1B]/10 bg-gradient-to-b from-[#FAF6EE] to-[#F3ECE0]/70 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-[#C85A32]/25 bg-[#FFFDF9] p-7 shadow-lg sm:p-12">
          {/* Subtle inner frame */}
          <div className="pointer-events-none absolute inset-3 rounded-2xl border border-[#C6933A]/20" />

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C85A32]/25 bg-[#C85A32]/8 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#C85A32] uppercase">
                <Flower2 className="h-3.5 w-3.5" />
                Thư Tri Ân Đặc Biệt • 12A2
              </span>

              <h2 className="mt-4 font-serif text-2xl font-bold tracking-tight text-[#1E1D1B] sm:text-4xl">
                Gửi Cô Giáo Chủ Nhiệm — Người Đặc Biệt Của 12A2
              </h2>
              <p className="mt-2 font-script text-2xl font-bold text-[#C85A32]">
                Thương gửi cô – Gái xinh 12A2!
              </p>
            </div>

            <div className="mx-auto my-7 h-px w-28 bg-[#C6933A]/50" />

            {/* Featured Photos: Cô giáo & Tập thể 12A2 */}
            <div className="mb-8 grid gap-5 sm:grid-cols-12 sm:items-center">
              <div className="overflow-hidden rounded-2xl border border-[#C6933A]/30 bg-[#FAF6EE] p-2 shadow-sm sm:col-span-7">
                <div className="overflow-hidden rounded-xl">
                  <img
                    src="./images/co-giao-12a2.jpg"
                    alt="Cô giáo chủ nhiệm 12A2 rạng rỡ trong tà áo dài"
                    className="h-72 w-full object-cover object-top transition-transform duration-500 hover:scale-[1.03] sm:h-80"
                  />
                </div>
                <p className="mt-2.5 text-center font-serif text-sm italic text-[#1B3B2B]">
                  Cô giáo chủ nhiệm kính mến của tập thể 12A2
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-[#1B3B2B]/20 bg-[#FAF6EE] p-2 shadow-sm sm:col-span-5">
                <div className="overflow-hidden rounded-xl bg-[#0D1B2A]">
                  <img
                    src="./images/logo-12a2.jpg"
                    alt="Biểu trưng tập thể lớp 12A2 — Thanh xuân có nhau là đủ"
                    className="h-72 w-full object-contain transition-transform duration-500 hover:scale-[1.03] sm:h-80"
                  />
                </div>
                <p className="mt-2.5 text-center font-serif text-sm italic text-[#C85A32]">
                  “12A2 — Thanh xuân có nhau là đủ!”
                </p>
              </div>
            </div>

            {/* Letter Body */}
            <div className="space-y-4 text-base leading-relaxed text-[#383430] sm:text-[17px]">
              {LETTER_PARAGRAPHS.map((paragraph, idx) => (
                <p
                  key={idx}
                  className={
                    idx === 5
                      ? 'rounded-2xl border-l-4 border-[#C85A32] bg-[#FAF6EE] px-5 py-4 font-serif text-lg italic text-[#1B3B2B]'
                      : ''
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Signature & Interactive Heart */}
            <div className="mt-9 flex flex-col items-center justify-between gap-6 border-t border-[#1E1D1B]/10 pt-7 sm:flex-row">
              <div className="text-center sm:text-left">
                <span className="block text-xs font-medium tracking-wider text-[#66615B] uppercase">
                  Thương chúc cô thật nhiều hạnh phúc!
                </span>
                <span className="mt-1 block font-script text-3xl font-bold text-[#1B3B2B]">
                  Gái xinh 12A2 gửi cô
                </span>
              </div>

              <button
                type="button"
                onClick={handleSendHeart}
                className="inline-flex items-center gap-2.5 rounded-full bg-[#C85A32] px-6 py-3 text-sm font-semibold text-[#FAF6EE] shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#B34D28] hover:shadow-lg"
              >
                <Heart className={`h-4 w-4 ${sent ? 'fill-[#FAF6EE]' : ''}`} />
                <span>{sent ? 'Đã gửi yêu thương đến Cô!' : 'Thả tim tặng Cô'}</span>
                <span className="rounded-full bg-[#FAF6EE]/20 px-2 py-0.5 text-xs">
                  {hearts}
                </span>
                <Sparkles className="h-3.5 w-3.5 text-[#E8C57B]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
