import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

export const shortenUrl = (url) =>
    axios.post(`${BASE_URL}/api/link`, { url })

export const getAnalytics = (shortID) =>
    axios.get(`${BASE_URL}/api/analytics/${shortID}`)

export const redirectUrl = (shortID) =>
    `${BASE_URL}/api/${shortID}`