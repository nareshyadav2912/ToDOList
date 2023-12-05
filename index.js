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
const status=document.getElementById("status")
var totalCount=0;
var remCount=0;
add.addEventListener("click", function () {
    let val = ele.value;
    if(val==""){
        alert("Not Allowed to give empty task!!.")
    }
    else{
        push(lstDb, val)
        clearInput();
        totalCount+=1;
    }
    status.innerHTML="Current Pending tasks are: "+totalCount;
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
        shlist.innerHTML="Great Job!! Get back and Add More."
        totalCount=0;
        //remCount=0;
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
        remCount+=1;
        if(remCount-1==totalCount){
            status.innerHTML="Great You have Completed All."
            remCount=0;
        }
        else{
            status.innerHTML="You have Completed "+remCount;
        }
    })
    shlist.append(newEle)
    //shlist.innerHTML+=`<li>${val}</li>`
}
