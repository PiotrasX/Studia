/**
 * Zwraca klasę CSS odpowiadającą zakresowi temperatury.
 * @param {number} temp - Wartość temperatury, dla której ma zostać przypisana klasa CSS.
 * @returns {string} - Nazwa klasy CSS odpowiadająca zakresowi temperatury.
 */
export function tempKlasaKolor(temp) 
{
    if (temp < -15) return 'temp1';
    if (temp >= -15 && temp < -10) return 'temp2';
    if (temp >= -10 && temp < -5) return 'temp3';
    if (temp >= -5 && temp < 0) return 'temp4';
    if (temp >= 0 && temp < 5) return 'temp5';
    if (temp >= 5 && temp < 10) return 'temp6';
    if (temp >= 10 && temp < 15) return 'temp7';
    if (temp >= 15 && temp < 20) return 'temp8';
    if (temp >= 20 && temp < 23) return 'temp9';
    if (temp >= 23 && temp < 27) return 'temp10';
    if (temp >= 27 && temp < 30) return 'temp11';
    if (temp >= 30 && temp < 35) return 'temp12';
    if (temp >= 35 && temp < 40) return 'temp13';
    if (temp >= 40 && temp < 50) return 'temp14';
    return 'temp15';
}

/**
 * Zwraca klasę CSS odpowiadającą ogólnej kategorii temperatury (zimne/ciepłe).
 * @param {number} temp - Wartość temperatury, dla której ma zostać przypisana klasa CSS.
 * @returns {string} - Nazwa klasy CSS wskazująca na ogólną kategorię temperatury.
 */
export function tempKlasaBackKolor(temp) 
{
    if (temp < -5) return 'tempZimne';
    return 'tempCieple';
}