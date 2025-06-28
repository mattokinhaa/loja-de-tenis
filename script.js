let carrinho = [];

const produtos = [
    { nome: 'Raquete Premium', preco: 499, categoria: 'raquetes', img: 'https://via.placeholder.com/400x300' },
    { nome: 'Cordas Pro Spin', preco: 149, categoria: 'cordas', img: 'https://via.placeholder.com/400x300' },
    { nome: 'Bolas Profissionais', preco: 99, categoria: 'bolas', img: 'https://via.placeholder.com/400x300' },
    { nome: 'Grip Antiderrapante', preco: 29, categoria: 'acessorios', img: 'https://via.placeholder.com/400x300' },
    { nome: 'Tênis Profissional', preco: 299, categoria: 'tenis', img: 'https://via.placeholder.com/400x300' },
    { nome: 'Bolsa para Raquetes', preco: 199, categoria: 'acessorios', img: 'https://via.placeholder.com/400x300' }
];

function adicionarAoCarrinho(produto, preco) {
    carrinho.push({ produto, preco });
    atualizarCarrinho();
    alert(`${produto} adicionado ao carrinho!`);
}

function atualizarCarrinho() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    if (cartItems) cartItems.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        total += item.preco;
        if (cartItems) {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                ${item.produto} - R$ ${item.preco}
                <button class="btn btn-sm btn-danger" onclick="removerItem(${index})">Remover</button>
            `;
            cartItems.appendChild(li);
        }
    });

    if (cartCount) cartCount.innerText = carrinho.length;
    if (cartTotal) cartTotal.innerText = total.toFixed(2);
}

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
    } else {
        alert('Compra finalizada com sucesso!');
        carrinho = [];
        atualizarCarrinho();
        const modal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
        modal.hide();
    }
}

// -------- Filtro e renderização de produtos (somente na página produtos.html) --------
function carregarProdutos(categoria = 'todos') {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    productList.innerHTML = '';

    const produtosFiltrados = categoria === 'todos' 
        ? produtos 
        : produtos.filter(p => p.categoria === categoria);

    produtosFiltrados.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'col-md-4';
        div.innerHTML = `
            <div class="card h-100">
                <img src="${prod.img}" class="card-img-top" alt="${prod.nome}">
                <div class="card-body">
                    <h5 class="card-title">${prod.nome}</h5>
                    <p class="card-text">Produto da categoria ${prod.categoria}.</p>
                    <h6>R$ ${prod.preco}</h6>
                    <button class="btn btn-success w-100" onclick="adicionarAoCarrinho('${prod.nome}', ${prod.preco})">Comprar</button>
                </div>
            </div>
        `;
        productList.appendChild(div);
    });
}

function filtrarProdutos(categoria) {
    carregarProdutos(categoria);
}

// Carregar todos os produtos automaticamente ao abrir produtos.html
document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
});
