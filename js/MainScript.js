"use strict;"

let addButton = document.getElementById("b1"); //добавление строки
addButton.onclick = () => {
    let transitionLines = document.querySelectorAll(".transition-line");
    let lastTransitionLine = transitionLines[transitionLines.length - 1];
    let transitionCopy =lastTransitionLine.cloneNode(true);
    let inputs = transitionCopy.querySelectorAll(".transition-input");
    inputs.forEach(element => {
        element.value = '';
});
    let parent = document.querySelector(".command-form");
    parent.insertBefore(transitionCopy, lastTransitionLine.nextSibling);
    return false;
};

let removeButton = addButton = document.getElementById("b2"); //удаление строки
removeButton.onclick = () => {
    let transitionLines = document.querySelectorAll(".transition-line");
    for(let i = 1; i < transitionLines.length; i++){
        let parent = document.querySelector(".command-form")
        parent.delete(transitionLines[i]);
    }
    return false;
};

let loadButton = document.querySelector("button.load-button");
loadButton.onclick = () => {
    let memory = document.querySelector(".memory-input").value.split(",");
    let memoryContainer = document.querySelector(".memory-block-container");
    let oldBlocks = memoryContainer.querySelectorAll(".memory-block");
    for (let i = 0; i < oldBlocks.length; i++) {
        memoryContainer.removeChild(oldBlocks[i]);
    }

    let tm = new TuringMachine(memory, null, 1);

    memory = tm.getResult();

    for (let i = 0; i < memory.length; i++) {
        let memBlock = document.createElement("div");
        memBlock.className = "memory-block";
        memBlock.innerText = memory[i];
        memoryContainer.appendChild(memBlock);
    }
    return false;
};



let runButton = document.querySelector("button.run-button");
runButton.onclick = () => {
    if (document.querySelector(".memory-input").value === "") {
        if(!confirm("Empty memory. Proceed?"))
            alert("INPUT ERROR! check your input!!!");
        else{
            //let now = new Date(); Не понятно:(
            runTuringMachine();
            //let fut = new Date();
        }
    } else {
        runTuringMachine();
    }
    return false;
};

function runTuringMachine() {
    let lines = document.getElementsByClassName("transition-line");
    let transitions = [];
    for (let i = 0; i < lines.length; i++) {
        // if (fut - now > 5000){
        //     alert("ERROR! renew the page!!!");
        //     break;
        // }
        let line = lines[i];
        let state0 = line.querySelector(".state0").value;
        let char0 = line.querySelector(".char0").value;
        let state1 = line.querySelector(".state1").value;
        let char1 = line.querySelector(".char1").value;
        let direction1 = line.querySelector(".direction1").value;

        transitions.push({
            State0: state0,
            Char0: char0,
            State1: state1,
            Char1: char1,
            Direction1: direction1
        });
    }

    let memory = document.querySelector(".memory-input").value.split(",");
    let memoryContainer = document.querySelector(".memory-block-container");
    let oldBlocks = memoryContainer.querySelectorAll(".memory-block");
    for (let i = 0; i < oldBlocks.length; i++) {
        memoryContainer.removeChild(oldBlocks[i]);
    }


    let tm = new TuringMachine(memory, transitions, 1);

    try{
        tm.work();
        memory = tm.getResult();

        for (let i = 0; i < memory.length; i++) {
            // if (fut - now > 5000){
            //     alert("ERROR! renew the page!!!");
            //     break;
            // }
            let memBlock = document.createElement("div");
            memBlock.className = "memory-block";
            memBlock.innerText = memory[i];
            memoryContainer.appendChild(memBlock);
        }
    }catch(err){
        alert(err.message);
    }

}