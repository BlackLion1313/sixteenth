"use strict";

const itemDetails = [];

function showCategories() {
    const container = document.querySelector('.categories');

    for (let i = 0; i < data.length; i++) {
        const elem = document.createElement('div');
        elem.textContent = data[i].name;
        elem.setAttribute('data-category', i);
        elem.addEventListener('click', showProducts);
        container.appendChild(elem);
    }
}


// handler of click on categories
function showProducts(event) {
    const categoryIndex = event.target.getAttribute('data-category');
    const products = data[categoryIndex].products;
    const container = document.querySelector('.products');
    container.innerHTML = '';


    for (let i = 0; i < products.length; i++) {
        const elem = document.createElement('div');
        elem.textContent = products[i].name;
        elem.setAttribute('data-product', i);
        elem.setAttribute('data-category', categoryIndex);
        elem.addEventListener('click', showDetails);
        container.appendChild(elem);
    }
}


function showDetails(event) {
    const categoryIndex = event.target.getAttribute('data-category');
    const productIndex = event.target.getAttribute('data-product');
    const detailsInfo = data[categoryIndex].products[productIndex];
    const details = document.querySelector('.details');
    const products = document.querySelector('.products');
    details.innerHTML = '';
    for (let key in detailsInfo) {
        itemDetails.push(detailsInfo[key])
        details.innerHTML += `<p>${key}: ${detailsInfo[key]}</p>`
    }


    const button = document.createElement('button');
    button.textContent = 'buy'
    details.appendChild(button);
    button.addEventListener('click', () => {
        showForm();
        products.innerHTML = ''
        details.innerHTML = ''
    })

    document.getElementById('myForm').style.display = 'none';

    function showForm() {
        document.getElementById('myForm').style.display = 'block';
    }
}


document.getElementById('submitBtn').addEventListener('click', function () {
    const formElements = document.querySelector('form[name="mainForm"]').elements;
    const fullName = formElements.fullName.value;
    const town = formElements.town.value;
    const delivery = formElements.delivery.value;
    const card = formElements.card.value;
    const quantityItems = formElements.amount.value;
    const comment = formElements.comment.value;
    document.getElementById('checking').style.display = 'none';

    function alertInForm() {
        document.getElementById('checking').style.display = 'block'
    }

    if (fullName.length <= 0 || town.length <= 0 || delivery.length <= 0 || quantityItems.length <= 0) {
        alertInForm()

    } else {
        showContent()
    }


    function showContent() {
        const sum = quantityItems * parseInt(itemDetails[1])
        document.write(`<div><p>Full name: ${fullName}</p></div>`, `<div><p>Town: ${town}</p></div>`, `<div><p>Nova Poshta Point: ${delivery}</p></div>`, `<div><p>Your payment Method by: ${card}</p></div>`, `<div><p>Quantity of your goods: ${quantityItems}</p></div>`, comment && `<div><p>Comment:  ${comment}</p></div>`, `<div><p>Item: ${itemDetails[0]}</p></div>`, `<div><p>Price: ${sum}</p></div>`, `<div><p>Description: ${itemDetails[2]}</p></div>`,)

        setAllItems({item: itemDetails[0], description: itemDetails[2], sum: sum})
    }


})
showCategories();

function setAllItems(order) {
    const oldOrder = JSON.parse(localStorage.getItem('orders'))
    console.log(oldOrder)
    localStorage.setItem('orders', JSON.stringify([...oldOrder, order]))
}

const dataItems = document.getElementById('dataItems')
document.getElementById('myOrders').addEventListener('click', () => {
    const orders = JSON.parse(localStorage.getItem('orders'))
    console.log(orders)
    console.log(dataItems)
    for (let i = 0; i < orders.length; i++) {
        dataItems.innerHTML += `<span>${orders[i].item}</span><br>`
    }
})


