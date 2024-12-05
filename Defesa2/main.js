// Cria um local storage caso nao exista, para o carinho de compras
function criaLocalStorage() {

    if (!localStorage.getItem('produtos-selecionados')) {
        localStorage.setItem('produtos-selecionados', JSON.stringify([]));
    }

}


// Limpa o local storage
function limparStorage() {
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
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




// O nó pai para os produtos
const paiCarinho = document.querySelector('.carinho');
let produtosCarinho = [];
// Atualiza o carinho de compras
function atualizaCesto() {

    // Lista com os produtos no carinho
    const lista = JSON.parse(localStorage.getItem('produtos-selecionados'));

    // Limpa os produtos do carinho cada vez que atualiza
    paiCarinho.innerHTML = '';
    produtosCarinho = [];


    // Poe os produtos no pai
    lista.forEach(produto => {

        paiCarinho.append(criaProdutoCesto(produto));
        produtosCarinho.push(produto);

    })


    // O carinho nao apararece se nao tiver nada no carrinho
    if(!pagou){

        if(produtosCarinho.length == 0){
            document.querySelector('.cesto').style.display = 'none';
        }else{
            document.querySelector('.cesto').style.display = 'flex';
        }

    }else{

        document.querySelector('.cesto').style.display = 'flex';

    }


    // Atualiza o preço do carinho
    atualizaPreco();

}




// Cria o html dos produtos para o carinho de compras
function criaProdutoCesto(produto) {

    // Cria o html para o produto com o nó de section e class produto
    let htmlProduto = document.createElement('article');
    htmlProduto.classList.add('produto');


    // Faz o html
    htmlProduto.innerHTML = `
    <h3> ${produto.title} </h3>
    <img src="${produto.image}" alt="Imagem de ${produto.title}">
    <p class = "preco"> Custo total: ${produto.price}€ </p>
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




// Atualiza o preço do carinho
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


    // Vai ver se tem desconto na compra
    const student = estudante.checked;
    const coupon = cupao.value;


    // Limpa o storage e atualiza o cesto
    limparStorage();
    produtosCarinho = [];
    atualizaCesto();
    

    // Faz o JSON para a API
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
let pagou = false;
document.querySelector('.comprar').addEventListener('click', () => {
    pagou = true;
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
        document.querySelector('.dadosDeCompra').innerHTML = `
        <p> Valor final a pagar (com eventuais descontos): ${data.totalCost} € </p>
        <p> Referencia de pagamento: ${data.reference} </p>
        `
    })
    .catch(error => {
        console.error('Erro ao processar a requisição:', error);
    });
});







// Listeners
// Variaveis para a pesquisa dos produtos
let filtro = 'todas';
let ordem = 'Ordenar pelo preço';
let pesquisa = '';
function filtrar(){

    // Produtos filtrados
    let produtosFiltrados = produtos;

    // Filtra
    // Categoria
    if (filtro == 'todas') {

        produtosFiltrados = produtos;

    } else {
        
        produtosFiltrados = produtosFiltrados.filter(produto => produto.category == filtro);

    }


    // Ordem
    if(ordem == 'Preço Decrescente'){

        produtosFiltrados = [...produtosFiltrados].sort((a, b) => b.rating.rate - a.rating.rate);

    }else if(ordem == 'Preço Crescente'){

        produtosFiltrados = [...produtosFiltrados].sort((a, b) => a.rating.rate - b.rating.rate);

    }else{

        produtosFiltrados = produtosFiltrados;

    }


    // Pesquisa por texto
    if(pesquisa == ''){

        produtosFiltrados = produtosFiltrados;

    }else{

        produtosFiltrados = produtosFiltrados.filter(produto => produto.title == pesquisa)

        produtosFiltrados.forEach(produto => {

            let listaDescriçao = produto.description.split(" ");

            listaDescriçao.forEach(palavra => {

                if(palavra == pesquisa){
                    produtosFiltrados.push(produto);
                }

            })
        });

    }


    atualizaProdutos(produtosFiltrados);

}


// Eventos para ativar o filtro
// Filtro de categoria
document.querySelector('#filtra').addEventListener('change', (event) => {

    filtro = event.target.value;

    filtrar();

});


// Filtro de ordem
document.querySelector('#ordena').addEventListener('change', (event) => {

    ordem = event.target.value;

    filtrar();

});


// Filtro de texto
document.querySelector('#procura').addEventListener('change', (event) => {

    pesquisa = event.target.value;

    filtrar();

});


document.querySelector('.adicionaToda').addEventListener('click', () => {

    localStorage.setItem('produtos-selecionados', JSON.stringify(produtos));
    atualizaCesto();


})

document.querySelector('.info').addEventListener('click', () => {

    let descricoes = document.querySelectorAll('.descricao');

    descricoes.forEach(descricao => {

        descricao.style.display = 'none';

    })

})
