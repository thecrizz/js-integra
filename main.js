const products = document.querySelector(".products-container");
const btnAdd = document.querySelector(".btn-add");
const categories = document.querySelector(".categories");
const btnCategory = document.querySelectorAll(".category");
const rutinaContainer = document.querySelector(".rutinas");
const carrito = document.querySelector(".carrito");
const cartMenu = document.querySelector(".cart-menu");
const closeCart = document.querySelector(".close-cart");
const cartContainer = document.querySelector(".products-cart");
const handler = document.querySelector(".item-handler");
const subtotal = document.querySelector(".subtotal-price");
const total = document.querySelector(".total-price");
const envioContainer = document.querySelector(".envio-price");
const overlay = document.querySelector(".overlay");
const menuHamburguesa = document.querySelector(".menu-hamburguesa");
const navMenu = document.querySelector(".nav-menu");
const navUl = document.querySelector(".nav-ul");
const contador = document.querySelector(".contador");
const addProductMsg = document.querySelector(".addProduct-msg");
const btnBuy = document.querySelector(".btn-buy");
const spnVaciar = document.querySelector(".spn-vaciar");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const setToLocalStorage = (card) => {
  localStorage.setItem("cart", JSON.stringify(card));
};

const render = (product) => {
  const { id, name, price, img, color, description, category, envio } = product;

  return `
        <div class="product">
          <img
						src=${img}
						alt=${name}
          />
          <div class="product-infoContainer">
            <div class="product-price-color">
              <p>Color:</p>
              <p>Precio:</p>
            </div>
            <div class="product-price-color">
							<p class="color">${color}</p>
							<p class="price">$${price}</p>
            </div>
          </div>
          <div class="product-bot">
            <button
              class="btn-add"
							data-id=${id}
							data-name=${name}
							data-price=${price}
							data-img=${img}
              data-description=${description}
							data-category=${category}
							data-envio=${envio}
            >Agregar al carrito</button>
          </div>
        </div>
	`;
};

const renderSupplements = (product) => {
  const { id, name, price, img, type, description, category, envio } = product;

  return `
        <div class="product">
          <img
						src=${img}
						alt=${name}
          />
          <div class="product-infoContainer">
            <div class="product-price-color">
              <p>Tipo:</p>
              <p>Precio:</p>
            </div>
            <div class="product-price-color">
							<p class="supplementsType">${type}</p>
							<p class="price">$${price}</p>
            </div>
          </div>
          <div class="product-bot">
            <button
              class="btn-add"
							data-id=${id}
							data-name=${name}
							data-price=${price}
							data-img=${img}
              data-description=${description}
							data-description=${category}
							data-envio=${envio}
            >Agregar al carrito</button>
          </div>
        </div>
	`;
};

const renderRoutines = (rutina) => {
  const { id, name, img, price, duration, description, category, envio } =
    rutina;

  return `
        <div class="rutina">
          <h3>${name}</h3>
          <img
            class="rutina-img"
            src=${img}
            alt=${name}
          />
          <div class="rutina-info">
            <div class="info">
              <p>Duracion:</p>
              <p>Precio:</p>
            </div>
            <div class="info">
              <p>${duration}</p>
              <p>$${price}</p>
            </div>
          </div>
          <div class="btn-bot">
            <button
              class="btn-add"
              data-id=${id}
              data-name=${name}
              data-price=${price}
              data-img=${img}
              data-description=${description}
							data-category=${category}
							data-envio=${envio}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
	`;
};

const renderCart = (product) => {
  const { id, name, img, price, description, quantity } = product;
  return `
        <div class="cart-item">
          <img
            class="cart-img"
            src=${img}
            alt=${name}
          />
          <div class="item-info">
            <h3 class="item-tittle">${name}</h3>
            <p class="item-description">${description}</p>
            <span class="item-price">$${price}</span>
          </div>
          <div class="item-handler">
            <span class="quantity-handler down" data-id=${id}>-</span>
            <span class="item-quantity">${quantity}</span>
            <span class="quantity-handler up" data-id=${id}>+</span>
          </div>
        </div>
	`;
};

