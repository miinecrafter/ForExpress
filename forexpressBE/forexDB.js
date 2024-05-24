import mysql from 'mysql2/promise';

let con;

main();

async function main(){
  con = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Rayaan21",
    database: "users"
  });
  
  await testQuery(); 
}

async function testQuery(){
  //signUp('rayaan', 'rayaan21');
}

/*
  check if username exists, validates username password combination
*/

async function validateUser(username, password){

  const [rows, fields] = await con.execute('SELECT password FROM data WHERE username = \'' + username + '\'');
  
  if(rows.length == 1){
    if(password == rows[0].password){
      console.log("Correct Password");
      return 2;
    }
    else{
      console.log("Wrong Password");
      return 1;
    }
  }
  else{
    console.log("No username found. " + username + " " + password);
    return 0;
  }
}

/*
  authenticates user. If authenticated, returns data and adds 1 to # logins
*/

async function signUp(username, pass){
  console.log('insert into data values (\'' + username + '\',' + '\'' + pass + '\',' + '\'0\',' + '\'null\')' );
  con.execute('insert into data values (\'' + username + '\',' + '\'' + pass + '\',' + '\'0\',' + '\'null\')' );
}

async function login(username, password){
  if(await validateUser(username, password) == 2){
    console.log("Authentication succeeded.");
    var userLogins = await getLogins(username);
    userLogins++;
    con.execute('update data set logins = \'' + userLogins + '\' where username = \'' + username + '\'');
    console.log("Number of logins : " + userLogins);
    var favoriteNumber = await getFavnum(username);
    console.log("Favorite number : " + favoriteNumber);
    return true;
  }
  else{
    console.log("Authentication failed.");
    return false;
  }
}

/*
  get number of logins from user
*/

async function getLogins(username){
  try{
    const [rows, fields] = await con.execute('SELECT logins FROM data WHERE username = \'' + username + '\'');
    return rows[0].logins;
  } catch(err){
    console.log("ERROR : " + err);
  }
}

/*
  get favorite number of user
*/

async function getFavnum(username){
  try{
    const [rows, fields] = await con.execute('SELECT favnum FROM data WHERE username = \'' + username + '\'');
    return rows[0].favnum;
  } catch(err){
    console.log("ERROR : " + err);
  }
}

async function updateFavnum(username, newnum){
  try{
    await con.execute('update data set favnum = \'' + newnum + '\' where username = \'' + username + '\'');
  }catch(err){
    console.log("ERROR : " + err)
  }
}

export { login, getLogins, getFavnum, validateUser, signUp, updateFavnum };
