// ================= 1. LOGIC HIỂN THỊ SỐ LƯỢNG GIỎ HÀNG CHUNG =================
function updateGlobalCartBadge() {
    let cart = JSON.parse(localStorage.getItem("cafeCart")) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    const badge = document.getElementById("cart-count") || document.getElementById("cart-badge");
    if (badge) {
        badge.innerText = totalItems;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateGlobalCartBadge();
    
    // Nếu đang ở trang Thực đơn thì chạy hàm vẽ menu
    if (document.getElementById("products-grid-dynamic")) {
        renderMenu();
    }
});

// ================= 2. TRANG THỰC ĐƠN (menu.html) =================
const products = [
    // --- DANH MỤC CÀ PHÊ TRUYỀN THỐNG ---
    { id: 1, name: "Cà phê Đen Đá", price: 25000, category: "coffee", img: "https://quangtanhoa.com/wp-content/uploads/2018/01/ca-phe-den-da.jpg" },
    { id: 2, name: "Bạc Xỉu Mây Lang Thang", price: 30000, category: "coffee", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { id: 3, name: "Cà phê Sữa Đá", price: 29000, category: "coffee", img: "https://giacaphe.com/wp-content/uploads/2023/03/ca-phe-sua-da-2.jpg" },
    { id: 19, name: "Cà phê Trứng Hà Nội", price: 40000, category: "coffee", img: "https://cooponline.vn/tin-tuc/wp-content/uploads/2025/10/cach-lam-ca-phe-trung-nong-dam-da-beo-min-chuan-huong-viet.png" }, // Đã thêm Cà phê Trứng
    
    // --- DANH MỤC CÀ PHÊ PHA MÁY (PHONG CÁCH TÂY) ---
    { id: 4, name: "Caramel Macchiato", price: 45000, category: "coffee", img: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { id: 5, name: "Espresso Đậm Vị", price: 35000, category: "coffee", img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { id: 13, name: "Americano Đá", price: 35000, category: "coffee", img: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2024_3_28_638472299342509511_avatar.jpg" },
    { id: 14, name: "Cà phê Latte", price: 45000, category: "coffee", img: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { id: 15, name: "Cappuccino Nghệ Thuật", price: 45000, category: "coffee", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { id: 16, name: "Mocha Đá Xay", price: 55000, category: "coffee", img: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { id: 17, name: "Flat White", price: 40000, category: "coffee", img: "https://delonghi.vn/wp-content/uploads/2025/07/GettyImages-1155505160-scaled-e1612518804183.jpg" },
    { id: 18, name: "Cold Brew Ủ Lạnh", price: 50000, category: "coffee", img: "https://kingcoffee.com.vn/wp-content/uploads/2025/12/cach-pha-cold-brew-1536x690.jpg" },

    // --- DANH MỤC TRÀ ---
    { id: 6, name: "Trà Đào Cam Sả", price: 45000, category: "tea", img: "https://cooponline.vn/tin-tuc/wp-content/uploads/2025/10/tra-dao-cam-sa-cong-thuc-pha-che-chuan-vi.png" },
    { id: 7, name: "Trà Vải ", price: 48000, category: "tea", img: "https://file.hstatic.net/200000921537/file/tra_vai_4d41fd5133e54b7fb7e2120add34a584_1024x1024.png" },
    { id: 8, name: "Trà Oolong Sen Vàng", price: 50000, category: "tea", img: "https://lypham.vn/wp-content/uploads/2025/02/cach-lam-tra-sen-vang-macchiato.jpg" },
    { id: 9, name: "Matcha Đá Xay", price: 55000, category: "tea", img: "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { id: 20, name: "Trà Đá Khổng Lồ", price: 10000, category: "tea", img: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2019/7/25/746291/Tra-Da-2.jpg" }, // Đã thêm Trà Đá

    // --- DANH MỤC BÁNH NGỌT ---
    { id: 10, name: "Bánh Croissant Bơ", price: 35000, category: "cake", img: "https://file.hstatic.net/200000079049/file/banh-sung-bo-croissants_5148f8e0ed564e5fbfb949a78ebf7963.jpg" },
    { id: 11, name: "Tiramisu Cổ Điển", price: 42000, category: "cake", img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { id: 12, name: "Cheesecake Dâu Tây", price: 45000, category: "cake", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" }
];

let currentCategory = "all";
let searchQuery = "";

const formatMoney = (number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);

function renderMenu() {
    const grid = document.getElementById("products-grid-dynamic");
    if (!grid) return;

    grid.innerHTML = "";

    const filteredProducts = products.filter(item => {
        const matchCategory = currentCategory === "all" || item.category === currentCategory;
        const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
        return matchCategory && matchSearch;
    });

    if (filteredProducts.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #888;">Không tìm thấy món ăn phù hợp!</p>`;
        return;
    }

    filteredProducts.forEach(product => {
        grid.innerHTML += `
            <div class="product-card">
                <div class="img-container">
                    <img src="${product.img}" alt="${product.name}" class="product-img">
                </div>
                <div class="card-body">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">${formatMoney(product.price)}</p>
                    <button class="add-btn" onclick="addToCart(${product.id})">
                        <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ
                    </button>
                </div>
            </div>
        `;
    });
}

function filterCategory(category, btnElement) {
    currentCategory = category;
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    btnElement.classList.add("active");
    renderMenu();
}

function handleSearch(value) {
    searchQuery = value;
    renderMenu();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cafeCart")) || [];
    const existItem = cart.find(item => item.id === productId);
    
    if (existItem) {
        existItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cafeCart", JSON.stringify(cart));
    updateGlobalCartBadge();
    showToast(`Đã thêm ${product.name} vào giỏ hàng!`);
}

function showToast(message) {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast-msg";
    toast.innerHTML = `<i class="fa-solid fa-check-circle"></i> ${message}`;
    container.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
}

// ================= 3. TRANG ĐẶT BÀN (reservation.html) =================
function getReservations() {
    var data = localStorage.getItem("cafeReservations");
    if (data == null) {
        return [];
    }
    return JSON.parse(data);
}

function saveReservations(list) {
    localStorage.setItem("cafeReservations", JSON.stringify(list));
}

function getToday() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return year + "-" + month + "-" + day;
}

function formatDate(dateStr) {
    var parts = dateStr.split("-");
    return parts[2] + "/" + parts[1] + "/" + parts[0];
}

function createTimeOptions() {
    var select = document.getElementById("rsv-time");
    for (var hour = 7; hour <= 21; hour++) {
        var h = hour;
        if (hour < 10) {
            h = "0" + hour;
        }
        var times = [h + ":00", h + ":30"];
        for (var i = 0; i < times.length; i++) {
            var option = document.createElement("option");
            option.value = times[i];
            option.textContent = times[i];
            select.appendChild(option);
        }
    }
}

function showError(field, message) {
    document.getElementById("err-" + field).textContent = message;
}

function checkForm(name, phone, email, date, time, guests, area) {
    var isValid = true;

    showError("name", "");
    showError("phone", "");
    showError("email", "");
    showError("date", "");
    showError("time", "");
    showError("guests", "");

    if (name.length < 2) {
        showError("name", "Vui lòng nhập họ tên.");
        isValid = false;
    }

    var phoneRule = /^0[0-9]{9}$/;
    if (!phoneRule.test(phone)) {
        showError("phone", "Số điện thoại phải gồm 10 số, bắt đầu bằng 0.");
        isValid = false;
    }

    if (email != "" && email.indexOf("@") == -1) {
        showError("email", "Email không hợp lệ.");
        isValid = false;
    }

    if (date == "") {
        showError("date", "Vui lòng chọn ngày.");
        isValid = false;
    } else if (date < getToday()) {
        showError("date", "Không thể đặt bàn cho ngày đã qua.");
        isValid = false;
    }

    if (time == "") {
        showError("time", "Vui lòng chọn giờ.");
        isValid = false;
    } else if (date == getToday()) {
        var now = new Date();
        var nowMinutes = now.getHours() * 60 + now.getMinutes();
        var timeParts = time.split(":");
        var timeMinutes = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
        if (timeMinutes <= nowMinutes) {
            showError("time", "Giờ này đã qua, vui lòng chọn giờ khác.");
            isValid = false;
        }
    }

    if (isNaN(guests) || guests < 1 || guests > 20) {
        showError("guests", "Số người phải từ 1 đến 20.");
        isValid = false;
    } else if (area == "Phòng riêng" && guests < 6) {
        showError("guests", "Phòng riêng dành cho nhóm từ 6 người.");
        isValid = false;
    }

    if (isValid) {
        var list = getReservations();
        for (var i = 0; i < list.length; i++) {
            var r = list[i];
            if (r.phone == phone && r.date == date && r.time == time && r.status != "Đã hủy") {
                showError("time", "Bạn đã đặt bàn vào giờ này rồi.");
                isValid = false;
            }
        }
    }

    return isValid;
}

function showReservationList() {
    var ul = document.getElementById("rsv-list");
    var emptyText = document.getElementById("rsv-empty");
    var list = getReservations();
    
    if(!ul) return;

    ul.innerHTML = "";

    if (list.length == 0) {
        emptyText.hidden = false;
        return;
    }
    emptyText.hidden = true;

    for (var i = 0; i < list.length; i++) {
        var r = list[i];

        var li = document.createElement("li");
        li.className = "rsv-item";
        if (r.status == "Đã hủy") {
            li.className = "rsv-item cancelled";
        }

        var top = document.createElement("div");
        top.className = "rsv-item-top";
        var code = document.createElement("span");
        code.className = "rsv-code";
        code.textContent = r.code;
        var status = document.createElement("span");
        status.className = "rsv-status";
        status.textContent = r.status;
        top.appendChild(code);
        top.appendChild(status);
        li.appendChild(top);

        var info = document.createElement("p");
        info.textContent = r.name + " - " + r.guests + " người - " + r.area;
        li.appendChild(info);

        var when = document.createElement("p");
        when.textContent = r.time + ", " + formatDate(r.date);
        li.appendChild(when);

        if (r.status != "Đã hủy") {
            var cancelBtn = document.createElement("button");
            cancelBtn.className = "rsv-cancel";
            cancelBtn.textContent = "Hủy đặt bàn";
            cancelBtn.setAttribute("data-id", r.id);
            cancelBtn.onclick = function () {
                cancelReservation(this.getAttribute("data-id"));
            };
            li.appendChild(cancelBtn);
        }

        ul.appendChild(li);
    }
}

function cancelReservation(id) {
    var ok = confirm("Bạn có chắc muốn hủy đặt bàn này không?");
    if (!ok) {
        return;
    }
    var list = getReservations();
    for (var i = 0; i < list.length; i++) {
        if (list[i].id == id) {
            list[i].status = "Đã hủy";
        }
    }
    saveReservations(list);
    showReservationList();
}

function handleSubmit(event) {
    event.preventDefault();

    var name = document.getElementById("rsv-name").value.trim();
    var phone = document.getElementById("rsv-phone").value.trim();
    var email = document.getElementById("rsv-email").value.trim();
    var date = document.getElementById("rsv-date").value;
    var time = document.getElementById("rsv-time").value;
    var guests = parseInt(document.getElementById("rsv-guests").value);
    var area = document.getElementById("rsv-area").value;
    var note = document.getElementById("rsv-note").value.trim();

    if (!checkForm(name, phone, email, date, time, guests, area)) {
        return;
    }

    var id = Date.now();
    var reservation = {
        id: id,
        code: "DB" + String(id).slice(-6),
        name: name,
        phone: phone,
        email: email,
        date: date,
        time: time,
        guests: guests,
        area: area,
        note: note,
        status: "Chờ xác nhận"
    };

    var list = getReservations();
    list.push(reservation);
    saveReservations(list);

    document.getElementById("rsv-success-text").textContent =
        "Mã đặt bàn của bạn: " + reservation.code + ". Bàn cho " + guests +
        " người lúc " + time + " ngày " + formatDate(date) + ".";
    document.getElementById("rsv-success").hidden = false;

    document.getElementById("reservation-form").reset();
    document.getElementById("rsv-guests").value = 2;
    document.getElementById("rsv-date").value = getToday();
    showReservationList();
}

document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("reservation-form");
    if (form == null) {
        return;
    }

    var dateInput = document.getElementById("rsv-date");
    dateInput.min = getToday();
    dateInput.value = getToday();

    createTimeOptions();
    showReservationList();
    form.addEventListener("submit", handleSubmit);
});
// ================= 4. TRANG GIỎ HÀNG (cart.html) =================
const SHIPPING_FEE = 30000;

function renderCart() {
    const cartContainer = document.getElementById("cart-items-container");
    if (!cartContainer) return;

    let cart = JSON.parse(localStorage.getItem("cafeCart")) || [];
    cartContainer.innerHTML = "";

    const btnClear = document.getElementById("btn-clear-cart");

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
        if(btnClear) btnClear.style.display = "none";
        updateOrderSummary(0);
        return;
    }

    if(btnClear) btnClear.style.display = "block";
    let subtotal = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        // Đã sửa item.image thành item.img để khớp với dữ liệu menu
        const itemHTML = `
            <div class="cart-item">
                <img src="${item.img || 'https://via.placeholder.com/80'}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <span class="item-price">${item.price.toLocaleString('vi-VN')} đ</span>
                    <div class="quantity-controls">
                        <button onclick="changeQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <button class="btn-remove" onclick="removeItem(${index})">Xóa</button>
            </div>
        `;
        cartContainer.innerHTML += itemHTML;
    });

    updateOrderSummary(subtotal);
}

function updateOrderSummary(subtotal) {
    const currentShipping = subtotal > 0 ? SHIPPING_FEE : 0;
    const finalTotal = subtotal + currentShipping;

    document.getElementById("subtotal-price").innerText = subtotal.toLocaleString('vi-VN') + " đ";
    document.getElementById("shipping-fee").innerText = currentShipping.toLocaleString('vi-VN') + " đ";
    document.getElementById("final-total").innerText = finalTotal.toLocaleString('vi-VN') + " đ";
}

function changeQuantity(index, delta) {
    let cart = JSON.parse(localStorage.getItem("cafeCart")) || [];
    if (cart[index]) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1); 
        }
        localStorage.setItem("cafeCart", JSON.stringify(cart));
        renderCart();
        updateGlobalCartBadge(); 
    }
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cafeCart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cafeCart", JSON.stringify(cart));
    renderCart();
    updateGlobalCartBadge();
}

function clearCart() {
    if(confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?")) {
        localStorage.removeItem("cafeCart");
        renderCart();
        updateGlobalCartBadge();
    }
}

function initCartForm() {
    const checkoutForm = document.getElementById("checkout-form");
    if (!checkoutForm) return;

    checkoutForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let isValid = true;
        let cart = JSON.parse(localStorage.getItem("cafeCart")) || [];

        if (cart.length === 0) {
            alert("Giỏ hàng đang trống! Vui lòng chọn món trước khi thanh toán.");
            return;
        }

        const nameInput = document.getElementById("cus-name").value.trim();
        const phoneInput = document.getElementById("cus-phone").value.trim();
        const addressInput = document.getElementById("cus-address").value.trim();

        if (nameInput === "") {
            document.getElementById("err-name").innerText = "Vui lòng nhập họ và tên.";
            isValid = false;
        } else { document.getElementById("err-name").innerText = ""; }

        const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        if (!phoneRegex.test(phoneInput)) {
            document.getElementById("err-phone").innerText = "Số điện thoại không hợp lệ (cần 10 số, bắt đầu bằng 0).";
            isValid = false;
        } else { document.getElementById("err-phone").innerText = ""; }

        if (addressInput === "") {
            document.getElementById("err-address").innerText = "Vui lòng nhập địa chỉ giao hàng.";
            isValid = false;
        } else { document.getElementById("err-address").innerText = ""; }

        if (isValid) {
            alert(`Đặt hàng thành công!\nCảm ơn ${nameInput} đã đặt hàng.\nĐơn hàng sẽ được giao đến: ${addressInput}`);
            
            localStorage.removeItem("cafeCart");
            renderCart();
            updateGlobalCartBadge();
            checkoutForm.reset();
        }
    });
}

