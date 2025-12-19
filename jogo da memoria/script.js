const game = document.getElementById("game");
const tentativasSpan = document.getElementById("tentativas");

const imagens = [
  "card1.jpg","card1.jpg",
  "card2.jpg","card2.jpg",
  "card3.jpg","card3.jpg",
  "card4.jpg","card4.jpg"
];

let primeira = null;
let segunda = null;
let travar = false;
let tentativas = 0;

iniciar();

function iniciar() {
  game.innerHTML = "";
  tentativas = 0;
  tentativasSpan.textContent = tentativas;
  primeira = null;
  segunda = null;
  travar = false;

  const cartas = [...imagens].sort(() => 0.5 - Math.random());

  cartas.forEach(src => {
    const card = document.createElement("div");
    card.classList.add("card", "hidden");
    card.dataset.img = src;

    const img = document.createElement("img");
    img.src = src;

    card.appendChild(img);
    card.addEventListener("click", () => clicar(card));

    game.appendChild(card);
  });
}

function clicar(card) {
  if (travar || !card.classList.contains("hidden")) return;

  card.classList.remove("hidden");

  if (!primeira) {
    primeira = card;
    return;
  }

  segunda = card;
  travar = true;
  tentativas++;
  tentativasSpan.textContent = tentativas;

  if (primeira.dataset.img === segunda.dataset.img) {
    reset();
  } else {
    setTimeout(() => {
      primeira.classList.add("hidden");
      segunda.classList.add("hidden");
      reset();
    }, 800);
  }
}

function reset() {
  primeira = null;
  segunda = null;
  travar = false;
}

function reiniciar() {
  iniciar();
}
