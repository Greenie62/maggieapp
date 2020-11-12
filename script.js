var lickSpan = document.querySelector(".lickSpan");
var poopSpan = document.querySelector(".poopSpan");
var adoptionSpan = document.querySelector(".adoptionSpan");
var breedsListDOM = document.querySelector("#breedlist");
var imageDiv = document.querySelector(".imageDiv");

var heartBtn = document.querySelector(".heart")
var thumbDownBtn = document.querySelector(".thumbdown")
var thumbUpBtn = document.querySelector(".thumbup")
var poopBtn = document.querySelector(".poop")

var h1Btns = document.querySelectorAll(".h1btn")

var licks=0;
var poop=0;
var adoptions=0;


function updatePanel(){
    lickSpan.innerHTML= licks;
    poopSpan.innerHTML= poop;
    adoptionSpan.innerHTML= adoptions;
}

updatePanel()


async function populateBreeds(){

    let json = await fetch(`https://dog.ceo/api/breeds/list/all`)
    let breeds = await json.json();

    breeds = Object.keys(breeds.message);

    console.log(breeds)
    let html ="";

    breeds.forEach(b=>{
        html += `<option value=${b} key=${b}></option>`
    })

    breedsListDOM.innerHTML = html
}


populateBreeds()


async function fetchRandom(){


    let json = await fetch(`https://dog.ceo/api/breeds/image/random`)
    // https://dog.ceo/api/breeds/image/random
    let data = await json.json();


    console.log(data)

        imageDiv.innerHTML = `<img alt="dogPic" src=${data.message} class="centerImage">`
}


fetchRandom()


h1Btns.forEach(btn=>{
    btn.onclick=()=>{
        console.log('btn clicked')
        fetchRandom()
    }
})


heartBtn.onclick=loveDog;
thumbDownBtn.onclick=dislikeDog;
thumbUpBtn.onclick=likeDog;
poopBtn.onclick=poopDog;

console.log(poopBtn)



function loveDog(){
    console.log("love dog fired!")
}

function dislikeDog(){
    console.log("dislike dog fired!")
}

function likeDog(){
    console.log("dislike dog fired!")
}

function poopDog(){
    console.log("poop dog fired!")
}

