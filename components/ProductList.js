import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import {
  Card,
  ResourceList,
  Stack,
  TextStyle,
  Thumbnail,
} from '@shopify/polaris'
import store from 'store-js'

const GET_PRODUCTS_BY_ID = gql`
  query GetProducts($ids: [ID]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        title
        handle
        images(first: 1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
              price
            }
          }
        }
      }
    }
  }
`

const ProductList = () => {
  return (
    <div>
      <h1>Product List</h1>
    </div>
  )
}

export default ProductList
