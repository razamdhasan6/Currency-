const URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const inputEl = document.querySelector('.inputCont');
const imgEl = document.querySelectorAll('.image');
const btnEl = document.querySelector('button');
const fromEl = document.querySelector('.from');
const toEl = document.querySelector('.to');
const dropdownEl = document.querySelectorAll('.dropdown select');
const result = document.querySelector('.result');

for(let dropdownEls of dropdownEl){
    for (currCode in countryList) {
    let newOpction = document.createElement('option');
    newOpction.textContent = currCode;
    newOpction.value = currCode;
    dropdownEls.append(newOpction);
    fromEl.value = "USD"
    toEl.value="INR"
    };
    dropdownEls.addEventListener('change', (evt) => {
        updateFlag(evt.target);
    })
};

const updateFlag = (element) => {
    let currCode = element.value;
    let coutryCode = countryList[currCode];
    const newSrc = `https://flagsapi.com/${coutryCode}/flat/64.png`
    let image = element.parentElement.querySelector('img')
    image.src = newSrc;
}
fromEl.value = "USD";
toEl.value="INR"
updateFlag(fromEl)
updateFlag(toEl)

const getExchangeRate = async () => {
    let amount = parseFloat(inputEl.value);
    const fromCurrency = fromEl.value;
    const toCurrency = toEl.value;

    if (amount <= 0 || isNaN(amount)) {
        amount = 1;
        inputEl.value = "1"
    }
    const newURL = `${URL}/${fromCurrency.toLowerCase()}.json`;
    const response = await fetch(newURL);
    const data = await response.json();
    const rate = data[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
    finalAmount = (rate * amount).toFixed(2);
    result.textContent = `${amount} ${fromCurrency} = ${finalAmount} ${toCurrency}`
    
};
getExchangeRate()



btnEl.addEventListener('click', (el) => {
    getExchangeRate()
})
window.addEventListener('load',()=> {
    getExchangeRate()
})
fromEl.addEventListener('click', () => {
    getExchangeRate()
})
toEl.addEventListener('click', () => {
    getExchangeRate()
})