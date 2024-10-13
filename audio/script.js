const audio = document.getElementById('audio')
const kontrolki = document.querySelector(".kontrolki");
const guzikplay = document.getElementById('play')
const ikonkaplay = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>'
const ikonkapauza = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16"><path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/></svg>'
const guzikloop = document.getElementById('loop')

var loop = false
var tryb = true;

function snm(sekundy) {
    var minuty = Math.floor(sekundy / 60);
    var sekundy = sekundy % 60;
    sekundy = sekundy.toFixed(0);
    sekundy = sekundy.toString().padStart(2, '0');
    return minuty + ':'+ sekundy;
}

function play() {
    if (tryb == true) {
        audio.play();
        tryb = false;
        guzikplay.innerHTML = ikonkapauza

    } else {
        audio.pause();
        tryb = true;
        guzikplay.innerHTML = ikonkaplay
    }
}

function ptla(){
    if (loop == false) {
        audio.loop = true;
        loop = true;
        guzikloop.style.color = '#9999FF'
        

    } else {
        audio.loop = false;
        loop = false;
        guzikloop.style.color = 'white'
        
    }
}

function zmienglos() {
    var vol = document.getElementById("poziomglosnosci").value;
    audio.volume = vol;
}

function zmianaczasu() {
    var progress = poziomczasu.value;
    var duration = audio.duration;
    var newTime = (progress / 100) * duration;
    audio.currentTime = newTime;

}

var currentTime = audio.currentTime;
var duration = audio.duration;
document.getElementById('czastr').innerHTML = snm(currentTime)
document.getElementById('czas').innerHTML = snm(duration)

audio.addEventListener("timeupdate", function () {
    var currentTime = audio.currentTime;
    var duration = audio.duration;
    var progress = (currentTime / duration) * 100;
    document.getElementById('czastr').innerHTML = snm(currentTime)
    document.getElementById('czas').innerHTML = snm(duration)
    poziomczasu.value = progress;
}, false);