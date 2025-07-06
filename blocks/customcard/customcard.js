// customcard.js
import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  block.classList.add('customcard');

  // 1. Pull the three placeholders
  const [imgHolder, headingHolder, colorHolder] = Array.from(block.children);

  // 2. Get image URL & alt
  const rawImg = imgHolder.querySelector('img');
  const src = rawImg ? rawImg.src : imgHolder.textContent.trim();
  const alt = rawImg?.alt || headingHolder.textContent.trim() || '';

  // 3. Build optimized <picture> and make it the background
  const picture = createOptimizedPicture(src, alt, false, [
    { width: '1200' },
    { width: '800' },
    { width: '400' },
  ]);
  picture.classList.add('customcard-bg');

  // 4. Read heading text & the hex color
  const headingText = headingHolder.textContent.trim();
  const textColor = colorHolder.textContent.trim();

  // 5. Build the content overlay
  const content = document.createElement('div');
  content.className = 'customcard-content';
  content.style.color = textColor;

  const h2 = document.createElement('h2');
  h2.textContent = headingText;

  const p = document.createElement('p');
  p.textContent = 'Keep using your apps and social media without complications.';

  content.append(h2, p);

  // 6. Replace placeholders with picture + overlay
  block.textContent = '';
  block.append(picture, content);
}
