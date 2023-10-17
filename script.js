// Récupération des différents éléments
const statusPlayer = document.querySelector("h2");
const cases = document.querySelectorAll(".case");
const restartBtn = document.querySelector("#restart");

// Création de variables
let activeGame = true;
let currentPlayer = "X";
let stateGame = ["", "", "", "", "", "", "", "", ""];

/*
  Index du tableau
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
*/

// Définition des condition de vicoire d'un joueur
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Déclaration de la fonction playerTurn qui indique quel joueur doit jouer
const playerTurn = () => `C'est au tour du joueur ${currentPlayer}`;

// On affiche quel joueur commence
statusPlayer.innerHTML = playerTurn(); // Appel de la fonction playerTurn()

// Déclaration de la fonction Win qui affiche le vainqueur
const win = () => `Le joueur ${currentPlayer} a gagné`;

// Déclaration de la fonction tie qui indique que la partie n'a pas de vainqueur
const tie = () => "Egalité";

/**
 * Déclaration de la fonction clickCase qui gère le clic sur les cases du jeu
 */
const clickCase = (e) => {
  // Récupération de l'index de la case cliquée qui est stocké dans la constante indexCase
  const indexCase = e.target.dataset.index;

  // Vérification si la case est déjà remplie ou si le jeu est terminé
  if (stateGame[indexCase] !== "" || !activeGame) {
    return;
  }

  // Ecriture du symbole du joueur (X ou O) et de la case dans le tableau stateGame
  stateGame[indexCase] = currentPlayer;
  e.target.innerHTML = currentPlayer;

  // Vérification si le joueur a gagné via l'appel de la focntion winVerification
  winVerification();
};

/**
 * Déclaration de la fonction winVerification qui vérifie si le joueur a gagné
 */
const winVerification = () => {
  // Création de la variable winningTurn qui est par défaut établie à false
  let winningTurn = false;

  // Boucle for qui va parcourir toutes les conditions de victoire
  for (let winningCondition of winningConditions) {
    // Récupération des 3 cases de la condition de victoire stockés dans des vairiables
    let value1 = stateGame[winningCondition[0]];
    let value2 = stateGame[winningCondition[1]];
    let value3 = stateGame[winningCondition[2]];

    // Si l'une des cases est vide
    if (value1 === "" || value2 === "" || value3 === "") {
      continue;
    }

    // Si les 3 cases sont identiques
    if (value1 === value2 && value2 === value3) {
      // Victoire
      winningTurn = true;
      break;
    }
  }

  // Si victoire
  if (winningTurn) {
    statusPlayer.innerHTML = win(); // Appel de la fonction win()
    activeGame = false;
    return;
  }

  // Si toutes les cases sont remplies
  if (!stateGame.includes("")) {
    statusPlayer.innerHTML = tie(); // Appel de la fonction tie()
    activeGame = false;
    return;
  }

  // On change de joueur
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusPlayer.innerHTML = playerTurn(); //Appel de la fonction playerTurn()
};

/**
 * Déclaration de la fonction restart qui réinitialise le jeu
 */
const restart = () => {
  currentPlayer = "X";
  activeGame = true;
  stateGame = ["", "", "", "", "", "", "", "", ""];
  statusPlayer.innerHTML = playerTurn(); // Appel de la fonction playerTurn()
  cases.forEach((cell) => (cell.textContent = ""));
};

// Ecoute de l'événement "click" sur chaque case et appel de la fonction clickCase
cases.forEach((cell) => cell.addEventListener("click", clickCase));

// Ecoute de l'événement "click" sur le bouton "Recommencer" et appel de la fonction restart
restartBtn.addEventListener("click", restart);
