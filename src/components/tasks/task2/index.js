import articlesTemplate from './index.html';
import './index.css';
import articlesArray from './articles';
import resultAlert from '../../../screens/result/index';

export default class Articles {
  constructor(gameState) {
    this.articleTask = articlesArray[Math.round(Math.random() * (articlesArray.length - 1))];
    this.game = gameState;
    this.modalContent = document.getElementById('myModal');
    this.modalContent.innerHTML = articlesTemplate;
    this.game.modal.show();
    document.getElementById('articles-a').focus();
    this.task = document.getElementById('articles-task');
    this.task.innerText = this.articleTask.sentence;
    this.form = document.getElementById('articles-form');
    this.form.addEventListener('click', (e) => {
      e.preventDefault();
      resultAlert(this.game, e.target.id === `articles-${this.articleTask.answer}`);
    });
  }
}
