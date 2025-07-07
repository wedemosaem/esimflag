// countrycard.js
import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // ensure block root has both 'block' and our ID class
  block.classList.add('countrycard');

  // 1. Create the semantic wrapper for our cards
  const list = document.createElement('ul');

  // 2. Iterate each row (one card’s placeholders)
  Array.from(block.children).forEach((row) => {
    const li = document.createElement('li');

    // 2a. Pull out the three inputs
    const [imgHolder, headingHolder, colorHolder] = Array.from(row.children);

    // 2b. Resolve image URL & alt text
    const rawImg = imgHolder.querySelector('img');
    const src = rawImg ? rawImg.src : imgHolder.textContent.trim();
    const alt = rawImg?.alt || headingHolder.textContent.trim() || '';

    // 2c. Build an optimized <picture> and name it for our CSS
    const picture = createOptimizedPicture(src, alt, false, [
      { width: '1200' },
      { width: '800' },
      { width: '400' },
    ]);
    picture.classList.add('countrycard-bg');
    li.append(picture);

    // 2d. Read heading text & color
    const headingText = headingHolder.textContent.trim();
    const textColor = colorHolder.textContent.trim();

    // 2e. Build the overlay content
    const content = document.createElement('div');
    content.className = 'countrycard-content';
    content.style.color = textColor;

    const h2 = document.createElement('h2');
    h2.textContent = headingText;

    const p = document.createElement('p');
    p.textContent = 'Keep using your apps and social media without complications.';

    content.append(h2, p);
    li.append(content);

    list.append(li);
  });

  // 3. Replace all of the original nested divs with our <ul>
  block.textContent = '';
  block.append(list);
}
