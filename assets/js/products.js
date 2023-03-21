class Product {
    constructor(name, descr, category, price, stock, id, img) {
        this.name = name
        this.descr = descr
        this.category = category
        this.price = price
        this.stock = stock
        this.id = id
        this.img = img
        this.pu = 0 // unidades en carrito
        this.subtotal = 0
        this.oos = stock < 1 // out of stock
    }

    recalcularStock(){
        this.oos = this.stock < 1
    }

    sumarAlCarrito(cantidad){        
        this.stock -= cantidad
        this.pu += cantidad
        this.subtotal = this.pu * this.price
        this.recalcularStock()
        const productoEnCarrito = carrito.find(esto => esto.id === this.id)

        if(productoEnCarrito){         
            productoEnCarrito.cantidad += cantidad 
            productoEnCarrito.recalcularSubtotales()
            localStorage.setItem("cart", JSON.stringify(carrito));
        } else {
            carrito.push(new CarritoProduct(this.id, this.name, this.category, cantidad, this.price, this.img))
            localStorage.setItem("cart", JSON.stringify(carrito));
        }
    }

    quitarDelCarrito(cantidad, isAll){    
        if(isAll){
            const productoEnCarrito = carrito.find(esto => esto.id === this.id)
            this.stock += productoEnCarrito.cantidad
            this.pu -= productoEnCarrito.cantidad
            this.subtotal = 0
            this.recalcularStock()

            const index = carrito.findIndex(esto => esto.id === this.id)
            carrito.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(carrito));

        } else {
            this.stock += cantidad
            this.pu -= cantidad
            this.subtotal = this.pu * this.price
            this.recalcularStock()
            const productoEnCarrito = carrito.find(esto => esto.id === this.id)

            if((productoEnCarrito.cantidad - cantidad) > 0){         
                productoEnCarrito.cantidad -= cantidad 
                productoEnCarrito.recalcularSubtotales()
                localStorage.setItem("cart", JSON.stringify(carrito));
            } else {
                const index = carrito.findIndex(esto => esto.id === this.id)
                carrito.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(carrito));
            }
        }

    }
}

let aProductos = []
let precioEnvio = 500

const getProducts = () => {
    aProductos = []
    fetch('assets/data/products.json').then(response => response.json()).then(data => {
        aProductos = data.map(product => {
            return new Product(product.name, product.detail, product.category, product.price, product.stock, product.id, product.img);
        });
        mostrarProductos(aProductos)
        carritoStorage = JSON.parse(localStorage.getItem('cart'));
        carritoStorage.forEach(objeto => {
            /*carrito.push(new CarritoProduct(
                objeto.id,
                objeto.name,
                objeto.category,
                objeto.cantidad,
                objeto.price,
                objeto.img
              ))*/
            aProductos.find(esto => esto.id === objeto.id).sumarAlCarrito(objeto.cantidad)
        });
        getCarritoFrondEnd()
    }).catch(error => Toastify({
        text: "¡Upps! Lo sentimos, no pudimos traer los productos. Vuelva a intentarlo. "+error,
        duration: 3000,
        style: {
            background: "linear-gradient(109.6deg, rgb(162, 2, 63) 11.2%, rgb(231, 62, 68) 53.6%, rgb(255, 129, 79) 91.1%)",
          }
    }).showToast());
}

document.addEventListener('DOMContentLoaded', function() {
    getProducts();
});