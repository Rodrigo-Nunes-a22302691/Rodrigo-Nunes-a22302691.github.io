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

//Butoes para mduar a cor do pinta
document.querySelector('.red').addEventListener('click', () => {
   pinta.style.color = "red";
});

document.querySelector('.green').addEventListener('click', () => {
   pinta.style.color = 'green';
});

document.querySelector('.blue').addEventListener('click', () => {
   pinta.style.color = 'blue';
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
const list = document.querySelector('.cor');
const body = document.querySelector('body');

list.addEventListener('input', () => {
   let valor = document.querySelector('.cor').value;
   body.style.backgroundColor = valor; 
});




// Pegar no nome e nos anos para fazer print
const pessoa = document.querySelector('.pessoa');
const nome = document.querySelector('.nome');
const idade = document.querySelector('.anos');
const submeterPessoa = document.querySelector('.submit');

submeterPessoa.addEventListener("click", () => {
   let texto = "Olá, o " + nome.value + " tem " + idade.value + "!"
   
   pessoa.innerHTML = "Olá, o " + nome.value + " tem " + idade.value + "!";
})




//Automatic counter
const counterAutomatico = document.querySelector('.numeroAutomaticCounter');
let numeroCounterAutomatico = 1;

setInterval( () => {
   counterAutomatico.innerHTML = numeroCounterAutomatico++;
}, 1000);