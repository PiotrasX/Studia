/**
 * Inicjalizuje wartości formularza z danych zapisanych w localStorage po załadowaniu DOM.
 */
document.addEventListener('DOMContentLoaded', function() 
{
    /**
     * Odczytuje zapisane dane formularza z localStorage i aktualizuje pola formularza.
     */
    const zapisaneDane = JSON.parse(localStorage.getItem('formularzDane')) || {};
    document.getElementById('imie').value = zapisaneDane.imie || '';
    document.getElementById('email').value = zapisaneDane.email || '';
    document.getElementById('sprawa').value = zapisaneDane.sprawa || '';
    document.getElementById('wiadomosc').value = zapisaneDane.wiadomosc || '';

    /**
     * Definiuje zmienne i nasłuchiwacze zdarzeń dla modalnego okna i formularza.
     */
    const modal = document.getElementById("mojModal");
    const zamknijButton = document.getElementsByClassName("zamknij")[0];
    const formularz = document.getElementById('formularz-kontaktowy');
    const formularzButton = document.getElementById('wyslij');

    /**
     * Obsługuje zdarzenie 'submit' formularza, wyświetla modalne okno i czyści formularz.
     * @param {Event} event - Obiekt zdarzenia przekazany do funkcji.
     */
    formularz.addEventListener('submit', function(event) 
    {
        event.preventDefault();
        modal.style.display = "block";
        this.reset();
        localStorage.removeItem('formularzDane');
    });

     /**
     * Przewija stronę do formularza, jeśli którykolwiek z pól jest pusty podczas próby wysłania.
     */
    formularzButton.addEventListener('click', function() 
    {
        const imie = document.getElementById('imie').value;
        const email = document.getElementById('email').value;
        const sprawa = document.getElementById('sprawa').value;
        const wiadomosc = document.getElementById('wiadomosc').value;
    
        if (!imie || !email || !sprawa || !wiadomosc) setTimeout(function() { przewinNaSrodekStrony(); }, 0);
    });

    /**
     * Przewija widok do środka formularza.
     */
    function przewinNaSrodekStrony() 
    {
        const formularzTop = formularz.offsetTop;
        const windowWysokosc = window.innerHeight;
        const przesunY = formularzTop - (windowWysokosc / 4);
        window.scrollTo({ top: przesunY, behavior: 'smooth' });
    }

    /**
     * Wyłącza modalne okno.
     */
    function wylaczModal() { modal.style.display = "none"; }
    zamknijButton.onclick = wylaczModal;
    window.onclick = function(event) { if (event.target == modal) wylaczModal(); }

    /**
     * Zapisuje dane formularza do localStorage po każdej zmianie wartości.
     */
    function zapiszDoLocalStorage() 
    {
        const formularzDane = 
        {
            imie: document.getElementById('imie').value,
            email: document.getElementById('email').value,
            sprawa: document.getElementById('sprawa').value,
            wiadomosc: document.getElementById('wiadomosc').value
        };
        localStorage.setItem('formularzDane', JSON.stringify(formularzDane));
    }

    document.getElementById('imie').addEventListener('input', zapiszDoLocalStorage);
    document.getElementById('email').addEventListener('input', zapiszDoLocalStorage);
    document.getElementById('sprawa').addEventListener('change', zapiszDoLocalStorage);
    document.getElementById('wiadomosc').addEventListener('input', zapiszDoLocalStorage);

    /**
     * Centralizuje modalne okno w środku ekranu.
     */
    function centrujModal() 
    {
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
    }
    window.addEventListener('resize', function() { centrujModal(); });
});