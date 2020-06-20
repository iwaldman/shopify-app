console.log('This is coming from script tag API!')

const header = $('header.site-header').parent()

header
  .prepend('<div>Hello from the Public folder</div>')
  .css({ 'background-color': 'orange', 'text-align': 'center' })
