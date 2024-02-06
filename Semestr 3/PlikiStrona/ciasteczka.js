/**
 * Importuje funkcje niezbędne do wykonania i stworzenia animacji.
 */
import { wykonajAnimacje, stworzAnimacje } from './zlozonaAnimacja.js';

/**
 * Sprawdza, czy sesja użytkownika została już ustawiona, jeśli nie, inicjalizuje proces ustawiania ciasteczek.
 */
if (sessionStorage.getItem("nazwaUzytkownikaSesja") === null) 
{ 
    /**
     * Ustawia ciasteczko w przeglądarce użytkownika.
     * @param {string} nazwa - Nazwa ciasteczka.
     * @param {string} wartosc - Wartość ciasteczka.
     * @param {number} dni - Liczba dni, po której ciasteczko wygaśnie.
     */
    function ustawCiasteczko(nazwa, wartosc, dni) 
    {
        let wygasa = "";
        if (dni) 
        {
            let data = new Date();
            data.setTime(data.getTime() + (dni * 24 * 60 * 60 * 1000));
            wygasa = "; expires=" + data.toUTCString();
        }
        document.cookie = nazwa + "=" + (wartosc || "") + wygasa + "; path=/";
    }

    /**
     * Pobiera wartość ciasteczka na podstawie jego nazwy.
     * @param {string} nazwa - Nazwa ciasteczka do pobrania.
     * @returns {string|null} - Wartość ciasteczka lub null, jeśli ciasteczko o podanej nazwie nie istnieje.
     */
    function pobierzCiasteczko(nazwa) 
    {
        let nazwaRowna = nazwa + "=";
        let wszystkieCiasteczka = document.cookie.split(';');
        for(let i = 0; i < wszystkieCiasteczka.length; i++) 
        {
            let ciasteczko = wszystkieCiasteczka[i];
            while (ciasteczko.charAt(0) == ' ') ciasteczko = ciasteczko.substring(1, ciasteczko.length);
            if (ciasteczko.indexOf(nazwaRowna) == 0) return ciasteczko.substring(nazwaRowna.length, ciasteczko.length);
        }
        return null;
    }

    /**
     * Sprawdza, czy to pierwsza wizyta użytkownika na stronie, a jeśli tak, to prosi o podanie imienia.
     * Następnie wywołuje animacje.
     */
    function sprawdzPierwszaWizyte() 
    {
        stworzAnimacje();
        setTimeout(function()
        {
            let uzytkownik = pobierzCiasteczko("nazwaUzytkownika");
            sessionStorage.setItem("nazwaUzytkownikaSesja", uzytkownik);
            if (uzytkownik != null || uzytkownik == "") alert("Witaj ponownie, " + uzytkownik + "!"); 
            else 
            {
                uzytkownik = prompt("Jak masz na imię?", "");
                while (uzytkownik == null || uzytkownik == "") { uzytkownik = prompt("Musisz podać swoję imię! Jak masz na imię?", ""); }
                ustawCiasteczko("nazwaUzytkownika", uzytkownik, 365);
                alert("Witaj, " + uzytkownik + "!");
            }
            wykonajAnimacje();
        }, 25);
    }

    /**
     * Opóźnione sprawdzenie pierwszej wizyty po załadowaniu okna.
     */
    window.onload = function() { setTimeout(sprawdzPierwszaWizyte, 50); }; 
}