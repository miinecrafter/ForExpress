import { login, getLogins, getFavnum, validateUser, signUp, updateFavnum } from './forexDB.js';
import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json()); 

const port = 3001;
app.use(cors());

app.get('/api/tshirt', async (req, res) => {
    res.status(244).send({ message : 'Potato'});
});

app.get('/api/getUser/:username/:pass', async (req, res) => {
    console.log("get works");
    var username = req.params.username;
    var pass = req.params.pass;

    if(await login(username, pass)){
        var favnum = await getFavnum(username);
        var logins = await getLogins(username);

        console.log(favnum + " " + logins);

        res.status(244).send({
            favNum : favnum,
            numLogs : logins
        });

    } else{
        // tell the user authentication failed
        res.status(410).send({message : "Authentication failed."})
    }
});

app.post('/api/signUser', async (req, res) => {
    console.log("post works");
    
    console.log(req.body);
    const {username, password} = req.body;
    var pass = password;
    console.log(pass);
    if(await validateUser(username, pass) == 0){
        await signUp(username, pass);
        res.status(245).send({ message : "Sign up successful"});
    }
    else{
        res.status(300).send({ message : "Username or password in use"});
    }
    
});

app.put('/api/favnum/:newnum', async (req, res) => {
    console.log("put works");
    var newfav = req.params.newnum;
    await updateFavnum(username, newfav);
});

app.listen(port, () => console.log("listening to port : " + port));