import hBody from './images/hero/body.png';
import hHead from './images/hero/head.png';
import hArmLeft from './images/hero/arm-left.png';
import hArmRight from './images/hero/arm-right.png';
import hLegLeft from './images/hero/leg-left.png';
import hLegRight from './images/hero/leg-right.png';

import fireBall from './images/fireball.png';
import iceBall from './images/iceball.png';
import healBall from './images/heal.png';
import rockBall from './images/rockball.png';

import monsterAttackSound from './sounds/monster-attack.mp3';
import heroFireAttackSound from './sounds/hero-fire-attack.mp3';
import heroIceAttackSound from './sounds/hero-ice-attack.mp3';
import heroDeathSound from './sounds/hero-death.mp3';
import monsterDeathSound from './sounds/monster-death.mp3';
import healSound from './sounds/heal.mp3';

import Monster from './monster';

function drawHPBord(context, x, screenWidth, screenHeight) {
  const c = context;
  c.beginPath();
  c.lineWidth = 4;
  c.moveTo(x * screenWidth, 0.1 * screenHeight);
  c.lineTo((x + 0.3) * screenWidth, 0.1 * screenHeight);
  c.lineTo((x + 0.3) * screenWidth, 0.13 * screenHeight);
  c.lineTo(x * screenWidth, 0.13 * screenHeight);
  c.lineTo(x * screenWidth, 0.1 * screenHeight);
  c.strokeStyle = 'black';
  c.stroke();
}

function loadImg(source) {
  const image = new Image();
  image.src = source;
  return image;
}

const TO_RADIANS = Math.PI / 180;

export default class Field {
  constructor(gameState) {
    this.game = gameState;
    this.canvas = document.querySelector('canvas');
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    this.canvas.width = this.screenWidth;
    this.canvas.height = this.screenHeight;

    this.ctx = this.canvas.getContext('2d');

    this.hX = 0.15 * this.screenWidth;
    this.hY = 0.47 * this.screenHeight;

    this.mX = 0.62 * this.screenWidth;
    this.mY = 0.6 * this.screenHeight;

    this.breath = 0;
    this.deltaBreath = 0.1;

    this.attack = 0;

    this.heroHead = loadImg(hHead);
    this.heroBody = loadImg(hBody);
    this.heroArmLeft = loadImg(hArmLeft);
    this.heroArmRight = loadImg(hArmRight);
    this.heroLegLeft = loadImg(hLegLeft);
    this.heroLegRight = loadImg(hLegRight);

    this.fireBall = loadImg(fireBall);
    this.iceBall = loadImg(iceBall);
    this.healBall = loadImg(healBall);
    this.rockBall = loadImg(rockBall);

    this.monster = new Monster();

    this.monsterAttackSound = new Audio(monsterAttackSound);
    this.heroDeathSound = new Audio(heroDeathSound);
    this.monsterDeathSound = new Audio(monsterDeathSound);
    this.heroFireAttackSound = new Audio(heroFireAttackSound);
    this.heroIceAttackSound = new Audio(heroIceAttackSound);
    this.healSound = new Audio(healSound);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
  }

  drawHeroIdle() {
    this.drawHeroPart(this.heroLegLeft, 180, -220);
    this.drawHeroPart(this.heroLegRight, 80, -220);
    this.drawHeroPart(this.heroArmLeft, 225, 50 + this.breath, this.breath);
    this.drawHeroPart(this.heroBody, 0, 0 + this.breath);
    this.drawHeroPart(this.heroHead, 70, 140, this.breath / 10);
    this.drawHeroPart(this.heroArmRight, 25, -70 + this.breath);
    this.updateBreath();
  }

  drawHeroPart(img, x, y, angle) {
    if (!angle) {
      this.ctx.drawImage(img, this.hX + x, this.hY - y);
    } else {
      this.drawRotatedImage(img, this.hX + x, this.hY - y, angle);
    }
  }

  drawMonsterIdle() {
    this.drawMonsterPart(this.monster.legs, 120, -150);
    this.drawMonsterPart(this.monster.body, 0, 0 + this.breath);
    this.drawMonsterPart(this.monster.head, 0, 350, this.breath / 5);
    this.updateBreath();
  }

  drawMonsterPart(img, x, y, angle) {
    if (!angle) {
      this.ctx.drawImage(img, this.mX + x, this.mY - y);
    } else {
      this.drawRotatedImage(img, this.mX + x, this.mY - y, angle);
    }
  }

