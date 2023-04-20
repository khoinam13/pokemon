var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var poke;
var pokemons = [];
function shuffle() {
    for (var i = 0; i < pokemons.length; i++) {
        var j = Math.round(Math.random() * pokemons.length);
        var temp = pokemons[i]; // 1
        pokemons[i] = pokemons[j]; //1 => 23
        pokemons[j] = temp; // 23 -> 1
    }
}
function template(pokeItem) {
    return "\n    <div class=\"pokemon card\" onclick=\"clickCard(event)\" data-pokeid=\"".concat(pokeItem.id, "\">\n            <div class=\"front\">\n            </div>\n            <div class=\"back rotated\">\n                <img src=\"").concat(pokeItem.image, "\" alt=\"").concat(pokeItem.type, "\">\n                <h2>").concat(pokeItem.name, "</h2>\n            </div>\n    </div>\n    ");
}
function fetchData(root) {
    return __awaiter(this, void 0, void 0, function () {
        var i, data, pokemon, _a, pokemoname, url, imageUrl, type;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    i = 1;
                    _b.label = 1;
                case 1:
                    if (!(i <= 8)) return [3 /*break*/, 5];
                    return [4 /*yield*/, fetch("https://pokeapi.co/api/v2/pokemon/".concat(i))];
                case 2:
                    data = _b.sent();
                    return [4 /*yield*/, data.json()];
                case 3:
                    pokemon = _b.sent();
                    console.log(pokemon);
                    _a = pokemon.abilities[0].ability, pokemoname = _a.name, url = _a.url;
                    imageUrl = pokemon.sprites.front_default;
                    type = pokemon.types[0].type.name;
                    poke = {
                        id: i,
                        name: pokemoname,
                        image: imageUrl,
                        type: type
                    };
                    pokemons.push(poke);
                    pokemons.push(poke);
                    _b.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5:
                    shuffle();
                    console.log(pokemons);
                    pokemons.forEach(function (Element) {
                        if (typeof Element === 'object') {
                            root.innerHTML += template(Element);
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
var root = document.getElementById('app');
if (root) {
    fetchData(root);
}
// view 
var firstPick;
var isPaused = false;
var matches;
var clickCard = function (e) {
    var pokemonCard = e.currentTarget;
    console.log(pokemonCard);
    var _a = getFrontAndBackFromCard(pokemonCard), front = _a[0], back = _a[1];
    console.log(front);
    if (front.classList.contains("rotated") || isPaused) {
        return;
    }
    isPaused = true;
    rotateElements([front, back]);
    // front.classList.toggle('rotated')
    // back.classList.toggle('rotated')
    if (!firstPick) {
        firstPick = pokemonCard;
        isPaused = false;
    }
    else {
        var secondPokemonName = pokemonCard.dataset.pokeid;
        var firstPokemonName = firstPick.dataset.pokeid;
        if (firstPokemonName !== secondPokemonName) {
            var _b = getFrontAndBackFromCard(firstPick), firstFront_1 = _b[0], firstBack_1 = _b[1];
            setTimeout(function () {
                rotateElements([front, back, firstFront_1, firstBack_1]);
                // front.classList.toggle('rotated')
                // back.classList.toggle('rotated')
                // firstFront.classList.toggle('rotated')
                // firstBack.classList.toggle('rotated')
                firstPick = null;
                isPaused = false;
            }, 500);
        }
        else {
            matches++;
            if (matches === 8) {
                console.log("WINNER");
            }
            firstPick = null;
            isPaused = false;
        }
    }
};
var getFrontAndBackFromCard = function (card) {
    var front = card.querySelector(".front");
    var back = card.querySelector(".back");
    return [front, back];
};
var rotateElements = function (elements) {
    if (typeof elements !== 'object' || !elements.length)
        return;
    elements.forEach(function (element) { return element.classList.toggle('rotated'); });
};
