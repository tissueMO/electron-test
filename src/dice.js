const $ = require('jquery');

let counter = -1;
let counter2 = 0;
let counter3 = 0;
let dy = 0;
let previousdy = 0;
let turned = false;
let rollingTimer = null;
let boundTimer = null;
const boundCount = 3;

/** @type {CanvasRenderingContext2D} */
const canvas = $('#canvas').get(0);
const ctx = canvas.getContext('2d');
canvas.width = 200;
canvas.height = 400;

$(() => {
  rollingTimer = setInterval(() => {
    counter++;
    counter = counter % 5;

    // 描画位置を決定
    previousdy = dy;
    dy = canvas.height / 2 * Math.abs(Math.sin(counter2)) / (counter3 + 1);
    console.log(previousdy, dy);
    if (boundTimer && !turned && previousdy > dy) {
      turned = true;
      console.log('Turned');
    } else if (boundTimer && turned && dy > previousdy) {
      console.log('Bounded');
      dy = 0;
      previousdy = 0;
      turned = false;
      counter3++;
      if (counter3 >= boundCount) {
        clearInterval(rollingTimer);
        rollingTimer = null;
        clearInterval(boundTimer);
        boundTimer = null;

        const value = Math.ceil(Math.random() * 6);
        const image = $(`#dice-${value}`).get(0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, image.naturalHeight);
        console.log(`サイコロ結果: ${value}`);
        return;
      }
    }

    // 現在のサイコロを描画
    const image = $(`#dice-m${counter + 1}`).get(0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, image.naturalHeight - dy);
  }, 50);

  $('#canvas').on('click', () => {
    dy = 0;
    counter2 = 0;
    counter3 = 0;
    turned = false;

    boundTimer = setInterval(() => {
      counter2 += Math.PI / 180 * 2.0;
    }, 5);
  });
});
