import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const NewChart = ({data, options, width, height}) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    useEffect(() => {
        // Check if chart instance exists and destroy it before creating a new one
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }
        
        // Create new chart instance
        const ctx = chartRef.current.getContext('2d');
        chartInstanceRef.current = new Chart(ctx, {
            type: 'line', // Specify your chart type
            data: data,
            options: options,
        });
        
        // Cleanup function to destroy the chart instance when the component unmounts
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [data, options]);
    return (
        <div>
            <canvas ref={chartRef} id="testGraph" style={{width: `800px`, height: `400px`}} />
        </div>
    );
}

export default NewChart;