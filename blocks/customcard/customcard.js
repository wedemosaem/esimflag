// customcard.js
import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // If Franklin wrapped us in a <p>, pull ourselves out
  const parent = block.parentElement;
  if (parent && parent.tagName === 'P') {
    parent.replaceWith(block);
  }

  block.classList.add('customcard');

  // now safely grab our three placeholders (each one is a div)
  const [imgHolder, headingHolder, colorHolder] =
    Array.from(block.children).filter(el => el.tagName === 'DIV');

  // …the rest of your code stays the same…
  const rawImg = imgHolder.querySelector('img');
  const src    = rawImg ? rawImg.src : imgHolder.textContent.trim();
  const alt    = rawImg?.alt || headingHolder.textContent.trim() || '';
  const picture = createOptimizedPicture(src, alt, false, [
    { width: '1200' }, { width: '800' }, { width: '400' },
  ]);
  picture.classList.add('customcard-bg');

  const headingText = headingHolder.textContent.trim();
  const textColor   = colorHolder.textContent.trim();

  const content = document.createElement('div');
  content.className = 'customcard-content';
  content.style.color = textColor;

  const h2 = document.createElement('h2');
  h2.textContent = headingText;
  const p = document.createElement('p');
  p.textContent = 'Keep using your apps and social media without complications.';
  content.append(h2, p);

  // wipe out the placeholders, and append our picture + overlay
  block.textContent = '';
  block.append(picture, content);
}
