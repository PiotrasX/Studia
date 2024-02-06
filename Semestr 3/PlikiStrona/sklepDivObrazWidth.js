/**
 * Dostosowuje maksymalną wysokość kontenerów obrazów do wysokości zawartych w nich obrazów plus dodatkowy margines.
 * Funkcja jest wywoływana przy załadowaniu strony oraz przy każdej zmianie jej rozmiaru.
 */
function divObrazWidth() 
{
    /**
     * Wybiera wszystkie elementy obrazów wewnątrz kontenerów o klasie '.obraz'.
     * @type {NodeListOf<HTMLImageElement>}
     */
    let obrazy = document.querySelectorAll('.obraz img');

    /**
     * Wybiera wszystkie kontenery obrazów o klasie '.obraz'.
     * @type {NodeListOf<HTMLDivElement>}
     */
    let kontenery = document.querySelectorAll('.obraz');

    /**
     * Wartość jednostki 'em' wyrażona w pikselach, używana jako margines.
     * @type {number}
     */
    let emWPixelach = 16;

    /**
     * Sprawdza, czy znaleziono obrazy i ich kontenery.
     */
    if (obrazy && kontenery) 
    {
        obrazy.forEach((obraz, index) => 
            { if (kontenery[index]) kontenery[index].style.maxHeight = obraz.offsetHeight + emWPixelach + 'px'; });
    }
}
window.onload = divObrazWidth;
window.onresize = divObrazWidth;