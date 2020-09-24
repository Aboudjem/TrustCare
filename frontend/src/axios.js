import axios from 'axios';

export default axios.create({
    baseURL: process.env.REACT_APP_RESTDB_BASE,
    headers: {
        'X-apikey': process.env.REACT_APP_RESTDB_API_KEY
    }
})