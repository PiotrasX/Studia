/**
 * Dostosowuje maksymalną wysokość slajdów na podstawie zawartości obrazów i tekstów.
 * Funkcja jest wywoływana przy załadowaniu strony oraz przy każdej zmianie jej rozmiaru.
 */
function divSlidesHeight() 
{ 
    /**
     * Wybiera wszystkie kontenery slajdów o klasie '.slides-div'.
     * @type {NodeListOf<HTMLDivElement>}
     */
    let slidesDivs = document.querySelectorAll('.slides-div');

    /**
     * Wartość jednostki 'em' wyrażona w pikselach, używana jako dodatkowy margines.
     * @type {number}
     */
    let emWPixelach = 16;

    /**
     * Sprawdza, czy znaleziono kontenery slajdów.
     */
    if (slidesDivs) 
    {
        slidesDivs.forEach((slidesDiv) => 
        {
            /**
             * Wybiera obraz i tekst z każdego slajdu.
             */
            let obraz = slidesDiv.querySelector('.obraz img');
            let tekst = slidesDiv.querySelector('.tekst');

            /**
             * Sprawdza, czy znaleziono oba elementy: obraz i tekst.
             */
            if (obraz && tekst) 
            {
                /**
                 * Ustawia maksymalną wysokość obrazu równą jego szerokości.
                 */
                let obrazSzer = obraz.offsetWidth;
                obraz.style.maxHeight = obrazSzer + 'px';

                /**
                 * Oblicza całkowitą wysokość tekstów wraz z marginesami i paddingami.
                 */
                let tekstWys = 0;
                let tekstDzieci = tekst.children;
                for (let i = 0; i < tekstDzieci.length; i++) 
                {
                    let dziecko = tekstDzieci[i];
                    let dzieckoStyle = window.getComputedStyle(dziecko);
                    tekstWys += dziecko.offsetHeight;
                    tekstWys += parseInt(dzieckoStyle.marginBottom);
                    tekstWys += parseInt(dzieckoStyle.paddingBottom);
                }
                tekst.style.maxHeight = tekstWys + 'px';
                
                /**
                 * Ustawia maksymalną wysokość całego slajdu w zależności od szerokości okna przeglądarki.
                 */
                if (window.innerWidth <= 896)
                    slidesDiv.style.maxHeight = tekstWys + obrazSzer + (emWPixelach * 2) + 'px';
                else
                    slidesDiv.style.maxHeight = Math.max(tekstWys, obrazSzer + emWPixelach) + 'px';
            }
        });
    }
}
window.onload = divSlidesHeight;
window.onresize = divSlidesHeight;