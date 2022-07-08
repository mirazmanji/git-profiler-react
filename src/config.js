import axios from 'axios';

const server = "http://localhost:8081"

const gitURL = server + "/"
export const axiosGitUser = axios.create({baseURL: gitURL})

const cacheURL = server + "/users/"
export const axiosCache = axios.create({baseURL: cacheURL})

const openAIURL = server + "/openai/"
export const axiosOpenAI = axios.create({baseURL: openAIURL})
