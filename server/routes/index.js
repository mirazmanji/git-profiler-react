var express = require('express');
const axios = require('axios')
var router = express.Router();

/* GET User Profile from GitHub */
router.get('/:userName', async (req, res) => {
    const gitURL = 'https://api.github.com/users/'
    const axiosGitHub = axios.create({baseURL: gitURL})
    console.log(req.params.userName)
    try {
      data = await axiosGitHub.get(`${req.params.userName}/repos`);
      stars = data.data.reduce((accumulator, item) => {
        return accumulator + item.stargazers_count;
      }, 0);
      res.status(200).json({
        stars: stars,
        avatarURL: data.data[0].owner.avatar_url,
        handle: data.data[0].owner.login,
        id: data.data[0].owner.id
      })
    } catch(err) {
      res.status(500).json({message: err.message})
    }   
})
module.exports = router;
