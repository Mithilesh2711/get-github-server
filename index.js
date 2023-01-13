const express = require('express')
const bodyParser = require('body-parser')
const {Octokit} = require('octokit')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config();


const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3005

var resp = {}

app.get('/user/:userId', async (req,res) => {
    const octokit = new Octokit({
        auth: process.env.TOKEN
    })

    try{
        var data = await octokit.request('GET /users/{username}', {
            username: req.params.userId
        })
    }

    catch(e){
        if(e.status===500){
            res.status(500).send({"message": "Internal Server Error"});
        }
        else{
            res.status(e.status).send({"message": "Not Found"});     
        }
        
    }

    if(data && data.data){
        resp["userId"] = data.data.login;
        resp["avatar_url"] = data.data.avatar_url;
        resp["html_url"] = data.data.html_url;
        resp["name"] = data.data.name;
        resp["bio"] = data.data.bio
        resp["followers"] = data.data.followers
        resp["following"] = data.data.following
        resp["public_repos"] = data.data.public_repos
        resp["twitter_username"] = data.data.twitter_username
        resp["repos"] = []

        if(resp["public_repos"]>0){
            for(let i=1;i<=Math.ceil(resp.public_repos/100);i++){
                const repos = await octokit.request(`GET /users/${req.params.userId}/repos?per_page=100&page=${i}`, {
                    username: req.params.userId
                })
        
                if(repos.data && repos.data.length>0){
                    var repo = {};
                    for(let j=0;j<repos.data.length;j++){
                        repo['name'] = repos.data[j].name;
                        repo['html_url'] = repos.data[j].html_url;
                        repo['description'] = repos.data[j].description;
                        repo['topics'] = repos.data[j].topics;

                        resp["repos"].push(repo);
                        repo={};
                    }
                }
            }
        }
        res.status(200).send({
            "message": "success",
            "data": resp
        });
    }
})


app.listen(PORT, ()=>{
    console.log('Server listening on ', PORT);
})