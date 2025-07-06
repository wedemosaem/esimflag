// countrycard.js
export default function decorate(block) {
  block.classList.add('country-card');

  // 1. Grab the three placeholders (each should be a direct DIV child)
  const [flagHolder, nameHolder, priceHolder] = Array.from(block.querySelectorAll(':scope > div'));

  // 2. Read their values
  const flagSrc = flagHolder.textContent.trim();
  const country = nameHolder.textContent.trim();
  const price = priceHolder.textContent.trim();

  // 3. Build the flag <img>
  const img = document.createElement('img');
  img.className = 'flag';
  img.src = flagSrc;
  img.alt = `${country} Flag`;

  // 4. Build the info container
  const info = document.createElement('div');
  info.className = 'country-info';

  const nameEl = document.createElement('div');
  nameEl.className = 'country-name';
  nameEl.textContent = country;

  const priceEl = document.createElement('div');
  priceEl.className = 'country-price';
  priceEl.textContent = price;

  info.append(nameEl, priceEl);

  // 5. Clear placeholders and append the pieces
  block.textContent = '';
  block.append(img, info);
}
