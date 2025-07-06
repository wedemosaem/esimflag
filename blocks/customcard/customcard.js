// customcard.js
import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  block.classList.add('customcard');

  // 1. Grab placeholders: image, heading, hex color
  const [imgHolder, headingHolder, colorHolder] = Array.from(block.children);

  // 2. Derive src & alt
  const rawImg = imgHolder.querySelector('img');
  const src = rawImg ? rawImg.src : imgHolder.textContent.trim();
  const alt = rawImg?.alt || headingHolder.textContent.trim() || '';

  // 3. Build optimized <picture>
  const picture = createOptimizedPicture(src, alt, false, [
    { width: '1200' },
    { width: '800' },
    { width: '400' }
  ]);
  picture.classList.add('customcard-img');

  // 4. Extract heading and text-color
  const headingText = headingHolder.textContent.trim();
  const textColor = colorHolder.textContent.trim();

  // 5. Create content wrapper
  const content = document.createElement('div');
  content.className = 'customcard-content';
  content.style.color = textColor;

  const h2 = document.createElement('h2');
  h2.textContent = headingText;

  const p = document.createElement('p');
  p.textContent = 'Keep using your apps and social media without complications.';

  content.append(h2, p);

  // 6. Clear and append
  block.textContent = '';
  block.append(picture, content);
}
