// declare variable for Url link
// getElements from the DOM by ID 
// have a call back function using event listener when fetching data
// function to play sound

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
const result = document.getElementById('result')

const sound = document.getElementById('sound')
const btn = document.getElementById('Search-btn')

btn.addEventListener("click", () =>{
    let inputWord = document.getElementById('inpt-word').value
    fetch(`${url}${inputWord}`)
    .then((res) => res.json())
    .then((data) =>{
        console.log(data)

        result.innerHTML = `
        <div class="word">
        <h3>${inputWord}</h3>
        <button onclick = "playSound()">
        <i class="fa-solid fa-microphone" style="color: #50c5ce;"></i>
        </button>
        </div>
        <div class="details">
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <p>${data[0].phonetics}</p>
        </div>
        <p class="word-meaning">
        ${data[0].meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">
        ${data[0].meanings[0].definitions[0].example || ""}
        </p>
        `
        sound.setAttribute("src", `${data[0].phonetics[0].audio}`)
    })
    .catch (() =>{
        result.innerHTML = `<h3 class="error">could not find word</h3>`
    })

})

function playSound(){
    sound.play()
}