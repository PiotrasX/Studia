/**
 * Inicjuje ustawienia początkowe slajdów i reaguje na zmianę rozmiaru okna.
 */
document.addEventListener('DOMContentLoaded', () => 
{
    aktualizujDotyOfertaWidocznoscRozmiar();
    for (let slidesID in slajdID) { ustawAktualnySlajd(slajdID[slidesID], slidesID); }
});

window.addEventListener('resize', function() 
{
    aktualizujDotyOfertaWidocznoscRozmiar();
    for (let slidesID in slajdID) 
    {
        if (!czyAnimacjaAktywna[slidesID]) pokazSlajd(slajdID[slidesID], slidesID);
        else pokazSlajd(slajdID[slidesID], slidesID, true);
    }
});

/**
 * Przechowuje identyfikatory slajdów i ich aktualne pozycje.
 */
let slajdID;
if (window.location.href.includes('oferta.html')) slajdID = {'slides-1': 1};
else slajdID = {'slides-1': 1, 'slides-2': 1};
let czyAnimacjaAktywna = {};

/**
 * Ustawia aktualny slajd na podstawie podanej liczby i identyfikatora slajdów.
 * @param {number} n - Numer slajdu do wyświetlenia.
 * @param {string} slidesID - Identyfikator kontenera slajdów.
 */
function ustawAktualnySlajd(n, slidesID) 
{
    pokazSlajd(slajdID[slidesID] = n, slidesID, true);
    aktualizujDoty(slidesID, n);
}

/**
 * Wyświetla slajd o podanym numerze z opcjonalną animacją.
 * @param {number} n - Numer slajdu do wyświetlenia.
 * @param {string} slidesID - Identyfikator kontenera slajdów.
 * @param {boolean} zAnimacja - Określa, czy zmiana slajdu ma być animowana.
 */
function pokazSlajd(n, slidesID, zAnimacja = false) 
{
    let kontenerSlajdow = document.querySelector('#' + slidesID);
    let slajdy = kontenerSlajdow.getElementsByClassName("slides-div");
    let liczbaSlajdow = slajdy.length;

    if (n > liczbaSlajdow) {slajdID[slidesID] = 1}
    if (n < 1) {slajdID[slidesID] = liczbaSlajdow}

    let szerokoscSlajdu = slajdy[0].offsetWidth;
    let styl = window.getComputedStyle(kontenerSlajdow);
    let gap = parseFloat(styl.columnGap);
    let calkowitaSzerokosc = szerokoscSlajdu + gap;

    let przesuniecie = -(calkowitaSzerokosc * (slajdID[slidesID] - 1));
    kontenerSlajdow.style.transition = zAnimacja ? 'transform 500ms ease' : 'none';
    kontenerSlajdow.style.transform = 'translateX(' + przesuniecie + 'px)';

    if (zAnimacja) 
    {
        czyAnimacjaAktywna[slidesID] = true;
        kontenerSlajdow.addEventListener('transitionend', () => 
            { czyAnimacjaAktywna[slidesID] = false; }, { once: true });
    }
}

/**
 * Aktualizuje widoczność i aktywność kropek (dotów) wskazujących na aktualny slajd.
 * @param {string} slidesID - Identyfikator kontenera slajdów.
 * @param {number} aktywnyNumer - Numer aktualnie aktywnego slajdu.
 */
function aktualizujDoty(slidesID, aktywnyNumer) 
{
    const doty = document.querySelectorAll(`#dot-div-${slidesID[slidesID.length - 1]} .dot`);
    doty.forEach((dot, index) => 
    {
        if (index === aktywnyNumer - 1) dot.classList.add('aktywny');
        else dot.classList.remove('aktywny');
    });
}

/**
 * Dostosowuje widoczność dotów i linków w zależności od szerokości okna.
 */
function aktualizujDotyOfertaWidocznoscRozmiar() 
{
    if (window.location.href.includes('oferta.html'))
    {
        const doty = document.querySelectorAll('#dot-div-1 .dot');
        const linki = document.querySelectorAll('.tytul a');

        if (window.innerWidth >= 897 && window.innerWidth <= 1056) 
        {
            [3, 4, 5].forEach(i => doty[i].style.display = 'none');
            [3, 4, 5].forEach(i => linki[i].onclick = () => { ustawAktualnySlajd(i - 2, 'slides-1'); return false; });
            if (slajdID['slides-1'] > 3) ustawAktualnySlajd(slajdID['slides-1'] - 3, 'slides-1');
        }
        else
        {
            [3, 4, 5].forEach(i => doty[i].style.display = 'flex');
            [3, 4, 5].forEach(i => linki[i].onclick = () => { ustawAktualnySlajd(i + 1, 'slides-1'); return false; });
        }
    }
}

let aktywnyKontenerID = null;

/**
 * Obsługuje zmianę slajdu za pomocą gestów myszy i dotyku.
 */
document.querySelectorAll('.slides-border-container').forEach(kontener => 
{
    let startX;
    kontener.addEventListener('mouseover', () => { aktywnyKontenerID = kontener.querySelector('.slides').id; });
    kontener.addEventListener('mouseout', () => { aktywnyKontenerID = null; });
    kontener.addEventListener('mousedown', (e) => 
    {
        startX = e.clientX;
        e.preventDefault();
    });
    kontener.addEventListener('mouseup', (e) => 
    {
        const koniecX = e.clientX;
        const odleglosc = startX - koniecX;
        const kierunek = odleglosc > 0 ? 1 : -1;
        if (Math.abs(odleglosc) > 50) zmienSlajd(kierunek, kontener);
    });
    kontener.addEventListener('touchstart', (e) => 
    {
        startX = e.touches[0].clientX;
        e.preventDefault();
    });

    kontener.addEventListener('touchend', (e) => 
    {
        const koniecX = e.changedTouches[0].clientX;
        const odleglosc = startX - koniecX;
        const kierunek = odleglosc > 0 ? 1 : -1;
        if (Math.abs(odleglosc) > 50) zmienSlajd(kierunek, kontener);
    });
});

/**
 * Obsługuje zmianę slajdu za pomocą klawiszy strzałek na klawiaturze.
 */
document.addEventListener('keydown', function(event) 
{
    if (aktywnyKontenerID && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) 
    {
        const kierunek = event.key === 'ArrowRight' ? 1 : -1;
        const kontener = document.querySelector(`#${aktywnyKontenerID}`).parentNode;
        zmienSlajd(kierunek, kontener);
    }
});

/**
 * Zmienia slajd na podstawie kierunku przesunięcia.
 * @param {number} kierunek - Kierunek zmiany slajdu (1 dla następnego, -1 dla poprzedniego).
 * @param {HTMLDivElement} kontener - Kontener slajdów, w którym ma nastąpić zmiana.
 */
function zmienSlajd(kierunek, kontener) 
{
    const slidesID = kontener.querySelector('.slides').id;
    if (slajdID.hasOwnProperty(slidesID)) 
    {
        let liczbaSlajdow = document.querySelector('#' + slidesID).getElementsByClassName("slides-div").length;
        let aktualnySlajd = slajdID[slidesID];
        let nowySlajd = aktualnySlajd + kierunek;

        if (window.location.href.includes('oferta.html') && window.innerWidth >= 897 && window.innerWidth <= 1056) liczbaSlajdow = 3;

        if (nowySlajd > liczbaSlajdow) nowySlajd = 1;
        else if (nowySlajd < 1) nowySlajd = liczbaSlajdow;

        ustawAktualnySlajd(nowySlajd, slidesID);
    }
}