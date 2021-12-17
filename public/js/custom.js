console.log("hiii")
var mainArea = document.getElementById("mainArea");

var width = mainArea.clientWidth;
var height = mainArea.clientHeight;

const canvasArea = document.getElementById("customPizzaCanvas");
canvasArea.width = width;
canvasArea.height = height;
const canvas_ctx = canvasArea.getContext("2d");
console.log("hiii")
width = height;
height = height;
var Bwidth = height + height / 7;
var Bheight = height + height / 7;

var crustArray = new Array(
  "/img/crust/new hand tossed.png",
  "/img/crust/wheat thin crust.png",
  "/img/crust/cheese burst crust.png",
  "/img/crust/fresh pan pizza.png"
);

var crustPriceArray = new Array(99, 149, 199, 139);

var crustNameArray = new Array(
  "new hand tossed",
  "wheat thin crust",
  "cheese burst crust",
  "fresh pan pizza"
);

var souceArray = new Array("img/sauce/Pizza Sauce.png");
var soucePriceArray = [9];
var souceNameArray = new Array("Pizza Sauce");

var cheeseArray = new Array(
  "img/cheese/Mozzarella Cheese.png",
  "img/cheese/Cheddar Cheese.png"
);

var cheesePriceArray = new Array(24, 19);
var cheeseNameArray = new Array("Mozzarella Cheese", "Cheddar Cheese");

var toppingArray = new Array(
  "img/topping/Crisp Capsicum.png",
  "img/topping/Onion.png",
  "img/topping/Fresh Tomato.png",
  "img/topping/Corn.png",
  "img/topping/Grilled Mushrooms.png",
  "img/topping/Jalapeno.png",
  "img/topping/Paneer.png",
  "img/topping/Black Olive.png"
);

var toppingPriceArray = new Array(59, 59, 59, 59, 59, 59, 59, 59);
var toppingNameArray = new Array(
  "Crisp Capsicum",
  "Onion",
  "Fresh Tomato",
  "Corn",
  "Grilled Mushrooms",
  "Jalapeno",
  "Paneer",
  "Black Olive"
);

const priceLabel = document.getElementById("priceLabel");
var crustPrice = crustPriceArray[0];
var soucePrice = soucePriceArray[0];
var cheesePrice = cheesePriceArray[0];
var toppingPrice = toppingPriceArray[0];

var displayedToppingArray = new Array();
var displayedToppingArrayBack = new Array();

for (let i = 0; i < toppingArray.length; i++) {
  displayedToppingArray[i] = new Image();
  displayedToppingArrayBack[i] = new Image();
  displayedToppingArrayBack[i].src = toppingArray[i];
  if (i == 0) {
    displayedToppingArray[i].src = toppingArray[i];
  }
  displayedToppingArray[i].addEventListener(
    "load",
    function () {
      drawPizzaLayers();
    },
    false
  );
}

var crustImage = new Image();
crustImage.width = 50;
crustImage.height = 50;
crustImage.src = crustArray[0];
crustImage.addEventListener(
  "load",
  function () {
    drawPizzaLayers();
  },
  false
);

var SouceImage = new Image();
SouceImage.width = 50;
SouceImage.height = 50;
SouceImage.src = souceArray[0];
SouceImage.addEventListener(
  "load",
  function () {
    drawPizzaLayers();
  },
  false
);

var cheeseImage = new Image();
cheeseImage.width = 50;
cheeseImage.height = 50;
cheeseImage.src = cheeseArray[0];
cheeseImage.addEventListener(
  "load",
  function () {
    drawPizzaLayers();
  },
  false
);

var toppingImage = new Image();
toppingImage.width = 50;
toppingImage.height = 50;
toppingImage.src = toppingArray[0];
toppingImage.addEventListener(
  "load",
  function () {
    drawPizzaLayers();
  },
  false
);

var btnPrev = document.getElementById("btnPrev");
var btnNext = document.getElementById("btnNext");

addPizzaCrust();
drawPizzaLayers();

function addPizzaCrust() {
  addelementToContainer(
    ...crustArray,
    ...crustNameArray,
    ...crustPriceArray,
    drawPizzaCrust
  );
  btnPrev.onclick = function () {};
  btnNext.onclick = function () {
    removeElementsfromContainer();
    addPizzaSouce();
  };
}

function addPizzaSouce() {
  addelementToContainer(
    ...souceArray,
    ...souceNameArray,
    ...soucePriceArray,
    drawPizzaSouce
  );
  btnPrev.onclick = function () {
    removeElementsfromContainer();
    addPizzaCrust();
  };
  btnNext.onclick = function () {
    removeElementsfromContainer();
    addPizzaCheese();
  };
}