// ================= 5. KHỞI CHẠY KHI MỞ TRANG TỔNG HỢP =================
document.addEventListener("DOMContentLoaded", function () {
    // 1. Luôn cập nhật số lượng giỏ hàng trên thanh Menu
    updateGlobalCartBadge();

    // 2. Kích hoạt logic Thực đơn (Nếu đang ở trang menu.html)
    if (document.getElementById("products-grid-dynamic")) {
        renderMenu();
    }

    // 3. Kích hoạt logic Đặt bàn (Nếu đang ở trang reservation.html)
    var form = document.getElementById("reservation-form");
    if (form) {
        var dateInput = document.getElementById("rsv-date");
        if (dateInput) {
            dateInput.min = getToday();
            dateInput.value = getToday();
        }
        createTimeOptions();
        showReservationList();
        form.addEventListener("submit", handleSubmit);
    }

    // 4. Kích hoạt logic Giỏ hàng (Nếu đang ở trang cart.html)
    if (document.getElementById("cart-items-container")) {
        renderCart();
        initCartForm();
    }
});
// ================= 5. LOGIC TRANG ĐĂNG NHẬP (login.html) =================
function initLoginForms() {
    const btnToRegister = document.getElementById('switchToRegister');
    const btnToLogin = document.getElementById('switchToLogin');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');

    if(btnToRegister && btnToLogin) {
        btnToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            formLogin.style.display = 'none';
            formRegister.style.display = 'block';
        });

        btnToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            formRegister.style.display = 'none';
            formLogin.style.display = 'block';
        });
    }

    const registerForm = document.getElementById('registerForm');
    if(registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fullName = document.getElementById('regFullName').value;
            const username = document.getElementById('regUsername').value;
            const password = document.getElementById('regPassword').value;

            let users = JSON.parse(localStorage.getItem('cafe_users')) || [];
            const isExist = users.some(u => u.username === username);
            
            if(isExist) {
                alert("Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác!");
                return;
            }

            users.push({ fullName: fullName, username: username, password: password, role: 'customer' });
            localStorage.setItem('cafe_users', JSON.stringify(users));
            
            alert("Đăng ký thành công! Hãy đăng nhập nhé.");
            registerForm.reset();
            btnToLogin.click();
        });
    }

    const loginForm = document.getElementById('loginForm');
    if(loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            const adminAccounts = [{ username: 'chuquan', password: '123', role: 'admin', name: 'Chủ Quán' }];
            const customerAccounts = JSON.parse(localStorage.getItem('cafe_users')) || [];
            const allAccounts = [...adminAccounts, ...customerAccounts];

            const matchedUser = allAccounts.find(u => u.username === username && u.password === password);

            if (matchedUser) {
                sessionStorage.setItem('chillin_user', JSON.stringify({
                    username: matchedUser.username,
                    role: matchedUser.role,
                    name: matchedUser.fullName || matchedUser.name
                }));
                alert(`Đăng nhập thành công! Chào ${matchedUser.fullName || matchedUser.name}`);
                window.location.href = matchedUser.role === 'admin' ? "admin.html" : "index.html";
            } else {
                alert("Tên đăng nhập hoặc mật khẩu không chính xác!");
            }
        });
    }
}

