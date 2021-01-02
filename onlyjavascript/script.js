window.onload = function () {};

const input = document.querySelector('#letras');
input.value = 'abcdefghijklmnop';
const botao = document.querySelector('.processInput');
botao.addEventListener('click', () => {
  console.log(processData(input.value));
});

const all2LetterWords = [];
const all3LetterWords = [];
const all4LetterWords = [];
const all5LetterWords = [];
const all6LetterWords = [];
const all7LetterWords = [];
const all8LetterWords = [];
const all9LetterWords = [];

function processData(string) {
  const lettersAsObj = stringToObject(string);
  findAllNeighbours(lettersAsObj);
  const arrayOfArrayOfObj = arrayToAoA(lettersAsObj);
  /*   arrayOfArrayOfObj.forEach(element => addNextNeighbour(element, all2LetterWords));
  all2LetterWords.forEach(element => addNextNeighbour(element, all3LetterWords)); */
  return arrayOfArrayOfObj;
}

/* TENHO QUE MUDAR PRA STRING PORQUE A REFERENCIA DOS NEIGHBOURS DENTRO DE CADA OBJ EH UM OBJ QUE MUDA CONSTANTEMENTE */
function addNextNeighbour(array, targetArray) {
  let last = array[array.length - 1];
  last.neighbours.forEach(neigh => {
    neigh['previous'] = `${last.value}${last.row}${last.col}`;
    if (last.previous !== neigh) {
      targetArray.push([...array, neigh]);
    }
  });
}

function createTwoLettersWords(array) {}

function arrayToAoA(array) {
  return array.map(e => [e]);
}

function stringToObject(string) {
  const array = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const letter = string[i * 4 + j];
      const newObj = {
        value: letter,
        row: i,
        col: j,
        neighbours: [],
        previous: null,
      };
      array.push(newObj);
    }
  }
  return array;
}

function findAllNeighbours(array) {
  array.forEach(obj => {
    obj.neighbours = array.filter(neigh => {
      if (
        (obj.row === neigh.row - 1 && obj.col === neigh.col - 1) ||
        (obj.row === neigh.row - 1 && obj.col === neigh.col) ||
        (obj.row === neigh.row - 1 && obj.col === neigh.col + 1) ||
        /** */
        (obj.row === neigh.row && obj.col === neigh.col - 1) ||
        (obj.row === neigh.row && obj.col === neigh.col + 1) ||
        /** */
        (obj.row === neigh.row + 1 && obj.col === neigh.col - 1) ||
        (obj.row === neigh.row + 1 && obj.col === neigh.col) ||
        (obj.row === neigh.row + 1 && obj.col === neigh.col + 1)
      ) {
        return neigh;
      }
    });
  });
}
