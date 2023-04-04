
var shoesApi = ' http://localhost:3000/shoes';
var total = parseFloat(localStorage.getItem("total"));

// start funtion
function start() {  
  getCourse(renderProduct)

}

start()


function storage(){
  
  localStorage.setItem("cart",document.querySelector('#list-carts').innerHTML)
  
}

// function update data from local 
function updateData(){
  var item = localStorage.getItem("cart")
  // item.querySelector('.empty').remove()
  if (item !== null){
    document.querySelector('#list-carts').innerHTML = item.innerHTML;
    document.querySelector('.cardTitleAmount').innerHTML = localStorage.getItem("total");
    let products = document.getElementsByClassName('product-item');
    let carts = document.getElementsByClassName('cart-item');
    for (var i=0; i < products.length; i++)
    {
      
      for (var j=0; j < carts.length; j++ )
      {
        var product = products[i].querySelector('.name').innerHTML;
        var cart = carts[j].querySelector('.cart-name').innerHTML;
        if (product.localeCompare(cart) === 0) 
          {
            products[i].querySelector('.btn-add').style.display='none';
            products[i].querySelector('.btn-added').style.display='block';
          }       
      }
    }
    }
    
    if (document.querySelector('.cart-item') === null) 
    {document.querySelector('#list-carts').innerHTML = 'Your cart is empty';}
    
}

function updateTotal(){
  document.querySelector('.cardTitleAmount').innerHTML = total.toFixed(2);
  localStorage.setItem("total", document.querySelector('.cardTitleAmount').innerHTML)
}


//function fetch API
function getCourse(callback) { 
  fetch(shoesApi) 
    .then(function(res) {
      return res.json();
    })
    .then(callback);
}

// view all product in data/shoes.json use json server (fake API)
function renderProduct(shoes) {
  var listShoeBlock = document.querySelector('#list-products');
  var htmls = shoes.map(function(shoe) {
    return `
      <div class="product-item-${shoe.id} product-item">
        <div class="image" style="background-color: ${shoe.color}"> 
          <img src="${shoe.image}" alt="photo-${shoe.id}">
        </div>
        <div class="name">${shoe.name}</div>
       
        <div class="description">${shoe.description}</div>
        <div class="bottom">
          <div class="price">${shoe.price}</div>
          <button class="btn-add" onClick="handleAddToCart(${shoe.id})">Add to cart</button>
          <div class="btn-added" style="display:none;">
            <img src="./assets/img/check.png" alt="checked" style="max-width: 120%;"> 
          </div>
        </div>
      </div> `;
  })
  listShoeBlock.innerHTML=htmls.join('');
}


// add a new item from product into cart
function handleAddToCart(id) {
  document.querySelector('#list-carts').innerHTML = null;
    const addProduct = document.querySelector(".product-item-"+id);
    var img = addProduct.querySelector('.image').cloneNode(true);
    // img.classList.add("left")
    html = document.createElement("div");
    html.className = "cart-item-"+id + " cart-item";
    var divLeft = document.createElement("div");
    var itemImg = document.createElement("div");
    divLeft.className = "left";
    img.classList.add('blockImg');
    itemImg.classList.add('itemImg');
    itemImg.style.backgroundColor = img.style.backgroundColor; 
    img.style.backgroundColor = null;
    
    itemImg.appendChild(img);
    
    divLeft.appendChild(itemImg);
    
    html.appendChild(divLeft);

    const tmp = document.createElement('div')
    tmp.classList.add('right');
    tmp.innerHTML =`
    <div class="cart-name">${addProduct.querySelector('.name').innerHTML}</div>
    <div class="cart-price">${addProduct.querySelector('.price').innerHTML}</div>
    <div class="action">
    <div class="actionCount">
      <button class="countBtn" onClick="upAmount(${id})">+</button>
      <div class="display-amount"> 1 </div>
      <button class="countBtn" onClick="downAmount(${id})">-</button> 
    </div>
    <div class="actionDelete">
    <button class="btnDelete" onClick="handleDeleteItem(${id})">
      <img src="./assets/img/trash.png" alt="trash" style="max-width: 120%;">
    </button>       
    </div>`;
    html.appendChild(tmp);
    addProduct.querySelector('.btn-add').style.display = 'none';
    addProduct.querySelector('.btn-added').style.display = 'block';
  
    total += parseFloat(addProduct.querySelector('.price').innerHTML);
    var placeAdd = document.querySelector('#list-carts');
    // if (placeAdd.querySelector('.cart-item')===null) 
    //   {
    //     placeAdd = html
    //   }
    //   else {
    //     placeAdd.append(html);
    //   }
    placeAdd.appendChild(html);
    updateTotal();
    storage();
   
}
  

// plus amount of item in cart
  function upAmount(id){
    var item = document.querySelector('.cart-item-'+id);
    var amount = parseInt(item.querySelector(".display-amount").innerHTML);
    amount++;
    item.querySelector(".display-amount").innerHTML = amount;
    total += parseFloat(item.querySelector('.cart-price').innerHTML);
    storage();
    updateTotal()
  }
  
  
// minus amount of item in cart 
  function downAmount(id){
    var item = document.querySelector('.cart-item-'+id);
    var amount = parseInt(item.querySelector(".display-amount").innerHTML);
    console.log(typeof(amount));
  
    if (amount == 1) {
      item.querySelector(".display-amount").innerHTML = '0';
      total -= parseFloat(item.querySelector('.cart-price').innerHTML);
      item.remove();
      if (document.querySelector('.cart-item')==null) 
        {document.querySelector('#list-carts').innerHTML = 'Your cart is empty';}
      changeStatus(id)
    } else {
      amount--;
      item.querySelector(".display-amount").innerHTML = amount;
      total -= parseFloat(item.querySelector('.cart-price').innerHTML);
    }
   
    storage();
    updateTotal();
  }
  

// delete item from cart
function handleDeleteItem(id){
    var item = document.querySelector('.cart-item-'+id);
    var amount = parseInt(item.querySelector(".display-amount").innerHTML);
    tmp = parseFloat(item.querySelector('.cart-price').innerHTML);
    total -= (tmp * amount);
    console.log(total);
    item.querySelector(".display-amount").innerHTML = '0';
    item.remove();
    if (document.querySelector('.cart-item')===null){
      document.querySelector('#list-carts').innerHTML = 'Your cart is empty';
    }
    storage();
    changeStatus(id);
    updateTotal();
  }
  

// change status if that item exist in cart
  function changeStatus(id){
    item = document.querySelector('.product-item-'+id);
    if (item.querySelector('.btn-add').style.display='none')
      {
        item.querySelector('.btn-add').style.display = 'block';
        item.querySelector('.btn-added').style.display = 'none';
      } 
      else if (item.querySelector('.btn-add').style.display = 'block')
      {
        item.querySelector('.btn-add').style.display = 'none';
        item.querySelector('.btn-added').style.display = 'block';
      }
  }

  
// check document ready for update data just add on this browser 
let stateCheck = setInterval(() => {
    if (document.readyState === 'complete') {
      clearInterval(stateCheck);
      // document ready
      updateData();
    }
  }, 100);