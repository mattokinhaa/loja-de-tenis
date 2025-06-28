let carrinho = [];

function adicionarAoCarrinho(produto, preco) {
    carrinho.push({ produto, preco });
    atualizarCarrinho();
    alert(`${produto} adicionado ao carrinho!`);
}

function atualizarCarrinho() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        total += item.preco;
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${item.produto} - R$ ${item.preco}
            <button class="btn btn-sm btn-danger" onclick="removerItem(${index})">Remover</button>
        `;
        cartItems.appendChild(li);
    });

    cartCount.innerText = carrinho.length;
    cartTotal.innerText = total.toFixed(2);
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
