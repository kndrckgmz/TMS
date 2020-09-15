let addcart = document.querySelectorAll(".product-btn");

function itemValue() {
  let x = document.querySelector(".product-btn").value;
  x = parseInt(x);
  a = 1 + x - 1;
  return a;
}

let items = [
  {
    name: "Rosé Crop Top",
    tag: "rose",
    price: "21",
    inCart: 0,
  },
  {
    name: "Nasa SweatShirt",
    tag: "nasa",
    price: "29",
    inCart: 0,
  },
  {
    name: "Good Vibes",
    tag: "vibes",
    price: "15",
    inCart: 0,
  },
  {
    name: "Just Black Cap",
    tag: "black",
    price: "10",
    inCart: 0,
  },
  {
    name: "Sleepy Dino Cap",
    tag: "dino",
    price: "13",
    inCart: 0,
  },
];

for (let i = 0; i < addcart.length; i++) {
  addcart[i].addEventListener("click", () => {
    t = itemValue(a);
    cartqty(items[t]);
    totalCost(items[t]);
  });
}

function cartcheck() {
  let cartnum = sessionStorage.getItem("cartqty");
  let cartbtn = document.querySelector(".cart-icon");
  let login = document.querySelector(".cart-icon2");
  let panel = document.querySelector(".panel");
  if (cartnum > 0 && cartbtn && panel) {
    cartbtn.innerHTML = `
        <a href="cart.html">
        <span class="cart-num">0</span>
        <img src="cart.png" alt="Cart" height="30px" />
        </a>
          `;
    panel.innerHTML = `
        <a href="#" class="closebtn" onclick="closeNav()">&times;</a>
        <a href="homepage.html">Home</a>
        <a href="catalouge.html">Catalouge</a>
        <a href="cart.html">Cart</a>
        <a href="about.html">About</a>
        `;

    document.querySelector(".cart-icon span").textContent = cartnum;
  } else if (cartnum <= 0 && cartbtn && panel) {
    cartbtn.innerHTML = `
        <a href="emptycart.html">
        <span class="cart-num">0</span>
        <img src="cart.png" alt="Cart" height="30px" />
        </a>
        `;
    panel.innerHTML = `
        <a href="#" class="closebtn" onclick="closeNav()">&times;</a>
        <a href="homepage.html">Home</a>
        <a href="catalouge.html">Catalouge</a>
        <a href="emptycart.html">Cart</a>
        <a href="about.html">About</a>
        `;
    document.querySelector(".cart-icon span").textContent = cartnum;
  } else if (login) {
    login.innerHTML = `
        <a href="#">
        <span class="cart-num"></span>
        <img src="cart.png" alt="Cart" height="30px" />
        </a>
        `;
    document.querySelector(".cart-icon2 span").textContent = cartnum;
  }
}

function cartqty(item) {
  let cartnum = sessionStorage.getItem("cartqty");

  cartnum = parseInt(cartnum);

  if (cartnum) {
    sessionStorage.setItem("cartqty", cartnum + 1);
    document.querySelector(".cart-icon span").textContent = cartnum + 1;
  } else {
    sessionStorage.setItem("cartqty", 1);
    document.querySelector(".cart-icon span").textContent = 1;
  }
  setItem(item);
}

function setItem(item) {
  let cartItems = sessionStorage.getItem("itemInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[item.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [item.tag]: item,
      };
    }
    cartItems[item.tag].inCart += 1;
  } else {
    item.inCart = 1;
    cartItems = {
      [item.tag]: item,
    };
  }

  sessionStorage.setItem("itemInCart", JSON.stringify(cartItems));
}

function totalCost(amount) {
  let cartCost = sessionStorage.getItem("cost");
  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    add = parseInt(amount.price);
    var tot = cartCost + add;
    sessionStorage.setItem("cost", tot);
  } else {
    sessionStorage.setItem("cost", amount.price);
  }
}

function loadcart() {
  let cartItems = sessionStorage.getItem("itemInCart");
  cartItems = JSON.parse(cartItems);
  let cart = document.querySelector(".cart-content");
  if (cart && cartItems != null) {
    cart.innerHTML = ``;
    Object.values(cartItems).map((item) => {
      cart.innerHTML += `
      <div class="cart-item">
      <a class="cart-img">
        <img 
            src="${item.tag}.png" 
            alt="Item" 
            height="150px"
        />
      </a>
      <div class="cart-id"> 
        ${item.name}
      </div>
      <br>
      <div class="cart-qty">
        <label for="quantity">Qty:</label>
        ${item.inCart}
      </div>
      <br>
      <div class="cart-price"> 
      $${item.price}.00
      </div>
      <br>
      <button class="remove-btn" onclick="refresh()">Remove</button>
      </div>`;

      let billing = document.querySelector(".break-up");
      billing.innerHTML += `
      <hr class="hr-bill">
      <div class="cart-name"> 
      ${item.name}
      </div>
      <div class="amount">  
      $${item.price * item.inCart}.00
      </div>
      `;
    });
  }
}

function loadamount() {
  let cartCost = sessionStorage.getItem("cost");
  cartItems = JSON.parse(cartCost);
  let bill = document.querySelector(".btn");
  if (bill && cartItems != null) {
    bill.innerHTML = `
      <hr class="hr-bill">
      <div class="name">Total</div>
      <div class="amount">$${cartCost}.00</div>
      <button class="checkout" onclick="end()">
        <a href="emptycart.html" style="text-decoration: none; color: #2e2e2e">Proceed To Checkout</a>
      </button>
      `;
  }
}

cartcheck();
loadcart();
loadamount();
itemValue();
