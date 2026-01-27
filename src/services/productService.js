import api from './api'

// GET all products
export const getProducts = () => {
  return api.get('/products')
}

// CREATE product (with image)
export const createProduct = (formData) => {
  return api.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// UPDATE product (with image)
export const updateProduct = (id, formData) => {
  return api.post(`/products/${id}?_method=PUT`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// DELETE product
export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`)
}
