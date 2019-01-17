import './index.css';
import animalsTemplate from './index.html';
import resultAlert from '../../../screens/result/index';

import snake from './images/snake.png';
import bear from './images/bear.png';
import cat from './images/cat.png';
import chicken from './images/chicken.png';
import cow from './images/cow.png';
import dog from './images/dog.png';
import dolphin from './images/dolphin.png';
import donkey from './images/donkey.png';
import duck from './images/duck.png';
import frog from './images/frog.png';
import lion from './images/lion.png';

const animalsArray = [
  { image: snake, name: 'snake' },
  { image: bear, name: 'bear' },
  { image: cat, name: 'cat' },
  { image: chicken, name: 'chicken' },
  { image: cow, name: 'cow' },
  { image: dog, name: 'dog' },
  { image: dolphin, name: 'dolphin' },
  { image: donkey, name: 'donkey' },
  { image: duck, name: 'duck' },
  { image: frog, name: 'frog' },
  { image: lion, name: 'lion' },
];

export default class Animals {
  constructor(gameState) {
    this.game = gameState;
    this.game.modal.hide();
    this.modalContent = document.getElementById('myModal');
    this.modalContent.innerHTML = animalsTemplate;

    this.animalsTask = animalsArray[Math.round(Math.random() * (animalsArray.length - 1))];

    this.imageSrc = this.animalsTask.image;
    this.image = document.getElementById('animals-task');

    this.image.src = this.imageSrc;

    this.image.addEventListener('load', () => {
      this.game.modal.show();
      this.answer = document.getElementById('animals-answer');
      this.answer.focus();
    });

    this.submitBtn = document.getElementById('animals-submit');
    this.submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resultAlert(this.game, this.animalsTask.name === this.answer.value.trim().toLowerCase());
    });
  }
}
