// Import the necessary dependencies
const products = require('./products')
const fs = require('fs')
const lodash = require("lodash");
const productsList = require("./products.json").products;
const getRequestData = require('./utils');


const getProducts = () => {
  // get all products
  return ( JSON.stringify(productsList));

}

const getProductsById = (productId, done) => {
  let product = null

  product = productsList.find(x => x.id === parseInt(productId))

  // get a product by ID
  if (product == undefined  ||product== null){
    return done (("Requested product doesn't exist..!"));
  }
  else

  return done(null, JSON.stringify(product));
}

const saveProduct = (newProduct, done) => {
if (productsList.find(x => x.id === parseInt(newProduct.id))!= null){
 return done("Product already exists..!");
}
else 
  productsList.push(newProduct)
 // save a product
  return done(null, JSON.stringify(productsList));
}

const updateProduct = (productId, updateData, done) => {
  let updatedProductList = null;
  let checkExist = false; 
  updatedProductList = [].concat(productsList);

  if (updatedProductList.find(x => x.id === parseInt(productId))!= null){
  updatedProductList[productId-1].name = updateData.name; 
  updatedProductList[productId-1].description = updateData.description; 
  updatedProductList[productId-1].price = updateData.price; 
  updatedProductList[productId-1].quantity = updateData.quantity; 


return done(null, JSON.stringify(updatedProductList));
  }
else { return done ("Requested product doesn't exist..!")

  }
  

}

const deleteProduct = (productId, done) => {
  if (productsList.find(x => x.id === parseInt(productId))== null){
    console.log("list before deleting",productsList); 

    //checking weather array contain the id
    return done ("Requested product doesn't exist..!")

}else{    
  console.log("list before deleting",productsList); 

    productsList.splice(productsList.indexOf(productId), 1);  //deleting
    console.log("list after deleting",productsList); 

  // delete a product    
   return done(null, JSON.stringify(productsList));
}

}


module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}