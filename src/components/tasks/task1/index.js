import simpleMathTemplate from './index.html';
import './index.css';
import resultAlert from '../../../screens/result/index';

function randInt(num) {
  return Math.round(Math.random() * num);
}

// export default
export default class SimpleMath {
  constructor(gameState) {
    this.a = randInt(10);
    this.b = randInt(10);
    switch (randInt(2)) {
      case 0:
        this.sign = '+';
        this.ans = this.a + this.b;
        break;
      case 1:
        this.sign = '-';
        this.ans = this.a - this.b;
        break;
      case 2:
        this.sign = '*';
        this.ans = this.a * this.b;
        break;
      default:
        break;
    }

    this.game = gameState;
    this.modalContent = document.getElementById('myModal');
    this.modalContent.innerHTML = simpleMathTemplate;
    this.game.modal.show();
    this.task = document.getElementById('math-task');
    this.userAns = document.getElementById('math-task-answer');
    this.userAns.focus();
    this.task.innerText = `${this.a} ${this.sign} ${this.b} = `;
    this.submit = document.getElementById('submitBtn');
    this.submit.addEventListener('click', (e) => {
      e.preventDefault();
      resultAlert(this.game, this.ans === +this.userAns.value);
    });
  }
}
