"use strict";

const getRandom = (max) => {
  return Math.floor(Math.random() * (max + 1));
};

const getRandomRGB = () => {
  return `RGB(${getRandom(255)},${getRandom(255)},${getRandom(255)})`;
};

export { getRandom, getRandomRGB };
