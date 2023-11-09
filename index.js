import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://addtocart-2a54f-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const lstDb = ref(database, "shoppingList")
console.log(app)
const ele = document.getElementById("input");
const add = document.getElementById("btn");     
const shlist = document.getElementById("list")
add.addEventListener("click", function () {
    let val = ele.value;
    push(lstDb, val)
    clearInput();
})

onValue(lstDb, function (snapshot) {
    if (snapshot.exists()) {
        let arr = Object.entries(snapshot.val())
        shlist.innerHTML = ""
        for (let i = 0; i < arr.length; i++) {
            let currItem = arr[i];
            let currid = currItem[0];
            let currVal = currItem[1];
            addItemLst(currItem);
        }
    }
    else{
        shlist.innerHTML="Oooo Noo,Your cart is Empty!Add it."
    }

})
function clearInput() {
    ele.value = ""
}
function addItemLst(val) {
    let itemId = val[0];
    let itemVal = val[1];
    let newEle = document.createElement("li")
    newEle.textContent = itemVal;

    newEle.addEventListener("click", function () {
        let loc = ref(database, `shoppingList/${itemId}`)
        remove(loc);
    })
    shlist.append(newEle)
    //shlist.innerHTML+=`<li>${val}</li>`
}