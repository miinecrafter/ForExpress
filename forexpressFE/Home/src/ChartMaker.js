import NewChart from './NewChart.js';
import fetchData from './App.js';
import React from 'react';
import './ChartMaker.css'
import {useState, useEffect, useRef} from 'react';

export default function ChartMaker(){
    const [pot, setPot] = useState();
    const [label, setLabel] = useState([1, 2, 3, 4, 5]);
    const [data, setData] = useState([2, 4, 6, 8, 10]);

    const fetchHistory = async () => {
        const url = `http://localhost:3002/api/getData/NowData/usd/dkk`;
        console.log(url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        var oldData = await response.json();
        console.log(oldData);
        var hist = await oldData.data;
        hist = await JSON.parse(hist);
        console.log("FINAL DATA : " + hist);
        if(Array.isArray(hist)){
          console.log("YAY!");
        }
        else{
          console.log("NO :(");
        }
        var labels = [];
        var newData = [];
        for(var i = 0; i < hist.length; i++){
            labels.push(i);
            newData.push(hist[i].price);
            console.log("ENTRY : " + i);
            console.log("DATA : " + hist[i].price)
        }
        console.log(labels);
        console.log(newData);
        await setLabel(labels);
        await setData(newData);
        console.log("test:" + labels + " " + newData);
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    useEffect(() => {
        setChartData({
            labels: label,
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(30, 30, 30 0.8)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 2,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: data,
                },
            ],
        });
    }, [data, label]);

    const [chartData, setChartData] = useState({
        labels: label,
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: 'rgba(30, 30, 30 0.8)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: data,
          },
        ],
      });
    
      const [chartOptions, setChartOptions] = useState({
        responsive: false,
        maintainAspectRatio: false,
      });
    
    return (
        <div id="chartContainer">
            <NewChart data={chartData} options={chartOptions} />
        </div>
    );
}