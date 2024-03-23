const symbols = ['🍒', '🍋', '🍊', '🍇', '🍉']; // Example symbols
const multipliers = [3, 5, 10, 15, 20]; // Multipliers corresponding to symbols

// 絵柄ごとの確率設定 (合計は100になるように調整)
const probabilities = [30, 20, 15, 10, 25]; // Example probabilities corresponding to symbols

const slots = document.querySelectorAll('.slot');
const spinButton = document.getElementById('spinButton');
const scoreDisplay = document.getElementById('scoreValue');
const bgm = document.getElementById('bgm');
const bgmButton = document.getElementById('bgmButton');

let score = 0;
let bgmOn = false;

function toggleBgm() {
  if (bgmOn) {
    bgm.pause(); // BGMを停止
    bgmButton.textContent = 'BGM On'; // ボタンのテキストを変更
  } else {
    bgm.play(); // BGMを再生
    bgmButton.textContent = 'BGM Off'; // ボタンのテキストを変更
  }
  bgmOn = !bgmOn; // BGMの状態を反転させる
}

bgmButton.addEventListener('click', toggleBgm);

function getRandomSymbol() {
  const randomNumber = Math.random() * 100; // 0から100の間の乱数を生成

  let cumulativeProbability = 0;
  for (let i = 0; i < symbols.length; i++) {
    cumulativeProbability += probabilities[i];
    if (randomNumber <= cumulativeProbability) {
      return symbols[i];
    }
  }

  // ここに到達することはありませんが、念のため最後のシンボルを返します
  return symbols[symbols.length - 1];
}

function getMultiplier(symbol) {
  const index = symbols.indexOf(symbol);
  return multipliers[index];
}

function checkWin(slotsArray) {
  for (let i = 0; i < 3; i++) {
    if (
      slotsArray[i * 3].textContent === slotsArray[i * 3 + 1].textContent &&
      slotsArray[i * 3 + 1].textContent === slotsArray[i * 3 + 2].textContent &&
      slotsArray[i * 3].textContent !== ''
    ) {
      return true; // Check rows
    }

    if (
      slotsArray[i].textContent === slotsArray[i + 3].textContent &&
      slotsArray[i + 3].textContent === slotsArray[i + 6].textContent &&
      slotsArray[i].textContent !== ''
    ) {
      return true; // Check columns
    }
  }

  if (
    slotsArray[0].textContent === slotsArray[4].textContent &&
    slotsArray[4].textContent === slotsArray[8].textContent &&
    slotsArray[0].textContent !== ''
  ) {
    return true; // Check diagonal \
  }

  if (
    slotsArray[2].textContent === slotsArray[4].textContent &&
    slotsArray[4].textContent === slotsArray[6].textContent &&
    slotsArray[2].textContent !== ''
  ) {
    return true; // Check diagonal /
  }

  return false;
}

function spin() {
  const symbolsArray = Array.from({ length: 9 }, () => getRandomSymbol());

  slots.forEach((slot, index) => {
    slot.textContent = symbolsArray[index];
  });

  if (checkWin(slots)) {
    const symbol = slots[4].textContent;
    const multiplier = getMultiplier(symbol);
    score += multiplier; // Increase score based on multiplier
  } else {
    score -= 5; // Decrease score if no symbols match
  }

  updateScore();
}

function updateScore() {
  scoreDisplay.textContent = score;
}

spinButton.addEventListener('click', spin);
