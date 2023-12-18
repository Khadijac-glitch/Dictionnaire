async function searchWord() {
    const word = document.getElementById('word').value;
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    if (!word) {
        alert('Please enter a word');
        return;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const meaningContainerEl = document.getElementById("meaning-container");
        const titleEl = document.getElementById("title");
        const audioEl = document.getElementById("audio");

        if (Array.isArray(data) && data.length > 0) {
            const definition = data[0].meanings[0].definitions[0].definition;
            document.getElementById('result').innerText = `Definition: ${definition}`;
            meaningContainerEl.style.display = "block";
            titleEl.innerText = word;
            audioEl.style.display = "inline-flex";

            // Vérifiez si 'phonetics' existe avant de l'utiliser
            if (data[0]?.phonetics && data[0].phonetics.length > 0) {
                audioEl.src = data[0].phonetics[0].audio;
            }
        } else {
            document.getElementById('result').innerText = 'Word not found';
            meaningContainerEl.style.display = "block";
            titleEl.innerText = word;
            audioEl.style.display = "none";
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('result').innerText = 'An error occurred, please try again later';
    }
}
