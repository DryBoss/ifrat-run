const world = document.querySelector(".world");
const grounds = document.querySelectorAll(".ground");

const getPropertyValue = (element, property) => {
  return parseFloat(getComputedStyle(element).getPropertyValue(property)) || 0
}
const setPropertyValue = (element, property, value) => {
  element.style.setProperty(property, value);
}
const increasePropertyValue = (element, property, increase) => {
  setPropertyValue(element, property, getPropertyValue(element, property) + increase)
}

setPropertyValue(grounds[0], "--left", 0)
setPropertyValue(grounds[1], "--left", 300)

const updateGame = () => {
  updateGround(1);
};

const updateGround = (speed) => {
  grounds.forEach(ground => {
    increasePropertyValue(ground, "--left", speed * -1)

    if (getPropertyValue(ground, "--left") <= -300) {
      increasePropertyValue(ground, "--left", 600)
    }
  })
}

setInterval(updateGame, 10);