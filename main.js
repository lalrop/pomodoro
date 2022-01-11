var timer = new easytimer.Timer();
var resTimer = new easytimer.Timer();

let ii = 0;

let pomodoroInput = $("#inputTimer")[0];
let restPomodoroInput = $("#inputResTimer")[0];


$('#start').click(() => {
    if ($('#customizeTime').hasClass("d-none")) {
        pomodoro = 25;
        restPomodoro = 5;
    }else{
        pomodoro = parseInt(pomodoroInput.value);
        restPomodoro = parseInt(restPomodoroInput.value);
    }
    timer.start({countdown:true, startValues:{minutes:pomodoro}})
    ii = 0;
});

$('#stop').click(() => timer.stop());

$('#pause').click(() => timer.pause());

$('#reset').click(() => { 
    timer.reset();
    resTimer.reset();   
});

$('#customPomodoro').click( () => {
    $('#customizeTime').removeClass('d-none');
    $('#cronometer').html('00:00:00');
    $('#restCronometer').html('00:00:00');
});

// Listener que se detona en cuanto el Timer empieza a sumar segundos
timer.addEventListener('secondsUpdated', function () {
    $('#cronometer').html(timer.getTimeValues().toString());
// Aqui empezamos con el tiempo de descanso
    if (timer.getTimeValues().seconds == 0 ) {
        resTimer.start({countdown:true, startValues:{minutes:restPomodoro}, target:{minutes:0}});
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
        timer.start({countdown:true, startValues:{minutes:pomodoro}});
        console.log(ii, restPomodoro);
    }
    if (ii == 4) {
        restPomodoro = 3 * restPomodoro;
        timer.start({countdown:true, startValues:{minutes:pomodoro}});
        alert('Ultimo Pomodoro! piensa en un cafe o alguien con quien cuchichear, se viene descanso con bonus!')
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
