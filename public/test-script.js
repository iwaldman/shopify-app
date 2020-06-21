const header = $('header.site-header').parent()

function makeHeader(data) {
  header
    .prepend(`<div>${data}</div>`)
    .css({ 'background-color': 'orange', 'text-align': 'center' })
}

const body = $('body')
body.css({ position: 'relative' })

const shop = Shopify.shop

const makeApp = (products) => {
  const bestSellerContainer = $(`
    <div style="overflow-y: scroll;">
      <h3>Our Best Sellers</h3>
      ${products
        .map((item) => {
          return `
          <a 
            href="/products/${item.handle}" 
            style="display: flex; align-items: center; padding: 20px 10px; border-top: 1px solid black;"
          >
            <img 
              src=${item.images[0].originalSrc} 
              style="width: 75px;"
            />
            <div 
              style="display: flex; justify-content: space-between; align-items: start; width: 100%;"
            >
              <p style="padding: 0 10px;">${item.title}</p>
              <p>${item.variants[0].price}</p>
            </div>
          </a>
        `
        })
        .join('')}
    </div>
  `).css({
    position: 'fixed',
    backgroundColor: '#ffffff',
    border: '1px solid black',
    bottom: '80px',
    right: '25px',
    height: '400px',
    width: '350px',
    display: 'none',
    padding: '10px',
  })

  const bestSellerButton = $('<img />')
    .attr(
      'src',
      'https://cdn.shopify.com/s/files/1/0325/3174/2765/files/bestseller-button-trans.png?v=1584741923'
    )
    .css({
      position: 'fixed',
      width: '150px',
      bottom: '20px',
      right: '20px',
      cursor: 'pointer',
    })

  body.append(bestSellerContainer)
  body.append(bestSellerButton)

  bestSellerButton.click(() =>
    bestSellerContainer.slideToggle('slow', () => console.log('slideToggle'))
  )
}

async function fetchProducts() {
  try {
    const response = await fetch(
      'https://cors-anywhere.herokuapp.com/https://6f3bdec3c964.ngrok.io/api/products?shop=dev-learning-app-store.myshopify.com/'
    )

    const { data } = await response.json()

    //makeHeader(data)

    makeApp(data)
  } catch (error) {
    console.log(error)
  }
}

fetchProducts()