// ================= 6. LOGIC TRANG QUẢN TRỊ (admin.html) =================
function guardAdmin() {
    const user = JSON.parse(sessionStorage.getItem('chillin_user'));
    if (!user || user.role !== 'admin') {
        alert('Bạn không có quyền truy cập trang quản trị!');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function load(key) { return JSON.parse(localStorage.getItem(key)) || []; }
function saveData(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
function fmt(n) { return Number(n).toLocaleString('vi-VN') + ' đ'; }

function initAdminTabs() {
    document.querySelectorAll('.admin-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
        });
    });
}

function renderStaff() {
    const list = load('cafeStaff');
    const tbody = document.getElementById('staff-body');
    if(tbody) tbody.innerHTML = list.map((s, i) =>
        `<tr><td>${s.name}</td><td>${s.role}</td><td>${s.phone}</td>
         <td><button class="admin-btn del" onclick="removeItem('cafeStaff', ${i}, renderStaff)">Xóa</button></td></tr>`
    ).join('');
}
function addStaff() {
    const name = document.getElementById('staff-name').value.trim();
    const role = document.getElementById('staff-role').value.trim();
    const phone = document.getElementById('staff-phone').value.trim();
    if (!name) return alert('Nhập họ tên nhân viên!');
    const list = load('cafeStaff');
    list.push({ name, role, phone });
    saveData('cafeStaff', list);
    renderStaff();
}

