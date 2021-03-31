const leftDeck = document.querySelector(".card-deck")
const rightOrder = document.querySelector("#order")
let orderItem = []

// console.log(foodList)

leftDeck.addEventListener('click', event => {
    adjustQty(event.target)
    addToOrder(event.target)
})

rightOrder.addEventListener('click', event => {
    postOrder(event.target)

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
        qty = Number(selectFood.children[3].children[1].innerText)
        const targetOrderItem = orderItem.find(item => item.id === foodId)
        let amount = 0

        if (targetOrderItem) {
            targetOrderItem.quantity += qty
        } else {
            // 沒按過 加入新資料
            orderItem.push({
                //這邊之後要確認一下有沒有問題
                id: foodList[foodId - 1].id,
                name: foodList[foodId - 1].name, // name: name
                price: foodList[foodId - 1].price, // price: price
                quantity: qty
            })

        }
        //計算總金額
        orderItem.forEach(item => {
            amount += item.price * item.quantity
        })

        let orderHTML = orderItem.map(item => `
            <div class="card mb-3 mt-2" id="order">
                <div class="card-body pt-3 pr-3">
                    <div class="text-right">
                        <span data-alpha-pos="delete-drink">×</span>
                    </div>
                   <h6 class="card-title mb-1">${item.name}</h6>
                    <div class="card-text text-right">X ${item.quantity}</div>
                </div>
                <div class="card-footer text-right py-2">
                    <div class="card-text text-muted">$ <span data-drink-price>${Number(item.price) * Number(item.quantity)}</span></div>
                </div>
            </div>
            `).join('')
        let button = `<button class="btn btn-lg btn-primary btn-block"> 送出</button>`
        let totalAmount = `<div class="card-body pt-3 pr-3">
                <div class="text-right">總共 ${amount} 元
                        </div></div>`
        rightOrder.innerHTML = orderHTML + totalAmount + button


    }
}



function postOrder(target) {
    if (target.innerText === '送出') {
        var oReq = new XMLHttpRequest();
        oReq.open("POST", "/order", true);
        oReq.setRequestHeader("Content-Type", "application/json");
        let data = JSON.stringify(orderItem)
        oReq.send(data)
    }
}