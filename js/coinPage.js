let cryptoNavBtn = document.querySelector('.crypto')
let openHam = document.querySelector('#openHam');
let closeHam = document.querySelector('#closeHam');
let nav_middle = document.querySelector('.nav-middle');
const loader = document.querySelector("#loading");
const api2 = 'CG-4mvFgJGYBf1jK2VfFpcWjx4m'

const hamburgerEvent = (navigation, close, open) => {
    nav_middle.style.display = navigation;
    closeHam.style.display = close;
    openHam.style.display = open;
};

var arrowPercentage;
openHam.addEventListener('click', () => hamburgerEvent("flex", "block", "none"));
closeHam.addEventListener('click', () => hamburgerEvent("none", "none", "block"));

function displayLoading() {
    loader.classList.add("display");
    loader.style.marginTop = "15rem";
    loader.style.marginBottom = "5rem";
    setTimeout(() => {
        loader.classList.remove("display");
    }, 25000);
}

function hideLoading() {
    loader.classList.remove("display");
    loader.style.marginTop = "0px";
    loader.style.marginBottom = "0px";
}
const coinContainer = document.querySelector('#coin-container')

const apiKey = 'CG-f2EiKtLUu2hM8Ed7gwgoNEuK';

const showData = document.querySelector('#coin-container')
    displayLoading()
    function getQueryParams() {
        let value;
        const queryString = window.location.search.substring(1);
        value = queryString.split('=')[1];
            return value;
    }
    try{
        async function displayChart() {
            const queryParams = getQueryParams();
            const chartData = await fetch(`https://api.coingecko.com/api/v3/coins/${queryParams}/market_chart?vs_currency=usd&days=30&interval=daily&precision=2&${api2}`);
            const chart = await chartData.json();
            const myChart = document.querySelector('#myChart')
            new Chart(myChart, {
                type: 'line',
                data: {
                  labels: chart.prices.map(value => moment(value[0]).format("MMM Do YY")),
                  datasets: [{
                    label: `${queryParams}`,
                    data: chart.prices.map(value => value[1]),
                    borderWidth: 1,
                    borderColor: 'rgb(212, 109, 246)'
                  }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                }
            });
        }
    
        displayChart();
    }
    catch(error){
        console.log(error)
    }

    try{
        async function displayForwardedData() {
            const queryParams = getQueryParams();
            
            const jsonData = await fetch(`https://api.coingecko.com/api/v3/coins/${queryParams}?localization=en&${apiKey}`);
            const data = await jsonData.json();

            let imgSrc = data.image.large;
            let coinName = data.localization.en
            let currentValue = new Intl.NumberFormat('en-US').format(data.market_data.current_price.usd);
            let growth = data.market_data.price_change_percentage_24h.toFixed(2);
            let marketCap = new Intl.NumberFormat('en-US').format(data.market_data.market_cap.usd);
            let marketCapTop = new Intl.NumberFormat('en-US').format(data.market_data.high_24h.usd);
            let marketCapBottom = new Intl.NumberFormat('en-US').format(data.market_data.low_24h.usd);
            if(growth>0){
                
                arrow = '&#11165;'
            }
            else if(growth <=0) {
                arrow = '&#11167;'
            }
            
            coinContainer.innerHTML = `
                    <div class="topPart">
                        <div class="first">
                            <img src="${imgSrc}" alt="coinImg" class="topPartImg">
                            <h2 class="coinHeading">${coinName}</h2>
                        </div>                     
                        <div class="second">
                            <h4 class="currentValue">$${currentValue}</h4>
                            <h4 id="percentage">
                                ${arrow}<span class="arrow">${growth}%</span> 
                            </h4>
                        </div>
                    </div>
                    <div class="bottomPart">
                        <ul>
                            <li class="coinListItem"><p>Market Cap:</p> <p>$${marketCap}</p></li>
                            <li class="coinListItem"><p>Market Cap Rank:</p> <p>#${data.market_cap_rank}</p></li>
                            <li class="coinListItem"><p>24h Top price:</p> <p>$${marketCapTop}</p></li>
                            <li class="coinListItem"><p>24h Bottom price:</p> <p>$${marketCapBottom}</p></li>
                        </ul>
                        <p class="description">${data.description.en}</p>
                    </div>
            `
            hideLoading();
            let percentageDiv = document.querySelector('.arrow').innerText;
            if(parseFloat(percentageDiv)>0){
                colorGreen();
            }
            else{
                colorRed();
            }
            
        }
displayForwardedData();

    }
    catch(error){
        console.log(error)
        coinContainer.innerHTML = `
            <div id="coin-container">
                <h2>Error, problem with API</h2>
            </div>`        
    }
function colorGreen(){
    let percentageColor = document.querySelector('#percentage')
    percentageColor.classList.add('green')
}
function colorRed(){
    let percentageColor = document.querySelector('#percentage')
    percentageColor.classList.add('red')
}