function renderInventory() {
    const list = load('cafeInventory');
    const tbody = document.getElementById('inv-body');
    if(tbody) tbody.innerHTML = list.map((s, i) =>
        `<tr><td>${s.name}</td><td>${s.qty}</td><td>${s.unit}</td>
         <td><button class="admin-btn del" onclick="removeItem('cafeInventory', ${i}, renderInventory)">Xóa</button></td></tr>`
    ).join('');
}
function addInventory() {
    const name = document.getElementById('inv-name').value.trim();
    const qty = document.getElementById('inv-qty').value;
    const unit = document.getElementById('inv-unit').value.trim();
    if (!name || qty === '') return alert('Nhập tên và số lượng!');
    const list = load('cafeInventory');
    list.push({ name, qty: Number(qty), unit });
    saveData('cafeInventory', list);
    renderInventory();
}

function renderMenuAdmin() {
    const list = load('cafeMenu');
    const tbody = document.getElementById('menu-body');
    if(tbody) tbody.innerHTML = list.map((m, i) =>
        `<tr><td>${m.name}</td>
         <td><input type="number" value="${m.price}" style="width:110px" onchange="updatePrice(${i}, this.value)"></td>
         <td>${m.category}</td>
         <td><button class="admin-btn del" onclick="removeItem('cafeMenu', ${i}, renderMenuAdmin)">Xóa</button></td></tr>`
    ).join('');
}
function addMenuItem() {
    const name = document.getElementById('menu-name').value.trim();
    const price = document.getElementById('menu-price').value;
    const category = document.getElementById('menu-cat').value;
    if (!name || price === '') return alert('Nhập tên món và giá!');
    const list = load('cafeMenu');
    list.push({ id: Date.now(), name, price: Number(price), category });
    saveData('cafeMenu', list);
    renderMenuAdmin();
}
function updatePrice(i, value) {
    const list = load('cafeMenu');
    list[i].price = Number(value);
    saveData('cafeMenu', list);
}

