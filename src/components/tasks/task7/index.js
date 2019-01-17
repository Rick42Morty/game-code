import './index.css';
import sequenceTemplate from './index.html';
import sequenceArray from './sequence';
import resultAlert from '../../../screens/result/index';

export default class Sequences {
  constructor(gameState) {
    this.game = gameState;

    this.sequenceTask = sequenceArray[Math.round(Math.random() * (sequenceArray.length - 1))];
    this.modalContent = document.getElementById('myModal');
    this.modalContent.innerHTML = sequenceTemplate;
    this.game.modal.show();
    this.task = document.getElementById('sequence-task');
    this.task.innerText = this.sequenceTask.sequence;
    this.answer = document.getElementById('sequence-answer');
    this.answer.focus();
    this.submitBtn = document.getElementById('sequence-submit');
    this.submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resultAlert(this.game, this.sequenceTask.answer === this.answer.value.trim().toLowerCase());
    });
  }
}
