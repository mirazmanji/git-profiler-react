import axios from 'axios';

// const gitURL = 'https://api.github.com/users/'
const gitURL = 'http://localhost:8081/'
export const axiosGitUser = axios.create({baseURL: gitURL})

const cacheURL = 'http://localhost:8081/users/'
export const axiosCache = axios.create({baseURL: cacheURL})

