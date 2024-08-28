const VOWS = "aeiouy";
const CONS = "bcdfghjklmnpqrstvwxz";

(() => {
  let container = document.getElementById("container");
  let textbox = document.getElementById("text_box");
  let controls = document.getElementById("controls");

  let current;
  let currentMutated;

  const random = (n, m) => {
    return Math.floor(Math.random() * (m - n + 1)) + n;
  };

  const pick = (arr) => {
    if (arr.length === 0) return undefined;

    return arr[random(0, arr.length - 1)];
  };

  const generateColor = () => {
    return `#${random(0, 16777215).toString(16).padStart(6, "0")}`;
  };

  const dimColor = (color, factor) => {
    factor = Math.max(0, Math.min(1, factor));

    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    r = Math.floor(r * (1 - factor));
    g = Math.floor(g * (1 - factor));
    b = Math.floor(b * (1 - factor));

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  };

  const updateColor = () => {
    let color = generateColor();
    let dimmed = dimColor(color, 0.4);

    document.documentElement.style.setProperty("--background-color", color);

    textbox.style.color = dimmed;
    controls.style.color = dimmed;
  };

  const isVowel = (letter) => {
    for (let i = 0; i < VOWS.length; i++) {
      if (VOWS[i] == letter) {
        return true;
      }
    }
    return false;
  };

  const generateRandomWord = (syllables) => {
    let word = "";
    for (let i = 0; i < syllables; i++) {
      word += generateRandomSyllable();
    }
    return word;
  };

  const mutateWord = (word) => {
    let idx = random(0, word.length - 1);
    let letter = word[idx];

    let mutated = word;
    while (mutated === word) {
      if (isVowel(letter)) {
        mutated = word.slice(0, idx) + pick(VOWS) + word.slice(idx + 1);
      } else {
        mutated = word.slice(0, idx) + pick(CONS) + word.slice(idx + 1);
      }
    }

    return mutated;
  };

  const generateRandomSyllable = () => {
    switch (random(0, 2)) {
      case 0: // <con><vow>
        return pick(CONS) + pick(VOWS);
      case 1: // <con><vow><con>
        return pick(CONS) + pick(VOWS) + pick(CONS);
      case 2: // <vow><con>
        return pick(VOWS) + pick(CONS);
      // case 3: // <vow>
      //   return pick(VOWS);
    }
  };

  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      updateColor();

      do {
        current = generateRandomWord(random(1, 4));
      } while (current >= 7);

      textbox.textContent = current;
    }
    if (e.code === "Enter" && current !== undefined) {
      let mutated = currentMutated;
      while (mutated === currentMutated) {
        mutated = mutateWord(current);
      }

      textbox.textContent = mutated;
    }
  });

  updateColor();
})();
