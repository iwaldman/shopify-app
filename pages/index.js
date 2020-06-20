import { EmptyState, Layout, Page } from '@shopify/polaris'
import React, { useState } from 'react'
import { ResourcePicker } from '@shopify/app-bridge-react'
import store from 'store-js'
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
  }

  return (
    <Page>
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
