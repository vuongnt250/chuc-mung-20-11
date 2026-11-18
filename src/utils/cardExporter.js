function wrapText(ctx, text, maxWidth) {
  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

export async function exportCardAsPng({ theme, teacherName, senderName, message }) {
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const width = 1200;
  const height = 800;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, theme.canvasBg[0]);
  grad.addColorStop(1, theme.canvasBg[1]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Subtle decorative border frame
  ctx.strokeStyle = theme.canvasAccent;
  ctx.globalAlpha = 0.45;
  ctx.lineWidth = 2;
  ctx.strokeRect(36, 36, width - 72, height - 72);

  ctx.globalAlpha = 0.2;
  ctx.lineWidth = 1;
  ctx.strokeRect(48, 48, width - 96, height - 96);
  ctx.globalAlpha = 1;

  // Top label
  ctx.fillStyle = theme.canvasAccent;
  ctx.font = '600 18px "Be Vietnam Pro", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CHÀO MỪNG NGÀY NHÀ GIÁO VIỆT NAM • 20 / 11', width / 2, 112);

  // Divider line
  ctx.beginPath();
  ctx.moveTo(width / 2 - 70, 134);
  ctx.lineTo(width / 2 + 70, 134);
  ctx.strokeStyle = theme.canvasAccent;
  ctx.globalAlpha = 0.6;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Recipient heading
  ctx.fillStyle = theme.canvasText;
  ctx.font = '600 44px "Playfair Display", Georgia, serif';
  const recipientLine = `Kính gửi ${teacherName || 'Thầy / Cô kính mến'},`;
  ctx.fillText(recipientLine, width / 2, 205);

  // Body message
  ctx.fillStyle = theme.canvasSubtext;
  ctx.font = '400 26px "Be Vietnam Pro", sans-serif';
  const bodyLines = wrapText(ctx, message || '', width - 260);
  const lineHeight = 42;
  const maxLines = 7;
  const visibleLines = bodyLines.slice(0, maxLines);
  const startY = 278;

  visibleLines.forEach((line, idx) => {
    ctx.fillText(line, width / 2, startY + idx * lineHeight);
  });

  // Signature
  const sigY = Math.max(startY + visibleLines.length * lineHeight + 56, 590);
  ctx.fillStyle = theme.canvasAccent;
  ctx.font = '400 20px "Be Vietnam Pro", sans-serif';
  ctx.fillText('Trân trọng & Tri ân,', width / 2, sigY);

  ctx.fillStyle = theme.canvasText;
  ctx.font = '700 46px "Dancing Script", cursive';
  ctx.fillText(senderName || 'Học trò của Thầy/Cô', width / 2, sigY + 56);

  // 20/11 Seal in bottom-right corner
  const sealX = width - 125;
  const sealY = height - 120;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 44, 0, Math.PI * 2);
  ctx.strokeStyle = theme.canvasAccent;
  ctx.globalAlpha = 0.65;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.fillStyle = theme.canvasAccent;
  ctx.font = '700 20px "Playfair Display", serif';
  ctx.fillText('20.11', sealX, sealY + 7);

  // Trigger download
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  const safeName = (teacherName || 'thay-co').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  link.download = `thiep-20-11-${safeName}.png`;
  link.href = dataUrl;
  link.click();
}
