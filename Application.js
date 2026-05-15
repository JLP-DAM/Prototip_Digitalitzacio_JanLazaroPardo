const Products = [
  { Id: 1, Name: "Pomes", Price: 3, Image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce" },
  { Id: 3, Name: "Maduixes", Price: 5, Image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6" },
  { Id: 4, Name: "Tomàquets", Price: 4, Image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337" },
  { Id: 5, Name: "Patates", Price: 5, Image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655" },
  { Id: 6, Name: "Llet", Price: 3, Image: "https://images.unsplash.com/photo-1550583724-b2692b85b150" },
  { Id: 7, Name: "Ous", Price: 5, Image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03" },
]

const ProductsContainer = document.getElementById("Products")
const CartItemsContainer = document.getElementById("CartItems")
const TotalElement = document.getElementById("Total")
const CartCount = document.getElementById("CartCount")

const Modal = document.getElementById("CheckoutModal")
const CheckoutForm = document.getElementById("CheckoutForm")

let Cart = []

function RenderProducts() {
  ProductsContainer.innerHTML = ""

  Products.forEach(Product => {
    const El = document.createElement("div")
    El.classList.add("Product")

    El.innerHTML = `
      <img src="${Product.Image}" />
      <div class="ProductInfo">
        <h3>${Product.Name}</h3>
        <p class="Price">€${Product.Price}</p>
        <button onclick="AddToCart(${Product.Id})">Afegir</button>
      </div>
    `

    ProductsContainer.appendChild(El)
  })
}

function AddToCart(Id) {
  const Existing = Cart.find(Item => Item.Id == Id)

  if (Existing) {
    Existing.Quantity++
  } else {
    const Product = Products.find(Product => Product.Id == Id)
    Cart.push({ ...Product, Quantity: 1 })
  }

  UpdateCart()
}

function IncreaseQuantity(Id) {
  Cart = Cart.map(Item =>
    Item.Id == Id
      ? { ...Item, Quantity: Item.Quantity + 1 }
      : Item
  )

  UpdateCart()
}

function DecreaseQuantity(Id) {
  Cart = Cart
    .map(Item =>
      Item.Id == Id
        ? { ...Item, Quantity: Item.Quantity - 1 }
        : Item
    )
    .filter(Item => Item.Quantity > 0)

  UpdateCart()
}

function RemoveFromCart(Id) {
  Cart = Cart.filter(Item => Item.Id !== Id)
  UpdateCart()
}

function UpdateCart() {
  CartItemsContainer.innerHTML = ""

  let Total = 0
  let Items = 0

  Cart.forEach(Item => {
    Total = Total + (Item.Price * Item.Quantity)
    Items = Items + (Item.Quantity)

    const CartItem = document.createElement("div")
    CartItem.classList.add("CartItem")

    CartItem.innerHTML = `
      <div>
        <strong>${Item.Name}</strong>
        <p>€${Item.Price} x ${Item.Quantity}</p>

        <div class="QuantityControls">
          <button onclick="DecreaseQuantity(${Item.Id})">−</button>
          <span>${Item.Quantity}</span>
          <button onclick="IncreaseQuantity(${Item.Id})">+</button>
        </div>
      </div>

      <button onclick="RemoveFromCart(${Item.Id})" class="RemoveButton">X</button>
    `

    CartItemsContainer.appendChild(CartItem)
  })

  TotalElement.textContent = Total
  CartCount.textContent = Items
}

function OpenCheckout() {
  if (Cart.length == 0) {
    alert("Carret buit")
    return
  }
  
  Modal.style.display = "flex"
}

function CloseCheckout() {
  Modal.style.display = "none"
}

CheckoutForm.addEventListener("submit", (Event) => {
  alert("Comanda realitzada!")

  Cart = []
  UpdateCart()
  CloseCheckout()
  CheckoutForm.reset()
})

window.addEventListener("click", (Event) => {
  if (Event.target == Modal) CloseCheckout()
})

RenderProducts()