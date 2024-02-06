/**
 * Dostosowuje odstęp między wierszami obrazów w siatce grid na podstawie szerokości okna.
 * Funkcja jest wywoływana przy załadowaniu strony oraz przy każdej zmianie rozmiaru okna.
 */
function rowGapImg() 
{
    /**
     * Aktualna szerokość okna przeglądarki.
     * @type {number}
     */
    const szerokoscOkna = window.innerWidth;

    /**
     * Domyślna wartość odstępu między wierszami (row gap) w pikselach.
     * Wartość ta jest modyfikowana na podstawie szerokości okna.
     * @type {number}
     */
    let rowGapImgWartosc = 2 * 16;

    /**
     * Dostosowanie odstępu między wierszami na podstawie szerokości okna.
     */
    if (szerokoscOkna <= 240)
    {
        rowGapImgWartosc = 24;
    }
    else if (szerokoscOkna > 240 && szerokoscOkna <= 480) 
    {
        const pixele = 480 - szerokoscOkna;
        rowGapImgWartosc = Math.max(24, rowGapImgWartosc - (pixele * (8 / 240)));
    }
    else
    {
        rowGapImgWartosc = 32;
    }

    /**
     * Selektor siatki obrazów, do której zostanie zastosowany odstęp między wierszami.
     * @type {HTMLDivElement}
     */
    const grid = document.querySelector('.zdjecia-grid');
    if (grid) grid.style.rowGap = (rowGapImgWartosc / 16) + 'em';
}
window.addEventListener('resize', rowGapImg);
window.addEventListener('DOMContentLoaded', rowGapImg);