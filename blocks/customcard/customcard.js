// customcard.js
import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  block.classList.add('customcard');

  // 1. Grab the three placeholders: [imgHolder, headingHolder, colorHolder]
  const [imgHolder, headingHolder, colorHolder] = Array.from(block.children);

  // 2. Derive the image URL
  const rawImg = imgHolder.querySelector('img');
  const src = rawImg
    ? rawImg.src
    : imgHolder.textContent.trim();

  // 3. Apply as CSS background on the block
  block.style.backgroundImage = `url('${src}')`;

  // 4. Extract heading text & color
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

  // 6. Clear any placeholders and append only the overlay
  block.textContent = '';
  block.append(content);
}
