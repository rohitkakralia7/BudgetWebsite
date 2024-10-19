let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("amount-of-expence");
const checkAmountBtn = document.getElementById("check-amount");
const totalAmountBtn = document.getElementById("total-amount-button");
const productTitle = document.getElementById("name-of-expence");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance_amount");
const date = document.querySelector("#date-of-expense");
const list = document.getElementById("list");

let tempAmount = 0;

// Function to update local storage
const updateLocalStorage = () => {
    const expenseData = {
        tempAmount,
        expenditureValue: expenditureValue.innerText,
        balanceValue: balanceValue.innerText,
        expenses: list.innerHTML
    };
    localStorage.setItem("expenseTracker", JSON.stringify(expenseData));
};

// Function to retrieve data from local storage on page load
const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem("expenseTracker");
    if (savedData) {
        const { tempAmount: savedTempAmount, expenditureValue: savedExpenditure, balanceValue: savedBalance, expenses } = JSON.parse(savedData);
        
        tempAmount = parseFloat(savedTempAmount);
        amount.innerHTML = tempAmount;
        expenditureValue.innerText = savedExpenditure;
        balanceValue.innerText = savedBalance;
        list.innerHTML = expenses;

        // Add event listeners to delete buttons after reloading the list
        document.querySelectorAll(".fa-trash-can").forEach(trashBtn => {
            trashBtn.addEventListener("click", deleteExpense);
        });
    }
};

// Call the function on page load
window.addEventListener("DOMContentLoaded", loadFromLocalStorage);

// Add total amount
totalAmountBtn.addEventListener("click", () => {
    tempAmount = totalAmount.value;
    amount.innerHTML = tempAmount;
    balanceValue.innerText = tempAmount - expenditureValue.innerText;
    updateLocalStorage(); // Save updated values to local storage
    totalAmount.value = "";
});

// Function to delete expense
const deleteExpense = (e) => {
    const listItem = e.target.parentElement;
    const expense = parseFloat(listItem.children[1].innerText.slice(1)); // Remove the '₹' sign before parsing
    listItem.remove();

    const newExpenditure = parseFloat(expenditureValue.innerText) - expense;
    expenditureValue.innerText = newExpenditure;
    balanceValue.innerText = tempAmount - newExpenditure;
    
    updateLocalStorage(); // Save updated values to local storage
};

// Check entered amount and add the expense
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
            <span>₹${cost}</span>
            <span>${dateOfExpense}</span>
            <i class="fa-solid fa-trash-can" style="color: #A0937D;"></i>
        `;
        if (dateOfExpense === "") {
            listItem.children[2].innerText = "Date";
        }

        list.appendChild(listItem);

        listItem.querySelector(".fa-trash-can").addEventListener("click", deleteExpense);

        productTitle.value = "";
        userAmount.value = "";
        date.value = "";

        updateLocalStorage(); // Save updated values to local storage
    } else {
        alert("Please enter valid product name and amount.");
    }
});

