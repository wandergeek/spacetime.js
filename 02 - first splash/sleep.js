const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

var size = 1;
var thing = async () => {
    for (var i = 1; i < 1000; i++) {
        await sleep(100)
        size++;
        guesses.style.fontSize = size.toString() + "%";
    }
}

thing();
