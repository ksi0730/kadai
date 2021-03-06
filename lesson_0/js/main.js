// jsを記述する際はここに記載していく
window.onload = function() {
    bubbly({
        colorStart: '#fff4e6',
        colorStop: '#ffe9e4',
        blur: 1,
        compose: 'source-over',
        bubbleFunc: () => `hsla(${Math.random() * 50}, 100%, 50%, .3)`
    });


};

const autoWriteDOM = document.querySelectorAll(".autoWrite");
const autoWriteWords = [];
const autoWriteSpeed = [];
const autoWriteWait = [];
const breakDOM = document.querySelectorAll(".autoWriteBreak");
const breakWords = [];
const breakSpeed = [];
const breakWait = [];
class autoWrite {
    constructor(output, words, speed, wait) {
        this.output = output;
        this.words = words;
        this.speed = speed;
        this.wait = wait;
        this.wordsIndex = 0;
        this.outputText = "";
        this.isDeleting = false;
        this.typing();
    }
    typing() {
        this.currentIndex = this.wordsIndex % this.words.length;
        this.wordsText = this.words[this.currentIndex];
        if (this.isDeleting) { this.outputText = this.wordsText.substring(0, this.outputText.length - 1); } else { this.outputText = this.wordsText.substring(0, this.outputText.length + 1); }
        let speed = this.speed;
        if (this.outputText === this.wordsText) {
            this.isDeleting = true;
            speed = this.wait;
        } else if (this.outputText === "") {
            this.isDeleting = false;
            this.wordsIndex++;
            speed = this.speed;
        }
        this.output.innerHTML = this.outputText;
        setTimeout(() => this.typing(), speed);
    }
}
typingAction(breakDOM, breakWords, breakSpeed, breakWait, null);
typingAction(autoWriteDOM, autoWriteWords, autoWriteSpeed, autoWriteWait, ",");

function typingAction(first, second, third, fourth, makeArray) {
    first.forEach((item, index) => {
        second.push(item.innerHTML.split(makeArray));
        third.push(item.classList[1]);
        fourth.push(item.classList[2] !== undefined ? item.classList[2] : 99999999);
        new autoWrite(item, second[index], third[index], fourth[index]);
    });
}