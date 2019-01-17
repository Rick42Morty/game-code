import './index.css';
import audiosTemplate from './index.html';
import resultAlert from '../../../screens/result/index';

import basketball from './audios/basketball.mp3';
import brother from './audios/brother.mp3';
import chicken from './audios/chicken.mp3';
import father from './audios/father.mp3';
import football from './audios/football.mp3';
import master from './audios/master.mp3';
import monkey from './audios/monkey.mp3';
import mother from './audios/mother.mp3';
import raccoon from './audios/raccoon.mp3';
import sister from './audios/sister.mp3';

const audiosArray = [
  { audio: basketball, name: 'basketball' },
  { audio: brother, name: 'brother' },
  { audio: chicken, name: 'chicken' },
  { audio: father, name: 'father' },
  { audio: football, name: 'football' },
  { audio: master, name: 'master' },
  { audio: monkey, name: 'monkey' },
  { audio: mother, name: 'mother' },
  { audio: raccoon, name: 'raccoon' },
  { audio: sister, name: 'sister' },
];

export default class Audios {
  constructor(gameState) {
    this.game = gameState;
    this.game.modal.hide();
    this.modalContent = document.getElementById('myModal');
    this.modalContent.innerHTML = audiosTemplate;

    this.audiosTask = audiosArray[Math.round(Math.random() * (audiosArray.length - 1))];

    this.audioSrc = this.audiosTask.audio;
    this.audio = document.getElementById('audio-english-task');

    this.audio.src = this.audioSrc;

    this.audio.addEventListener('loadeddata', () => {
      this.game.modal.show();
      this.audio.play();
      this.answer = document.getElementById('audio-english-answer');
      this.answer.focus();
    });

    this.submitBtn = document.getElementById('audio-english-submit');
    this.submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resultAlert(this.game, this.audiosTask.name === this.answer.value.trim().toLowerCase());
    });
  }
}
