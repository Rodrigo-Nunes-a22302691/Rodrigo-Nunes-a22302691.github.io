// Cria um local storage caso nao exista, para o carinho de compras
function criaLocalStorage(){

    if(!localStorage.getItem('produtos-selecionados')){
        localStorage.setItem('produtos-selecionados', JSON.stringify([]));
    }

}




// O nó pai para os produtos
const paiProdutos = document.querySelector('.produtos');
// Funçao que carrega os produtos
function carregarProdutos(produtos){

    produtos.forEach(produto => {
        console.log(produto.id);
        console.log(produto.title);

        paiProdutos.append(criarProduto(produto));
    });
}




// Cria o html dos produtos
function criarProduto(produto){

    // Cria o html para o produto com o nó de section e class produto
    let htmlProduto = document.createElement('article');
    htmlProduto.classList.add('produto');

    // Faz formataçao
    htmlProduto.innerHTML = `
    <h3> ${produto.title} </h3>
    <img src="${produto.image}" alt="Imagem de ${produto.title}">
    <p class = "preco"> Custo total: ${produto.price}€ </p>
    <p class = "descricao"> ${produto.description} </p>
    <p class="rating">${produto.rating.rate} / 5.0 <span class="star">★</span></p>
    <button> + Adicionar ao cesto </button>
    `;

    // Adiciona um listener ao butao 
    const butao = htmlProduto.querySelector('button')
    butao.addEventListener('click', () => {
        const lista = JSON.parse(localStorage.getItem('produtos-selecionados'));

        lista.push(produto);

        localStorage.setItem('produtos-selecionados', JSON.stringify(lista));

        atualizaCesto();
    });

    // Retorna o html do produto
    return htmlProduto;

}




// Limpa o local storage
function limparStorage(){
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}




// O nó pai para os produtos
const paiCarinho = document.querySelector('.carinho');
// Atualiza o carinho de compras
function atualizaCesto(){

    const lista = JSON.parse(localStorage.getItem('produtos-selecionados'));

    paiCarinho.innerHTML = '';

    lista.forEach(produto => {

        paiCarinho.append(criaProdutoCesto(produto));

    })

    atualizaPreco();

}




// Cria o html dos produtos para o carinho de compras
function criaProdutoCesto(produto){
    
    // Cria o html para o produto com o nó de section e class produto
    let htmlProduto = document.createElement('article');
    htmlProduto.classList.add('produto');

    // Faz formataçao
    htmlProduto.innerHTML = `
    <h3> ${produto.title} </h3>
    <img src="${produto.image}" alt="Imagem de ${produto.title}">
    <p class = "preco"> Custo total: ${produto.price}€ </p>
    <p class = "descricao"> ${produto.description} </p>
    <p class="rating">${produto.rating.rate} / 5.0 <span class="star">★</span></p>
    <button> - Remover do cesto </button>
    `;

    // Adiciona um listener ao butao 
    const butao = htmlProduto.querySelector('button')
    butao.addEventListener('click', () => {
        let lista = JSON.parse(localStorage.getItem('produtos-selecionados'));

        lista = lista.filter(p => p.id != produto.id);

        localStorage.setItem('produtos-selecionados', JSON.stringify(lista));

        atualizaCesto();
    });

    // Retorna o html do produto
    return htmlProduto;

}




// Atualiza o proço do carinho
function atualizaPreco(){

    const lista = JSON.parse(localStorage.getItem('produtos-selecionados'));
    let count = 0;

    lista.forEach(produto => {

        count += produto.price;

    });

    document.querySelector('.precoCarinho').textContent = `Custo total: ${count.toFixed(2)} €`;

}








// Main dos pobres
atualizaCesto();
criaLocalStorage();
carregarProdutos(produtos);
