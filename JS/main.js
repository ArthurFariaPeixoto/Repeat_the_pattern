var order = [];
var clickedOrder = [];
var score = 0;

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const blueSound = new Audio('./src/blueSound.wav');
const redSound = new Audio('./src/redSound.wav');
const yellowSound = new Audio('./src/yellowSound.wav');
const greenSound = new Audio('./src/greenSound.wav');

/*
    0 - azul
    1 - vermelho
    2 - amarelo
    3 - verde
 */

//cria ordem
let randomOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order){
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//acende cor
let lightColor = (element, number) => {
    number *= 500;
    setTimeout(()=>{
        element.classList.add('selected');
        if(element === blue){
            playSoundElement(0);
        }
        else if(element === red){
            playSoundElement(1);
        }
        else if(element === yellow){
            playSoundElement(2);
        }
        else if(element === green){
            playSoundElement(3);
        }
    }, number-250);
    setTimeout(()=>{
        element.classList.remove('selected');
    }, number+220);
}

//compara valor esperado e obtido
let checkOrder = () =>{
    for(let i in clickedOrder){
        if(clickedOrder[i] != order[i]){
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length){
        alert(`Score: ${score}`);
        nextLevel();
    }
}

let click = (color) =>{
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(()=>{
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

let createColorElement = (color) =>{
    if(color == 0){
        return blue;
    }
    else if(color == 1){
        return red;
    }
    else if(color == 2){
        return yellow;
    }
    else if(color == 3){
        return green;
    }
}

let playSoundElement = (color) =>{
    if(color == 0){
        blueSound.play();
    }
    else if(color == 1){
        redSound.play();
    }
    else if(color == 2){
        yellowSound.play();
    }
    else if(color == 3){
        greenSound.play();
    }
}

let nextLevel = () =>{
    score+=1;
    randomOrder();
}

let gameOver = () =>{
    alert(`Game over! Your score was: ${score}\nClick OK to restart`);
    order = [];
    clickedOrder = [];

    newGame();
}

let newGame = () =>{
    score=0;
    nextLevel();
}

blue.onclick = () => (click(0), playSoundElement(0));
red.onclick = () => (click(1), playSoundElement(1));
yellow.onclick = () => (click(2), playSoundElement(2));
green.onclick = () => (click(3), playSoundElement(3));

newGame();