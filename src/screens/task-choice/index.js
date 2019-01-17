/* eslint-disable no-new */
import './index.css';
import tasksTemplate from './index.html';

import SimpleMath from '../../components/tasks/task1';
import Articles from '../../components/tasks/task2/index';
import EngRu from '../../components/tasks/task3/index';
import Animals from '../../components/tasks/task4/index';
import RuEng from '../../components/tasks/task5/index';
import Audios from '../../components/tasks/task6/index';
import Sequences from '../../components/tasks/task7/index';

export default class TaskChoice {
  constructor(gameState) {
    this.game = gameState;
    this.modalContent = document.getElementById('myModal');
    this.modalContent.innerHTML = tasksTemplate;

    this.game.modal.show();

    document.getElementById('spell1').focus();
    document.querySelector('.modal-body').addEventListener('click', (e) => {
      switch (e.target.id) {
        case 'spell1':
          new SimpleMath(this.game);
          break;

        case 'spell2':
          new Articles(this.game);
          break;

        case 'spell3':
          new EngRu(this.game);
          break;

        case 'spell4':
          new Animals(this.game);
          break;

        case 'spell5':
          new RuEng(this.game);
          break;

        case 'spell6':
          new Audios(this.game);
          break;

        case 'spell7':
          new Sequences(this.game);
          break;

        default:
          break;
      }
    });
  }
}
