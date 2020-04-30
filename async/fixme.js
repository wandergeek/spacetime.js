console.log('Starting');
let image;

fetch('gaysian.gif').then((response) => {
    console.log('It worked :)')
    return response.blob();
}).then((myBlob) => {
    let objectURL = URL.createObjectURL(myBlob);
    image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
}).then(() => {
    console.log('All done!');
}).catch((error) => {
    console.log('There has been a problem with your fetch operation: ' + error.message);
});

