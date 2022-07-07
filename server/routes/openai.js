const { Configuration, OpenAIApi } = require("openai");

//require('dotenv').config()
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

var express = require("express");
const axios = require("axios");
const { listenerCount } = require("../models/user");
var router = express.Router();

/* SEND request to Open Source AI */
router.get("/:userName", async (req, res) => {

  const gitURL = "https://api.github.com/users/";
  const axiosGitHub = axios.create({ baseURL: gitURL });
  try {
    data = await axiosGitHub.get(`${req.params.userName}/repos`);
    stars = data.data.reduce((accumulator, item) => {
      return accumulator + item.stargazers_count;
    }, 0);
    const repoList = getRepoNames(data.data);
    console.log(repoList)
    
    const readMes = repoList.map(getReadme.bind(1, req.params.userName))    
    res.status(200).json({
      // data: data.data,
      id: data.data[0].owner.id,
      handle: data.data[0].owner.login,
      avatarURL: data.data[0].owner.avatar_url,
      stars: stars,
      repoReadMes: await Promise.allSettled(readMes),
    });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

function getRepoNames(data) {
  const repoAttribute = (obj) => {
    const url = obj.name;
    const defaultBranch = obj.default_branch;
    return { name: url, defaultBranch: defaultBranch };
  };
  const repoList = data.map(repoAttribute);
  return repoList;
}

async function getReadme(owner, repo) {
  let branch = repo.defaultBranch;
  let repoName = repo.name

  server = "https://raw.githubusercontent.com";
  const axiosRepo = axios.create({ baseURL: `${server}/${owner}/${repoName}/` });

  try {
    const response = await axiosRepo.get(`${branch}/README.md`)

    const summaryResponse = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Summarize this for a second-grade student:\n\n${response.data}`,
      temperature: 0.7,
      max_tokens: 1500,
      top_p: .9,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    saveRecord = {
      owner: owner,
      repoName: repoName,
      branch: branch,
    }
    saveRecord["summary"] = summaryResponse.data.choices[0].text
    saveRecord["readme"] = response.data
    return saveRecord

  } catch (err) {
    console.log("got error", err.message);
  }
}

async function getSummary(readme) {
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Summarize this for a second-grade student:\n\n${readme}`,
    temperature: 0.7,
    max_tokens: 1500,
    top_p: .9,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response  
}

module.exports = router;
