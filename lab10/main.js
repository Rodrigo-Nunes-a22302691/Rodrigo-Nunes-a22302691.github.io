// Cria um local storage caso nao exista, para o carinho de compras
function criaLocalStorage() {

    if (!localStorage.getItem('produtos-selecionados')) {
        localStorage.setItem('produtos-selecionados', JSON.stringify([]));
    }

}




// O nó pai para os produtos
const paiProdutos = document.querySelector('.produtos');
// Funçao que carrega os produtos
function atualizaProdutos(produtos) {

    paiProdutos.innerHTML = '';

    produtos.forEach(produto => {

        paiProdutos.append(criarProduto(produto));

    });
}




// Cria o html dos produtos
function criarProduto(produto) {

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
function limparStorage() {
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}




// O nó pai para os produtos
const paiCarinho = document.querySelector('.carinho');
let produtosCarinho = [];
// Atualiza o carinho de compras
function atualizaCesto() {

    const lista = JSON.parse(localStorage.getItem('produtos-selecionados'));

    paiCarinho.innerHTML = '';
    produtosCarinho = [];

    lista.forEach(produto => {

        paiCarinho.append(criaProdutoCesto(produto));
        produtosCarinho.push(produto);

    })

    if(produtosCarinho.length == 0){
        document.querySelector('.cesto').style.display = 'none';
    }else{
        document.querySelector('.cesto').style.display = 'flex';
    }

    atualizaPreco();

}




// Cria o html dos produtos para o carinho de compras
function criaProdutoCesto(produto) {

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
function atualizaPreco() {

    const lista = JSON.parse(localStorage.getItem('produtos-selecionados'));
    let count = 0;

    lista.forEach(produto => {

        count += produto.price;

    });

    document.querySelector('.precoCarinho').textContent = `Custo total: ${count.toFixed(2)} €`;

}




// Cria o html para a pesquisa
function opcoesFiltrar(opcoes, html) {

    opcoes.forEach(opcao => {
        html.innerHTML += `<option value = ${opcao}> ${opcao} </option>`
    });

}




// Faz o JSON para o API da compra
const estudante = document.querySelector('#estudante');
const cupao = document.querySelector('#cupao');
function compra(){

    // Vai buscar os ids do cesto
    let products = [];
    produtosCarinho.forEach(produto => {
        products.push(produto.id);
    });

    const student = estudante.checked;

    const coupon = cupao.value;

    limparStorage();
    produtosCarinho = [];

    atualizaCesto();
    
    return {
        products,
        student,
        coupon
    };

}








// Vai buscar os produtos ao API
let produtos;
fetch('https://deisishop.pythonanywhere.com/products/').then(response => response.json()).then(data => {

    produtos = data
    criaLocalStorage();
    atualizaCesto();
    criaLocalStorage();
    atualizaProdutos(produtos);

}).catch(error => {
    console.error('erro', error)
});

// Vai buscar os valores de pesquisa á API
fetch('https://deisishop.pythonanywhere.com/categories/').then(response => response.json()).then(data => {

    const html = document.querySelector('#filtra');

    opcoesFiltrar(data, html);

}).catch(error => {
    console.error('erro', error)
});

// Pagar
document.querySelector('.comprar').addEventListener('click', () => {
    fetch('https://deisishop.pythonanywhere.com/buy/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(compra()) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert('Compra realizada com sucesso! Dados: ' + JSON.stringify(data));
    })
    .catch(error => {
        console.error('Erro ao processar a requisição:', error);
    });
});







// Listeners
let filtro = 'todas';
let ordem = 'Ordenar pelo preço';
let pesquisa = '';
function filtrar(){

    let produtosFiltrados = produtos;

    // Filtra
    if (filtro == 'todas') {

        produtosFiltrados = produtos;

    } else {
        
        produtosFiltrados = produtosFiltrados.filter(produto => produto.category == filtro);

    }


    if(ordem == 'Preço Decrescente'){

        produtosFiltrados = [...produtosFiltrados].sort((a, b) => b.price - a.price);

    }else if(ordem == 'Preço Crescente'){
        produtosFiltrados = [...produtosFiltrados].sort((a, b) => a.price - b.price);
    }else{
        produtosFiltrados = produtosFiltrados;
    }


    if(pesquisa == ''){
        produtosFiltrados = produtosFiltrados;
    }else{
        produtosFiltrados = produtosFiltrados.filter(produto => produto.title == pesquisa)
    }

    atualizaProdutos(produtosFiltrados);

}

document.querySelector('#filtra').addEventListener('change', (event) => {

    filtro = event.target.value;

    filtrar();

});

document.querySelector('#ordena').addEventListener('change', (event) => {

    ordem = event.target.value;

    filtrar();

});

document.querySelector('#procura').addEventListener('change', (event) => {

    pesquisa = event.target.value;

    filtrar();

});
