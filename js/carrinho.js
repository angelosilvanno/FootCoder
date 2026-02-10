document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('nome');
    const productPrice = urlParams.get('preco');

    if (productName && productPrice) {
      const cartItems = document.getElementById("cart-items");
      const cartCount = document.getElementById("cart-count");
      const cartTotal = document.getElementById("cart-total");

      const newItem = document.createElement("li");
      newItem.classList.add("list-group-item", "d-flex", "justify-content-between", "lh-sm");
      newItem.innerHTML = `
        <div>
          <h6 class="my-0">${productName}</h6>
          <small class="text-muted">${productPrice}</small>
        </div>
        <span class="text-muted"></span>
      `;

      cartItems.appendChild(newItem);

      let itemCount = parseInt(cartCount.textContent);
      itemCount++;
      cartCount.textContent = itemCount;

      let totalPrice = parseFloat(cartTotal.textContent.replace("R$ ", "").replace(",", "."));
      totalPrice += parseFloat(productPrice.replace("Preço: R$ ", "").replace(",", "."));
      cartTotal.textContent = `R$ ${totalPrice.toFixed(2)}`;
    }
});