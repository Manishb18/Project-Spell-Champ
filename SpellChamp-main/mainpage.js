var f = new XMLHttpRequest();
var finalWords;
file = "./finalWords.txt"
f.open("GET", file, false);
f.onreadystatechange = function ()
{
    if(f.readyState === 4)
    {
        if(f.status === 200 || f.status == 0)
        {
            finalWords = f.responseText;
        }
    }
}
f.send(null);

wordsArray = finalWords.split("\r\n")
verifyWord = document.getElementById('actual-word');
meaningPara = document.getElementById('meaning-para');
ipBoxArr = []
for(i = 0; i <= 18; i++){
    ipBoxArr[i] = document.getElementById("ip"+(i+1));
}

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3b1c31a0b2msha6b07f1cafb41c5p15bb2fjsnabab5add61ab',
		'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
	}
};

var voices = [];
var utterance = new SpeechSynthesisUtterance("Hi");
var actualWord = "";
var inputWord = "";


function getWord(){
    if(actualWord == ""){
        randomNumber = Math.floor(Math.random() * (30203));
        randomWord = wordsArray[randomNumber];
        actualWord= randomWord;
        verifyWord.innerHTML = randomWord;
        for (i = 0; i <= 18; i++){
            if (i < randomWord.length){
                ipBoxArr[i].style.display = "inline";
                ipBoxArr[i].style.color = "white";
                ipBoxArr[i].value = "";
            }
            else{
                ipBoxArr[i].style.display = "none";
            }
        }
        var positionChangeAnime = document.querySelector(".position-change-anime");
        positionChangeAnime.style.scale = "1";
        positionChangeAnime.style.transform = "translate(0%, 0%)";
        positionChangeAnime.style.position = "relative";
        positionChangeAnime.classList.remove("glow-effect");
        positionChangeAnime.innerHTML = "GET NEW WORD";
        var opacityChangeAnime = document.querySelectorAll(".opacity-change-anime");
        opacityChangeAnime.forEach(element => {
            element.style.opacity = "1";
        });
    }
    else{
        randomNumber = Math.floor(Math.random() * (30203));
        randomWord = wordsArray[randomNumber];
        actualWord= randomWord;
        verifyWord.innerHTML = randomWord;
        for (i = 0; i <= 18; i++){
            if (i < randomWord.length){
                ipBoxArr[i].style.display = "inline";
                ipBoxArr[i].style.color = "white";
                ipBoxArr[i].value = "";
            }
            else{
                ipBoxArr[i].style.display = "none";
            }
        }
    }
}

function sayWord(){
    utterance = new SpeechSynthesisUtterance(actualWord);
    var voices = speechSynthesis.getVoices();
    utterance.voice = voices[1];
    speechSynthesis.speak(utterance);
}

function changeVoice(){
    utterance = new SpeechSynthesisUtterance(actualWord);
    var voices = speechSynthesis.getVoices();
    utterance.voice = voices[2];
    speechSynthesis.speak(utterance);
}

function getMeaning(){
    fetch('https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=' + actualWord, options)
	.then(response => response.json())
	.then((data) => {
        if (data.definition.includes('2.')){
            meaningPara.innerHTML = data.definition.split("2.")[0];
        }
        else{
            meaningPara.innerHTML = data.definition;
        }
    });
}

var verifyBtn = document.getElementById("verify-btn");
verifyBtn.addEventListener("click", (e) => {
    e.preventDefault();
    inputWord = ""
    for (i = 0; i < actualWord.length; i++){
        inputWord += ipBoxArr[i].value;
    }
    if (inputWord != ""){
        if (inputWord == actualWord){
            verifyWord.innerHTML = "Correct"
            for(i = 0; i < actualWord.length; i++){
                ipBoxArr[i].style.color = 'limegreen';
            }
        }
        else{
            verifyWord.innerHTML = "Incorrect, Tryagain."
            for(i = 0; i < actualWord.length; i++){
                ipBoxArr[i].style.color = 'orange';
            }
        }
    }
    else{
        alert("Enter word to verify")
    }
})

function revealWord(){
    for(i = 0; i < actualWord.length; i++){
        ipBoxArr[i].value = actualWord[i];
        ipBoxArr[i].style.color = 'red';
    }
}