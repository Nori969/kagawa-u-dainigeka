document.addEventListener('DOMContentLoaded', function() {
  var el = document.getElementById('surgery-chart-canvas');
  if (!el) return;

  var data = [
    {year:'2016',total:240,lung:126,robot:0},
    {year:'2017',total:230,lung:126,robot:0},
    {year:'2018',total:218,lung:148,robot:0},
    {year:'2019',total:235,lung:153,robot:0},
    {year:'2020',total:244,lung:159,robot:4},
    {year:'2021',total:221,lung:141,robot:5},
    {year:'2022',total:232,lung:133,robot:25},
    {year:'2023',total:294,lung:173,robot:38},
    {year:'2024',total:256,lung:178,robot:74},
    {year:'2025',total:260,lung:174,robot:137}
  ];

  var maxVal = 350;
  var canvas = document.createElement('canvas');
  canvas.width = 960;
  canvas.height = 420;
  canvas.style.width = '100%';
  canvas.style.height = 'auto';
  el.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  var pad = {top:40, right:20, bottom:80, left:50};
  var w = canvas.width - pad.left - pad.right;
  var h = canvas.height - pad.top - pad.bottom;
  var barGroupW = w / data.length;
  var barW = barGroupW * 0.22;
  var gap = 2;

  ctx.fillStyle = '#333';
  ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('手術件数の推移', canvas.width / 2, 24);

  ctx.strokeStyle = '#ddd';
  ctx.lineWidth = 1;
  ctx.font = '11px sans-serif';
  ctx.textAlign = 'right';
  ctx.fillStyle = '#999';
  for (var i = 0; i <= 7; i++) {
    var val = i * 50;
    var y = pad.top + h - (val / maxVal) * h;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + w, y);
    ctx.stroke();
    ctx.fillText(val.toString(), pad.left - 6, y + 4);
  }

  for (var j = 0; j < data.length; j++) {
    var d = data[j];
    var cx = pad.left + j * barGroupW + barGroupW / 2;
    var totalH = (d.total / maxVal) * h;
    var lungH = (d.lung / maxVal) * h;
    var robotH = (d.robot / maxVal) * h;

    var x1 = cx - barW * 1.5 - gap;
    var x2 = cx - barW * 0.5;
    var x3 = cx + barW * 0.5 + gap;

    // Total
    var grad1 = ctx.createLinearGradient(0, pad.top + h - totalH, 0, pad.top + h);
    grad1.addColorStop(0, '#f59e0b');
    grad1.addColorStop(1, '#ea580c');
    ctx.fillStyle = grad1;
    ctx.fillRect(x1, pad.top + h - totalH, barW, totalH);

    // Lung cancer
    var grad2 = ctx.createLinearGradient(0, pad.top + h - lungH, 0, pad.top + h);
    grad2.addColorStop(0, '#fbbf24');
    grad2.addColorStop(1, '#f59e0b');
    ctx.fillStyle = grad2;
    ctx.fillRect(x2, pad.top + h - lungH, barW, lungH);

    // Robot
    if (d.robot > 0) {
      var grad3 = ctx.createLinearGradient(0, pad.top + h - robotH, 0, pad.top + h);
      grad3.addColorStop(0, '#60a5fa');
      grad3.addColorStop(1, '#2563eb');
      ctx.fillStyle = grad3;
      ctx.fillRect(x3, pad.top + h - robotH, barW, robotH);
    }

    // Labels
    ctx.fillStyle = '#555';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(d.total.toString(), x1 + barW / 2, pad.top + h - totalH - 3);
    ctx.fillText(d.lung.toString(), x2 + barW / 2, pad.top + h - lungH - 3);
    if (d.robot > 0) {
      ctx.fillText(d.robot.toString(), x3 + barW / 2, pad.top + h - robotH - 3);
    }

    // Year
    ctx.fillStyle = '#666';
    ctx.font = '11px sans-serif';
    ctx.fillText(d.year + '年', cx, pad.top + h + 16);
  }

  // Legend
  var legendY = canvas.height - 16;
  var legendX = canvas.width / 2 - 150;

  ctx.fillStyle = '#ea580c';
  ctx.fillRect(legendX, legendY - 10, 14, 14);
  ctx.fillStyle = '#666';
  ctx.font = '12px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('全手術件数', legendX + 18, legendY + 2);

  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(legendX + 110, legendY - 10, 14, 14);
  ctx.fillStyle = '#666';
  ctx.fillText('肺癌手術件数', legendX + 128, legendY + 2);

  ctx.fillStyle = '#2563eb';
  ctx.fillRect(legendX + 230, legendY - 10, 14, 14);
  ctx.fillStyle = '#666';
  ctx.fillText('ロボット手術件数', legendX + 248, legendY + 2);
});
