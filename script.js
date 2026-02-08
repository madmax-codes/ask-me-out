const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const result = document.getElementById("result");
const actions = document.querySelector(".actions");
const celebration = document.getElementById("celebration");
const photoCelebration = document.getElementById("photo-celebration");

const boundsPadding = 8;
const evadeRadius = 80;

function layoutButtons() {
  const rect = actions.getBoundingClientRect();
  const maxWidth = Math.max(yesBtn.offsetWidth, noBtn.offsetWidth);
  const gap = 16;

  yesBtn.style.width = `${maxWidth}px`;
  noBtn.style.width = `${maxWidth}px`;

  const totalWidth = maxWidth * 2 + gap;
  const startX = Math.max(boundsPadding, (rect.width - totalWidth) / 2);
  const y = Math.max(
    boundsPadding,
    (rect.height - yesBtn.offsetHeight) / 2
  );

  yesBtn.style.left = `${startX}px`;
  yesBtn.style.top = `${y}px`;
  noBtn.style.left = `${startX + maxWidth + gap}px`;
  noBtn.style.top = `${y}px`;
}

function moveNoButton() {
  const rect = actions.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = Math.max(0, rect.width - btnRect.width - boundsPadding * 2);
  const maxY = Math.max(0, rect.height - btnRect.height - boundsPadding * 2);

  const x = Math.min(
    rect.width - btnRect.width - boundsPadding,
    Math.max(boundsPadding, Math.random() * maxX + boundsPadding)
  );
  const y = Math.min(
    rect.height - btnRect.height - boundsPadding,
    Math.max(boundsPadding, Math.random() * maxY + boundsPadding)
  );

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function evadeIfClose(event) {
  const btnRect = noBtn.getBoundingClientRect();
  const dx = event.clientX - (btnRect.left + btnRect.width / 2);
  const dy = event.clientY - (btnRect.top + btnRect.height / 2);
  const distance = Math.hypot(dx, dy);
  if (distance < evadeRadius) {
    moveNoButton();
  }
}

function burstCelebration() {
  celebration.innerHTML = "";
  photoCelebration.innerHTML = "";
  const confettiColors = ["#e63d6c", "#ff6f91", "#ff8fab", "#ffd166"];

  for (let i = 0; i < 50; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.textContent = "❤";
    piece.style.color = confettiColors[i % confettiColors.length];
    piece.style.animationDelay = `${Math.random() * 0.2}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    celebration.appendChild(piece);
  }

  for (let i = 0; i < 36; i += 1) {
    const side = document.createElement("span");
    side.className = "confetti-side";
    side.textContent = "❤";
    side.style.color = confettiColors[i % confettiColors.length];
    side.style.animationDelay = `${Math.random() * 0.3}s`;
    side.style.top = `${5 + Math.random() * 90}%`;

    if (i % 2 === 0) {
      side.style.left = "-6%";
      side.style.setProperty("--side-drift", "200px");
    } else {
      side.style.right = "-6%";
      side.style.setProperty("--side-drift", "-200px");
    }

    photoCelebration.appendChild(side);
  }
}

noBtn.addEventListener("pointerenter", moveNoButton);
noBtn.addEventListener("pointermove", moveNoButton);
noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});

actions.addEventListener("pointermove", evadeIfClose);

yesBtn.addEventListener("click", () => {
  result.classList.remove("hidden");
  yesBtn.disabled = true;
  noBtn.disabled = true;
  noBtn.setAttribute("aria-disabled", "true");
  burstCelebration();
});

window.addEventListener("load", () => {
  layoutButtons();
});

window.addEventListener("resize", layoutButtons);
