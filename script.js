import { allOrdered } from './allOrdered.js';

const input = document.querySelector('#letras');
const list = document.querySelector('.listOfWords');
const board = document.querySelector('.board');
const botao = document.querySelector('.processInput');
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
let allMatchesString;
let allMatchesArray;
let liBoard;
let liWords;

//input.value = 'jaucklopdefejcak';

input.addEventListener('keyup', () => {
  updateBoard();
});

botao.addEventListener('click', () => {
  createListOfWords();
});

function updateBoard() {
  let typed = input.value;
  if (!alphabet.includes(typed[typed.length - 1])) {
    input['value'] = typed.slice(0, -1);
  } else {
    typed.split('').forEach((letter, index) => {
      liBoard[index].innerHTML = letter;
    });
  }
}

function createBoard() {
  for (let i = 0; i < 16; i++) {
    let liElement = document.createElement('li');
    liElement.classList.add('boardLi');
    board.appendChild(liElement);
  }
  liBoard = document.querySelectorAll('.boardLi');
}
createBoard();

function showPathOnBoard(index) {
  let wordAsArray = allMatchesArray[index];
  let alphaColor = 1;
  wordAsArray.forEach(letter => {
    let i = +letter[1];
    let j = +letter[2];
    alphaColor -= 0.12;
    let color = `rgba(255, 160, 122, ${alphaColor})`;
    liBoard[i * 4 + j].style.backgroundColor = color;
  });
}

function clearBoard() {
  liBoard.forEach(li => {
    li.style.backgroundColor = `white`;
  });
}

function createListOfWords() {
  if (input.value === '') return alert('Type 16 letters on Input');
  list.innerHTML = '';
  [allMatchesString, allMatchesArray] = findAllWords(input.value);
  allMatchesString.forEach(word => {
    let liElement = document.createElement('li');
    liElement.innerHTML = `${word}`;
    list.appendChild(liElement);
  });
  liWords = document.querySelectorAll('.listOfWords li');
  liWords.forEach((li, index) => {
    li.addEventListener('mouseover', () => {
      clearBoard();
      showPathOnBoard(index);
    });
  });
}

function findAllWords(string) {
  let lettersAsObj = [];
  const allSizes = {
    all1LetterWords: [],
    all2LetterWords: [],
    all3LetterWords: [],
    all4LetterWords: [],
    all5LetterWords: [],
    all6LetterWords: [],
    all7LetterWords: [],
    all8LetterWords: [],
  };

  const allMatchesAsArray = [];
  const allMatchesAsString = [];

  function processData(string) {
    lettersAsObj = stringToObject(string);
    findAllNeighbours(lettersAsObj);
    createOneLetterArray(lettersAsObj);

    const arrayOfKeys = Object.keys(allSizes);
    for (let i = 1; i < arrayOfKeys.length; i++) {
      createLettersWords(allSizes[`${arrayOfKeys[i - 1]}`], allSizes[`${arrayOfKeys[i]}`]);
      checkIfExists(allSizes[`${arrayOfKeys[i]}`]);
    }
  }

  function checkIfExists(arrayOfWords) {
    arrayOfWords.forEach(wordAsArray => {
      let word = arrayToString(wordAsArray);
      let firstLetter = word[0];
      if (allOrdered[`${firstLetter}`].includes(word)) {
        allMatchesAsArray.push(wordAsArray);
        allMatchesAsString.push(word);
      }
    });
  }

  function arrayToString(array) {
    return array.map(e => e.charAt(0)).join('');
  }

  function createOneLetterArray(lettersAsObj) {
    Object.keys(lettersAsObj).forEach(key => {
      allSizes['all1LetterWords'].push([key]);
    });
  }

  function addNextNeighbour(array, targetArray) {
    let current = array[array.length - 1];

    lettersAsObj[current].neighbours.forEach(neigh => {
      if (!array.includes(neigh[0])) {
        targetArray.push([...array, neigh[0]]);
      }
    });
  }

  function createLettersWords(array, targetArray) {
    array.forEach(e => {
      addNextNeighbour(e, targetArray);
    });
  }

  function stringToObject(string) {
    const allLettersAsObj = {};
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const letter = string[i * 4 + j];
        allLettersAsObj[`${letter}${i}${j}`] = {
          value: letter,
          row: i,
          col: j,
          neighbours: [],
        };
      }
    }
    return allLettersAsObj;
  }

  function findAllNeighbours(allLetters) {
    Object.values(allLetters).forEach(obj => {
      obj.neighbours = Object.values(allLetters)
        .filter(
          neigh =>
            (obj.row === neigh.row - 1 && obj.col === neigh.col - 1) ||
            (obj.row === neigh.row - 1 && obj.col === neigh.col) ||
            (obj.row === neigh.row - 1 && obj.col === neigh.col + 1) ||
            /** */
            (obj.row === neigh.row && obj.col === neigh.col - 1) ||
            (obj.row === neigh.row && obj.col === neigh.col + 1) ||
            /** */
            (obj.row === neigh.row + 1 && obj.col === neigh.col - 1) ||
            (obj.row === neigh.row + 1 && obj.col === neigh.col) ||
            (obj.row === neigh.row + 1 && obj.col === neigh.col + 1),
        )
        .map(e => [`${e.value}${e.row}${e.col}`]);
    });
  }

  processData(string);

  return [allMatchesAsString.reverse(), allMatchesAsArray.reverse()];
}

/*
SCRIPT USADO PARA GERAR O ARQUIVO COM TODAS AS PALAVRAS ORDENADAS
import { all } from './100kwords.js';
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

function allWordsStringToObj(string) {
  const arrayofWords = string.split('\n');
  const objOfalphabet = {};
  alphabet.split('').forEach(l => (objOfalphabet[l] = []));
  while (arrayofWords.length > 0) {
    let word = arrayofWords.shift();
    if (alphabet.indexOf(word.charAt(0)) > -1) objOfalphabet[word.charAt(0)].push(word);
  }
  return JSON.stringify(objOfalphabet);
}
const allWordsAsObj = allWordsStringToObj(all);
console.log(allWordsAsObj); */
