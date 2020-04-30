const time = document.querySelector('#time');
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');
let running = false;
let numSeconds = 0;

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);

function start() {
    running = true;
    console.log("start pressed, running is " + running);
    startButton.disabled = true
}

function stop() {
    running = false;
    console.log("stop pressed, running is " + running);
    startButton.disabled = false
}

function reset() {
    console.log("reset pressed");
    numSeconds = 0;
}

function getTimeStrFromSeconds(elapsedSecs) {
    let hours = Math.floor(elapsedSecs / 3600);
    let minutes = Math.floor((elapsedSecs - (hours * 3600)) / 60);
    let seconds = elapsedSecs - (hours * 3600) - (minutes * 60);
    if (hours < 10)
        hours = "0" + hours;
    if (minutes < 10)
        minutes = "0" + minutes;
    if (seconds < 10)
        seconds = "0" + seconds;
    return `${hours}:${minutes}:${seconds}`
}

setInterval(() => {
    if (running === true) {
        numSeconds++;
    }
    time.textContent = getTimeStrFromSeconds(numSeconds);
}, 1000);









