import { insertPrice, currencyComparison } from './curDB.js';
import mysql from 'mysql2/promise';

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

let con;

main();

async function priceGeneratorServer(){
    
    while(true){

        for(var i = 0; i < currencyComparison.length; i++){
            var dates = getNextDate();
            var price = generateNewPrice(price);

            var year = dates[0];
            var month = dates[1];
            var day = dates[2];
            var hour = dates[3];
            var minute = dates[4];
            var cur1 = currencyComparison.at(i).at(0);
            var cur2 = currencyComparison.at(i).at(1);

            insertPrice(year, month, day, hour, minute, price, cur1, cur2);
        }

        sleep(60000);

    }
}

async function main(){
    con = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Rayaan21",
      database: "currencies"
    });

    getNextDate(2024, 1, 23, 12, 51, 2024, 5, 23, 12, 51, 0.5); 
}

function genChange(){ return ((Math.random() * 2 - 1) / 10).toFixed(5); }

function leap(year){
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

async function getNextDate(year, month, day, hour, minute, stopYear, stopMonth, stopDay, stopHour, stopMinute){
    minute++;
    if(minute == 60){
        minute = 0;
        hour++;
    }
    if(hour == 24){
        hour = 0;
        day++;
    }
    if((    (day == 32) && (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)) || 
            ((day == 31) && (month == 4 || month == 6 || month == 9 || month == 11)) || 
            (day == 29 && month == 2 && !leap(year)) || 
            (day == 30 && month == 2 && leap(year))){

        day = 1;
        month++;

    }
    if(month == 13){
        month = 1;
        year++;
    }
    const dateArray = [year, month, day, hour, minute];
    return dateArray;
}
async function generateNewPrice(price){
    var r = await genChange();
    r = parseFloat(r);
    if(price + r > 0 && price + r < 1){
        price += r;
        price = price.toFixed(5);
    }
    return price;
}