function addPizzaCheese() {
  addelementToContainer(
    ...cheeseArray,
    ...cheeseNameArray,
    ...cheesePriceArray,
    drawPizzaCheese
  );
  btnPrev.onclick = function () {
    removeElementsfromContainer();
    addPizzaSouce();
  };
  btnNext.onclick = function () {
    removeElementsfromContainer();
    addPizzaTopping();
  };
}

function addPizzaTopping() {
  addelementToContainer(
    ...toppingArray,
    ...toppingNameArray,
    ...toppingPriceArray,
    drawPizzaTopping
  );
  btnPrev.onclick = function () {
    removeElementsfromContainer();
    addPizzaCheese();
  };
  btnNext.onclick = function () {
    // removeElementsfromContainer();
    alert("Well done! you have ordered custom Pizza");
  };
}

function addelementToContainer(...elementArray) {
  let container = document.getElementById("cpelement_ul");
  const len = (elementArray.length - 1) / 3;
  for (let i = 0; i < len; i++) {
    let list = document.createElement("li");
    list.classList.add("cpelement_li");
    let image = document.createElement("IMG");
    image.classList.add("content-img");
    image.src = elementArray[i];
    image.onclick = function () {
      elementArray[elementArray.length - 1](image, i);
    };
    list.appendChild(image);
    let itemDetail = document.createElement("h5");
    itemDetail.classList.add("content_price");
    itemDetail.classList.add("card-body");
    let itemName = document.createTextNode(elementArray[i + len]);
    let priceTagSymbol = document.createTextNode("₹: ");
    let priceTagText = document.createTextNode(elementArray[i + len * 2]);
    const lineBreak = document.createElement("br");
    itemDetail.appendChild(itemName);
    itemDetail.appendChild(lineBreak);
    itemDetail.appendChild(priceTagSymbol);
    itemDetail.appendChild(priceTagText);
    list.appendChild(itemDetail);
    container.appendChild(list);
  }
}

function drawPizzaLayers() {
  canvas_ctx.clearRect(0, 0, canvasArea.width, canvasArea.height);
  canvas_ctx.drawImage(
    crustImage,
    canvasArea.width / 2 - Bwidth / 2,
    canvasArea.height / 2 - Bheight / 2,
    Bwidth,
    Bheight
  );
  canvas_ctx.drawImage(
    SouceImage,
    canvasArea.width / 2 - width / 2,
    canvasArea.height / 2 - height / 2,
    width,
    height
  );
  canvas_ctx.drawImage(
    cheeseImage,
    canvasArea.width / 2 - width / 2,
    canvasArea.height / 2 - height / 2,
    width,
    height
  );

  for (let i = 0; i < toppingArray.length; i++) {
    canvas_ctx.drawImage(
      displayedToppingArray[i],
      canvasArea.width / 2 - width / 2,
      canvasArea.height / 2 - height / 2,
      width,
      height
    );
  }
}

function drawPizzaCrust(image, i) {
  console.log(i);
  crustImage.src = image.src;
  crustPrice = crustPriceArray[i];
  updateTotalPrice();
}

function drawPizzaSouce(image, i) {
  console.log(i);
  SouceImage.src = image.src;
  drawPizzaLayer(image);
  soucePrice = soucePriceArray[i];
  updateTotalPrice();
}

function drawPizzaCheese(image, i) {
  console.log(i);
  cheeseImage.src = image.src;
  drawPizzaLayer(image);
  cheesePrice = cheesePriceArray[i];
  updateTotalPrice();
}

function drawPizzaTopping(image, i) {
  console.log(i);
  if (displayedToppingArray[i].src == image.src) {
    displayedToppingArray[i].src = "img/topping/null.png";
    toppingPrice -= toppingPriceArray[i];
  } else {
    displayedToppingArray[i].src = displayedToppingArrayBack[i].src;
    toppingPrice += toppingPriceArray[i];
  }
  updateTotalPrice();
}

function removeElementsfromContainer() {
  let container = document.getElementById("cpelement_ul");
  container.innerHTML = "";
}

function updateTotalPrice() {
  var totalPrice = 0;

  totalPrice += crustPrice;
  totalPrice += soucePrice;
  totalPrice += cheesePrice;
  totalPrice += toppingPrice;

  //   totalPrice = 5;

  let priceLabel = document.getElementById("priceLabel");
  let priceText = document.createTextNode(totalPrice);
  console.log(crustPrice);
  console.log(soucePrice);
  console.log(cheesePrice);
  console.log(toppingPrice);
  console.log(totalPrice);
  priceLabel.innerHTML = "Total price: ₹ ";
  priceLabel.appendChild(priceText);
}

updateTotalPrice();

addToCart();

window.addEventListener("resize", function () {
  location.reload();
});