const toggleMenu = () => {
  navMenu.classList.toggle("toggle-menu");
  if (!cartMenu.classList.contains("toggle-cart")) {
    cartMenu.classList.add("toggle-cart");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

const toggleCart = () => {
  cartMenu.classList.toggle("toggle-cart");
  if (!navMenu.classList.contains("toggle-menu")) {
    navMenu.classList.add("toggle-menu");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

const renderCartProduct = () => {
  if (!cart.length) {
    cartContainer.innerHTML = `<p class="empty-cart">El carrito esta vacio</p>`;
    return;
  }
  cartContainer.innerHTML = cart.map(renderCart).join("");
};

const closeOnClick = () => {
  navMenu.classList.add("toggle-menu");
  cartMenu.classList.add("toggle-cart");
  overlay.classList.add("show-overlay");
};

const closeOnScroll = () => {
	navMenu.classList.add("toggle-menu")
  cartMenu.classList.add("toggle-cart");
  overlay.classList.add("show-overlay");
};



const renderRoutine = () => {
  const productList = productData.filter(
    (rutina) => rutina.category === "rutinas"
  );
  rutinaContainer.innerHTML = productList.map(renderRoutines).join("");
};

const changeFilterState = (category) => {
  const categories = [...btnCategory];
  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== category) {
      categoryBtn.classList.remove("active");
      return;
    }
    categoryBtn.classList.add("active");
  });
};

const renderFilteredProduct = (category) => {
  const productList = productData.filter(
    (producto) => producto.category === category
  );
  if (category !== "suplementos") {
    products.innerHTML = productList.map(render).join("");
    return;
  }
  products.innerHTML = productList.map(renderSupplements).join("");
};

const renderDefaultProduct = () => {
  const productList = productData.filter(
    (producto) => producto.category === "remeras"
  );
  products.innerHTML = productList.map(render).join("");
};

const applyFilter = (e) => {
  const selectedCategory = e.target.dataset.category;
  renderFilteredProduct(selectedCategory);
  changeFilterState(selectedCategory);
};

const checkCartState = () => {
  setToLocalStorage(cart);
  renderCartProduct(cart);
  showSubTotal();
  showTotal();
  showEnvio();
  counter();
};

const createCartProduct = (producto) => {
  cart = [...cart, { ...producto, quantity: 1 }];
};

const productsData = (id, name, img, price, description, category, envio) => {
  return { id, name, img, price, description, category, envio };
};

const isExistingCartProduct = (producto) => {
  return cart.find((item) => item.id === producto.id);
};

const addUnit = (producto) => {
  cart = cart.map((cartProduct) => {
    return cartProduct.id === producto.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct;
  });
};

const confimationMsg = () => {
  addProductMsg.classList.remove("show-msg");

  setTimeout(function () {
    addProductMsg.classList.add("show-msg");
  }, 2000);
};

const addProduct = (e) => {
  if (!e.target.classList.contains("btn-add")) return;
  const { id, name, img, price, description, category, envio } =
    e.target.dataset;
  const product = productsData(
    id,
    name,
    img,
    price,
    description,
    category,
    envio
  );
  if (isExistingCartProduct(product)) {
    addUnit(product);
    confimationMsg();
  } else {
    createCartProduct(product);
    confimationMsg();
  }
  checkCartState();
};

const substractUnit = (existingItem) => {
  cart = cart.map((cartItem) => {
    return cartItem.id === existingItem.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem;
  });
};

const removeProductFromCart = (existingItem) => {
  cart = cart.filter((producto) => producto.id !== existingItem.id);
  checkCartState();
};

const handleMinus = (id) => {
  const cartItem = cart.find((producto) => producto.id === id);

  if (cartItem.quantity === 1) {
    if (window.confirm("Desea eliminar el producto del carrito?")) {
      removeProductFromCart(cartItem);
      showEnvio();
      showTotal();
    }
    return;
  }
  substractUnit(cartItem);
};

const handlePlus = (id) => {
  const cartProduct = cart.find((producto) => producto.id === id);
  addUnit(cartProduct);
};

const handleQuantity = (e) => {
  if (!e.target.dataset.id) return;
  if (e.target.classList.contains("down")) {
    handleMinus(e.target.dataset.id);
  } else if (e.target.classList.contains("up")) {
    handlePlus(e.target.dataset.id);
  }
  checkCartState();
};

const getSubtotal = () => {
  return cart.reduce(
    (acc, cur) => acc + Number(cur.price) * Number(cur.quantity),
    0
  );
};

const getEnvio = () => {
  const acumulador = cart.reduce((acc, cur) => acc + Number(cur.envio), 0);
  if (acumulador > 2000) {
    return 2000;
  }
  return acumulador;
};

const getTotal = () => {
  const total = getEnvio() + getSubtotal();
  return total;
};

const showTotal = () => {
  if (!cart.length) {
    total.innerHTML = "$ 0.00";
    return;
  }
  total.innerHTML = `$ ${getTotal().toFixed(2)}`;
};

const showSubTotal = () => {
  subtotal.innerHTML = `$ ${getSubtotal().toFixed(2)}`;
};

const showEnvio = () => {
  if (!cart.length) {
    envioContainer.innerHTML = "$ 0.00";
    return;
  }
  envioContainer.innerHTML = `$ ${getEnvio().toFixed(2)}`;
};

const hideNavMenu = (e) => {
  if (!e.target.classList.contains("nav-li")) return;
  navMenu.classList.add("toggle-menu");
  overlay.classList.add("show-overlay");
};

const counter = () => {
  if (!cart.length) {
    contador.textContent = "";
    return;
  }
  const quantity = cart.reduce((acc, cur) => acc + Number(cur.quantity), 0);
  contador.textContent = quantity;
};

const buyCart = () => {
	if(!cart.length) return;
  alert("Compra completada");
  cart = [];
  checkCartState();
};

const vaciarCarrito = () => {
	if(!cart.length) return;
  if (!window.confirm("Desea vaciar el carrito?")) {
    return;
  }
  cart = [];
  checkCartState();
};

function init() {
  categories.addEventListener("click", applyFilter);
  window.addEventListener("DOMContentLoaded", renderDefaultProduct);
  window.addEventListener("DOMContentLoaded", renderRoutine);
  window.addEventListener("DOMContentLoaded", checkCartState);
  carrito.addEventListener("click", toggleCart);
  closeCart.addEventListener("click", toggleCart);
  overlay.addEventListener("click", closeOnClick);
  window.addEventListener("scroll", closeOnScroll);
  products.addEventListener("click", addProduct);
  rutinaContainer.addEventListener("click", addProduct);
  cartContainer.addEventListener("click", handleQuantity);
  menuHamburguesa.addEventListener("click", toggleMenu);
  navUl.addEventListener("click", hideNavMenu);
  btnBuy.addEventListener("click", buyCart);
  spnVaciar.addEventListener("click", vaciarCarrito);
}

init();
