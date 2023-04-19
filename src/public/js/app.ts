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
    <div class="pokemon">
        <div class="stt">${pokeItem.id}</div>
        <img src="${pokeItem.image}" alt="${pokeItem.type}">
    </div>
    `
}

async function fetchData(root:HTMLElement) {
    for(let i = 1; i<=20;i++){
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
    }
    shuffle()
    console.log(pokemons)
    pokemons.forEach(Element=>{
        root.innerHTML +=template(Element)
    });
}
let root = document.getElementById('app');
if(root){
    fetchData(root)
}
