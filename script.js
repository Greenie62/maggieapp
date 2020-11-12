var lickSpan = document.querySelector(".lickSpan");
var poopSpan = document.querySelector(".poopSpan");
var adoptionSpan = document.querySelector(".adoptionSpan");
var breedsListDOM = document.querySelector("#breedlist");
var breedSelect = document.querySelector("#breed");
var imageDiv = document.querySelector(".imageDiv");

var heartBtn = document.querySelector(".heart")
var thumbDownBtn = document.querySelector(".thumbdown")
var thumbUpBtn = document.querySelector(".thumbup")
var poopBtn = document.querySelector(".poop")

var h1Btns = document.querySelectorAll(".h1btn")

var licks=0;
var poop=0;
var adoptions=0;
var isBreeds =false;
var breedsArr=[];
var counter=0;


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
        if(!isBreeds){
        console.log('btn clicked')
        fetchRandom()
        }
        else{
            breedImageRender(breedsArr)
            counter++
        }
    }
})


heartBtn.onclick=loveDog;
thumbDownBtn.onclick=dislikeDog;
thumbUpBtn.onclick=likeDog;
poopBtn.onclick=poopDog;

console.log(poopBtn)



function loveDog(){
    console.log("love dog fired!")
    if(Math.random() > .5){
        licks++
        let dogImg = imageDiv.firstElementChild.getAttribute("src");
        console.log(dogImg)
    }
    else{
        poop++
    }

    updatePanel()
}

function dislikeDog(){
    console.log("dislike dog fired!")
    poop++
    updatePanel()
    fetchRandom()
}

function likeDog(){
    console.log("dislike dog fired!")
    licks++
    updatePanel()
    fetchRandom()

}

function poopDog(){
    console.log("poop dog fired!")
    poop++
    updatedPanel()
    fetchRandom()

}


breedSelect.onchange=(e)=>selectBreed(e);


async function selectBreed(e){
    var breed =e.target.value;
    console.log("selectBreed fired",breed);

    let data = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
    let json = await data.json();
    breedsArr =json.message

    console.log(json)
    isBreeds=true;
    breedImageRender(breedsArr)





}


function breedImageRender(breeds){

    let html = `<img src=${breeds[counter]} class="centerImage" alt="breed_img">`

    imageDiv.innerHTML = html;
    document.querySelector("#breed").innerHTML=""
    breedsListDOM.innerHTML = ""
    populateBreeds()

}

