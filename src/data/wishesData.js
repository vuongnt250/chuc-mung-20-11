export const CARD_THEMES = [
  {
    id: 'chalkboard',
    name: 'Bảng Xanh Phấn Trắng',
    subtitle: 'Ký ức lớp học thân thương',
    bgClass: 'bg-gradient-to-br from-[#1F4432] via-[#1B3B2B] to-[#12281D] text-[#FAF6EE]',
    borderClass: 'border-[#C6933A]/50',
    accentColor: '#E8C57B',
    badgeClass: 'bg-[#FAF6EE]/10 text-[#E8C57B] border-[#E8C57B]/30',
    canvasBg: ['#1F4432', '#12281D'],
    canvasText: '#FAF6EE',
    canvasAccent: '#E8C57B',
    canvasSubtext: '#D3DDD6',
  },
  {
    id: 'ivory-classic',
    name: 'Giấy Dó Cổ Điển',
    subtitle: 'Trang nhã & sâu lắng',
    bgClass: 'bg-gradient-to-br from-[#FFFDF9] via-[#FAF4E8] to-[#EFE5D1] text-[#1E1D1B]',
    borderClass: 'border-[#C85A32]/30',
    accentColor: '#C85A32',
    badgeClass: 'bg-[#C85A32]/10 text-[#C85A32] border-[#C85A32]/25',
    canvasBg: ['#FFFDF9', '#EFE5D1'],
    canvasText: '#1E1D1B',
    canvasAccent: '#C85A32',
    canvasSubtext: '#5A534A',
  },
  {
    id: 'autumn-lotus',
    name: 'Sen Thu Ấm Áp',
    subtitle: 'Sắc thu tháng Mười Một',
    bgClass: 'bg-gradient-to-br from-[#7A2E22] via-[#963C2B] to-[#5E2017] text-[#FAF6EE]',
    borderClass: 'border-[#F3D19C]/40',
    accentColor: '#F3D19C',
    badgeClass: 'bg-[#FAF6EE]/10 text-[#F3D19C] border-[#F3D19C]/30',
    canvasBg: ['#8A3526', '#541C14'],
    canvasText: '#FAF6EE',
    canvasAccent: '#F3D19C',
    canvasSubtext: '#F5DFD6',
  },
  {
    id: 'morning-sun',
    name: 'Nắng Sớm Sân Trường',
    subtitle: 'Tinh khôi & rạng rỡ',
    bgClass: 'bg-gradient-to-br from-[#F7E8CC] via-[#F2DCB5] to-[#E6C792] text-[#2A2218]',
    borderClass: 'border-[#1B3B2B]/25',
    accentColor: '#1B3B2B',
    badgeClass: 'bg-[#1B3B2B]/10 text-[#1B3B2B] border-[#1B3B2B]/20',
    canvasBg: ['#F7E8CC', '#E6C792'],
    canvasText: '#2A2218',
    canvasAccent: '#1B3B2B',
    canvasSubtext: '#524535',
  },
];

export const WISH_CATEGORIES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'chu-nhiem', label: 'Thầy Cô Chủ Nhiệm' },
  { id: 'bo-mon', label: 'Thầy Cô Bộ Môn' },
  { id: 'giang-vien', label: 'Giảng Viên' },
  { id: 'nghi-huu', label: 'Thầy Cô Đã Nghỉ Hưu' },
];

export const SUGGESTED_WISHES = [
  {
    id: 'w1',
    category: 'chu-nhiem',
    title: 'Người Thắp Sáng Ước Mơ',
    text: 'Nhân ngày Nhà giáo Việt Nam 20/11, em xin kính chúc Thầy/Cô luôn mạnh khỏe, bình an và giữ mãi ngọn lửa nhiệt huyết với sự nghiệp trồng người. Cảm ơn Thầy/Cô đã luôn kiên nhẫn dìu dắt chúng em từng bước trưởng thành.',
  },
  {
    id: 'w2',
    category: 'bo-mon',
    title: 'Trang Giáo Án Tâm Huyết',
    text: 'Mỗi bài giảng của Thầy/Cô không chỉ mang đến kiến thức mà còn mở ra cho chúng em cả một chân trời mới. Chúc Thầy/Cô một ngày 20/11 thật nhiều niềm vui, hạnh phúc và gặt hái thêm nhiều thành công trong sự nghiệp giảng dạy.',
  },
  {
    id: 'w3',
    category: 'giang-vien',
    title: 'Người Dẫn Đường Tri Thức',
    text: 'Kính chúc Quý Thầy/Cô giảng viên ngày 20/11 dồi dào sức khỏe, vững tay chèo trên con thuyền tri thức và tiếp tục truyền cảm hứng nghiên cứu, sáng tạo cho biết bao thế hệ sinh viên.',
  },
  {
    id: 'w4',
    category: 'nghi-huu',
    title: 'Ký Ức Không Phai',
    text: 'Dù thời gian có trôi qua và mái tóc Thầy/Cô đã điểm bạc, những bài học làm người năm ấy vẫn luôn khắc sâu trong tâm trí chúng em. Kính chúc Thầy/Cô luôn an nhiên, mạnh khỏe và vui vầy bên gia đình.',
  },
];

