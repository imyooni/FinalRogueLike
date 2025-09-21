// Create grid tiles
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('grid');

  // --- grid setup ---
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(5, 120px)';
  grid.style.gridTemplateRows = 'repeat(3, 45px)';
  grid.style.gap = '4px';

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 5; x++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.dataset.x = x;
      tile.dataset.y = y;

      // style tile via JS
      tile.style.width = '120px';
      tile.style.height = '45px';
      tile.style.border = '1px solid black';
      tile.style.background = 'rgba(134, 134, 134, 0.35)';
      tile.style.position = 'relative';

      grid.appendChild(tile);
    }
  }

  // --- reusable function to add sprite ---
function addSpriteToTile(tile, imageUrl, scale = 1, xOffset = 0, yOffset = 0, defaultSize = { width: 16, height: 24 }) {
  // Remove previous sprite if exists
  const existing = tile.querySelector('.sprite');
  if (existing) tile.removeChild(existing);

  const sprite = document.createElement('div');
  sprite.className = 'sprite';
  sprite.style.position = 'absolute';
  sprite.style.imageRendering = 'pixelated';
  sprite.style.top = '50%';
  sprite.style.left = '50%';
  sprite.style.backgroundImage = `url(${imageUrl})`;

  const appendSprite = (width, height) => {
    sprite.style.width = width + 'px';
    sprite.style.height = height + 'px';
    // Apply scale and offsets
    sprite.style.transform = `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px)) scale(${scale})`;
    tile.appendChild(sprite);
  };

  if (defaultSize) {
    // use default size (spritesheet) immediately
    appendSprite(defaultSize.width, defaultSize.height);
  } else {
    // wait for image to load (full-size image)
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      appendSprite(img.width, img.height);
    };
  }

  return sprite;
}






const targetTile = grid.querySelector('[data-x="0"][data-y="0"]'); 
// Spritesheet with default size 16x24, offset by 10px right and 5px down
addSpriteToTile(targetTile, './assets/terra.png', 2, 0, -15);

const locke = grid.querySelector('[data-x="0"][data-y="1"]'); 
// Spritesheet with default size 16x24, offset by 10px right and 5px down
addSpriteToTile(locke, './assets/locke.png', 2, 0, -15);

const cyan = grid.querySelector('[data-x="0"][data-y="2"]'); 
// Spritesheet with default size 16x24, offset by 10px right and 5px down
addSpriteToTile(cyan, './assets/cyan.png', 2, 0, -15);

const monsterTile = grid.querySelector('[data-x="4"][data-y="1"]'); 
// Full-size monster image, offset by -20px left and 10px up
addSpriteToTile(monsterTile, './assets/slime_blue.png', 2, 0, -5, null);



const characters = [
  { lv: 5, name: "Alice", hp: 80, maxHp: 100, mp: 30, maxMp: 50 },
  { lv: 3, name: "Bob", hp: 45, maxHp: 60, mp: 20, maxMp: 30 },
  { lv: 7, name: "Charlie", hp: 120, maxHp: 150, mp: 50, maxMp: 70 }
];

const commandWindow = document.querySelector('.command-window');
const windowEls = [
  document.getElementById('char-window-1'),
  document.getElementById('char-window-2'),
  document.getElementById('char-window-3')
];

const gapVw = 2; // gap in vw between windows

// Get command window position dynamically
const rect = commandWindow.getBoundingClientRect();

windowEls.forEach((win, i) => {
  win.style.left = rect.right + gapVw + i * (win.offsetWidth + gapVw) + 'px';
  win.style.bottom = window.innerHeight - rect.bottom + 'px';

  const char = characters[i];

  // Header
  const header = document.createElement('div');
  header.style.fontSize = '14px'
  header.textContent = `(Lv ${char.lv}) ${char.name}`;
  win.appendChild(header);

  // HP bar
  const hpContainer = document.createElement('div');
  hpContainer.className = 'bar-container';
  const hpFill = document.createElement('div');
  hpFill.className = 'bar-fill hp';
  hpFill.style.width = (char.hp / char.maxHp * 100) + '%';
  hpFill.textContent = `${char.hp} / ${char.maxHp}`;
  hpContainer.appendChild(hpFill);
  win.appendChild(hpContainer);

  // MP bar
  const mpContainer = document.createElement('div');
  mpContainer.className = 'bar-container';
  const mpFill = document.createElement('div');
  mpFill.className = 'bar-fill mp';
  mpFill.style.width = (char.mp / char.maxMp * 100) + '%';
  mpFill.textContent = `${char.mp} / ${char.maxMp}`;
  mpContainer.appendChild(mpFill);
  win.appendChild(mpContainer);
});




});





