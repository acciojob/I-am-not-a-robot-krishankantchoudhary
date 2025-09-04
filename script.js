//your code here
// Image sources (you can replace with your own image URLs)
const images = [
  "https://via.placeholder.com/120/ff7f7f", // red
  "https://via.placeholder.com/120/7f7fff", // blue
  "https://via.placeholder.com/120/7fff7f", // green
  "https://via.placeholder.com/120/ffff7f", // yellow
  "https://via.placeholder.com/120/ff7fff"  // pink
];

const container = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const para = document.getElementById("para");

let selected = [];

// Fisher-Yates shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Initialize grid
function init() {
  para.textContent = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  selected = [];
  container.innerHTML = "";

  // Pick random duplicate
  const duplicate = images[Math.floor(Math.random() * images.length)];

  // Create array with duplicate
  let allImgs = [...images, duplicate];

  // Shuffle them
  allImgs = shuffle(allImgs);

  // Render
  allImgs.forEach((src, idx) => {
    const img = document.createElement("img");
    img.src = src;
    img.dataset.index = idx;
    img.addEventListener("click", () => selectImage(img));
    container.appendChild(img);
  });
}

function selectImage(img) {
  // Prevent selecting same image twice
  if (selected.find(sel => sel.index === img.dataset.index)) return;

  resetBtn.style.display = "inline-block";

  if (selected.length < 2) {
    img.classList.add("selected");
    selected.push({ src: img.src, index: img.dataset.index });
  }

  // Show verify button only after exactly 2 selected
  if (selected.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

resetBtn.addEventListener("click", () => {
  init();
});

verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";
  if (selected.length === 2) {
    if (selected[0].src === selected[1].src) {
      para.textContent = "You are a human. Congratulations!";
      para.style.color = "green";
    } else {
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
      para.style.color = "red";
    }
  }
});

// Run on load
init();
