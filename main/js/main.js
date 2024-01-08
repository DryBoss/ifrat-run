const world = document.querySelector(".world");
const grounds = document.querySelectorAll(".ground");
const playButton = document.querySelector(".play");
const jumpButton = document.querySelector(".jump");
const duckButton = document.querySelector(".duck");
const char = document.querySelector(".char");

let gameActive = false;
let gameSpeed;
let score;
let frameCount;
let charJump = false;

const getPropertyValue = (element, property) => {
  return parseFloat(getComputedStyle(element).getPropertyValue(property)) || 0
}
const setPropertyValue = (element, property, value) => {
  element.style.setProperty(property, value);
}
const increasePropertyValue = (element, property, increase) => {
  setPropertyValue(element, property, getPropertyValue(element, property) + increase)
}

const updateGround = (speed) => {
  if (gameActive) {
    grounds.forEach(ground => {
      increasePropertyValue(ground, "--left", speed * -1)
  
      if (getPropertyValue(ground, "--left") <= -300) {
        score++;
        gameSpeed = gameSpeed + 0.01;
        console.log(score)
        increasePropertyValue(ground, "--left", 600)
      }
    })
  } else {
    playButton.classList.remove("hide");
    gameSpeed = 0.5;
    score = 0
  }
}

const updateDino = (speed) => {
  if (gameActive && !charJump) {
    if (frameCount <= 5) {
      char.src = 'images/char-run-1.png'
    } else {
      char.src = 'images/char-run-2.png'
    }
  } else {
    char.src = 'images/char-stand.png'
  }
}

playButton.addEventListener('click', () => {
  playButton.classList.add("hide");
  gameActive = true;
  frameCount = 0;
});
jumpButton.addEventListener('click', () => {
  char.src = 'images/char-stand.png';
  charJump = true;
})

const updateGame = () => {
  updateGround(gameSpeed);
  updateDino(gameSpeed);
  if (frameCount > 10) {
    frameCount = 0
  } else {
    frameCount++
  }
};

setPropertyValue(grounds[0], "--left", 0)
setPropertyValue(grounds[1], "--left", 300)
setInterval(updateGame, 10);