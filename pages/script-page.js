import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  Page,
  Layout,
  Card,
  Button,
  ResourceList,
  Stack,
} from '@shopify/polaris'

const CREATE_SCRIPT_TAG = gql`
  mutation ScriptTagCreate($input: ScriptTagInput!) {
    scriptTagCreate(input: $input) {
      scriptTag {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`

const DELETE_SCRIPT_TAG = gql`
  mutation deleteScriptTag($id: ID!) {
    scriptTagDelete(id: $id) {
      deletedScriptTagId
      userErrors {
        field
        message
      }
    }
  }
`

const QUERY_SCRIPT_TAGS = gql`
  query getScriptTags {
    scriptTags(first: 5) {
      edges {
        node {
          id
          src
          displayScope
        }
      }
    }
  }
`

function ScriptPage() {
  const { loading, error, data } = useQuery(QUERY_SCRIPT_TAGS)
  const [createScripts] = useMutation(CREATE_SCRIPT_TAG)
  const [deleteScripts] = useMutation(DELETE_SCRIPT_TAG)

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card title="These are the Script Tags:" sectioned>
            <p>Create or Delete a Script Tag</p>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card title="Create Script Tag" sectioned>
            <Button
              primary
              size="slim"
              type="submit"
              onClick={() => {
                createScripts({
                  variables: {
                    input: {
                      src: 'https://495805e98b65.ngrok.io/test-script.js',
                      displayScope: 'ALL',
                    },
                  },
                  refetchQueries: [{ query: QUERY_SCRIPT_TAGS }],
                })
              }}
            >
              Create Script Tag
            </Button>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <ResourceList
              showHeader
              resourceName={{ singular: 'Script Tag', plural: 'Script Tags' }}
              items={data.scriptTags.edges}
              renderItem={(item) => {
                return (
                  <ResourceList.Item id={item.id}>
                    <Stack>
                      <Stack.Item>
                        <p>{item.node.id}</p>
                      </Stack.Item>
                      <Stack.Item>
                        <Button
                          type="submit"
                          onClick={() => {
                            deleteScripts({
                              variables: {
                                id: item.node.id,
                              },
                              refetchQueries: [{ query: QUERY_SCRIPT_TAGS }],
                            })
                          }}
                        >
                          Delete Script Tag
                        </Button>
                      </Stack.Item>
                    </Stack>
                  </ResourceList.Item>
                )
              }}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default ScriptPage

/*


return (
    <div>
      <h1>These are the script tags</h1>
      <button
        type="submit"
        onClick={() => {
          createScripts({
            variables: {
              input: {
                src: 'https://c8de2265796e.ngrok.io/test-script.js',
                displayScope: 'ALL',
              },
            },
            refetchQueries: [{ query: QUERY_SCRIPT_TAGS }],
          })
        }}
      >
        Create Script Tag
      </button>
      {data.scriptTags.edges.map((item) => {
        return (
          <div key={item.node.id}>
            <p>{item.node.id}</p>
            <button
              type="submit"
              onClick={() => {
                deleteScripts({
                  variables: {
                    id: item.node.id,
                  },
                  refetchQueries: [{ query: QUERY_SCRIPT_TAGS }],
                })
              }}
            >
              deleteScriptTag
            </button>
          </div>
        )
      })}
    </div>
  )


*/
