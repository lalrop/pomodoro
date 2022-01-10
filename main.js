var timer = new easytimer.Timer();
var resTimer = new easytimer.Timer();

let ii = 0;

let pomodoroInput = $("#inputTimer")[0];
let restPomodoroInput = $("#inputResTimer")[0];

$('#start').click(() => {
    pomodoro = parseInt(pomodoroInput.value);
    restPomodoro = parseInt(restPomodoroInput.value);
    timer.start({countdown:true, startValues:{seconds:pomodoro}})
    ii = 0;
});

$('#stop').click(() => timer.stop());

$('#pause').click(() => timer.pause());

$('#reset').click(() => { 
    timer.reset();
    resTimer.reset();   
});

// Listener que se detona en cuanto el Timer empieza a sumar segundos
timer.addEventListener('secondsUpdated', function () {
    $('#cronometer').html(timer.getTimeValues().toString());
// Aqui empezamos con el tiempo de descanso
    if (timer.getTimeValues().seconds == 0 ) {
        resTimer.start({countdown:true, startValues:{seconds:restPomodoro}, target:{seconds:0}});
        ii += 1;    
    }
});

// Listener del resTimer detonado por el fin del Timer
resTimer.addEventListener('secondsUpdated', function () {
    $('#restCronometer').html(resTimer.getTimeValues().toString());
});

// Cuando el resTimer llega a cero, parte nuevamente el pomodoro
resTimer.addEventListener('targetAchieved', () => {
    if (ii < 4) {
        timer.start({countdown:true, startValues:{seconds:pomodoro}});
        console.log(ii, restPomodoro);
    }
    if (ii == 4) {
        restPomodoro = 2 * restPomodoro;
        timer.start({countdown:true, startValues:{seconds:pomodoro}});
        console.log(ii, restPomodoro);
    }
    if (ii > 4) {
        timer.reset();
        resTimer.reset();
    }
});


timer.addEventListener('reset', function () {
    $('#cronometer').html(`00:00:00`)
    timer.pause();
});

resTimer.addEventListener('reset', function () {
    $('#restCronometer').html(`00:00:00`)
    resTimer.pause();
});
// // Funcion cuando se cumplen los 25 minutos
// timer.addEventListener('stopped', function () {
//     alert('A descansarr!!!');
//     timer.start({countdown:true , startValues:{seconds:5}, target:{seconds:0}})
    
// });


// timer.addEventListener('targetAchieved', function (){
//     timer.reset()
// })

