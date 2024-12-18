const availableProducts = [
    { name: "Kalem", price: 10 },
    { name: "Defter", price: 15 },
    { name: "Silgi", price: 5 },
    { name: "Kitap", price: 25 },
    { name: "Cetvel", price: 7 },
    { name: "Çanta", price: 50 }
];

let productsInOrder = [];

// Sipariş Tablosunu Güncelle
function updateOrderTable() {
    const orderBody = document.getElementById("order-body");
    const orderTable = document.getElementById("order-list");

    orderBody.innerHTML = "";  // Tabloyu temizle
    orderTable.innerHTML = "";

    productsInOrder.forEach((product, index) => {
        const totalPrice = product.price * product.quantity;
        const row = document.createElement("tr");
        const listRow = document.createElement("tr");

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price} ₺</td>
            <td class= "order-table-item-count">
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <span class = "order-table-item-count-text">${product.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </td>
            <td>${totalPrice} ₺</td>
            <td><button onclick="removeProduct(${index})">Çıkar</button></td>
        `;

        listRow.innerHTML = `
        <td>${product.name}</td>
        <td>${product.price} ₺</td>
        <td>${product.quantity}</td>
        <td>${totalPrice} ₺</td>   
    `;

        orderBody.appendChild(row);
        orderTable.appendChild(listRow);
    });
    calculateTotal();
}

// Ürün Miktarını Değiştir (Artırma/Azaltma)
function changeQuantity(index, amount) {
    if (productsInOrder[index].quantity + amount >= 1) {
        productsInOrder[index].quantity += amount;
    }
    updateOrderTable();
}

// Ürün Çıkar
function removeProduct(index) {
    productsInOrder.splice(index, 1);
    updateOrderTable();
}

// Siparişin Toplamını Hesapla
function calculateTotal() {
    let total = 0;

    productsInOrder.forEach(product => {
        total += product.price * product.quantity;
    });

    const vat = total * 0.18;
    const grandTotal = total + vat;

    document.getElementById("total-price").textContent = total.toFixed(2);
    document.getElementById("vat").textContent = vat.toFixed(2);
    document.getElementById("grand-total").textContent = grandTotal.toFixed(2);
    document.getElementById("total-amount").textContent = total.toFixed(2);
    document.getElementById("vat-amount").textContent = vat.toFixed(2);
    document.getElementById("total").textContent = (total + vat).toFixed(2);
}

// Rastgele Ürün Ekle
function addRandomProduct() {
    // Rastgele bir ürün seç
    const randomIndex = Math.floor(Math.random() * availableProducts.length);
    const randomProduct = availableProducts[randomIndex];

    // Ürün, siparişe eklenmeden önce miktarı 1 olarak ayarlanır
    const existingProduct = productsInOrder.find(product => product.name === randomProduct.name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        productsInOrder.push({
            name: randomProduct.name,
            price: randomProduct.price,
            quantity: 1
        });
    }

    updateOrderTable();
}

// Siparişi Temizle
function clearOrder() {
    productsInOrder = [];
    updateOrderTable();
}

// İlk Yükleme
updateOrderTable();