const film = document.getElementById("film");
const kontrolki = document.querySelector(".kontrolki");
const container = document.querySelector(".wideo-container")
var tryb = true;
var fs = false;
var poziomczasu = document.getElementById("poziomczasu");

function snm(sekundy) {
    var minuty = Math.floor(sekundy / 60);
    var sekundy = sekundy % 60;
    sekundy = sekundy.toFixed(0);
    sekundy = sekundy.toString().padStart(2, '0');

    return minuty + ':'+ sekundy;
}


var timeoutId; // Zmienna do przechowywania identyfikatora timeoutu

function hideCursorAndControls() {
    film.style.cursor = 'none'; // Ukrycie kursora
    kontrolki.style.visibility = 'hidden'; // Ukrycie kontrolki
}

function showCursorAndControls() {
    film.style.cursor = 'auto'; // Pokazanie kursora
    kontrolki.style.visibility = 'visible'; // Pokazanie kontrolki
}

document.addEventListener('mousemove', function () {
    // Przy każdym ruchu myszką resetujemy timeout i ponownie ukazujemy kursor i kontrolki.
    clearTimeout(timeoutId);
    showCursorAndControls();

    // Następnie ustawiamy timeout na 5 sekund, aby ukryć kursor i kontrolki po 5 sekundach nieaktywności.
    timeoutId = setTimeout(function () {
        hideCursorAndControls();
    }, 5000); // 5000 milisekund = 5 sekund
});

// Wywołujemy funkcję, aby ukryć kursor i kontrolki na początku (domyślnie po załadowaniu strony).
hideCursorAndControls();



function play() {
    if (tryb == true) {
        film.play();
        tryb = false;
    } else {
        film.pause();
        tryb = true;
    }
}

function Fullscreen() {
    if (fs == false) {
        container.requestFullscreen()
        film.removeAttribute("controls");
        film.style.height = '100%'
        container.style.height = '100%'
        kontrolki.style.width = '100%'
        film.style.width = '100%'
        container.style.width = '100%'
        kontrolki.style.top = screen.height - wys + 'px';
        fs = true
    } else {
        document.exitFullscreen()
        film.removeAttribute("controls");
        film.style.height = ''; // Usunięcie nadanego stylu "height" dla elementu "film"
        container.style.height = ''; // Usunięcie nadanego stylu "height" dla elementu "container"
        kontrolki.style.width = width + 'px';
        film.style.width = ''; // Usunięcie nadanego stylu "width" dla elementu "film"
        container.style.width = ''; // Usunięcie nadanego stylu "width" dla elementu "container"
        kontrolki.style.top = heigt - wys + 'px';
        fs = false
    }
}

document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement) {
        film.removeAttribute("controls");
        film.style.height = ''; // Usunięcie nadanego stylu "height" dla elementu "film"
        container.style.height = ''; // Usunięcie nadanego stylu "height" dla elementu "container"
        kontrolki.style.width = width + 'px';
        film.style.width = ''; // Usunięcie nadanego stylu "width" dla elementu "film"
        container.style.width = ''; // Usunięcie nadanego stylu "width" dla elementu "container"
        kontrolki.style.top = heigt - wys + 'px';
        fs = false
    }
});


function zmienglos() {
    var vol = document.getElementById("poziomglosnosci").value;
    film.volume = vol;
}

function zmianaczasu() {
    var progress = poziomczasu.value;
    var duration = film.duration;
    var newTime = (progress / 100) * duration;
    film.currentTime = newTime;
}

    var width = film.offsetWidth;
    var heigt = film.offsetHeight;
    var wys = kontrolki.offsetHeight;
    kontrolki.style.width = width + 'px';
    kontrolki.style.top = heigt - wys + 'px';

    var currentTime = film.currentTime;
    var duration = film.duration;
    document.getElementById('czas').innerHTML = snm(currentTime) + '/' + snm(duration)
    
film.removeAttribute("controls");
film.controls = false;
kontrolki.style.visibility = "visible";




film.addEventListener("timeupdate", function () {
    var currentTime = film.currentTime;
    var duration = film.duration;
    var progress = (currentTime / duration) * 100;
    document.getElementById('czas').innerHTML = snm(currentTime) + '/' + snm(duration)
    poziomczasu.value = progress;
}, false);