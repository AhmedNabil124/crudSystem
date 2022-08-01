var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescriptionInput = document.getElementById("productDescriptionInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var currentindex = 0;
var productList;


// ********************** Locale Storage ************************* 
if(localStorage.getItem('myProduct') != null){
  productList = JSON.parse(localStorage.getItem('myProduct')) ;
  displayProducts(productList);
}else{
  productList =[];
}
// *****************************  add Product ************************* 
function addProduct() {
  if(validateProductName() && validateProductPrice() == true ){
      var Product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
      };
      productList.push(Product);
      console.log(productList);
      localStorage.setItem('myProduct' , JSON.stringify(productList) );
      clearForm();
      displayProducts(productList);
  }
}


// ***************************** clear form ************************* 

function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
}


// ********************** display products ************************* 
function displayProducts(List) {
  var cartona = "";
  for (let i = 0; i < List.length; i++) {
    cartona += `
        <tr>
            <td>${i}</td>
            <td>${List[i].name}</td>
            <td>${List[i].price}</td>
            <td>${List[i].category}</td>
            <td>${List[i].description}</td>
            <td><button class="btn btn-outline-success" onclick=setFormForUpdate(${i})><i class="fa-solid fa-pen-to-square "></i></button></td>
            <td><button class="btn btn-outline-danger" onclick=deleteProducts(${i})><i class="fa-solid fa-trash-can"></i></button></td>
        </tr>
        `;
  }
  document.getElementById('tableBody').innerHTML = cartona;
}

// ********************** search products *************************
function searchProduct(searchTerm){
    var searchResult = [];
    for (let i = 0; i < productList.length; i++) {
      if(productList[i].name.toLowerCase().includes(searchTerm.toLowerCase())== true){
        searchResult.push(productList[i]);
      }
    }
    displayProducts(searchResult);
}

// ********************** delete products ************************* 
function deleteProducts(deleteIndex){
  productList.splice(deleteIndex,1);
  localStorage.setItem('myProduct' , JSON.stringify(productList) );
  displayProducts(productList);
}
// ********************** update products ************************* 
function setFormForUpdate(updateIndex){
  currentindex = updateIndex;
  productNameInput.value = productList[updateIndex].name;
  productPriceInput.value = productList[updateIndex].price;
  productCategoryInput.value = productList[updateIndex].category;
  productDescriptionInput.value = productList[updateIndex].description;
  updateBtn.classList.replace('d-none','d-inline-block');
  addBtn.classList.add('d-none');
}
function addEditUpdate(){
  productList[currentindex].name = productNameInput.value;
  productList[currentindex].price = productPriceInput.value;
  productList[currentindex].category = productCategoryInput.value;
  productList[currentindex].description = productDescriptionInput.value;
  localStorage.setItem('myProduct' , JSON.stringify(productList) );
  displayProducts(productList);
  clearForm();
  updateBtn.classList.replace('d-inline-block','d-none');
  addBtn.classList.remove('d-none');
}

// ********************** Reqular Expression  ************************* 

function validateProductName(){
  var regex = /^[A-Z][a-z]{3,8}$/;
  if(regex.test(productNameInput.value) == true){
    document.getElementById('alertName').style.display='none';
    return true;
  }else{
    document.getElementById('alertName').style.display='block';
    return false;
  }
}


function validateProductPrice(){
  var regex = /^[1-9][0-9]{1,4}$/;
  if(regex.test(productPriceInput.value) == true){
      document.getElementById('alertPrice').style.display='none';
      return true;
  }else{
      document.getElementById('alertPrice').style.display='block';
      return false;
  }
}