const leftDeck = document.querySelector(".card-deck")
const rightOrder = document.querySelector("#order")
const modal = document.querySelector(".modal")
let orderItem = []
let amount = 0


leftDeck.addEventListener('click', event => {
    adjustQty(event.target)
    addToOrder(event.target)
})

rightOrder.addEventListener('click', event => {

    deleteOrderCard(event.target)

    // renderOrderData(event.target)

})

modal.addEventListener('click', event => {

    getCustData(event.target)

})



// 點擊+-後觸發
function adjustQty(target) {
    let qty = target.parentElement.children[1]
    let number = Number(qty.innerText)

    if (target.innerText === '+') {
        number += 1
        qty.innerText = number
    }
    if (target.innerText === '-') {
        if (number > 0) {
            number -= 1
            qty.innerText = number
        }
    }

}



//點擊加入菜單後觸發
function addToOrder(target) {
    if (target.innerText === '加入菜單') {
        selectFood = target.parentElement
        foodId = selectFood.children[0].id
        foodListId = foodList.findIndex(item => item.id === foodId)
        qty = Number(selectFood.children[3].children[1].innerText)
        const targetOrderItem = orderItem.find(item => item.id === foodId)


        if (targetOrderItem) {
            targetOrderItem.quantity += qty
        } else {
            // 沒按過 加入新資料
            orderItem.push({
                //這邊之後要確認一下有沒有問題
                id: foodList[foodListId].id,
                name: foodList[foodListId].name, // name: name
                price: foodList[foodListId].price, // price: price
                quantity: qty
            })

        }
        renderRightDeck()

    }
}


function renderRightDeck() {
    let amount = 0
    //計算總金額
    orderItem.forEach(item => {
        amount += item.price * item.quantity
    })
    let data = JSON.stringify({ orderItem, amount })

    let orderHTML = orderItem.map(item => `
            <div class="card mb-3 mt-2" id="order">
                <div class="card-body pt-3 pr-3">
                    <div class="text-right">
                        <span class="delete-btn">×</span>
                    </div>
                   <h6 class="card-title mb-1">${item.name}</h6>
                    <div class="card-text text-right">X ${item.quantity}</div>
                </div>
                <div class="card-footer text-right py-2">
                    <div class="card-text text-muted">$ <span data-drink-price>${Number(item.price) * Number(item.quantity)}</span></div>
                </div>
            </div>
            `).join('')
    // let button = `<button class="btn btn-lg btn-primary btn-block" type="submit"> 送出</button>`
    let button = `<button class="btn btn-lg btn-primary btn-block" type="submit" data-toggle="modal" data-target="#exampleModal"> 送出</button>`

    let totalAmount = `<div class="card-body pt-3 pr-3">
                <div class="text-right">總共 ${amount} 元
                        </div></div>`
    let sentValue = `<form action = "/orders" method = "POST" id="usrform">
                <textarea name="orderItem" form="usrform" style="display:none">${data}</textarea>
                 <button class="btn btn-lg btn-primary btn-block" type="submit"> 送出</button>

            </form>`

    rightOrder.innerHTML = orderHTML + totalAmount + button

}

function cleanOrder(target) {
    rightOrder.innerHTML = ""
}


function postOrder(target) {
    if (target.innerText === '送出') {
        XHRSend()
    }
}


function XHLSend(input) {

    var oReq = new XMLHttpRequest();
    oReq.upload.addEventListener("progress", updateProgress);
    oReq.upload.addEventListener("load", transferComplete);
    oReq.upload.addEventListener("error", transferFailed);
    oReq.upload.addEventListener("abort", transferCanceled);
    oReq.open("POST", "/orders", true);
    oReq.setRequestHeader("Content-Type", "application/json");

    let data = JSON.stringify({ orderItem, amount, input })
    oReq.send(data)

    //接收回傳
    oReq.onload = function () {
        const response = JSON.parse(oReq.responseText)
        alert(`你是${response.id}號`)
    }

    function updateProgress(oEvent) {
        if (oEvent.lengthComputable) {
            var percentComplete = oEvent.loaded / oEvent.total;
            // ...
        } else {
            // Unable to compute progress information since the total size is unknown
        }
    }

    function transferComplete(evt) {
        console.log("The transfer is complete.");
        cleanOrder()

    }

    function transferFailed(evt) {
        console.log("An error occurred while transferring the file.");
    }

    function transferCanceled(evt) {
        console.log("The transfer has been canceled by the user.");
    }

}

function renderOrderData(target) {
    const modalOrder = document.querySelector("#orderList")
    ItemList = orderItem.map(item => `
    <li>${item.name} X ${item.quantity}
    `)
    let orderHTML = `<div class="border-top" >
        <span>訂單內容</span>
         <ul class="mb-0">
        ${ItemList}
        </ul>
        <div>總共 ${amount}元</div>
        </div>`

    modalOrder.innerHTML = orderHTML

}

function getCustData(target) {
    if (target.innerText === '送單') {
        const modalBody = target.parentElement.previousElementSibling
        const custName = modalBody.children[0].children[0].value
        const custPhone = modalBody.children[1].children[0].value

        // console.log(custName, custPhone)
        let output = { custName, custPhone }

        XHLSend(output)

        //暫時用這方法移除modal
        $('#exampleModal').hide();
        $('.modal-backdrop').hide();

    }

}

function deleteOrderCard(target) {
    if (target.innerText === '×') {
        const orderCard = target.parentElement.parentElement.parentElement
        const itemName = target.parentElement.parentElement.children[1].innerText

        let index = orderItem.findIndex(item => item.name === itemName)
        orderItem.splice(index, 1)
    }

    renderRightDeck()
}