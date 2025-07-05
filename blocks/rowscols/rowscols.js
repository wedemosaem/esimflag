export default function decorate(block) {
  const rows = parseInt(block.dataset.rows, 10) || 1;
  const columns = parseInt(block.dataset.columns, 10) || 1;

  // Clear any existing content
  block.innerHTML = '';

  for (let r = 0; r < rows; r++) {
    const row = document.createElement('div');
    row.className = 'rc-row';
    for (let c = 0; c < columns; c++) {
      const cell = document.createElement('div');
      cell.className = 'rc-cell';
      cell.innerHTML = `<p>Row ${r + 1}, Column ${c + 1}</p>`;
      row.appendChild(cell);
    }
    block.appendChild(row);
  }
}
