/**
 * Uruchamia podaną funkcję co sekundę zgodnie z czasem systemowym.
 * @param {Function} funkcja - Funkcja do cyklicznego wywołania.
 */
async function uruchomCoSekunde(funkcja) 
{
    const teraz = new Date();
    const opoznienie = 1000 - teraz.getMilliseconds();
    await czekaj(opoznienie);
    funkcja();
    setInterval(funkcja, 1000);
}

/**
 * Tworzy Promise, który rozwiązuje się po określonym czasie oczekiwania.
 * @param {number} ms - Ilość milisekund do oczekiwania.
 * @returns {Promise} - Promise, który rozwiązuje się po upływie określonego czasu.
 */
function czekaj(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Formatuje czas w sekundach do formatu HH:MM:SS.
 * @param {number} czasWSekundach - Czas w sekundach do sformatowania.
 * @returns {string} - Czas sformatowany jako tekst w formacie HH:MM:SS.
 */
function formatujCzas(czasWSekundach) 
{
    const godziny = Math.floor(czasWSekundach / 3600);
    const minuty = Math.floor((czasWSekundach % 3600) / 60);
    const sekundy = czasWSekundach % 60;
  
    const formatGodzin = godziny < 10 ? `0${godziny}` : godziny;
    const formatMinut = minuty < 10 ? `0${minuty}` : minuty;
    const formatSekund = sekundy < 10 ? `0${sekundy}` : sekundy;
  
    return `${formatGodzin}:${formatMinut}:${formatSekund}`;
}

/**
 * Aktualizuje zegar na stronie do aktualnego czasu systemowego.
 */
function aktualizujZegar() 
{
    const teraz = new Date();
    const godziny = teraz.getHours().toString().padStart(2, '0');
    const minuty = teraz.getMinutes().toString().padStart(2, '0');
    const sekundy = teraz.getSeconds().toString().padStart(2, '0');

    const zegar = document.querySelector('.zegar');
    if (zegar) zegar.textContent = `${godziny}:${minuty}:${sekundy}`;
}

/**
 * Inicjalizuje i zapisuje czas spędzony na stronie, aktualizując go co sekundę.
 */
function inicjalizujCzas() 
{
    const aktualizujTekst = window.location.pathname.toLowerCase().endsWith('index.html');
    const czasNaStronie = parseInt(localStorage.getItem('calkowitaSesja')) || 0;
    const startTime = new Date().getTime();

    setInterval(function () 
    {
        const teraz = new Date().getTime();
        const czasSpedzony = Math.floor((teraz - startTime) / 1000);
        localStorage.setItem('calkowitaSesja', czasSpedzony + czasNaStronie);

        if (aktualizujTekst) 
        {
            const calkowitaSesja = document.querySelector('.czas-spedzony .czas-spedzony-div');
            if (calkowitaSesja) calkowitaSesja.textContent = `${formatujCzas(czasSpedzony + czasNaStronie)}`;
        }
    }, 1000);
}

/**
 * Pobiera aktualną datę z API i ustawia ją na stronie.
 */
function ustawDzisiejszaDate() 
{
    fetch('http://worldtimeapi.org/api/timezone/Europe/Warsaw')
        .then(response => response.json())
        .then(data => 
        {
            const dataCzas = new Date(data.datetime);
            const dzien = String(dataCzas.getDate()).padStart(2, '0');
            const miesiac = String(dataCzas.getMonth() + 1).padStart(2, '0');
            const rok = dataCzas.getFullYear();
            const dataTekst = `${dzien}.${miesiac}.${rok}`;

            const kontenerDaty = document.querySelector('.data');
            if (kontenerDaty) kontenerDaty.textContent = dataTekst;
        })
        .catch(error => console.error('Błąd:', error));
}

/**
 * Inicjalizacja kilku funkcji.
 */
document.addEventListener('DOMContentLoaded', function() 
{
    const naStronieIndex = window.location.pathname.toLowerCase().endsWith('index.html');
    if (naStronieIndex) 
    {
        uruchomCoSekunde(aktualizujZegar);
        uruchomCoSekunde(inicjalizujCzas);
        ustawDzisiejszaDate();
    }
    else inicjalizujCzas();
});