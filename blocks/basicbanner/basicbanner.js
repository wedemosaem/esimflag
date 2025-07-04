// banner.js
import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  block.classList.add('banner');

  // 1. Grab the three field placeholders in the order defined in your JSON
  const placeholders = Array.from(block.querySelectorAll(':scope > div'));
  const imageDiv     = placeholders[0];
  const contentDiv   = placeholders[1];

  // 2. Extract their values (with sensible defaults)
  const imageURL   = imageDiv?.textContent.trim()    || '';
  const htmlInner  = contentDiv?.innerHTML.trim()   || '';

  // 3. Generate the optimized background picture
  const picture = createOptimizedPicture(
    imageURL,
    'Banner background',
    true,
    [
      { width: '1200' },
      { width: '800'  },
      { width: '400'  },
    ]
  );
  picture.classList.add('banner-bg');

  // 4. Build the content wrapper and inject your editor-provided HTML
  const content = document.createElement('div');
  content.className = 'banner-content';
  content.innerHTML = htmlInner;

  // 5. Clear the placeholders and append our structured nodes
  block.textContent = '';
  block.append(picture, content);
}
