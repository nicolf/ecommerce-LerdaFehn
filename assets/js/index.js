const getProductos = (data) => {
    console.log(data)
    const contenedor = document.getElementById("productosDestacados")

    data.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('productos__container-item', 'col-12', 'col-sm-6', 'col-md-4', 'col-lg-3')    
        div.innerHTML += `<div class="productos__item">
        <img src="${producto.img}" class="productos__img" alt="${producto.category} - ${producto.name}">
        <p class="productos__price"><b>$${producto.price}</b></p>
        <p class="productos__category">${producto.category}</p>
        <p class="productos__name">${producto.name}</p>          
        <button type="button" class="productos__btnbuy" id="${producto.id}">COMPRAR</button>
      </div>`

      contenedor.appendChild(div)
    });
}

document.addEventListener('DOMContentLoaded', getProductos(aProductos))