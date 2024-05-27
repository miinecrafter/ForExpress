import { login, getHistory, getBalance, validateUser, signUp, updateBalance, updateHistory } from './forexDB.js';
import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json()); 

const port = 3001;
app.use(cors());

app.get('/api/getUser/:username', async (req, res) => {
    console.log("get works");
    var username = req.params.username;

    var balance = await getBalance(username);
    var history = await getHistory(username);

    console.log(history);

    //console.log("DATA : ")
    //console.log(balance + " " + history);
    res.status(244).send({
        balance : balance,
        history : history
    });
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