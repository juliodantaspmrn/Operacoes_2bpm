/* Gerenciamento centralizado dos gráficos Chart.js. */
const ProductivityCharts = (() => {
  let barChart; let pieChart;
  const palette = ['#135e5b','#12a594','#4285b7','#f0a64a','#8d6ccf','#e0647a','#6d8c3c','#55708f'];
  const destroy = (chart) => chart && chart.destroy();
  function render(items) {
    const labels = items.map(({ label }) => label);
    const values = items.map(({ value }) => value);
    destroy(barChart); destroy(pieChart);
    barChart = new Chart(document.getElementById('barChart'), { type:'bar', data:{ labels, datasets:[{ data:values, backgroundColor:palette, borderRadius:6, borderSkipped:false }] }, options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ display:false }, tooltip:{ callbacks:{ label:(c) => ` ${formatNumber(c.raw)}` } } }, scales:{ y:{ beginAtZero:true, grid:{ color:'#edf1f5' }, ticks:{ callback:formatNumber } }, x:{ grid:{ display:false }, ticks:{ maxRotation:42, minRotation:0 } } } } });
    pieChart = new Chart(document.getElementById('pieChart'), { type:'doughnut', data:{ labels, datasets:[{ data:values, backgroundColor:palette, borderWidth:2, borderColor:'#fff' }] }, options:{ responsive:true, maintainAspectRatio:false, cutout:'58%', plugins:{ legend:{ position:'bottom', labels:{ boxWidth:12, padding:14 } }, tooltip:{ callbacks:{ label:(c) => ` ${c.label}: ${formatNumber(c.raw)}` } } } } });
  }
  const formatNumber = (value) => new Intl.NumberFormat('pt-BR', { maximumFractionDigits:2 }).format(value || 0);
  return { render, formatNumber };
})();
