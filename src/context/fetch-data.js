import React, {useEffect, useState} from 'react';


export const FetchDataContext = React.createContext({
    casesTimeSeries:[],
    statewise:[],
    tested:[]
});
const nationalDataJsonUrl = 'https://api.covid19india.org/data.json';
const stateDistrictDataJsonUrl = 'https://api.covid19india.org/v2/state_district_wise.json';
const requestOption = {
    method:"GET"
};
const fetchData = async(dataJsonUrl)=>{
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
    const [stateDistrict,setStateDistrict] = useState([]);
    useEffect(()=>{
        const dataCall = async ()=>{
            const data = await fetchData(nationalDataJsonUrl);
            setCasesTimeSeries(data.cases_time_series);
            setStatewise(data.statewise);
        };
        dataCall();
    },[]);
    useEffect(()=>{
        const dataCall = async ()=>{
            const data = await fetchData(stateDistrictDataJsonUrl);
            setStateDistrict(data);
        };
        dataCall();
    },[]);
    return(
        <FetchDataContext.Provider value={{
            casesTimeSeries: casesTimeSeries,
            statewise: statewise,
            stateDistrict:stateDistrict
        }}>
            {props.children}
        </FetchDataContext.Provider>
    )
};

export default FetchDataProvider;
