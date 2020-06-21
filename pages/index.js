import { EmptyState, Layout, Page } from '@shopify/polaris'
import React, { useState } from 'react'
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react'
import store from 'store-js'
import axios from 'axios'
import ProductList from '../components/ProductList'

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg'

const Index = () => {
  const [modal, setModal] = useState({ open: false })
  const emptyState = !store.get('ids')

  function handleSelection(resources) {
    const idsFromResources = resources.selection.map((product) => product.id)
    setModal({ open: false })
    store.set('ids', idsFromResources)
    console.log('this is product ids', store.get('ids'))
    deleteApiCall()
    const selectedProducts = resources.selection
    selectedProducts.map((product) => makeApiCall(product))
  }

  async function makeApiCall(product) {
    const url = '/api/products'

    try {
      const response = await axios.post(url, product)
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteApiCall() {
    const url = '/api/products'

    try {
      const response = await axios.delete(url)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Page>
      <TitleBar
        primaryAction={{
          content: 'Select New Products',
          onAction: () => setModal({ open: true }),
        }}
      />
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={modal.open}
        onCancel={() => setModal({ open: false })}
        onSelection={(resources) => handleSelection(resources)}
      />
      {emptyState ? (
        <Layout>
          <EmptyState
            heading="Select products to start"
            action={{
              content: 'Select products',
              onAction: () => setModal({ open: true }),
            }}
            image={img}
          >
            <p>Select products</p>
          </EmptyState>
        </Layout>
      ) : (
        <ProductList />
      )}
    </Page>
  )
}

export default Index
