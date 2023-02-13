// lear
// Frogger

window.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box");
  const frogImage = '<img src="images/frog.png" width="40px" height"40px" />';
  const cherryImage =
    '<img src="images/cherries.png" width="40px" height="40px" />';
  const snakeImage =
    '<img src="images/snake.png" width="40px" height="40px" />';
  const scoreText = document.querySelector(".score")!;
  const restartBtn = document.querySelector(".restart-btn")!;
  const switchBtn = document.querySelector(".switch-btn")!;
  const timer = document.querySelector(".timer")!;
  const audio = new Audio("sound/eating.wav");

  let currentIndex = 94;
  let move = 10;
  let score = 0;
  let time = 0;

  // Switching Background
  switchBtn.addEventListener("click", () => {
    switchBtn.innerHTML =
      switchBtn.innerHTML == '<i class="fa fa-moon-o"></i>'
        ? '<i class="fa fa-sun-o"></i>'
        : '<i class="fa fa-moon-o"></i>';
    document.body.classList.toggle("dark-body");
  });

  document.addEventListener("keydown", (e) => {
    // Removing Frog From Previous Position
    boxes[currentIndex].innerHTML = "";

    // On Key Down
    switch (e.key) {
      case "ArrowLeft":
        currentIndex % move === 0 ? 0 : currentIndex--;
        break;
      case "ArrowRight":
        (currentIndex + 1) % move === 0 ? 0 : currentIndex++;
        break;
      case "ArrowUp":
        currentIndex > 9 ? (currentIndex -= move) : 0;
        break;
      case "ArrowDown":
        currentIndex < 90 ? (currentIndex += move) : 0;
        break;
    }

    // Checking If Frog Eats Cherry
    if (boxes[currentIndex].innerHTML.includes("cherries")) {
      let snakeIndex = Math.floor(Math.random() * boxes.length);
      let cherryIndex = Math.floor(Math.random() * boxes.length);

      if (boxes[cherryIndex].innerHTML != "") {
        while (boxes[cherryIndex].innerHTML != "") {
          cherryIndex = Math.floor(Math.random() * boxes.length);
        }
      }

      if (boxes[snakeIndex].innerHTML != "") {
        while (boxes[snakeIndex].innerHTML != "") {
          snakeIndex = Math.floor(Math.random() * boxes.length);
        }
      }

      boxes[cherryIndex].innerHTML = cherryImage;
      boxes[snakeIndex].innerHTML = snakeImage;

      score++;
      scoreText.innerHTML = score.toString();

      audio.src = "sound/eating.wav";
      audio.play();
    }

    // Checking If Frog Gets Eaten By Snake
    if (boxes[currentIndex].innerHTML.includes("snake")) {
      audio.src = "sound/hitted.wav";
      audio.play();
      alert(`Game Over! Your score is ${score}`);
      GameOver();
    }

    // Adding Frog To Next Position
    boxes[currentIndex].innerHTML = frogImage;

    // Game Over
    function GameOver() {
      currentIndex = 94;
      time = 0;
      score = 0;
      scoreText.innerHTML = score.toString();

      boxes.forEach((item) => (item.innerHTML = ""));
      boxes[currentIndex].innerHTML = frogImage;
      boxes[6].innerHTML = cherryImage;
    }

    // Reset Game
    restartBtn.addEventListener("click", GameOver);
  });

  // Timer
  function Timer() {
    time += 0.01;
    timer.innerHTML = time.toFixed(2).toString();
  }

  setInterval(Timer, 10);
});
