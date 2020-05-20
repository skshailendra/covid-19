import React, {useEffect, useState} from 'react';


export const FetchDataContext = React.createContext({
    statelevel:[]
});
const dataJsonUrl = 'https://api.covid19india.org/v2/state_district_wise.json';

const requestOption = {
    method:"GET"
};
const fetchData = async()=>{
    const response = await fetch(dataJsonUrl,requestOption);
    if(response.ok){
        let resJson = await response.json();
        return resJson;
    }else{
        throw Error("Unable to fetch the data");
    }
};
const FetchDataProvider = props=>{
    const [casesTimeSeries,setCasesTimeSeries] = useState([]);
    const [statewise,setStatewise] = useState([]);
    useEffect(()=>{
        const dataCall = async ()=>{
            const data = await fetchData();
            setCasesTimeSeries(data.cases_time_series);
            setStatewise(data.statewise);
        };
        dataCall();
    },[]);

    return(
        <FetchDataContext.Provider value={{
            casesTimeSeries: casesTimeSeries,
            statewise: statewise
        }}>
            {props.children}
        </FetchDataContext.Provider>
    )
};

export default FetchDataProvider;
