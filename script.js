/* eslint-disable no-console */

// Seleção de elementos do DOM
const hamburguer = document.querySelector('.hamburguer');
const nav = document.querySelector('.nav');
const navlist = document.querySelector('.nav-list');
const cartModal = document.getElementById('cart-modal');
const closeCartButton = document.getElementById('close-cart');
const cartLink = document.querySelector('a[href*="#carrinho"]');
const cartItemsList = document.getElementById('cart-itens');
const totalPriceElement = document.getElementById('total-price');
const cartCountElement = document.getElementById('cart-co');
const checkoutButton = document.getElementById('checkout');

// Array para armazenar itens do carrinho
let cartItems = [];

// Verificação inicial para garantir que os elementos existem
if (!hamburguer || !nav || !navlist || !cartModal || !closeCartButton || !cartLink || !cartItemsList || !totalPriceElement || !cartCountElement) {
    console.error('Um ou mais elementos do DOM não foram encontrados.');
}

navlist.addEventListener("click", () => nav.classList.toggle("active"));
hamburguer.addEventListener("click", () => nav.classList.toggle("active"));

// Função para abrir o carrinho
function openCart(event) {
    event.preventDefault();
    if (cartModal) {
        cartModal.style.display = 'flex';
        updateCart();
    }
}

// Função para fechar o carrinho
function closeCart() {
    if (cartModal) {
        cartModal.style.display = 'none';
    }
}

// Função para atualizar o carrinho
function updateCart() {
    if (!cartItemsList || !totalPriceElement || !cartCountElement) return;

    cartItemsList.innerHTML = '';
    let total = 0;

    if (cartItems.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = 'Seu carrinho está vazio.';
        emptyMessage.classList.add('cart-empty');
        cartItemsList.appendChild(emptyMessage);
    } else {
        cartItems.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">R$ ${item.price.toFixed(2)}</span>
                <button class="remove-item" data-index="${index}">Remover</button>
            `;
            cartItemsList.appendChild(li);
            total += item.price;
        });
    }

    totalPriceElement.textContent = total.toFixed(2);
    cartCountElement.textContent = cartItems.length;

    // Adicionar eventos de remoção
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.index, 10);
            cartItems.splice(index, 1);
            saveCart();
            updateCart();
        });
    });

    saveCart();
}

// Função para salvar o carrinho no localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Função para carregar o carrinho do localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCart();
    }
}

// Evento para abrir o carrinho ao clicar no link
if (cartLink) {
    cartLink.addEventListener('click', openCart);
}

// Evento para fechar o carrinho ao clicar no botão de fechar
if (closeCartButton) {
    closeCartButton.addEventListener('click', closeCart);
}

// Fechar o carrinho ao clicar fora da modal
window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        closeCart();
    }
});

// Adicionar itens ao carrinho
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product');
        if (!product) return;

        const item = {
            id: product.dataset.id,
            name: product.dataset.name,
            price: parseFloat(product.dataset.price)
        };

        cartItems.push(item);
        saveCart();
        updateCart();
        openCart({ preventDefault: () => {} }); // Abre a modal após adicionar
    });
});

// Evento para finalizar compras
if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
        if (cartItems.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        alert('Compra finalizada! (Funcionalidade de checkout não implementada)');
        cartItems = [];
        saveCart();
        updateCart();
        closeCart();
    });
}

// Função para enviar e-mail via mailto
function setupContactForm() {
    const sendToGmailButton = document.getElementById('sendToGmail');
    const emailInput = document.querySelector('.contact-form input[type="email"]');
    const messageTextarea = document.querySelector('.contact-form textarea');
    const recipientEmail = 'contato@seucafeaqui.com.br';

    if (!sendToGmailButton || !emailInput || !messageTextarea) {
        console.error('Elementos do formulário de contato não encontrados.');
        return;
    }

    sendToGmailButton.addEventListener('click', () => {
        if (!emailInput.value || !messageTextarea.value) {
            alert('Por favor, preencha o e-mail e a mensagem.');
            return;
        }

        const subject = encodeURIComponent('Mensagem do Site Seu Café Aqui');
        const body = encodeURIComponent(`Mensagem:\n${messageTextarea.value}\n\nMeu E-mail: ${emailInput.value}`);
        const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

        try {
            window.location.href = mailtoLink;
        } catch (error) {
            console.error('Erro ao abrir o cliente de e-mail:', error);
            alert('Não foi possível abrir o cliente de e-mail. Tente novamente.');
        }
    });
}

// Inicialização após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    setupContactForm();
    loadCart();
});

const myObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting === true){
                entry.target.classList.add('show')
            }
        })
    }
)

const elements = document.querySelectorAll('.hidden')

elements.forEach( (element) => myObserver.observe(element))