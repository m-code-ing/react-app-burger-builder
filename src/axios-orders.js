import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://react-burger-app-34ff2-default-rtdb.firebaseio.com/'
});

export default instance;