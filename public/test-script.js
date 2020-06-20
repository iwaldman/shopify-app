function makeHeader(data) {
  const header = $('header.site-header').parent()

  header
    .prepend(`<div>${data}</div>`)
    .css({ 'background-color': 'orange', 'text-align': 'center' })
}

async function fetchProducts() {
  try {
    const response = await fetch(
      'https://cors-anywhere.herokuapp.com/https://c8de2265796e.ngrok.io/api/products?shop=dev-learning-app-store.myshopify.com/'
    )

    const { data } = await response.json()

    makeHeader(data)
  } catch (error) {
    console.log(error)
  }
}

fetchProducts()
