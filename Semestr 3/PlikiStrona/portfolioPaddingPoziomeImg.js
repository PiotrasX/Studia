/**
 * Aktualizuje wewnętrzny odstęp poziomy dla obrazów na podstawie szerokości okna.
 * Funkcja jest wywoływana podczas zdarzenia załadowania strony oraz przy zmianie rozmiaru okna.
 */
function paddingPoziomeImg() 
{
    /**
     * Aktualna szerokość okna przeglądarki.
     * @type {number}
     */
    const szerokoscOkna = window.innerWidth;

    /**
     * Zmienna przechowująca wartość odstępu, która będzie stosowana do elementów.
     * @type {string}
     */
    let poziomyPaddingImgWartosc;

    /**
     * Ustawienie wartości paddingu w zależności od szerokości okna.
     */
    if (szerokoscOkna <= 480) 
    {
        poziomyPaddingImgWartosc = '0 0';
    } 
    else if (szerokoscOkna > 480 && szerokoscOkna <= 495) 
    {
        const pixele = szerokoscOkna - 480;
        poziomyPaddingImgWartosc = `0 calc(0.5 * ${pixele}px)`;
    } 
    else
    {
        poziomyPaddingImgWartosc = '0 0.5em';
    }

    /**
     * Selektuje wszystkie elementy z klasą `.poziome` w kontenerze `.zdjecia-grid`
     * i aktualizuje ich wewnętrzny odstęp (padding).
     */
    const elements = document.querySelectorAll('.zdjecia-grid .poziome');
    elements.forEach(element => { element.style.padding = poziomyPaddingImgWartosc; });
}
window.addEventListener('resize', paddingPoziomeImg);
window.addEventListener('DOMContentLoaded', paddingPoziomeImg);