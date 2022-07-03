var inputName = document.getElementById('productName');
var inputPrice = document.getElementById('productPrice');
var inputCategory = document.getElementById('productCategory');
var inputDescription = document.getElementById('productDescription');
var inputSearch = document.getElementById('searchInput');
var addEdit = document.getElementById('addEdit');
var addBtn = document.getElementById('addBtn');
var currentindex = 0;
var productList = [];


if(localStorage.getItem('productData') == null){
    productList = [];
}else{
    productList = JSON.parse(localStorage.getItem('productData'));
    displayData();
}


// ************************  Add Product **************
    function addProduct(){
        if(validName() && validPrice()){
            var product = {
                name : inputName.value,
                price : inputPrice.value,
                Category : inputCategory.value,
                Description : inputDescription.value,
            }
            productList.push(product);
            localStorage.setItem('productData',JSON.stringify(productList));
            displayData();
            clearData();
        }

        
    }
// ***************************  Display Data ******************

function displayData(){
    var temp = '';
    for (let i = 0; i < productList.length; i++) {
        temp += `
        <tr>
            <td>${i}</td>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].Category}</td>
            <td>${productList[i].Description}</td>
            <td>
                <button class="btn btn-outline-success" onclick="updateProduct(${i})"><i class="fa-solid fa-pen-to-square" style='font-size:30px'></i></button>
            </td>
            <td>
                <button class="btn btn-outline-danger" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash-can" style='font-size:30px'></i></button>
            </td>
       </tr>
        `
    }
    document.getElementById('rowData').innerHTML = temp;
}

// ***************************  Delete Data ******************
function deleteProduct(index){
    productList.splice(index,1);
    localStorage.setItem('productData',JSON.stringify(productList));
    displayData();
}

// ***************************  Clear Data ******************

function clearData(){
    inputName.value = '';
    inputPrice.value = '';
    inputCategory.value = '';
    inputDescription.value = '';
}

// ***************************  Update Data ******************

function updateProduct(index){
    currentindex = index;
    inputName.value = productList[index].name;
    inputPrice.value = productList[index].price;
    inputCategory.value = productList[index].Category;
    inputDescription.value = productList[index].Description;
    addEdit.style.display='inline';
    addBtn.style.display='none';
    localStorage.setItem('productData' , JSON.stringify(productList));
}
function addEditUpdate(){
    productList[currentindex].name = inputName.value;
    productList[currentindex].price = inputPrice.value;
    productList[currentindex].Category = inputCategory.value;
    productList[currentindex].Description = inputDescription.value;
    localStorage.setItem('productData' , JSON.stringify(productList));
    displayData();
    clearData();
    addEdit.style.display='none';
    addBtn.style.display='inline';
}

// ***************************  Search Data ******************

function searchData(){
    var searchValue = inputSearch.value;
    var temp = '';
    for (let i = 0; i < productList.length; i++) {
        if(productList[i].name.toLowerCase().includes(searchValue.toLowerCase()) || productList[i].Category.toLowerCase().includes(searchValue.toLowerCase()))
        {
            temp += `
            <tr>
                <td>${i}</td>
                <td>${productList[i].name}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].Category}</td>
                <td>${productList[i].Description}</td>
                <td>
                    <button class="btn btn-outline-success" onclick="updateProduct(${i})"><i class="fa-solid fa-pen-to-square" style='font-size:30px'></i></button>
                </td>
                <td>
                    <button class="btn btn-outline-danger" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash-can" style='font-size:30px'></i></button>
                </td>
           </tr>
            `
        }
    }
    document.getElementById("rowData").innerHTML = temp;
}

// ***************************  Validation Data ******************

function validName(){
    var regex = /^[A-Z][a-z]{3,10}[0-9]?$/;
    var testValid = false;
    if(regex.test(inputName.value)==true){
        document.getElementById('alertName').style.display='none';
        testValid = true;
    }else{
        document.getElementById('alertName').style.display='block';
        testValid = false;
    }
    return testValid;
}
function validPrice(){
    var regex = /^[1-9][0-9]{1,4}$/;
    var testValid = false;
    if(regex.test(inputPrice.value)==true){
        document.getElementById('alertPrice').style.display='none';
        testValid = true;
    }else{
        document.getElementById('alertPrice').style.display='block';
        testValid = false;
    }
    return testValid;
}