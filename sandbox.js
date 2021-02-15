// DOM references

const clock = document.querySelector('#clock');
const s_label = document.querySelector('.time_time_session');
const b_label = document.querySelector('.time_time_break');
const s_plus = document.querySelector('#sp');
const s_minus = document.querySelector('#sm');
const b_plus = document.querySelector('#bp');
const b_minus = document.querySelector('#bm');
const start = document.querySelector("#start");
const reset = document.querySelector("#reset");
const timer = document.querySelector('.timer');
const ses = document.querySelector('.session');
const progress = document.querySelector('.progress');

//Variables

let sesssion_time_seconds = 0;
let sesssion_time_minutes = 0;
let s_time = 1;
let b_time = 5;
let interval = null;

function init() {
    clock.innerHTML = `${sesssion_time_minutes < 10 ? "0"+ sesssion_time_minutes: sesssion_time_minutes}:${sesssion_time_seconds < 10 ? "0" + sesssion_time_seconds : sesssion_time_seconds}`;

    s_label.innerHTML = `${s_time} min`;
    b_label.innerHTML = `${b_time} min`;
    addListeners();
} 


// Increase & decrease session, break time.

const splus = () => {
        s_time += 1;
        s_label.innerHTML = `${s_time} min`;
}

const sminus = () => {
        if(s_time > 0) s_time -= 1;
        s_label.innerHTML = `${s_time} min`;
}

const bplus = () => {
    b_time += 1;
    b_label.innerHTML = `${b_time} min`;
}

const bminus = () => {
    if(b_time > 0) b_time -= 1;
    b_label.innerHTML = `${b_time} min`;
}

// Add timer listeners

function addListeners() {
    s_plus.addEventListener('click', splus);

    s_minus.addEventListener('click', sminus);

    b_plus.addEventListener('click', bplus);

    b_minus.addEventListener('click', bminus);
}

// Remove time listeners

function removeListeners() {
    s_plus.removeEventListener('click', splus);

    s_minus.removeEventListener('click', sminus);

    b_plus.removeEventListener('click', bplus);

    b_minus.removeEventListener('click', bminus);
}

// function display clock

function displayClock() {
    clock.innerHTML = `${sesssion_time_minutes < 10 ? "0"+ sesssion_time_minutes: sesssion_time_minutes}:${sesssion_time_seconds < 10 ? "0" + sesssion_time_seconds : sesssion_time_seconds}`;
}

// Start or Pause

start.addEventListener('click', () => {
    if(start.innerHTML.trim() === 'Start') {
        removeListeners();
        start.innerHTML = 'Pause';
        interval = setInterval(() => {
            sesssion_time_minutes += Math.floor((sesssion_time_seconds + 1) / 60);
            sesssion_time_seconds = (sesssion_time_seconds + 1) % 60;
            if(clock.classList.contains('run') && sesssion_time_minutes >= s_time) {
                sesssion_time_minutes = 0;
                sesssion_time_seconds =  0;
                clock.classList.remove('run');
                clock.classList.add('break');
                ses.innerHTML= 'Break!';
                timer.style.border = "10px solid #EB6841";
            }
            displayClock();
        }, 1000);
    }
    else {
        start.innerHTML = '  Start  ';
        clearInterval(interval);
    }
});

// Reset

reset.addEventListener('click', () => {
    clearInterval(interval);
    sesssion_time_seconds = 0;
    sesssion_time_minutes = 0;
    start.innerHTML = '  Start  ';
    clock.classList.remove('break');
    clock.classList.add('run');
    ses.innerHTML = "Session 1";
    timer.style.border = "10px solid #00A0B0";
    s_time = 0;
    b_time = 0;
    init();
});

init();
