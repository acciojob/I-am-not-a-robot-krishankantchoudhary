document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("image-container");
  const resetBtn = document.getElementById("reset");
  const verifyBtn = document.getElementById("verify");
  const para = document.getElementById("para");

  const images = [
    "https://via.placeholder.com/120/ff7f7f", 
    "https://via.placeholder.com/120/7f7fff",
    "https://via.placeholder.com/120/7fff7f",
    "https://via.placeholder.com/120/ffff7f",
    "https://via.placeholder.com/120/ff7fff"
  ];

  let selected = [];

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function init() {
    para.textContent = "";
    resetBtn.style.display = "none";
    verifyBtn.style.display = "none";
    selected = [];
    container.innerHTML = "";

    const duplicate = images[Math.floor(Math.random() * images.length)];
    let allImgs = [...images, duplicate];
    allImgs = shuffle(allImgs);

    allImgs.forEach((src, idx) => {
      const img = document.createElement("img");
      img.src = src;
      img.classList.add(`img${idx + 1}`); // ✅ add class for Cypress tests
      img.dataset.index = idx;
      img.addEventListener("click", () => selectImage(img));
      container.appendChild(img);
    });
  }

  function selectImage(img) {
    if (selected.find(sel => sel.index === img.dataset.index)) return;

    resetBtn.style.display = "inline-block";

    if (selected.length < 2) {
      img.classList.add("selected");
      selected.push({ src: img.src, index: img.dataset.index });
    }

    if (selected.length === 2) {
      verifyBtn.style.display = "inline-block";
    }
  }

  resetBtn.addEventListener("click", () => init());

  verifyBtn.addEventListener("click", () => {
    verifyBtn.style.display = "none";
    if (selected[0].src === selected[1].src) {
      para.textContent = "You are a human. Congratulations!";
      para.style.color = "green";
    } else {
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
      para.style.color = "red";
    }
  });

  // ✅ run after DOM is ready
  init();
});
