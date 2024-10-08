//const { changeToDown } = require("./api/telegraph_api");

let audioLoaded = false;
let isMouseDownOnButton = false; 

document.addEventListener('DOMContentLoaded', async (event) => {
    const telegraphButton = document.getElementById('telegraphButton');
    const telegraphAudio = document.getElementById('telegraphAudio');
    telegraphAudio.load();
    telegraphAudio.addEventListener('canplaythrough', () => {
        audioLoaded = true;
    });
    
    const clearButton = document.getElementById('clearButton')
    
    
    
    /* TODO : A compléter, ajouter un écouteur d'évenement lorsque la souris descend */
    document.addEventListener('mousedown', (event) => {
    
        if (!isMouseDownOnButton) { 
            startTimer();
            changeToDown(telegraphButton, telegraphAudio);
            isMouseDownOnButton = true; 
        }
        if (!isMouseDownOnButton) { 
            startTimer();
            changeToDown(clearButton);
            isMouseDownOnButton = true; 
        }

    });
    
    // Gestion du relâchement de la souris
    document.addEventListener('mouseup', (event) => {
        if (isMouseDownOnButton) { 
            const pressDuration = stopTimer();  // Stop the timer and get the press duration
            const newBit = sampleBit(pressDuration);  // Sample the bit based on the press duration
            accumulateBits(newBit);  // Accumulate the bit
            changeToUp(telegraphButton, telegraphAudio);
            isMouseDownOnButton = false; 
        }
    });
    
    // Gestion du touchstart sur mobile
    telegraphButton.addEventListener('touchstart', async (event) => {
        event.preventDefault();
        isMouseDownOnButton = true;
        startTimer();
        await changeToDown(telegraphButton, telegraphAudio);
    });
    // Gestion du touchend sur mobile
    document.addEventListener('touchend', (event) => {
        if (isMouseDownOnButton) { 
            const pressDuration = stopTimer();
            const newBit = sampleBit(pressDuration);
            accumulateBits(newBit);
            changeToUp(telegraphButton, telegraphAudio);
            isMouseDownOnButton = false; 
        }
    });

    // Gestion de l'annulation du touchstart sur mobile
    document.addEventListener('touchcancel', () => {
        if (isMouseDownOnButton) {
            changeToUp(telegraphButton, telegraphAudio);
            isMouseDownOnButton = false;
        }
    });

    // Gestion de la sortie de la souris du bouton
    telegraphButton.addEventListener('mouseout', () => {
        if (isMouseDownOnButton) {
            changeToUp(telegraphButton, telegraphAudio);
            isMouseDownOnButton = false;
        }
    });
});