  drawIdle() {
    this.drawHP(this.game.heroHP, this.game.monsterHP);
    this.drawHeroIdle();
    this.drawMonsterIdle();
    this.drawNames(this.game.heroName);
  }

  heroAttack(spellType) {
    if (spellType === 'fire') {
      this.fireAttack();
    } else if (spellType === 'ice') {
      this.iceAttack();
    } else if (spellType === 'heal') {
      this.healAttack();
    }
  }

  fireAttack() {
    if (this.attack === 0) {
      this.heroFireAttackSound.play();
    }
    this.game.monsterHP -= 1;
    this.attack += 1;
    this.ctx.drawImage(
      this.fireBall,
      ((this.hX + 300) * (20 - this.attack) + this.mX * this.attack) / 20,
      (this.hY * (20 - this.attack) + (this.mY - 400) * this.attack) / 20,
      this.attack * 40,
      this.attack * 40,
    );
    if (this.attack >= 20) {
      this.game.battleResult = 0;
      this.attack = 0;
    }
  }

  iceAttack() {
    if (this.attack === 0) {
      this.heroIceAttackSound.play();
    }
    this.game.monsterHP -= 1;
    this.attack += 1;
    this.ctx.drawImage(
      this.iceBall,
      ((this.hX + 300) * (20 - this.attack) + this.mX * this.attack) / 20,
      (this.hY * (20 - this.attack) + (this.mY - 400) * this.attack) / 20,
      this.attack * 40,
      this.attack * 40,
    );
    if (this.attack >= 20) {
      this.game.battleResult = 0;
      this.attack = 0;
    }
  }

  healAttack() {
    if (this.attack === 0) {
      this.healSound.play();
    }
    if (this.game.heroHP < 100) this.game.heroHP += 1;
    this.attack += 1;
    this.ctx.drawImage(
      this.healBall,
      this.hX - this.attack * 10,
      this.hY - this.attack * 10,
      this.attack * 50,
      this.attack * 50,
    );
    if (this.attack >= 20) {
      this.game.battleResult = 0;
      this.attack = 0;
    }
  }

  monsterAttack() {
    if (this.attack === 0) {
      this.monsterAttackSound.play();
    }
    this.game.heroHP -= 1;
    this.attack += 1;
    this.ctx.drawImage(
      this.rockBall,
      ((this.mX + 200) * (20 - this.attack) + (this.hX - 100) * this.attack) / 20,
      (this.mY * (20 - this.attack) + (this.hY - 200) * this.attack) / 20,
      this.attack * 30,
      this.attack * 30,
    );
    if (this.attack >= 20) {
      this.game.battleResult = 0;
      this.attack = 0;
    }
  }

  drawRotatedImage(image, x, y, angle) {
    // save the current co-ordinate system
    // before we screw with it
    this.ctx.save();

    // move to the middle of where we want to draw our image
    this.ctx.translate(x, y);

    // rotate around that point, converting our
    // angle from degrees to radians
    this.ctx.rotate(angle * TO_RADIANS);

    // draw it up and to the left by half the width
    // and height of the image
    this.ctx.drawImage(image, 0, 0);

    // and restore the co-ords to how they were when we began
    this.ctx.restore();
  }

  updateBreath() {
    if (this.breath >= 5 || this.breath <= -5) this.deltaBreath = -this.deltaBreath;
    this.breath += this.deltaBreath;
  }

  drawNames(heroName) {
    this.ctx.font = '40px Arial';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(heroName, 0.1 * this.screenWidth, 0.09 * this.screenHeight);
    this.ctx.fillText(this.monster.name, 0.6 * this.screenWidth, 0.09 * this.screenHeight);
  }

  drawHP(heroHP, monsterHP) {
    this.ctx.fillStyle = 'orange';
    this.ctx.fillRect(
      0.1 * this.screenWidth,
      0.1 * this.screenHeight,
      (0.3 * this.screenWidth * heroHP) / 100,
      0.03 * this.screenHeight,
    );
    this.ctx.fillRect(
      0.6 * this.screenWidth,
      0.1 * this.screenHeight,
      (0.3 * this.screenWidth * monsterHP) / 100,
      0.03 * this.screenHeight,
    );
    drawHPBord(this.ctx, 0.1, this.screenWidth, this.screenHeight);
    drawHPBord(this.ctx, 0.6, this.screenWidth, this.screenHeight);
  }

  updateMonster() {
    this.monster = new Monster();
    this.game.monsterHP = 100;
    this.game.defeatedMonsters += 1;
  }
}