export const INITIAL_WALL_POSTS = [
  {
    id: 'p1',
    teacherName: 'Cô Nguyễn Thị Lan Anh',
    senderName: 'Tập thể 12A1 — Khóa 2021–2024',
    category: 'chu-nhiem',
    themeId: 'chalkboard',
    message:
      'Cảm ơn Cô vì ba năm thanh xuân rực rỡ nhất. Những buổi ôn thi tối muộn và lời động viên dịu dàng của Cô là hành trang quý giá nhất mà tụi em mang theo suốt đời.',
    likes: 42,
    date: '20/11',
  },
  {
    id: 'p2',
    teacherName: 'Thầy Trần Minh Đức',
    senderName: 'Minh Khôi (Cựu học sinh)',
    category: 'bo-mon',
    themeId: 'ivory-classic',
    message:
      'Ngày xưa em sợ môn Vật Lý nhất, nhưng chính sự hài hước và những thí nghiệm trực quan của Thầy đã khiến em yêu thích kỹ thuật và chọn ngành Kỹ sư như hôm nay. Chúc Thầy 20/11 thật nhiều sức khỏe!',
    likes: 31,
    date: '20/11',
  },
  {
    id: 'p3',
    teacherName: 'PGS.TS Lê Hoàng Nam',
    senderName: 'Nhóm sinh viên K65',
    category: 'giang-vien',
    themeId: 'autumn-lotus',
    message:
      'Kính chúc Thầy ngày Nhà giáo Việt Nam tràn đầy năng lượng và niềm vui. Cảm ơn Thầy đã luôn nghiêm khắc nhưng tận tâm trong từng dòng nhận xét đồ án của chúng em.',
    likes: 27,
    date: '20/11',
  },
  {
    id: 'p4',
    teacherName: 'Cô Phạm Thu Hà',
    senderName: 'Bảo Ngọc',
    category: 'nghi-huu',
    themeId: 'morning-sun',
    message:
      'Mỗi độ tháng Mười Một về, em lại nhớ tiếng giảng bài ấm áp của Cô năm lớp 9. Chúc Cô luôn bình an, khỏe mạnh và giữ mãi nụ cười hiền hậu ấy!',
    likes: 54,
    date: '20/11',
  },
];

export const MEMORY_CHAPTERS = [
  {
    step: '01',
    era: 'Sáng sớm sân trường',
    title: 'Ánh đèn phòng giáo viên & trang giáo án đầu ngày',
    description:
      'Trước khi tiếng trống trường vang lên, có những trang giáo án đã được viết lại hàng trăm lần để bài giảng hôm nay thêm dễ hiểu và gần gũi hơn với từng học trò.',
    quote: '“Nghề dạy học là nghề cao quý nhất trong các nghề cao quý.”',
  },
  {
    step: '02',
    era: 'Trên bục giảng',
    title: 'Bụi phấn trắng rơi trên mái tóc',
    description:
      'Từng nét chữ nắn nót trên bảng xanh, từng câu hỏi gợi mở kiên nhẫn đợi cánh tay rụt rè giơ lên. Thầy cô không chỉ dạy chữ, mà còn dạy cách đặt câu hỏi và tự tin bước ra thế giới.',
    quote: '“Một người thầy giỏi thắp lên ngọn lửa đam mê học hỏi suốt đời.”',
  },
  {
    step: '03',
    era: 'Giờ tan trường',
    title: 'Những lời khuyên lặng lẽ bên hành lang',
    description:
      'Đôi khi chỉ là một câu hỏi thăm “Hôm nay con thấy sao?”, hay cái vỗ vai nhẹ sau kỳ thi chưa như ý — những điều nhỏ bé ấy lại nâng đỡ biết bao tâm hồn tuổi học trò.',
    quote: '“Tình thương của người thầy là điểm tựa bình yên nhất của tuổi trẻ.”',
  },
  {
    step: '04',
    era: 'Ngày trưởng thành',
    title: 'Chuyến đò cập bến, người lái đò vẫn ở lại',
    description:
      'Bao thế hệ học sinh lớn lên, đi xa khắp muôn phương. Mỗi dịp 20/11 trở về mái trường xưa, điều hạnh phúc nhất vẫn là thấy nụ cười hiền hậu của Thầy Cô năm nào.',
    quote: '“Uống nước nhớ nguồn — Tôn sư trọng đạo.”',
  },
];

export const FAMOUS_QUOTES = [
  {
    quote: '“Muốn sang thì bắc cầu Kiều, muốn con hay chữ thì yêu lấy thầy.”',
    author: 'Ca dao Việt Nam',
    note: 'Truyền thống Tôn sư trọng đạo ngàn đời',
  },
  {
    quote:
      '“Dưới ánh mặt trời không có nghề nào cao quý hơn nghề dạy học.”',
    author: 'J.A. Comenius',
    note: 'Nhà giáo dục học vĩ đại',
  },
  {
    quote:
      '“Người thầy trung bình chỉ biết nói, người thầy giỏi biết giải thích, người thầy xuất chúng biết minh họa, người thầy vĩ đại biết cách truyền cảm hứng.”',
    author: 'William Arthur Ward',
    note: 'Triết lý giáo dục hiện đại',
  },
  {
    quote:
      '“Một chữ cũng là thầy, nửa chữ cũng là thầy.”',
    author: 'Tục ngữ Việt Nam',
    note: 'Đạo lý biết ơn người truyền trao tri thức',
  },
];
