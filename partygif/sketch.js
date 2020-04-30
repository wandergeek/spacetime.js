var capture;
var recording = false;
var c;
var gif;
let partyColors;
let partyColorsIndex = 0;
var capw = 320,
    caph = 240;
var buffer;
var result;
let startButton,
    stopButton,
    recordDot;



function setup() {
    c = createCanvas(capw, caph);
    capture = createCapture({
        audio: false,
        video: {
            width: 640,
            height: 480
        }
    }, function () {
        console.log('capture ready.')
    });


    capture.id("muhcapture");
    capture.size(capw, caph);
    capture.hide();
    setupGif();
    partyColors = [color(255, 141, 139, 128), color(254, 214, 137, 128), color(136, 255, 137, 128), color(135, 255, 255, 128), color(215, 140, 255, 128), color(255, 140, 255, 128), color(255, 104, 247, 128), color(254, 108, 183, 128), color(255, 105, 104, 128)];
    buffer = new jsfeat.matrix_t(capw, caph, jsfeat.U8C1_t);
    startButton = createButton('start');
    startButton.mousePressed(start);
    stopButton = createButton('stop');
    stopButton.mousePressed(stop);
    recordDot = select('.recordDot');
}

function stop() {
    recording = false;
    recordDot.elt.style.visibility = 'hidden';
    gif.render();
    select('body').elt.style['background-image'] = "";
}

function start() {
    recording = true;
    recordDot.elt.style.visibility = 'visible';
    select('body').elt.style['background-image'] = "url(parrot.gif)";
}

function jsfeatToP5(src, dst) {
    if (!dst || dst.width != src.cols || dst.height != src.rows) {
        dst = createImage(src.cols, src.rows);
    }
    var n = src.data.length;
    dst.loadPixels();
    var srcData = src.data;
    var dstData = dst.pixels;
    for (var i = 0, j = 0; i < n; i++) {
        var cur = srcData[i];
        dstData[j++] = cur;
        dstData[j++] = cur;
        dstData[j++] = cur;
        dstData[j++] = 255;
    }
    dst.updatePixels();
    return dst;
}

function draw() {
    background(255);
    image(capture, 0, 0, capw, caph);
    capture.loadPixels();
    if (capture.pixels.length > 0) { // don't forget this!
        var blurSize = select('#blurSize').elt.value;
        var lowThreshold = select('#lowThreshold').elt.value;
        var highThreshold = select('#highThreshold').elt.value;

        blurSize = map(blurSize, 0, 100, 1, 12);
        lowThreshold = map(lowThreshold, 0, 100, 0, 255);
        highThreshold = map(highThreshold, 0, 100, 0, 255);

        jsfeat.imgproc.grayscale(capture.pixels, capw, caph, buffer);
        jsfeat.imgproc.gaussian_blur(buffer, buffer, blurSize, 0);
        jsfeat.imgproc.canny(buffer, buffer, lowThreshold, highThreshold);
        var n = buffer.rows * buffer.cols;
        for (var i = 0; i < n; i++) {
            buffer.data[i] = 255 - buffer.data[i];
        }
        result = jsfeatToP5(buffer, result);
        tint(255, 127);
        image(result, 0, 0, capw, caph);
    }

    if (recording) {
        fill(partyColors[partyColorsIndex]);
        rect(0, 0, capw, caph);
        if (frameCount % 30 == 0) {
            partyColorsIndex = (partyColorsIndex + 1) % partyColors.length;
            gif.addFrame(c.elt, { delay: 1, copy: true });
        }
    }
}


function setupGif() {
    gif = new GIF({
        workers: 2,
        quality: 40,
        width: capw,
        height: caph
    });

    gif.on('finished', function (blob) {
        window.open(URL.createObjectURL(blob));
        setupGif();
    });
}