import resultTemplate from './index.html';
import './index.css';

const pause = time => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, time);
});

export default function resultAlert(gameState, battleResult) {
  const game = gameState;

  const modalContent = document.getElementById('myModal');
  modalContent.innerHTML = resultTemplate;
  const content = document.getElementById('result-alert');
  if (battleResult) {
    content.innerText = 'You are right!';
  } else {
    content.innerText = 'You are wrong!';
  }
  pause(1200).then(() => {
    if (battleResult) {
      game.battleResult = 1;
    } else {
      game.battleResult = -1;
    }
    game.modal.hide();
  });
}
