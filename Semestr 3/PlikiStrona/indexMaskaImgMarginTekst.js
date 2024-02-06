/**
 * Aktualizuje maskę i margines obrazu w zależności od szerokości okna.
 * Funkcja jest wywoływana w odpowiedzi na zdarzenie zmiany rozmiaru okna lub po załadowaniu strony.
 */
function aktualizujStyl() 
{
    /**
     * Szerokość wewnętrzna okna przeglądarki.
     * @type {number}
     */
    const szerokoscOkna = window.innerWidth;

    /**
     * Szerokość zawartości okna przeglądarki, nie uwzględniająca pasków przewijania.
     * @type {number}
     */
    const szerokoscDokumentu = document.documentElement.clientWidth;

    /**
     * Element obrazu, do którego zostanie zastosowana maska.
     * @type {HTMLImageElement}
     */
    const infoImg = document.querySelector('.info img');

    /**
     * Ustawienie stylów dla różnych przedziałów szerokości okna.
     */
    if (szerokoscOkna <= 896)
    {
        const nowyMaskImage = `linear-gradient(to right, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%)`;
        infoImg.style.webkitMaskImage = nowyMaskImage;
        infoImg.style.maskImage = nowyMaskImage;
        infoImg.style.marginLeft = `0px`;
    }
    else if (szerokoscOkna > 896 && szerokoscOkna <= 1280) 
    {
        let roznica = 1280 - szerokoscOkna + 1;
        if (szerokoscOkna == 980 && szerokoscDokumentu == 897) roznica = 384;
        
        const nowyMaskImage = `linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) ${25 + roznica}px, rgba(0, 0, 0, 0.3) ${179 + roznica}px, rgba(0, 0, 0, 1) ${385 + roznica}px, rgba(0, 0, 0, 1) 100%)`;
        infoImg.style.webkitMaskImage = nowyMaskImage;
        infoImg.style.maskImage = nowyMaskImage;
        infoImg.style.marginLeft = `${-127 - roznica}px`;
    }
    else
    {
        const nowyMaskImage = `linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 25px, rgba(0, 0, 0, 0.3) 179px, rgba(0, 0, 0, 1) 385px, rgba(0, 0, 0, 1) 100%)`;
        infoImg.style.webkitMaskImage = nowyMaskImage;
        infoImg.style.maskImage = nowyMaskImage;
        infoImg.style.marginLeft = `${-127 + 1}px`;
    }
}
window.addEventListener('resize', aktualizujStyl);
window.addEventListener('load', aktualizujStyl);