const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for ( let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("Option");  //ek element me country code store kr rhe aur us element ka nam newOption 
        newOption.innerText = currCode;                    
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);   // append the currCode to the select 
    }
    select.addEventListener("change",(evt) => {    /*evt is an object*/
        updateFlag(evt.target);

    });
}

const updateExchangeRate = async() => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === ""  || amtVal <1){
        amtVal = 1;
        amount.value = "1";
    }
    //console.log(fromCurr.value,toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`; 
    // now fetching the currencyVAlue from the BASE_URL , aur inhe lowercase me convert krna hai becoz yeh upper caseme hai codes.js me 
    // aur isse readable formate me bhi convert krna hai 
    
    let response = await  fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    //console.log(rate);
    
    //console.log(response);
    //console.log(amtVal);
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    

}

const updateFlag = (element) => {                             // element me change hote hi flag update ho jaye
    let currCode = element.value;                             // extracting currency code from element
    let countryCode = countryList[currCode];                  // extracting countrycode from countrlylist
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");     //now we are accesing the parent through our element
    img.src = newSrc;
};


btn.addEventListener("click",(evt) => {
    evt.preventDefault();   /* initially form submission ke baad url par kuch na jaye aur abhi form submit na ho  */
    updateExchangeRate();
});

window.addEventListener("load", () => {    /*& ultimately we are adding event listener on the window for loading the page*/
    updateExchangeRate();
});
