
import React, {useRef, useEffect, useState} from 'react';
import './LineChart.scss';
import {Line } from 'react-chartjs-2';
//import caseTimeSeries from '../data/caseTimeSeries';

const LineChart = props =>{
    const labels = [];
    const totalConfirmed = [],totalRecovered= [], totalDeceased = [];
    caseTimeSeries.forEach((caseTime,i)=>{
        labels.push(caseTime.date);
        totalConfirmed.push(caseTime.totalconfirmed);
        totalRecovered.push(caseTime.totalrecovered);
        totalDeceased.push(caseTime.totaldeceased);
    });

    const state = {
        labels :labels,
        datasets: [
            {
                label: 'Recovered',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#4ea005',
                borderColor: '#4ea005',
                borderWidth: 2,
                data: totalRecovered
            },
            {
                label: 'Confirmed',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#e61212',
                borderColor: '#e61212',
                borderWidth: 2,
                data: totalConfirmed
            },
            {
                label: 'Deceased',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#dcdcdc52',
                borderColor: '#dcdcdc52',
                borderWidth: 2,
                data: totalDeceased
            }   
        ]
    };
    const [covidData,setCovidData] = useState([]);
    useEffect(()=>{
        // Called Loading Data
        const fetchCovidData = async ()=>{
            const res = await fetch('https://api.covid19india.org/data.json');
            const data = await res.json();
            setCovidData(data);
        };
    },[]);
    return (
        <>
            <div className="line-chart-container">
                <div className="line-chart">
                <Line
                    data={state}
                    options={{
                        responsive:true,
                        title:{
                        display:true,
                        text:'Total Cases',
                        fontSize:15
                        },
                        legend:{
                        display:true,
                        position:'right'
                        }
                    }}
                />
                </div>
            </div>
        </>
    );
}
export default LineChart;