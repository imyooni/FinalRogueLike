// Create grid tiles
import * as Character from './charactersData.js';

const style = document.createElement('style');
style.textContent = `
  * {
    user-select: none !important;
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
  }
`;

document.head.appendChild(style);

// In script.js
const commandWindow = document.querySelector('.command-window');

const gameData = {
  battleSprites: []
}


document.addEventListener('DOMContentLoaded', () => {



  function showScene(sceneId) {
    console.log('Switching to scene:', sceneId);
    
    document.querySelectorAll('.scene').forEach(scene => {
      scene.classList.remove('active');
    });
    
    const targetScene = document.getElementById(sceneId);
    if (targetScene) {
      targetScene.classList.add('active');
    } else {
      console.error('Scene not found:', sceneId);
    }
  }

  // Show title scene initially
  showScene('scene-title');

  // Event delegation - listen for clicks on the document
  document.addEventListener('click', (event) => {
    if (event.target.id === 'start-btn') {
      
     
      showScene('scene-battle');
      showCharacters()
      createGrid()
      
     
    }
    
    // Add other button handlers here
    if (event.target.id === 'retry-btn') {
      showScene('scene-title');
    }
  });
});


function showCharacters(){
    const characters = [
        { name: 'Terra', spriteUrl: './assets/terra.png' },
        { name: 'Locke', spriteUrl: './assets/locke.png' },
        { name: 'Cyan', spriteUrl: './assets/cyan.png' },
        { name: 'Vincent', spriteUrl: './assets/vincent.png' },
        { name: 'Lightning', spriteUrl: './assets/lightning.png' }
    ];

    const container = document.getElementById('card-container');

    characters.forEach(char => {
        // Create card with the CSS class
        const card = document.createElement('div');
        card.className = 'card';

        card.addEventListener('click', function() {
            // Call your function here
            onCharacterSelect(char);
            
            // Remove the card after click
            card.remove();
            
            // Check if we've reached 3 selections
            if (gameData.battleSprites.length >= 3) {
                // Remove all remaining cards
                removeAllCards();
            }
        });

        // Character name at top
        const nameEl = document.createElement('h3');
        nameEl.textContent = char.name;
        card.appendChild(nameEl);

        // Sprite
        const sprite = document.createElement('div');
        sprite.className = 'sprite';
        sprite.style.backgroundImage = `url(${char.spriteUrl})`;
        card.appendChild(sprite);

        container.appendChild(card);
    });
}

function onCharacterSelect(character){
    let index = gameData.battleSprites.length;
    const tsprite = grid.querySelector(`[data-x="0"][data-y="${index}"]`);
    const sprite = addSpriteToTile(tsprite, `${character.name}`, `./assets/${character.name}.png`, 2, 0, -15);
    gameData.battleSprites.push(sprite);

    showStatusWindow(character.name,index)
}

// Function to remove all remaining cards
function removeAllCards() {
    const container = document.getElementById('card-container');
    // Remove all child elements (cards)
    while (container.firstChild) {
        container.firstChild.remove();
    }
   
    setTimeout(() => {
        commandWindow.classList.add('active');
  }, 400);
}

function showStatusWindow(character,index) {
   let statusWindow = document.getElementById(`char-window-${index+1}`)
   const gapVw = 2; 
   const rect = commandWindow.getBoundingClientRect();

    statusWindow.style.left = (rect.width+50) + gapVw + index * (statusWindow.offsetWidth + gapVw) + 'px';
    statusWindow.style.bottom = window.innerHeight - rect.bottom + 'px';

    const char = Character.Data(character);

    // Clear previous content
    statusWindow.innerHTML = '';

    // Header
    const header = document.createElement('div');
    header.style.fontSize = '14px';
    header.style.color = 'gold'
    header.style.textShadow = "1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black" ;
    header.textContent = `Lv ${char.lv} ${char.name}`;
    statusWindow.appendChild(header);

    // HP Bar
    const hpContainer = document.createElement('div');
    hpContainer.className = 'bar-container';

    const hpFill = document.createElement('div');
    hpFill.className = 'bar-fill hp';
    hpFill.style.width = (char.hp / char.maxHp * 100) + '%';
    hpContainer.appendChild(hpFill);

    // Create overlay text
    const hpText = document.createElement('div');
    hpText.className = 'bar-text';
    hpText.textContent = `${char.hp} / ${char.maxHp}`;
    hpContainer.appendChild(hpText);

    statusWindow.appendChild(hpContainer);

    // MP Bar
    const mpContainer = document.createElement('div');
    mpContainer.className = 'bar-container';

    const mpFill = document.createElement('div');
    mpFill.className = 'bar-fill mp';
    mpFill.style.width = (char.mp / char.maxMp * 100) + '%';
    mpContainer.appendChild(mpFill);

    const mpText = document.createElement('div');
    mpText.className = 'bar-text';
    mpText.textContent = `${char.mp} / ${char.maxMp}`;
    mpContainer.appendChild(mpText);

    statusWindow.appendChild(mpContainer);

    // EXP Bar - Thin version without text
    const expContainer = document.createElement('div');
    expContainer.className = 'bar-container exp-container'; // Added special class
    
    const expFill = document.createElement('div');
    expFill.className = 'bar-fill exp';
    expFill.style.width = (char.exp[0] / char.exp[1] * 100) + '%';
    expContainer.appendChild(expFill);

    // No text element for EXP bar

    statusWindow.appendChild(expContainer);
    statusWindow.style.bottom = '2vh';
}


function createGrid() {
const grid = document.getElementById('grid');
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
      tile.style.width = '120px';
      tile.style.height = '45px';
      tile.style.border = '1px solid black';
      tile.style.background = 'rgba(134, 134, 134, 0.35)';
      tile.style.position = 'relative';
      grid.appendChild(tile);
    }
  }
}

function startGame() {

  setTimeout(() => {
        commandWindow.classList.add('active');
  }, 50);


  const monsterTile = grid.querySelector('[data-x="4"][data-y="1"]');
  // Full-size monster image, offset by -20px left and 10px up
  addSpriteToTile(monsterTile, './assets/slime_blue.png', 2, 0, -5, null);


}


function addSpriteToTile(tile, spriteData, imageUrl, scale = 1, xOffset = 0, yOffset = 0, defaultSize = { width: 16, height: 24 }) {
    const existing = tile.querySelector('.sprite');
    if (existing) tile.removeChild(existing);
    
    const sprite = document.createElement('div');
    sprite.className = 'sprite';
    sprite.spriteData = spriteData;
    sprite.style.position = 'absolute';
    sprite.style.imageRendering = 'pixelated';
    sprite.style.top = '50%';
    sprite.style.left = '50%';
    sprite.style.backgroundImage = `url(${imageUrl})`;
    
    // Add fade-in animation styles
    sprite.style.opacity = '0';
    sprite.style.transition = 'opacity 0.5s ease-in-out';
    
    const appendSprite = (width, height) => {
        sprite.style.width = width + 'px';
        sprite.style.height = height + 'px';
        sprite.style.transform = `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px)) scale(${scale})`;
        tile.appendChild(sprite);
        
        // Trigger fade-in animation
        setTimeout(() => {
            sprite.style.opacity = '1';
        }, 10);
    };
    
    if (defaultSize) {
        appendSprite(defaultSize.width, defaultSize.height);
    } else {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            appendSprite(img.width, img.height);
        };
    }
    return sprite;
}


