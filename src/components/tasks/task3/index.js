import './index.css';
import engRuTemplate from './index.html';
import engRuArray from './engRuDict';
import resultAlert from '../../../screens/result/index';

export default class EngRu {
  constructor(gameState) {
    this.game = gameState;

    this.engRuTask = engRuArray[Math.round(Math.random() * (engRuArray.length - 1))];
    this.modalContent = document.getElementById('myModal');
    this.modalContent.innerHTML = engRuTemplate;
    this.game.modal.show();
    this.task = document.getElementById('eng-ru-task');
    this.task.innerText = this.engRuTask.engWord;
    this.answer = document.getElementById('eng-ru-answer');
    this.answer.focus();
    this.submitBtn = document.getElementById('eng-ru-submit');
    this.submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resultAlert(
        this.game,
        this.engRuTask.answers.indexOf(this.answer.value.trim().toLowerCase()) !== -1,
      );
    });
  }
}
