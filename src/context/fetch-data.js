import React, {useEffect, useState} from 'react';


export const FetchDataContext = React.createContext({
    casesTimeSeries:[],
    statewise:[],
    tested:[]
});
const dataJsonUrl = 'https://api.covid19india.org/data.json';
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
    useEffect(()=>{
        const dataCall = async ()=>{
            const data = await fetchData();
            console.log("called....",data);
            setCasesTimeSeries(data.cases_time_series);
        };
        dataCall();
    },[]);

    return(
        <FetchDataContext.Provider value={{
            casesTimeSeries: casesTimeSeries
        }}>
            {props.children}
        </FetchDataContext.Provider>
    )
};

export default FetchDataProvider;
