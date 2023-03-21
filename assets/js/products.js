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
        } else {
            carrito.push(new CarritoProduct(this.id, this.name, cantidad, this.price, this.img))
        }
    }
}

let producto1 = new Product("Remera Pink", "Esta es una Remera Pink", "Remeras", 500, 25, 1, "assets/img/products/1.jpeg")
let producto2 = new Product("Pantalon Luis", "Esto es un Pantalon Luis", "Pantalones", 1000, 10, 2, "assets/img/products/2.jpeg")
let producto3 = new Product("Solo1", "Este es un producto que tiene una sola unidad en stock", "Remeras", 2100, 1, 3, "assets/img/products/3.jpeg")
let producto4 = new Product("SinStock", "Este es un producto sin stock", "Pantalones", 2500, 0, 4, "assets/img/products/4.jpeg")
let precioEnvio = 500

const aProductos = [producto1, producto2, producto3, producto4]