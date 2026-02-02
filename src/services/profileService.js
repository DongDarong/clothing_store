import api from './api'

export const getProfile = () => api.get('/profile')

export const updateProfile = (data) => {
  const form = new FormData()
  form.append('name', data.name)
  form.append('email', data.email)

  if (data.avatar) {
    form.append('avatar', data.avatar)
  }

  return api.post('/profile', form)
}
