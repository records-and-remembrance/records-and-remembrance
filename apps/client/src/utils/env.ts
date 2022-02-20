import * as envVar from 'env-var'

const CONTENTFUL_API_URL = envVar
  .get('CONTENTFUL_API_URL')
  .required()
  .asString()
const CONTENTFUL_ACCESS_TOKEN = envVar
  .get('CONTENTFUL_ACCESS_TOKEN')
  .required()
  .asString()

export const env = {
  CONTENTFUL_API_URL,
  CONTENTFUL_ACCESS_TOKEN
}
