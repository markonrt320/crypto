let currencyValue = document.querySelector('#currencySelect');
let cryptoValue = document.querySelector('#cryptoSelect');
let displayData = document.querySelector('#data');
let quantity = document.querySelector('#quantity');
const apiKey = 'CG-f2EiKtLUu2hM8Ed7gwgoNEuK'
var money;
var coin;
var currency;
var currencySymbol;
let valute = { "usd": "$",
               "idr": "Rp",
               "twd": "NT$",
               "eur": "€",
               "krw": "₩",
               "jpy": "¥",
               "rub": "₽",
               "cny": "¥"
}

async function generate(){
    if(quantity.value > 0 && quantity.value< 5000){
        quantity.style.background = "white";
        const jsonData = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoValue.value}&vs_currencies=${currencyValue.value}&${apiKey}`);
        const data = await jsonData.json();
        Object.entries(data).forEach(([key, value]) => {
            coin = key;
            Object.entries(value).forEach(([keys, value])=>{
                valuta = keys;
                money = value.toFixed(2)
            })
        });
        Object.entries(valute).forEach(([key, value]) => {
            if(key==valuta){
                currencySymbol= value;
            }
            
        });
        const formattedNumber = new Intl.NumberFormat('en-US').format(money*quantity.value);//formatiranje broja X 25004.14 -> 25,004.14
        displayData.innerHTML = `<div>
                                        <p class="displayedNum">${quantity.value} ${coin}s are worth <span>${currencySymbol}</span>${formattedNumber}</p>
                                 </div>`
        
    }
    else if(quantity.value == ''){
        quantity.style.background = "red";
        displayData.innerHTML = `<div>
                                        <p>Error: Number is empty</p>
                                 </div>`
    }
    else{
        quantity.style.background = "red";
        displayData.innerHTML = `<div>
                                        <p>Error: Number must be greater than 0 and less than 5000.</p>
                                 </div>`
    }
    
}
function roundInputValue(input) {
    input.value = Math.round(input.value);
}