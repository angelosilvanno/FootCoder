document.querySelectorAll('.btn-add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    const productName = this.closest('.card').querySelector('.card-title').textContent;
    const productPrice = this.closest('.card').querySelector('.card-text').textContent;

    const url = `carrinho.html?nome=${encodeURIComponent(productName)}&preco=${encodeURIComponent(productPrice)}`;

    window.location.href = url;
  });
});

document.getElementById("current-year").textContent = new Date().getFullYear();