import Chart from 'chart.js/auto';
import './chart.css';
import fetchData from './App.js';
import React from 'react';
import {useState, useEffect, useRef} from 'react';

export default function ChartMaker(){
    const [count, setCount] = useState(0);
    useEffect((entries) => {
        updateChart(entries);
    }, [count]);
    
    const canvasRef = useRef(0);

    async function updateChart(data, cur1, cur2){

        var url = 'http://localhost:3002/api/getData/ + ' + data + '/' + cur1 + '/' + cur2;
        const entryData = await fetchData(url);
        const entries = entryData.length;
    
        var arr = [];
        for(var i = 0; i < entries; i++){
            arr.push(i);
        }
    
        var priceData = [];
        for(var i = 0; i < entryData.length; i++){
            priceData.push(entryData.catch(i).price);
        }
        const dataChart = document.getElementById("testGraph");
        let lineChart = new Chart(dataChart, {
            type : 'line',
            labels : {
                arr,
                data: priceData
            },
        });
    }

    return (
        <canvas id="testGraph" ref={canvasRef} width="400px" height="400px" />
    );
}