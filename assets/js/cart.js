const carrito = []

class CarritoProduct{
    constructor(id, name, cantidad, price, img) {
        this.id = id
        this.name = name
        this.cantidad = cantidad
        this.price = price        
        this.img = img
        this.subtotal = cantidad * price
    }

    recalcularSubtotales(){
        this.subtotal = this.cantidad * this.price
    }
}

const addToCart = (producto) => {
    let productoIdentificado = eval("producto"+producto)    

    if(productoIdentificado.oos){                
        Toastify({
            text: "¡Upps! Lo sentimos, no tenemos mas stock de este producto",
            duration: 3000,
            style: {
                background: "linear-gradient(109.6deg, rgb(162, 2, 63) 11.2%, rgb(231, 62, 68) 53.6%, rgb(255, 129, 79) 91.1%)",
              }
        }).showToast()
    } else {
        productoIdentificado.sumarAlCarrito(1)
        sumarAlCarritoFrontEnd()
        Toastify({
            text: `Se ha agregado una unidad del producto ${productoIdentificado.name} al carrito éxitosamente`,
            duration: 3000,
            style: {
                background: "linear-gradient(to top, #0ba360 0%, #3cba92 100%)",                
              }
        }).showToast()    

    }
}

const contenedorProductos = document.getElementById('productosDestacados')
contenedorProductos.addEventListener('click', (e)=>{
    if(e.target.classList.contains('productos__btnbuy')){
        addToCart(e.target.id)
    }
})


const sumarAlCarritoFrontEnd = () => {
    const contenedor = document.getElementById('carrito-contenedor')
    contenedor.innerHTML = ""
    carrito.forEach(producto => {
        const div = document.createElement('div')
        div.classList.add('card', 'mb-3')              
        div.innerHTML = `<div class="card-body">
        <div class="d-flex justify-content-between">
          <div class="d-flex flex-row align-items-center">
            <div>
              <img src="${producto.img}"
                class="img-fluid rounded-3" alt="${producto.name}" style="width: 65px;">
            </div>
            <div class="ms-3">
              <h5>${producto.name}</h5>
              <p class="small mb-0">${producto.category}</p>
            </div>
          </div>
          <div class="d-flex flex-row align-items-center">
            <div style="width: 50px;">
              <h5 class="fw-normal mb-0">${producto.cantidad}</h5>
            </div>
            <div style="width: 80px;">
              <h5 class="mb-0">$${producto.price}</h5>
            </div>
            <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
          </div>
        </div>
      </div>`
      contenedor.appendChild(div)
    });

}