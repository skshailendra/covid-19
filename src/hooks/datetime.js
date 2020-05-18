import {useEffect, useState,useContext} from 'react';
import {FetchDataContext} from '../context/fetch-data';

const useDatetime = ()=>{
    const [lastupdatedTime,setLastUpdatedTime] = useState('0');
    const fetchCovidData = useContext(FetchDataContext);
    const statewise = fetchCovidData.statewise[0];
    let lastUpdatedTime = '';
    const formatDateTime = ()=>{
        let extracttime = statewise.lastupdatedtime.split(" ")[1].split(":");
        let hr = Math.abs(new Date().getHours() - parseInt(extracttime[0]));
        let min = Math.abs(new Date().getMinutes() - parseInt(extracttime[1]));
        let sec = Math.abs(new Date().getSeconds() - parseInt(extracttime[2]));
        lastUpdatedTime = hr > 0 ? hr+" hr" : '';
        lastUpdatedTime+= (hr == 0 && min >0) ? min + " min":'';
        lastUpdatedTime+= (hr == 0 && min == 0) ? sec + " sec":'';
        setLastUpdatedTime(lastUpdatedTime);
    }
    useEffect(()=>{
        if(statewise){
            //setLastUpdatedTime(statewise.lastupdatedtime);
            console.log("overview ",statewise.lastupdatedtime);
            formatDateTime();
        }
    },[statewise])
    return {
        lastupdatedTime:lastupdatedTime
    }
}

export default useDatetime;