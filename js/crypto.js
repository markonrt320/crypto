let formattedPercentage;
let formattedMarket;
let formattedCurrent;
var elementID;
let key = 'CG-f2EiKtLUu2hM8Ed7gwgoNEuK';
const newRow = document.querySelector('#displayedBody')
const firstApiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h&locale=en&precision=2&${key}`;
const secondApiUrl = 'https://api.npoint.io/f7407874920c7a95063c';

// Function to fetch data from the first API
const fetchDataFromFirstApi = () => {
  return fetch(firstApiUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return null;
      }
    })
    .catch(error => {
      console.error('Error fetching data from the first API:', error);
      return null;
    });
};

const fetchDataFromSecondApi = () => {
  return fetch(secondApiUrl)
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data from the second API:', error);
      return null;
    });
};


fetchDataFromFirstApi()
  .then(dataFromFirstApi => {
    if (dataFromFirstApi) {
        dataFromFirstApi.forEach((element,elNum) => {

            formattedPercentage = new Intl.NumberFormat('en-US').format(element.price_change_percentage_24h);//formatiranje broja X 25004.14 -> 25,004.14  
            formattedMarket = new Intl.NumberFormat('en-US').format(element.market_cap);//formatiranje broja X 25004.14 -> 25,004.14  
            formattedCurrent = new Intl.NumberFormat('en-US').format(element.current_price.toFixed(2));//formatiranje broja X 25004.14 -> 25,004.14  
            elementID= element.id;
            newRow.innerHTML += `<tr>
              <td>${elNum+1}</td>
              <td class="redirrect" onclick="redirrect(this)" id="${elementID}"><img src="${element.image}" alt="">${element.name}</td>
              <td>$${formattedCurrent}</td>
              <td>${formattedPercentage}%</td>
              <td>$${formattedMarket}</td>
              </tr>`;
          })
    } else {
      console.log('data from second api')
      return fetchDataFromSecondApi();
    }
  })
  .then(dataFromSecondApi => {
    if (dataFromSecondApi){
        dataFromSecondApi.forEach((element,elNum) => {

            formattedPercentage = new Intl.NumberFormat('en-US').format(element.price_change_percentage_24h);//formatiranje broja X 25004.14 -> 25,004.14  
            formattedMarket = new Intl.NumberFormat('en-US').format(element.market_cap);//formatiranje broja X 25004.14 -> 25,004.14  
            formattedCurrent = new Intl.NumberFormat('en-US').format(element.current_price.toFixed(2));//formatiranje broja X 25004.14 -> 25,004.14  
            
            elementID= element.id;
            newRow.innerHTML += `<tr>
              <td>${elNum+1}</td>
              <td class="redirrect" onclick="redirrect(this)" id="${elementID}"><img src="${element.image}" alt="">${element.name}</td>
              <td>$${formattedCurrent}</td>
              <td>${formattedPercentage}%</td>
              <td>$${formattedMarket}</td>
              </tr>`;
          })
    }
  });

function redirrect(element){
    const coinID = element.id;
    const coinPageUrl = `coin_page.html?id=${coinID}`;
    window.location.href = coinPageUrl;
}