// Generate Image

async function getPokemonImage() {
  const response = await axios.get(
    "https://pokeapi.co/api/v2/pokemon/dragonair"
  );

  const img = document.createElement("img");
  img.classList.add("poke-img");

  console.log(response.data.sprites.other["official-artwork"].front_default);

  const dragonairImg =
    response.data.sprites.other["official-artwork"].front_default;

  img.setAttribute("src", dragonairImg);

  const imgContainer = document.querySelector(".main__img-container");
  imgContainer.appendChild(img);
}

getPokemonImage();

// Create the question and append to DOM
const questions = () => {
  const question = document.createElement("h2");
  question.classList.add("main__question");
  question.innerText = "What does this pokemon evolve to?";

  const quizQuestion = document.querySelector(".main__container");
  quizQuestion.appendChild(question);
};

questions();

const answerOptions = document.querySelector(".main__answers");

// Randomly generate the answers from an array of pokemon names
const fetchPokemonNames = async () => {
  answerOptions.innerHTML = "";

  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");

    const pokemonNames = response.data.results;

    let randomPokemonIndex = Math.floor(Math.random() * pokemonNames.length);
    let randomPokemonName = pokemonNames[randomPokemonIndex].name;
    console.log(randomPokemonName);

    console.log(pokemonNames);

    answerButtons(randomPokemonName);
    randomPokemonIndex = Math.floor(Math.random() * pokemonNames.length);
    randomPokemonName = pokemonNames[randomPokemonIndex].name;

    answerButtons(randomPokemonName);
    randomPokemonIndex = Math.floor(Math.random() * pokemonNames.length);
    randomPokemonName = pokemonNames[randomPokemonIndex].name;

    answerButtons(randomPokemonName);
    randomPokemonIndex = Math.floor(Math.random() * pokemonNames.length);
    randomPokemonName = pokemonNames[randomPokemonIndex].name;

    correctButton();
  } catch (error) {}
};

fetchPokemonNames();

//Generate the options with an event listener
const answerButtons = (randomPokemonName) => {
  console.log("button", randomPokemonName);
  const answerButton1 = document.createElement("button");
  answerButton1.classList.add("main__answer");
  answerButton1.innerText = randomPokemonName;

  answerButton1.addEventListener("click", handleClick);

  answerOptions.appendChild(answerButton1);
};

const correctButton = () => {
  const answerButton2 = document.createElement("button");
  answerButton2.classList.add("main__answer");
  answerButton2.innerText = "dragonite";

  answerButton2.addEventListener("click", handleClick);
  answerOptions.appendChild(answerButton2);
};

const correctPokemon = "dragonite";

const resultMessage = document.createElement("p");
resultMessage.classList.add("main__result");

const handleAnswer = (isCorrect) => {
  resultMessage.innerText = isCorrect
    ? "You know your Pokemon"
    : "You're not gonna catch em all";
  const responseMessage = document.querySelector(".main__response");
  responseMessage.appendChild(resultMessage);
};

const handleClick = (event) => {
  const selectedPokemon = event.target.innerText.toLowerCase();
  const isCorrect = selectedPokemon === correctPokemon;

  handleAnswer(isCorrect);
};
