/* eslint-disable import/no-unresolved */
import mHead1 from './images/monster1/head.png';
import mBody1 from './images/monster1/body.png';
import mLegs1 from './images/monster1/legs.png';

import mHead2 from './images/monster2/head.png';
import mBody2 from './images/monster2/body.png';
import mLegs2 from './images/monster2/legs.png';

import mHead3 from './images/monster3/head.png';
import mBody3 from './images/monster3/body.png';
import mLegs3 from './images/monster3/legs.png';

import monsterDict from './monsterDict';

const mHeadArray = [mHead1, mHead2, mHead3];
const mBodyArray = [mBody1, mBody2, mBody3];
const mLegsArray = [mLegs1, mLegs2, mLegs3];

function randInt(num) {
  return Math.round(Math.random() * num);
}

function loadImg(source) {
  const image = new Image();
  image.src = source;
  return image;
}

function generateMonsterName() {
  return `${monsterDict.first[randInt(monsterDict.first.length - 1)]} ${
    monsterDict.second[randInt(monsterDict.second.length - 1)]
  } ${monsterDict.third[randInt(monsterDict.third.length - 1)]}`;
}

export default class Monster {
  constructor() {
    this.name = generateMonsterName();

    this.mHead = mHeadArray[Math.round(Math.random() * (mHeadArray.length - 1))];
    this.mBody = mBodyArray[Math.round(Math.random() * (mBodyArray.length - 1))];
    this.mLegs = mLegsArray[Math.round(Math.random() * (mLegsArray.length - 1))];

    this.head = loadImg(this.mHead);
    this.body = loadImg(this.mBody);
    this.legs = loadImg(this.mLegs);
  }
}
