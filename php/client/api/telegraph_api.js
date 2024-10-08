let pressStartTime = 0;
let currentBitPos = 0;
let bitsSaved = [0, 0, 0, 0, 0, 0, 0, 0];
let tabAscii = [];
const bitShow = document.getElementById("bitsSaved");
const charAscii = document.getElementById("charAscii");
const char = document.getElementById("char");

async function playSound(telegraphAudio) {
  telegraphAudio.currentTime = 0;
  try {
    await telegraphAudio.play();
  } catch (error) {
    console.error("Erreur lors de la lecture audio :", error);
  }
}

function stopSound(telegraphAudio) {
  telegraphAudio.pause();
}

function stopTimer() {
  const pressDuration = Date.now() - pressStartTime; // Calcule la durée
  return pressDuration;
}

function startTimer() {
  pressStartTime = Date.now();
}

async function changeToDown(telegraphButton, telegraphAudio) {
  telegraphButton.style.backgroundImage = "url('media/telegraph_down.png')";

  await playSound(telegraphAudio);
}

function sampleBit(timePressed) {
  /* TODO : A compléter */
  if (timePressed < 200) {
    return 0;
  } else {
    return 1;
  }

  //return currentBit;
}

function changeToUp(telegraphButton, telegraphAudio) {
  telegraphButton.style.backgroundImage = "url('media/telegraph_up.png')";

  stopSound(telegraphAudio);
}

function accumulateBits(newBit) {
  /* TODO : A compléter */
  if (currentBitPos < 8) {
    bitsSaved[currentBitPos] = newBit;
    currentBitPos++;

    bitShow.innerHTML += newBit + " "; // Montre les bits
  }

  if (currentBitPos === 8) {
    const asciiChar = calculateAscii(bitsSaved);
    console.log("ASCII Character:", asciiChar);
    console.log("The Character:", String.fromCharCode(asciiChar)); // Converti les décimal en Symbole ASCII
    charAscii.innerHTML = asciiChar;
    char.innerHTML = String.fromCharCode(asciiChar);

    sendCharacter(asciiChar);

    tabAscii.push(asciiChar); // Add the character to tabAscii array
    console.log("Complete ASCII Message:", tabAscii.join(""));

    clearBitsSaved(); // Clear pour prochain bit
    currentBitPos = 0; // Remet à 0 le nombre de bits

    bitShow.innerHTML = ""; //Remet à rien les bits
  }
}

function clear() {
  clearBitsSaved(); // Clear pour prochain bit
  charAscii.innerHTML = "";
  char.innerHTML = "";
  bitShow.innerHTML = ""; //Remet à rien les bits
}

function calculateAscii(bitsArray) {
  /* TODO : A compléter */
  let asciiValue = 0;
  for (let i = 0; i < bitsArray.length; i++) {
    asciiValue += bitsArray[i] * Math.pow(2, 7 - i); // Converti la ligne de binaire en décimal
  }
  return asciiValue;
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = {
    playSound,
    stopSound,
    changeToDown,
    changeToUp,
  };
}

// Ne pas modifier ces deux fonctions
function getBitsSaved() {
  return bitsSaved;
}

function clearBitsSaved() {
  bitsSaved = [0, 0, 0, 0, 0, 0, 0, 0];
}