function renderRevenue() {
    const today = new Date().toDateString();
    const orders = load('cafeOrders').filter(o => new Date(o.date).toDateString() === today);
    const total = orders.reduce((sum, o) => sum + o.total, 0);
    const elCount = document.getElementById('rev-count');
    const elTotal = document.getElementById('rev-total');
    if(elCount) elCount.innerText = orders.length;
    if(elTotal) elTotal.innerText = fmt(total);
}

function removeItem(key, index, rerender) {
    if (!confirm('Xóa mục này?')) return;
    const list = load(key);
    list.splice(index, 1);
    saveData(key, list);
    rerender();
}

// ================= 7. KHỞI CHẠY KHI MỞ TRANG TỔNG HỢP =================
document.addEventListener("DOMContentLoaded", function () {
    // 1. Luôn cập nhật số lượng giỏ hàng trên thanh Menu
    updateGlobalCartBadge();

    // 2. Logic phân quyền thanh Menu (Hiện nút Quản trị, đổi chữ Đăng xuất)
    const currentUser = JSON.parse(sessionStorage.getItem('chillin_user'));
    const navLinks = document.querySelector('.nav-links'); // Sửa lại đúng tên class chuẩn
    
    if (navLinks) {
        if (currentUser && currentUser.role === 'admin') {
            const adminMenu = document.createElement('li');
            adminMenu.innerHTML = '<a href="admin.html">Quản trị</a>';
            navLinks.insertBefore(adminMenu, navLinks.lastElementChild);
        }
        if (currentUser) {
            const loginLink = navLinks.querySelector('a[href="login.html"]');
            if (loginLink) {
                loginLink.innerHTML = '<i class="fa-solid fa-sign-out-alt"></i> Đăng xuất';
                loginLink.href = '#';
                loginLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    if(confirm("Bạn muốn đăng xuất?")) {
                        sessionStorage.removeItem('chillin_user');
                        window.location.href = "index.html";
                    }
                });
            }
        }
    }

    // 3. Kích hoạt logic Thực đơn
    if (document.getElementById("products-grid-dynamic")) {
        renderMenu();
    }

    // 4. Kích hoạt logic Đặt bàn
    var formRsv = document.getElementById("reservation-form");
    if (formRsv) {
        var dateInput = document.getElementById("rsv-date");
        if (dateInput) {
            dateInput.min = getToday();
            dateInput.value = getToday();
        }
        createTimeOptions();
        showReservationList();
        formRsv.addEventListener("submit", handleSubmit);
    }

    // 5. Kích hoạt logic Giỏ hàng
    if (document.getElementById("cart-items-container")) {
        renderCart();
        initCartForm();
    }

    // 6. Kích hoạt logic Đăng nhập/Đăng ký
    if (document.getElementById("form-login")) {
        initLoginForms();
    }

    // 7. Kích hoạt logic Trang Quản trị
    if (document.getElementById("tab-staff")) {
        if(guardAdmin()) { // Kiểm tra quyền admin trước khi render
            initAdminTabs();
            renderStaff();
            renderInventory();
            renderMenuAdmin();
            renderRevenue();
        }
    }
});