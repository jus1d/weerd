const VOWS = "aeiouy";
const CONS = "bcdfghjklmnpqrstvwxz";

(() => {
  let container = document.getElementById("container");
  let textbox = document.getElementById("text_box");

  let current;

  const random = (n, m) => {
    return Math.floor(Math.random() * (m - n + 1)) + n;
  };

  const pick = (arr) => {
    if (arr.length === 0) return undefined;

    return arr[Math.floor(Math.random() * arr.length)];
  };

  const generateColor = () => {
    return `#${random(0, 16777216).toString(16).padStart(6, "0")}`;
  };

  const generateRandomWord = (syllables) => {
    let word = "";
    for (let i = 0; i < syllables; i++) {
      word += generateRandomSyllable();
    }
    return word;
  };

  const generateRandomSyllable = () => {
    switch (random(0, 3)) {
      case 0: // <con><vow>
        return pick(CONS) + pick(VOWS);
      case 1: // <con><vow><con>
        return pick(CONS) + pick(VOWS) + pick(CONS);
      case 2: // <vow><con>
        return pick(VOWS) + pick(CONS);
      case 3: // <vow>
        return pick(VOWS);
    }
  };

  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      container.style.backgroundColor = generateColor();

      current = generateRandomWord(random(1, 4));
      textbox.textContent = current;
    }
  });

  container.style.backgroundColor = generateColor();
})();
