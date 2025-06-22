const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confetti = [];
for (let i = 0; i < 200; i++) {
  confetti.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 2,
    d: Math.random() * 50,
    color: `hsl(${Math.random() * 360}, 100%, 70%)`,
    tilt: Math.random() * 10 - 10,
    tiltAngleIncrement: Math.random() * 0.1 + 0.05,
    tiltAngle: 0
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((c, i) => {
    c.tiltAngle += c.tiltAngleIncrement;
    c.y += Math.cos(c.d) + 1 + c.r / 2;
    c.x += Math.sin(c.d);
    c.tilt = Math.sin(c.tiltAngle) * 15;
    if (c.y > canvas.height) {
      confetti[i].y = -10;
      confetti[i].x = Math.random() * canvas.width;
    }
    ctx.beginPath();
    ctx.lineWidth = c.r;
    ctx.strokeStyle = c.color;
    ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
    ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
    ctx.stroke();
  });
}

setInterval(drawConfetti, 20);

function showWish() {
  const name = document.getElementById('nameInput').value.trim();
  const wish = document.getElementById('wishMessage');
  const photo = document.getElementById('photoInput');
  const img = document.getElementById('uploadedPhoto');
  const music = document.getElementById('music');

  if (name !== "") {
    wish.textContent = `🎂 Happy Birthday, ${name}!`;
    wish.style.display = "block";
    music.play();
  }

  if (photo.files && photo.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      img.src = e.target.result;
      img.style.display = 'block';
    };
    reader.readAsDataURL(photo.files[0]);
  }
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
