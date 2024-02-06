/**
 * Importuje funkcje pomocnicze do określania klasy CSS na podstawie temperatury.
 */
import { tempKlasaKolor, tempKlasaBackKolor } from './temperaturaModul.js';

/**
 * Nasłuchuje na załadowanie całego modelu DOM, a następnie wykonuje zapytanie do API pogodowego.
 */
document.addEventListener('DOMContentLoaded', function() 
{
    /**
     * Wykonuje zapytanie fetch do API pogodowego, aby uzyskać prognozę temperatury.
     */
    fetch('https://api.open-meteo.com/v1/forecast?latitude=50.0413&longitude=21.999&daily=temperature_2m_max&timezone=Europe%2FWarsaw')
        .then(response => response.json())
        .then(data => 
        {
            /**
             * Uchwyt do tabeli, w której będą wyświetlane dane pogodowe.
             * @type {HTMLTableElement}
             */
            const tabela = document.getElementById('lokalna-pogoda-table');

            /**
             * Przechowuje maksymalne temperatury dzienne pobrane z API.
             * @type {Array<number>}
             */
            const prognozy = data.daily.temperature_2m_max;

            /**
             * Przechowuje daty odpowiadające prognozom temperatur.
             * @type {Array<string>}
             */
            const daty = data.daily.time;

            /**
             * Iteruje przez wszystkie prognozy, tworząc wiersze tabeli z danymi.
             */
            for (let i = 0; i < prognozy.length; i++) 
            {
                let dataPrognozy = new Date(daty[i]).toLocaleDateString();
                if (dataPrognozy.substring(1, 2) === '.') dataPrognozy = '0' + dataPrognozy;

                /**
                 * Przechowuje temperaturę w danym dniu, zaokrągloną do 1 miejsca po przecinku.
                 * @type {string}
                 */
                const temperatura = prognozy[i].toFixed(1);

                /**
                 * Tworzy wiersz tabeli z daną prognozą.
                 */
                const wiersz = document.createElement('tr');
                wiersz.innerHTML = `
                    <td class='komorkaData'>${dataPrognozy}</td>
                    <td style='font-weight: bold' class='${tempKlasaKolor(temperatura)} ${tempKlasaBackKolor(temperatura)}'>${temperatura} °C</td>`;
                tabela.appendChild(wiersz);
            }
        })
        .catch(error => console.error('Błąd:', error));
});