const home = document.getElementById('home')
const cartButton = document.getElementById('font')
const electronics = document.getElementById('electronics')
const jewelry = document.getElementById('jewelry')
const mensClothing = document.getElementById('mens-clothing')
const womensClothing = document.getElementById('womens-clothing')
const display = document.getElementById('display')
const cartTable = document.getElementById('table-body')
const subTotal = document.getElementById('subtotal')
const purchaseTax = document.getElementById('tax')
const purchaseShipping = document.getElementById('shipping')
const purchaseTotal= document.getElementById('total')
const purchaseButton = document.getElementById('purchase')
const clearButton = document.getElementById('clear-cart')
const URL = 'https://fakestoreapi.com/products/'
const  cart = []
// api fetch
const fakeStore =  async (endpoint) => {
let result = await fetch(URL + endpoint)
let data = await result.json()
console.log(data);
displayCards(data)
}
// function to add items to cart
function submitToCart (item) {

    let matchingIndex = cart.findIndex(cartItem => cartItem.id === item.id)

    matchingIndex === -1
    ?
    cart.push(item)
    :
    cart[matchingIndex].quantity += 1
}

function clearCart() {
    cart.length = 0
    purchaseButton.innerHTML = 'Purchase'
}

function displayCart () {

    cartTable.innerHTML = ''

     let subtotal = 0
     let tax = 0
     let shipping = 0
     let total = 0 

    if (cart.length !== 0) {

        cart.forEach(item => {

            subtotal += item.cost * item.quantity

            let newRow = document.createElement('tr')
            cartTable.appendChild(newRow)

            let itemQuantity = document.createElement('td')
            itemQuantity.innerHTML = item.quantity
            cartTable.appendChild(itemQuantity)

            let itemDescription = document.createElement('td')
            itemDescription.innerHTML = `${item.title} at $${item.cost.toFixed(2)} ea`
            cartTable.appendChild(itemDescription)

            let itemPrice = document.createElement('td')
            itemPrice.innerHTML = (item.cost *  item.quantity).toFixed(2)
            cartTable.appendChild(itemPrice)
        })

        tax = subtotal * 0.07
        shipping = subtotal * 0.1
        total = subtotal + tax + shipping

        purchaseButton.innerHTML = `Purchase for $${total.toFixed(2)}`
    }
        subTotal.innerHTML = `$${subtotal.toFixed(2)}`
        purchaseTax.innerHTML = `$${tax.toFixed(2)}`
        purchaseShipping.innerHTML = `$${shipping.toFixed(2)}`
        purchaseTotal.innerHTML = `$${total.toFixed(2)}`
}

