const carrito = []

class CarritoProduct{
    constructor(id, name, category, cantidad, price, img) {
        this.id = id
        this.name = name
        this.category = category
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
    let productoIdentificado = aProductos.filter(function(objeto) {
      return objeto.id === Number(producto);
    });

    if(productoIdentificado[0].oos){                
        Toastify({
            text: "¡Upps! Lo sentimos, no tenemos mas stock de este producto",
            duration: 3000,
            style: {
                background: "linear-gradient(109.6deg, rgb(162, 2, 63) 11.2%, rgb(231, 62, 68) 53.6%, rgb(255, 129, 79) 91.1%)",
              }
        }).showToast()
    } else {
        productoIdentificado[0].sumarAlCarrito(1)
        getCarritoFrondEnd()
        Toastify({
            text: `Se ha agregado una unidad del producto ${productoIdentificado[0].name} al carrito éxitosamente`,
            duration: 3000,
            style: {
                background: "linear-gradient(to top, #0ba360 0%, #3cba92 100%)",                
              }
        }).showToast()    

    }
}

const removeFromCart = (producto, cantidad, isAll) => {
  let productoIdentificado = aProductos.filter(function(objeto) {
    return objeto.id === Number(producto);
  });

    productoIdentificado[0].quitarDelCarrito(cantidad, isAll)
    getCarritoFrondEnd()
    Toastify({
        text: `Se ha quitado una unidad del producto ${productoIdentificado[0].name} del carrito éxitosamente`,
        duration: 3000,
        style: {
            background: "linear-gradient(to top, #0ba360 0%, #3cba92 100%)",                
          }
    }).showToast()    
}

const contenedorProductos = document.getElementById('productosDestacados')
contenedorProductos.addEventListener('click', (e)=>{
    if(e.target.classList.contains('productos__btnbuy')){
        addToCart(e.target.id)
    }
})


const getCarritoFrondEnd = () => {
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
          <div class="d-flex justify-content-between align-items-center" style="width: 80px;"> 
            <button type="button" class="btn btn-sm btn-outline-secondary btn-decrement"><i class="fas fa-minus"></i></button>
            <h5 class="mb-0">${producto.cantidad}</h5>
            <button type="button" class="btn btn-sm btn-outline-secondary btn-increment"><i class="fas fa-plus"></i></button>
          </div>
            <div style="width: 80px;"> 
              <h5 class="mb-0">$${producto.price}</h5>
            </div>
            <button type="button" class="btndelete"><i class="fas fa-trash-alt" style="color: #cecece;"></i></button>
          </div>
        </div>
      </div>`

      const incrementBtn = div.querySelector('.btn-increment');
      incrementBtn.addEventListener('click', () => {
        addToCart(producto.id);
      });

      const decrement = div.querySelector('.btn-decrement');
      decrement.addEventListener('click', () => {
        removeFromCart(producto.id, 1, false);
      });

      const deletiar = div.querySelector('.btndelete');
      deletiar.addEventListener('click', () => {
        removeFromCart(producto.id, 1, true);
      });
      contenedor.appendChild(div)
    });

}

const btnIncrement = document.querySelectorAll('.btn-increment');

btnIncrement.forEach(btn => {
  btn.addEventListener('click', () => {
    const productId = btn.dataset.productId;
    addToCart(productId);
  });
});