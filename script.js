let shop = document.getElementById("shop");



let basket = JSON.parse(localStorage.getItem("data")) || [];


let generatiShop = () => {
    return  (shop.innerHTML = shopItemsData.map((x) => {
        let {id, price, img} = x;
        let search = basket.find((x)=> x.id === id) || []
        return `<div id=product-id-${id} class="item">
        <img src=${img} alt="no Ring found">
        <div class="details">
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${search.item === undefined? 0: search.item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
    </div>`

    }).join(""));
    
       
            
    
};

generatiShop();

let increment = (id) => {
    let selectItem = id;
    let search = basket.find((x) => x.id === selectItem.id )

    if(search === undefined){
        basket.push({
            id: selectItem.id,
            item: 1
        });

    }
    else{
        search.item +=1;
    }
    localStorage.setItem("data", JSON.stringify(basket));
  
   
    update(selectItem.id);
    
}

let decrement = (id) => {
    let selectItem = id;
    let search = basket.find((x) => x.id === selectItem.id );

    if(search === undefined) return;



    else if(search.item === 0) return;
    else{
        search.item -=1;
    }
    update(selectItem.id);
    basket = basket.filter((x)=> x.itrm !== 0 );
    
  

    localStorage.setItem("data", JSON.stringify(basket));
}



let update = (id) => {
    let search = basket.find((x)=> x.id === id)
    
    document.getElementById(id).innerHTML = search.item;
    calculate();
}

let calculate = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=> x.item).reduce((x,y)=> x+y,0)   //0-default number, calculation should start from 0.
}

calculate();