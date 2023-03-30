let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

// add to cart 

let carts = document.querySelectorAll('.add-btn');

let products = [
    {
        name: 'Baby Boy Onesie',
        tag: 'BabyBoyOnesie',
        price:  48,
        inCart: 0
    },
    {
      name: 'Baby Girl Onesie',
      tag: 'BabyGirlOnesie',
      price: 49,
      inCart: 0
    },
    {
      name: 'Coordinates',
      tag: 'Coordinates',
      price:  50,
      inCart: 0
    },
    {
      name: 'Boys Shirt',
      tag: 'BoysShirt',
      price:  51,
      inCart: 0
    },
    {
    name: 'Boys Shoes',
    tag: 'BoysShoes',
    price: 52,
    inCart: 0
    },
    {
      name: 'Girls Shoes',
      tag: 'Girls Shoes',
      price: 53,
      inCart: 0
    },
  ];

for (let i=0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i])
  })
}

function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');

  if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
  }

}

function cartNumbers(product) {

  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers=parseInt (productNumbers);

  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;
  }
  
  setItems (product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
        console.log("my product is", cartItems);

        if (cartItems != null) {

          if (cartItems[product.tag] == undefined) {
              cartItems = {
                ...cartItems, 
                [product.tag]: product
              }
          }
          cartItems[product.tag].inCart += 1;
          
        } else {
          product.inCart = 1;
          cartItems = {
            [product.tag]: product
        }
      }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    
    let cartCost = localStorage.getItem('totalCost');

    console.log("Cartcost is", cartCost);

    if (cartCost != null) {
      cartCost = parseInt(cartCost);
      localStorage.setItem("totalCost", cartCost + 
      product.price);
    } else {
      localStorage.setItem("totalCost", product.price);
    }

    
}

onLoadCartNumbers();

