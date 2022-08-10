const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');


//Отримання картинок
const ground = new Image();
ground.src = 'img/ground.png';

const food = new Image();
food.src = 'img/food.png';



//Структура даних
let box = 32;
let score = 0;
let foodCoordinate = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box,
};
let snake = [];

snake[0] = {
  x: 9 * box,
  y: 10 * box
};


//Функція яка рухає нашу змійку
let dir;

document.addEventListener('keydown', direction);

function direction(event) {
  if (event.keyCode == 37 && dir != 'right')
    dir = 'left';
  else if (event.keyCode == 38 && dir != 'down')
    dir = 'up';
  else if (event.keyCode == 39 && dir != 'left')
    dir = 'right';
  else if (event.keyCode == 40 && dir != 'up ')
    dir = 'down';
};

//Функція де змійка їсть себе саму
function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      clearInterval(game);
    }
  }
}

//Малює повністю гру
function draw() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(food, foodCoordinate.x, foodCoordinate.y);

//Малює квадрат
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? 'red' : 'green';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
  ctx.fillStyle = 'white';
  ctx.font = '50px Arial';
  ctx.fillText(score, box * 2.5, box * 1.7);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX == foodCoordinate.x && snakeY == foodCoordinate.y) {
    score++;
    foodCoordinate = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box,
    };
  } else {
    snake.pop();
  }
// Якщо змійка виходить за межі області
  if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
    clearInterval(game);
  }

  if (dir == 'left') snakeX -= box;
  if (dir == 'right') snakeX += box;
  if (dir == 'up') snakeY -= box;
  if (dir == 'down') snakeY += box;

  let newCoordinate = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newCoordinate, snake);

  snake.unshift(newCoordinate); // Додавання квадрату на початок масиву змійки

}

let game = setInterval(draw, 100);// Малює канвас кожні 100 млс