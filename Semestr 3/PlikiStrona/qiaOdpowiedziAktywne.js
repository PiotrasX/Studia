/**
 * Dodaje obsługę kliknięcia dla każdego pytania w sekcji Q&A.
 * Po kliknięciu, funkcja wyszukuje odpowiadającą odpowiedź i przełącza jej widoczność.
 */
document.querySelectorAll('.qia-pytanie').forEach(button => 
{
    button.addEventListener('click', () => 
    {
        /**
         * Pobiera identyfikator klikniętego przycisku pytania.
         * @type {string}
         */
        const id = button.getAttribute('id');

        /**
         * Tworzy identyfikator dla elementu odpowiedzi oparty na identyfikatorze pytania.
         * @type {string}
         */
        const odpowiedzId = id.replace('pytanie', 'odpowiedz');

        /**
         * Wybiera element odpowiedzi na podstawie jego identyfikatora.
         * @type {HTMLDivElement}
         */
        const qnaOdpowiedz = document.getElementById(odpowiedzId);

        /**
         * Sprawdza, czy element odpowiedzi jest już wyświetlany jako aktywny.
         */
        if (qnaOdpowiedz.classList.contains('aktywny')) 
        {
            qnaOdpowiedz.classList.remove('aktywny');
            setTimeout(() => 
            {
                if (!qnaOdpowiedz.classList.contains('aktywny')) qnaOdpowiedz.style.display = 'none';
            }, 500);
        } 
        else 
        {
            qnaOdpowiedz.style.display = 'flex';
            setTimeout(() => { qnaOdpowiedz.classList.add('aktywny'); }, 10);
        }
    });
});