/* eslint-disable no-new */
import './index.css';
import Modal from '../../components/modal-dialog/index';
import Login from '../login/index';
import Field from './field';
import SpellChoice from '../spell-choice';
import GameOver from '../game-over/index';

const gameState = {
  modal: new Modal(),
  heroName: '',
  heroHP: 100,
  monsterHP: 100,
  // battleResult values:
  // 0 wait
  // -1 monster win and attack
  // 1 hero win and attack
  battleResult: 0,
  // spells: 0, "fire", "ice", "heal"
  spell: 'fire',
  defeatedMonsters: 0,
  gameOver: 0,
};

const field = new Field(gameState);

function render() {
  if (gameState.battleResult === 0) {
    field.clear();
    field.drawIdle();
  } else if (gameState.battleResult === 1) {
    field.clear();
    field.drawIdle();
    field.heroAttack(gameState.spell);

    if (gameState.monsterHP === 0) {
      field.monsterDeathSound.play();
      field.updateMonster();
    }
  } else if (gameState.battleResult === -1) {
    field.clear();
    field.drawIdle();
    field.monsterAttack();
    if (gameState.heroHP === 0) {
      field.heroDeathSound.play();
      new GameOver(gameState);
    }
  }
}

function gameLoop() {
  render();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

new Login(gameState);

const attackBtn = document.getElementById('attackBtn');

document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !gameState.modal.active) attackBtn.click();
});

attackBtn.addEventListener('click', () => {
  new SpellChoice(gameState);
});
