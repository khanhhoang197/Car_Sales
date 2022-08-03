function Car( name, price, photo) {
    this.name = name;
    this.price = price;
    this.photo = photo;
}

var cars = []
const key_data = 'car_data';

function getData(key){
    return JSON.parse(localStorage.getItem(key));
}

function setData(key, data){
    localStorage.setItem(key, JSON.stringify(data));
}

function init(){
    if(getData(key_data) == null){
        cars = [
            new Car( "VinFast Lux A2.0", 800000000, "img/luxa2.0.jpg"),
            new Car( "Mazda CX-5", 1400000000, "img/1.jpg"),
            new Car( "Toyota Cross 2022", 1300000000, "img/2.jpg"),
            new Car( "Kia-K8", 1000000000, "img/3.jpg"),
            new Car( "Maserati", 18000000000, "img/slide1.jpg"),
        ]
        setData(key_data, cars);
    }else{
        cars = getData(key_data);
    }
}

function rendercontent() {
    let htmls = cars.map(function (car, index) {
        return `
            <ul class="products">
                <li>
                    <div class="product-item">
                        <div class="product-top">
                            <a href="" class="product-img">
                                <img src="${car.photo}" alt="" style="width: 250px; height="450px"">
                            </a>
                            <div class="acction">
                                <button class="edit-product" onclick="btnEdit(${index})">Sửa</button>
                                <button cass="delete-product" onclick="btnDelete(${index})">Xóa</button>
                            </div>
                        </div>
                        <div class="product-info">
                            <a href="" class="product-name">
                                ${car.name}
                            </a>
                            <div class="product-price">
                                ${formatCurrency(car.price)}
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        `
    });
    document.querySelector('#content').innerHTML = htmls.join("");
}


function addProduct(id) {
    document.querySelector(".form-add-products").classList.remove("add-none");
    document.querySelector('.form-edit-products').classList.add("edit-none");
    position = id;
}

function btnCreate(){
    let addName = document.querySelector('#addName').value;
    let addPrice = document.querySelector('#addPrice').value;
    let addImage = document.querySelector('#addImage').value;
    if(addName == null || addName == ''){
        alert('Tên không được để trống, hãy nhập tên!');
        return;
    }
    if(addPrice == null || addPrice ==''){
        alert('Hãy nhập giá của sản phẩm');
        return;
    }
    if(addImage == null || addImage == ''){
        alert('Hãy dán link ảnh sản phẩm.');
        return;
    }
    cars.unshift( new Car(addName, addPrice, addImage));
    setData(key_data, cars);
    rendercontent();
    resetForm();
}

function clearFormAdd(){
    document.querySelector(".form-add-products").classList.add("add-none");
    resetForm();
}

function formatCurrency(number){
    return number.toLocaleString('vi', {style : 'currency', currency : 'VND'});
}

function resetForm(){
    document.querySelector('#addName').value = '';
    document.querySelector('#addPrice').value = '';
    document.querySelector('#addImage').value = '';
}

function btnDelete(index){
    let confirmed = window.confirm('Bạn có chắc chắn xóa sản phẩm này không?');
    if(confirmed){
        cars.splice(index, 1);
        setData(key_data, cars);
        rendercontent();
    }
}


function btnEdit(index){
    document.querySelector('.form-edit-products').classList.remove("edit-none");
    document.querySelector(".form-add-products").classList.add("add-none");
    cars.forEach(function(item){
        if(item.index === index )
        document.querySelector('#editName').value = item.addName;
        document.querySelector('#editPrice').value = item.addPrice;
        document.querySelector('#editImage').value = item.addImage;
        return;

    });

}
function run(){
    init();
    rendercontent();
}
run();