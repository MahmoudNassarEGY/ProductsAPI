//Import the necessary dependencies
const http = require('http')
const { type } = require('os')
const PORT = process.env.PORT || 5000
const products = require('./products')
const fs = require('fs')

const productsService = require ('./productsService')
// Define a prot at which the server will run

const getRequestData = require('./utils');

const server = http.createServer(async (req, res) => {
  // Get all products
  if (request.url === '/api/v1/products'&& request.method=== 'GET'){
    response = response.writeHead(200, {
        'content-type': 'application/json'
    })
    response.end(JSON.stringify(productsService.getProducts))
}

  // Get a product with specified id
  else if (request.url.match(/\/api\/v1\/products\/([0-9])/) && request.method === 'GET'){
    const id = request.url.split("/")[4]
    const product = products.find(t=>t.id === parseInt(id))
    if (!product){
        response.writeHead(404,{
            'content-type': 'application/json'
        })
        response.end('No product with the specified id is available')
    }
    else{
        const index = products.indexof(product)
        productsService.getProductsById(index)
        response.writeHead(200,{
            'content-type' : 'application/json'
        })
        response.end(JSON.stringify(products))
      }
}

  // Create a new product
  else if (request.url === '/api/v1/products' && request.method == 'POST'){
    let req_body = await getRequestData(request)
    products.push(JSON.parse(req_body))
    response.writeHead(201,{
        'content-type':'application/json'
    })
    response.end(JSON.stringify(JSON.parse(req_body)))
}
  // Update a specific product
  else if (request.url.match(/\/api\/v1\/products\/([0-9])/) && request.method === 'PUT'){
    const id = request.url.split("/")[4]
    const product = products.find(t=>t.id === parseInt(id))
    if (!product){
        response.writeHead(404,{
            'content-type': 'application/json'
        })
        response.end('No product with the specified id is available')
    }
    else{
        const index = products.indexof(product)
        products.splice(index,1)
        response.writeHead(200,{
            'content-type' : 'application/json'
        })
        response.end('Updated the specified product')
    }
}
  // Delete a specific Product
  else if (request.url.match(/\/api\/v1\/products\/([0-9])/) && request.method === 'DELETE'){
    const id = request.url.split("/")[4]
    const product = products.find(t=>t.id === parseInt(id))
    if (!product){
        response.writeHead(404,{
            'content-type': 'application/json'
        })
        response.end('No product with the specified id is available')
    }
    else{
        const index = products.indexof(product)
        products.splice(index,1)
        response.writeHead(200,{
            'content-type' : 'application/json'
        })
        response.end('Deleted the specified product')
    }
}
});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})

server.on('error',(error)=>{
  if (error.code = 'EADRINUSE'){
      console.log('Port already in use')
  }
})