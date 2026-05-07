// بيانات المنتجات
const products = [
    { id: 1, cat: 'hardware', name: 'معالج Intel i9', price: 450, img: 'https://cdn-icons-png.flaticon.com/512/900/900618.png' },
    { id: 2, cat: 'hardware', name: 'كرت شاشة RTX 4070', price: 600, img: 'https://cdn-icons-png.flaticon.com/512/900/900632.png' },
    { id: 3, cat: 'accessories', name: 'ماوس Web Net X', price: 35, img: 'https://cdn-icons-png.flaticon.com/512/689/689355.png' },
    { id: 4, cat: 'accessories', name: 'سماعة محيطية', price: 55, img: 'https://cdn-icons-png.flaticon.com/512/590/590504.png' },
    { id: 5, cat: 'software', name: 'Windows 11 Pro', price: 99, img: 'https://cdn-icons-png.flaticon.com/512/732/732221.png' },
    { id: 6, cat: 'software', name: 'Kaspersky Antivirus', price: 25, img: 'https://cdn-icons-png.flaticon.com/512/754/754523.png' }
];

let cart = [];
let lastOrderID = "";

// التبديل بين الصفحات
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0,0);
}

// عرض المنتجات حسب الفئة
function loadCategory(cat) {
    showPage('products-page');
    const grid = document.getElementById('productsGrid');
    const filtered = (cat === 'all') ? products : products.filter(p => p.cat === cat);
    
    grid.innerHTML = filtered.map(p => `
        <div class="prod-card" onclick="viewProduct(${p.id})">
            <img src="${p.img}">
            <h4>${p.name}</h4>
            <p style="color:var(--accent); font-weight:bold">${p.price} JOD</p>
        </div>
    `).join('');
}

// صفحة تفاصيل السلعة
function viewProduct(id) {
    const p = products.find(item => item.id === id);
    const detailBox = document.getElementById('productDetails');
    detailBox.innerHTML = `
        <img src="${p.img}">
        <div class="info-box">
            <h1>${p.name}</h1>
            <p>وصف المنتج: هذا المنتج متوفر حصرياً في Web Net مع ضمان حقيقي لمدة عام. يتميز بالجودة العالية والأداء القوي.</p>
            <h2 style="color:var(--accent)">${p.price} JOD</h2>
            <button class="btn-success" onclick="addToCart(${p.id})">إضافة إلى العربة 🛒</button>
        </div>
    `;
    showPage('item-detail');
}

// السلة
function addToCart(id) {
    const p = products.find(item => item.id === id);
    cart.push(p);
    updateCart();
    alert("تمت الإضافة للعربة!");
}

function updateCart() {
    document.getElementById('cartCount').innerText = cart.length;
    const cartBox = document.getElementById('cartContent');
    if(cart.length === 0) {
        cartBox.innerHTML = "<p>العربة فارغة</p>";
    } else {
        cartBox.innerHTML = cart.map((item, index) => `
            <div style="display:flex; justify-content:space-between; background:white; padding:10px; margin-bottom:10px; border-radius:8px">
                <span>${item.name}</span>
                <b>${item.price} JOD</b>
            </div>
        `).join('');
    }
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cartTotal').innerText = total;
}

// تأكيد الطلب
function handleOrder(e) {
    e.preventDefault();
    lastOrderID = "WN-" + Math.floor(1000 + Math.random() * 9000);
    alert("تم تأكيد طلبك! رقم التتبع: " + lastOrderID);
    cart = [];
    updateCart();
    document.getElementById('displayOrderID').innerText = lastOrderID;
    document.getElementById('trackInfo').style.display = "none";
    document.getElementById('trackStatus').style.display = "block";
    showPage('track');
}

// تتبع الطلب
function trackOrder() {
    const id = document.getElementById('trackInput').value;
    if(id === lastOrderID && id !== "") {
        document.getElementById('trackInfo').style.display = "none";
        document.getElementById('trackStatus').style.display = "block";
        document.getElementById('displayOrderID').innerText = id;
    } else {
        alert("رقم الطلب غير صحيح!");
    }
}

// البحث الحي
function liveSearch() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const result = products.filter(p => p.name.toLowerCase().includes(term));
    loadCategory('search'); // وظيفة وهمية فقط لتشغيل العرض
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = result.map(p => `
        <div class="prod-card" onclick="viewProduct(${p.id})">
            <img src="${p.img}">
            <h4>${p.name}</h4>
            <p style="color:var(--accent); font-weight:bold">${p.price} JOD</p>
        </div>
    `).join('');
    showPage('products-page');
}

window.onload = () => showPage('home');