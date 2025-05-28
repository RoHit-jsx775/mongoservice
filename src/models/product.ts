

// interface Product{
//     id: number,
//     name: string,
//     price: number,
//     description: string,
// }

// const products: Product[]=[];




// export function createProduct(input : Omit<Product, "id">){
    
//    const newProduct= {
//            id: products.length +1,
//            name:input.name,
//            price:input.price,
//            description: input.description
//        };
//        products.push(newProduct);
//        return newProduct
// }


//  function getallProduct(){
//    return products;
// }

// export function getProductById(id:number){
//     const product = products.find((p) => p.id === id);
//     return product;

// }

// export function updateProductById(input:Product){
//     const product = products.find((p) => p.id=input.id);
//     const productIndex=products.findIndex((p)=>p.id===input.id);
//     products[productIndex]={
//         ...products[productIndex],
//        name: input.name,
//        price: input.price,
//        description: input.description,
//     };
//     return products[productIndex];
// }


// export function deleteProductById(id:number){
//     const productIndex=products.findIndex((p)=>p.id===id);
//     if(productIndex===-1){
//         return null;
//     }
//     const deletedProduct= products.splice(productIndex, 1);
//     console.log("debug products",productIndex, deletedProduct);                                         
//     return deletedProduct; 
// }

// export {getallProduct, products}; 