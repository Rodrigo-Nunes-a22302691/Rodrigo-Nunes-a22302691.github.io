//Passar o rato em cima de um elemnto e mudar
//Pega no elemnto passar
const passar = document.querySelector('.passar');

//Evento para mudar o elemento
passar.addEventListener('mouseover', () => {
   passar.textContent = "GAY";
});
passar.addEventListener('mouseout', () => {
   passar.textContent = "1 - Passa por aqui";
});




//Mudar a cor de um elemento com butoes
//Pega no elemnto pinta
const pinta = document.querySelector('.pinta');

document.querySelectorAll(".cor").forEach((button) => {
   button.addEventListener("click", () => {
      pinta.style.color = button.dataset.color;
   });
});




//Mudar a cor de um elemnto com inputs do teclado
//Pegar o input
const texto = document.querySelector('.input');

//Variavel com as cores
const colors = ["red", "blue", "green", "purple", "orange"];
let index = 0;

//Funçao que muda a cor
function changeColor(){
   texto.style.backgroundColor = colors[index++];

   if(index >= 5){
      index = 0;
   }
}

//Evento para mudar a cor
texto.addEventListener('input', changeColor);




//Contar
//Pegar o butao
const conta = document.querySelector('.conta');
const numero = document.querySelector('.number');

//Variavel para contar
let number = 0;

//Contar
conta.addEventListener('click', () => {
   number++;
   numero.textContent  = number;
});




// Mudar a cor do body
document.querySelector('.corFundo').onchange = function() {
   document.querySelector('body').style.backgroundColor = this.value;
}




// Pegar no nome e nos anos para fazer print
document.querySelector('form').onsubmit = (e) => {
   // Previne o recarregamento da página ao submeter o formulário
   e.preventDefault();

   // Obtém os valores dos campos de entrada
   const nome = document.querySelector('.nome').value;
   const anos = document.querySelector('.anos').value;

   // Mostra o nome e a idade na tag <p> com a classe "pessoa"
   document.querySelector('.pessoa').textContent = `Nome: ${nome}, Idade: ${anos}`;
};




//Automatic counter
const countElement = document.querySelector('.numeroAutomaticCounter');
if (!localStorage.getItem('counter')) {
   localStorage.setItem('counter', 0);
}

// count() altera e manipula o valor de counter em localStorage
function count() {
   let counter = parseInt(localStorage.getItem('counter')); 
   counter++;
   localStorage.setItem('counter', counter); 
   countElement.textContent = counter;
}

document.addEventListener('DOMContentLoaded', () => {
   countElement.textContent = localStorage.getItem('counter');
});

// Incrementa o contador automaticamente a cada segundo
setInterval(count, 1000);
