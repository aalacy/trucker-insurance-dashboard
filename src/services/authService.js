import { API } from "../api.js";

export const getExistingDots = async () => {
  return API.get('users/dots')
}

export const getEmail = () => {
  let user = {}
  try {
    user = JSON.parse(localStorage.getItem('token'))
  } catch (e) {}
  return user && user.email || ''
}