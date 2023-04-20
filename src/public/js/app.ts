let poke:{
    id: number,
    name: string,
    image: string,
    type: string
}
let pokemons: {
    id: number,
    name: string,
    image: string,
    type: string
}[] = []
function shuffle(){
    for(let i =0; i<pokemons.length;i++){
        let j: number = Math.round(Math.random() * pokemons.length)
        let temp = pokemons[i] // 1
        pokemons[i] = pokemons[j] //1 => 23
        pokemons[j] = temp // 23 -> 1
    }
}
function template(pokeItem:{
    id: number,
    name: string,
    image: string,
    type: string
}){
    return `
    <div class="pokemon card" onclick="clickCard(event)" data-pokeid="${pokeItem.id}">
            <div class="front">
            </div>
            <div class="back rotated">
                <img src="${pokeItem.image}" alt="${pokeItem.type}">
                <h2>${pokeItem.name}</h2>
            </div>
    </div>
    `
}

async function fetchData(root:HTMLElement) {
    for(let i = 1; i<=8;i++){
        let data:Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        let pokemon : any = await data.json();
        console.log(pokemon)
        let{name: pokemoname, url} = pokemon.abilities[0].ability
        let {front_default: imageUrl} = pokemon.sprites
        let {name:type} = pokemon.types[0].type;
        poke = {
            id: i,
            name: pokemoname,
            image: imageUrl,
            type: type
        }
        pokemons.push(poke)
        pokemons.push(poke)
    }
    shuffle()
    console.log(pokemons)
    pokemons.forEach(Element=>{
        if(typeof Element === 'object'){
            root.innerHTML +=template(Element)
        }  
    });
}
let root = document.getElementById('app');
if(root){
    fetchData(root)
}
// view 

let firstPick:any;
let isPaused:boolean = false;
let matches:number;

const clickCard = (e:any) => {
    const pokemonCard = e.currentTarget
    console.log(pokemonCard)
    const [front, back] = getFrontAndBackFromCard(pokemonCard)
    console.log(front)
    if(front.classList.contains("rotated") || isPaused) {
        return;
    }
    isPaused = true;
    rotateElements([front, back]);
    // front.classList.toggle('rotated')
    // back.classList.toggle('rotated')
    if(!firstPick){
        firstPick = pokemonCard;
        isPaused = false;
    }
    else{
        const secondPokemonName = pokemonCard.dataset.pokeid;
        const firstPokemonName = firstPick.dataset.pokeid;
        if(firstPokemonName !== secondPokemonName){
            const [firstFront, firstBack] = getFrontAndBackFromCard(firstPick);
            setTimeout(() => {
                rotateElements([front, back, firstFront, firstBack]);
                // front.classList.toggle('rotated')
                // back.classList.toggle('rotated')
                // firstFront.classList.toggle('rotated')
                // firstBack.classList.toggle('rotated')
                firstPick = null;
                isPaused = false;
            }, 500) 
        }
        else{
            matches++;
            if(matches === 8) {
                console.log("WINNER");
            }
            firstPick = null;
            isPaused = false;
        }
    }
}
const getFrontAndBackFromCard = (card:any) => {
    const front = card.querySelector(".front");
    const back = card.querySelector(".back");
    return [front, back]
}
const rotateElements = (elements:any) => {
    if(typeof elements !== 'object' || !elements.length) return;
    elements.forEach((element:any) => element.classList.toggle('rotated'));
}



