document.addEventListener("DOMContentLoaded", function() {
  const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');

  updateCartCount();

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();

      const card = this.closest('.card');
      const productName = card.querySelector('.card-title').textContent.trim();
      const productPrice = card.querySelector('.card-text span').textContent.trim();

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push({ nome: productName, preco: productPrice });
      localStorage.setItem('cart', JSON.stringify(cart));

      updateCartCount();
    });
  });

  if (window.location.pathname.includes('carrinho.html')) {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length > 0) {
      cartItemsContainer.innerHTML = "";
      let total = 0;

      cart.forEach((item, index) => {
        const newItem = document.createElement("li");
        newItem.className = "list-group-item d-flex justify-content-between align-items-center p-3 mb-2 shadow-sm border-0";
        newItem.style.borderRadius = "10px";
        
        newItem.innerHTML = `
          <div>
            <h6 class="my-0 fw-bold">${item.nome}</h6>
            <small class="text-primary fw-bold">${item.preco}</small>
          </div>
          <button class="btn btn-sm btn-outline-danger rounded-pill px-3" onclick="removeItem(${index})">Remover</button>
        `;
        cartItemsContainer.appendChild(newItem);

        let priceValue = parseFloat(item.preco.replace("R$ ", "").replace(".", "").replace(",", "."));
        total += priceValue;
      });

      cartCount.textContent = cart.length;
      cartTotal.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
    } else {
      cartItemsContainer.innerHTML = '<li class="list-group-item text-center text-muted p-4 border-0">Seu carrinho está vazio.</li>';
    }
  }

  const payBtn = document.getElementById('pay-btn');
  if (payBtn) {
    payBtn.addEventListener('click', function() {
      const paymentMethodSelect = document.getElementById('paymentMethod');
      const paymentMethod = paymentMethodSelect.value;

      if (!paymentMethod) {
        paymentMethodSelect.classList.add('is-invalid');
        paymentMethodSelect.focus();
        return;
      }

      const routes = {
        'pix': 'pagamento_pix.html',
        'creditCard': 'pagamento_cartao_credito.html',
        'debitCard': 'pagamento_cartao_debito.html',
        'boleto': 'pagamento_boleto.html'
      };

      if (routes[paymentMethod]) {
        window.location.href = routes[paymentMethod];
      }
    });
  }

  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartBadge = document.getElementById('cart-count');
  if (cartBadge) {
    cartBadge.textContent = cart.length;
  }
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.reload();
}