// 1. Create Element 2. Edit Element 3. Append Element 
let displayCards = function(data) {
    // row
    let row = document.createElement('div')
    row.className = ('row')
    display.appendChild(row)

    data.forEach(product => {
         
        // display.innerHTML = ''
        // column
        let cardColumn = document.createElement('div')
        cardColumn.className = 'col-3'
        row.appendChild(cardColumn)
        //container
        let cardContainer = document.createElement('div')
        cardContainer.className = 'card'
        cardColumn.appendChild(cardContainer)
        // picture
        let cardImage = document.createElement('img')
        cardImage.src = product.image
        cardContainer.appendChild(cardImage)
        // body
        let cardBody = document.createElement('div')
        cardBody.className = 'card-body'
        cardContainer.appendChild(cardBody)
        // product title
        let cardTitle = document.createElement('h5')
        cardTitle.className = 'card-title'
        cardTitle.innerHTML = product.title
        cardBody.appendChild(cardTitle)
        // Accordion Description
        let accordionContainer1 = document.createElement('div')
        accordionContainer1.className = 'accordion'
        accordionContainer1.id = 'accordionExample'
        cardBody.appendChild(accordionContainer1)
        
        let accordionItem1 = document.createElement('div')
        accordionItem1.className = 'accordion-item'
        accordionContainer1.appendChild(accordionItem1)

        let accordionHeader1 = document.createElement('h2')
        accordionHeader1.className = 'accordion-header'
        accordionHeader1.id = 'headingOne'
        accordionItem1.appendChild(accordionHeader1)

        let accordionButton1 = document.createElement('button')
        accordionButton1.className = 'accordion-button'
        accordionButton1.type = 'button'
        accordionButton1.setAttribute('data-bs-toggle', 'collapse')
        accordionButton1.setAttribute('data-bs-target', `#collapseOne${product.id}`)
        accordionButton1.setAttribute('aria-expanded', 'true')
        accordionButton1.setAttribute('aria-controls', 'collapseOne')
        accordionButton1.innerHTML = 'Description'
        accordionHeader1.appendChild(accordionButton1)

        let accordionCollapse1 = document.createElement('div')
        accordionCollapse1.id = `collapseOne${product.id}`
        accordionCollapse1.className = 'accordion-collapse collapse'
        accordionCollapse1.setAttribute('aria-labelledby', 'headingOne')
        accordionCollapse1.setAttribute('data-bs-parent', 'accordionExample')
        accordionItem1.appendChild(accordionCollapse1)

        let accordionBody1 = document.createElement('div')
        accordionBody1.className = 'accordion-body'
        accordionBody1.innerHTML = product.description
        accordionCollapse1.appendChild(accordionBody1)

        let accordionItem2 = document.createElement('div')
        accordionItem2.className = 'accordion-item'
        accordionContainer1.appendChild(accordionItem2)

        let accordionHeader2 = document.createElement('h2')
        accordionHeader2.className = 'accordion-header'
        accordionHeader2.id = 'headingTwo'
        accordionItem2.appendChild(accordionHeader2)

        let accordionButton2 = document.createElement('button')
        accordionButton2.className = 'accordion-button collapsed'
        accordionButton2.type = 'button'
        accordionButton2.setAttribute('data-bs-toggle', 'collapse')
        accordionButton2.setAttribute('data-bs-target', `#collapseTwo${product.id}`)
        accordionButton2.setAttribute('aria-expanded', 'false')
        accordionButton2.setAttribute('aria-controls', 'collapseTwo')
        accordionButton2.innerHTML = 'Price'
        accordionHeader2.appendChild(accordionButton2)

        let accordionCollapse2 = document.createElement('div')
        accordionCollapse2.id = `collapseTwo${product.id}`
        accordionCollapse2.className = 'accordion-collapse collapse'
        accordionCollapse2.setAttribute('aria-labelledby', 'headingTwo')
        accordionCollapse2.setAttribute('data-bs-parent', 'accordionExample')
        accordionItem2.appendChild(accordionCollapse2)

        let accordionBody2 = document.createElement('div')
        accordionBody2.className = 'accordion-body'
        accordionBody2.innerHTML = `$${product.price.toFixed(2)}`
        accordionCollapse2.appendChild(accordionBody2)

        let addToCartButton = document.createElement('button')
        addToCartButton.type = 'button'
        addToCartButton.className = 'btn btn-dark'
        addToCartButton.innerHTML = 'Add To Cart'
        addToCartButton.style.paddingLeft = '100px'
        addToCartButton.style.paddingRight = '100px'
        addToCartButton.style.fontSize = '11px' 
        addToCartButton.onclick = function() {
            let cartItem = {
                id: product.id,
                title: product.title,
                cost: product.price,
                quantity: 1
            }
            submitToCart(cartItem)
            console.log(cart)
        }
        cardBody.appendChild(addToCartButton)
    })
}

home.addEventListener('click', e => {
    e.preventDefault()
    if (e) display.firstChild.remove()
    fakeStore('')
})

cartButton.addEventListener('click', e =>{
    e.preventDefault()
    displayCart()
})

clearButton.addEventListener('click', e => {
    e.preventDefault
    clearCart()
    displayCart()
    alert('Cart has been emptied.')
})

purchaseButton.addEventListener('click', e => {
    e.preventDefault()
    clearCart()
    displayCart()
    alert('Thank you for your Purchase!')
})

electronics.addEventListener('click', e => {
e.preventDefault()
if (e) display.firstChild.remove()
fakeStore('/category/electronics')
})

jewelry.addEventListener('click', e => {
    e.preventDefault()
    if (e) display.firstChild.remove()
    fakeStore('/category/jewelery')
    })

mensClothing.addEventListener('click', e => {
    e.preventDefault()
    if (e) display.firstChild.remove()
    fakeStore(`/category/men's%20clothing?sort=asc`)
    })

womensClothing.addEventListener('click', e => {
    e.preventDefault()
    if (e) display.firstChild.remove()
    fakeStore(`/category/women's%20clothing?sort=asc`)
    })

window.onload = ( e => {
    fakeStore('')
})