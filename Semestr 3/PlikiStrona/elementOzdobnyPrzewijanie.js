/**
 * Nasłuchuje załadowania treści DOM i inicjuje funkcje aktualizujące pozycję elementu ozdobnego.
 */
document.addEventListener('DOMContentLoaded', () => 
{
    /**
     * Wybiera kontener elementu ozdobnego.
     * @type {HTMLDivElement}
     */
    const kontener = document.querySelector('#element-ozdobny');

    /**
     * Aktualizuje pozycję elementu ozdobnego na stronie w zależności od postępu przewijania.
     */
    const aktualizujPozycje = () => 
    {
        /**
         * Wysokość okna przeglądarki.
         * @type {number}
         */
        const wysokoscOkna = window.innerHeight;

        /**
         * Całkowita wysokość dokumentu.
         * @type {number}
         */
        const wysokoscDokumentu = document.body.scrollHeight;

        /**
         * Dystans pozostały do przewinięcia.
         * @type {number}
         */
        const calkowicieDoPrzewijania = wysokoscDokumentu - wysokoscOkna;

        /**
         * Aktualna wartość przewinięcia dokumentu.
         * @type {number}
         */
        const przewinieto = window.scrollY;
        const procentPrzewiniecia = (przewinieto / calkowicieDoPrzewijania) * 100;

        /**
         * Obliczona wartość 'top' dla elementu ozdobnego w jednostkach 'vh'.
         * @type {number}
         */
        const wartoscGorna = 11 + (procentPrzewiniecia * (71 - 11) / 100);

        /**
         * Ustawienie pozycji elementu ozdobnego.
         */
        kontener.style.top = `${wartoscGorna}vh`;
    };

    window.addEventListener('scroll', aktualizujPozycje);
    window.addEventListener('resize', aktualizujPozycje);
    window.addEventListener('DOMContentLoaded', aktualizujPozycje);
});