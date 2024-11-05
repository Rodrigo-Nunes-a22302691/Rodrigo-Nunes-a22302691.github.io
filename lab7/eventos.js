//Areas da pagina
const areas = ["#poema", "#paisagem", "#capitais", "#galeria"];
let index = 0;

//Pegar os articles
const poema = document.querySelector('#poema');
const paisagem = document.querySelector('#paisagem');
const capitais = document.querySelector('#capitais');
const galeria = document.querySelector('#galeria');

//Pegar o nav
const navPoema = document.querySelector('.poema');
const navPaisagem = document.querySelector('.paisagem');
const navCapitais = document.querySelector('.capitais');
const navGaleria = document.querySelector('.galeria');

//Mudar a cor do nav se o rato estiver em cima do article respetivo
// Poema
poema.addEventListener('mouseover', () => {
    navPoema.style.backgroundColor = "white";

    navPoema.style.paddingLeft = "7px";
    navPoema.style.paddingRight = "7px";
    navPoema.style.borderRadius = "15px";

    navPoema.style.transform = "scale(1.4, 1.4)";

    index = 0;
});
 poema.addEventListener('mouseout', () => {
    navPoema.style.backgroundColor = "";

    navPoema.style.paddingLeft = "";
    navPoema.style.paddingRight = "";
    navPoema.style.borderRadius = "";

    navPoema.style.transform = "";
});
 
 // Paisagem
 paisagem.addEventListener('mouseover', () => {
    navPaisagem.style.backgroundColor = "white";

    navPaisagem.style.paddingLeft = "7px";
    navPaisagem.style.paddingRight = "7px";
    navPaisagem.style.borderRadius = "15px";

    navPaisagem.style.transform = "scale(1.4, 1.4)";

    index = 1;
});
 paisagem.addEventListener('mouseout', () => {
    navPaisagem.style.backgroundColor = "";

    navPaisagem.style.paddingLeft = "";
    navPaisagem.style.paddingRight = "";
    navPaisagem.style.borderRadius = "";

    navPaisagem.style.transform = "";
});
 
 // Capitais
 capitais.addEventListener('mouseover', () => {
    navCapitais.style.backgroundColor = "white";
    
    navCapitais.style.paddingLeft = "7px";
    navCapitais.style.paddingRight = "7px";
    navCapitais.style.borderRadius = "15px";

    navCapitais.style.transform = "scale(1.4, 1.4)";

    index = 2;
});
 capitais.addEventListener('mouseout', () => {
    navCapitais.style.backgroundColor = "";

    navCapitais.style.paddingLeft = "";
    navCapitais.style.paddingRight = "";
    navCapitais.style.borderRadius = "";

    navCapitais.style.transform = "";
});
 
 // Galeria
 galeria.addEventListener('mouseover', () => {
    navGaleria.style.backgroundColor = "white";

    navGaleria.style.paddingLeft = "7px";
    navGaleria.style.paddingRight = "7px";
    navGaleria.style.borderRadius = "15px";

    navGaleria.style.transform = "scale(1.4, 1.4)";

    index = 3;
});
 galeria.addEventListener('mouseout', () => {
    navGaleria.style.backgroundColor = "";

    navGaleria.style.paddingLeft = "";
    navGaleria.style.paddingRight = "";
    navGaleria.style.borderRadius = "";

    navGaleria.style.transform = "";
});




//Mudar o poema mouse
function moveArea(incrementar){

    index += incrementar;

    if(index >= 4){
        index = 3;
    }
    else if (index < 0){
        index = 0;
    }

    document.querySelector(areas[index]).scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 's') {
        moveArea(1);
    } 
    else if (event.key === 'w') {
        moveArea(-1);
    }
});