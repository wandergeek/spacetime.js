function createParagraph() {
    let para = document.createElement('p');
    para.textContent = 'You clicked the button';
    document.body.appendChild(para);
}

const buttons = document.querySelectorAll('button');
console.log(buttons)
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', createParagraph);
    console.log(buttons[i].outerText)
}