import { EmptyState, Layout, Page } from '@shopify/polaris'
import React, { useState } from 'react'

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg'

const Index = () => (
  <Page>
    <Layout>
      <EmptyState
        heading="Manage your inventory transfers"
        action={{
          content: 'Select products',
          onAction: () => console.log('clicked'),
        }}
        image={img}
      >
        <p>Select products</p>
      </EmptyState>
    </Layout>
  </Page>
)

export default Index
