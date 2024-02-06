/**
 * Tworzy kontener animacji wraz z tłem, przygotowując scenę do wykonania animacji.
 * Kontener oraz elementy tła są dynamicznie dodawane do dokumentu.
 */
export function stworzAnimacje()
{
    /**
     * Tworzy główny kontener animacji i ustawia jego ID.
     */
    const kontener = document.createElement('div');
    kontener.id = 'zlozona-animacja';

    /**
     * Tworzy i dodaje element tła do kontenera animacji.
     */
    kontener.appendChild(Object.assign(document.createElement('div'), {id: 'tlo-zlozona-animacja'}));

    /**
     * Tworzy i dodaje element tła do kontenera animacji.
     */
    document.body.appendChild(kontener);
}

/**
 * Inicjuje animację w wcześniej stworzonym kontenerze animacji.
 * Dodaje do kontenera elementy animacji, a następnie uruchamia animację zanikania całej sceny.
 */
export function wykonajAnimacje() 
{
    /**
     * Pobiera kontener animacji po jego ID.
     */
    const kontener = document.getElementById('zlozona-animacja');

    /**
     * Definiuje identyfikatory elementów animacji, które zostaną dodane do kontenera.
     */
    let identyfikatory = [
        'aparat-dol', 'aparat-lewo', 'aparat-prawo', 'aparat-gora-lewo-lewo', 'aparat-gora-lewo-prawo', 
        'aparat-gora-srodek-lewo', 'aparat-gora-srodek-srodek', 'aparat-gora-srodek-prawo', 
        'aparat-gora-prawo', 'aparat-przycisk', 'aparat-lampa-lewo', 'aparat-lampa-prawo', 
        'aparat-obiektyw-jeden', 'aparat-obiektyw-dwa', 'aparat-flesh-jeden', 
        'aparat-flesh-dwa', 'animacja-tekst'];

    /**
     * Iteruje przez identyfikatory, tworząc i dodając elementy do kontenera.
     */
    identyfikatory.forEach(function(id) 
    {
        let div = document.createElement('div');
        div.id = id;
        if (id === 'animacja-tekst') div.textContent = 'FotoKaty';
        kontener.appendChild(div);
    });

    /**
     * Uruchamia zanikanie całej animacji po zdefiniowanym czasie, a następnie usuwa kontener.
     */
    setTimeout(function() 
    {
        kontener.classList.add('zlozona-animacja-zanikanie');
        setTimeout(function() { kontener.remove(); }, 1500);
    }, 12000);
}