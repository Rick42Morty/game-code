import gameOverTemplate from './index.html';
import './index.css';

export default class GameOver {
  constructor(gameState) {
    this.game = gameState;

    this.modalContent = document.getElementById('myModal');
    this.modalContent.innerHTML = gameOverTemplate;
    this.tBody = document.getElementById('high-score');

    this.row0 = document.createElement('tr');
    this.row0.innerHTML = `<td>${this.game.heroName}</td>
    <td>${this.game.defeatedMonsters}</td>`;
    this.tBody.appendChild(this.row0);

    this.submit = document.getElementById('submitBtn');
    this.game.modal.show();
    document.getElementById('submitBtn').focus();

    const user = { name: this.game.heroName, age: this.game.defeatedMonsters };

    fetch('https://rs-game-evgen42.herokuapp.com/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    this.dbUsers = [];

    fetch('https://rs-game-evgen42.herokuapp.com/api/users')
      .then(res => res.json())
      .then((myJson) => {
        this.dbUsers = myJson;
      })
      .then(() => {
        for (let i = 0; i < this.dbUsers.length; i += 1) {
          const row = document.createElement('tr');
          row.innerHTML = `<td>${this.dbUsers[i].name}</td>
          <td>${this.dbUsers[i].age}</td>`;
          this.tBody.appendChild(row);
        }
        document.getElementById('wait').innerText = '';
      });
  }
}
