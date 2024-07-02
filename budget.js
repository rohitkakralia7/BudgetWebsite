let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("amount-of-expence");
const checkAmountBtn = document.getElementById("check-amount");
const totalAmountBtn = document.getElementById("total-amount-button");
const productTitle = document.getElementById("name-of-expence");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance_amount");
const date = document.querySelector("#date-of-expense");
const list  = document.getElementById("list");

let tempAmount = 0;
totalAmountBtn.addEventListener("click", () => {
    tempAmount = totalAmount.value;
    amount.innerHTML = tempAmount;
    balanceValue.innerText = tempAmount - expenditureValue.innerText;
    // document.querySelector(".slider").style.width = "100%";
    // document.querySelector(".slider").style.backgroundColor = "blue";
    // document.querySelector(".percentage").innerText = "100%";
      totalAmount.value = "";
    // if(balanceValue.innerText === 0){
    //     document.querySelector(".percentage").innerText = "0%";
    //     document.querySelector(".slider").style.backgroundColor = "red";
    // }
});

checkAmountBtn.addEventListener("click", () => {
    const product = productTitle.value;
    const cost = parseFloat(userAmount.value);
    const dateOfExpense = date.value;
    if (product !== "" && !isNaN(cost) && cost > 0) {
        
        const totalExpenditure = parseFloat(expenditureValue.innerText) + cost;
        expenditureValue.innerText = totalExpenditure;

        balanceValue.innerText = tempAmount - totalExpenditure;
        
        const listItem = document.createElement("div");
        listItem.classList.add("list-item");
        
        listItem.innerHTML = `
            <span>${product}</span>
            <span>${cost}</span>
            <span>${dateOfExpense}</span>
            <i class="fa-solid fa-trash-can" style="color: #6060f9;"></i>
        `;
        
        list.appendChild(listItem);
        listItem.children[0].style.fontSize = "20px";
       
        listItem.querySelector(".fa-trash-can").addEventListener("click", () => {
            const expense = parseFloat(listItem.children[1].innerText);
            listItem.remove();

            const newExpenditure = parseFloat(expenditureValue.innerText) - expense;
            expenditureValue.innerText = newExpenditure;
            balanceValue.innerText = tempAmount - newExpenditure;
           
        });

        productTitle.value = "";
        userAmount.value = "";
        dateOfExpense.value = "";
        
    } else {
        alert("Please enter valid product name and amount.");
    }

});
