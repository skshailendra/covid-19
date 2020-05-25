import React, {useRef, useEffect, useState,useContext} from 'react';
import './IndiaComponent.scss';
import { select, selectAll,geoPath, geoMercator, min, max, scaleLinear } from "d3";
import indiajson from '../map/india.json';
import {feature}from "topojson-client";
import {FetchDataContext} from '../context/fetch-data';
const IndiaComponent = props=>{
    
    const width = 600;
    const height = 500;
    const fetchCovidData = useContext(FetchDataContext);
    const stateDistrictDataJsonUrl = '../map/';
    const requestOption = {
        method:"GET"
    };
    let indiaSvgRef = useRef(),indiaSvg;
    let stateSvgRef = useRef(),stateSvg;
    const [indiaJson,setIndiaJson] = useState();
    const [selectedState, setSelectedState] = useState('');
    const [stateJson,setStateJson] = useState();

    const fetchData = async(dataJsonUrl)=>{
        const response = await fetch(dataJsonUrl,requestOption);
        if(response.ok){
            let resJson = await response.json();
            return resJson;
        }else{
            throw Error("Unable to fetch the data");
        }
    };
    useEffect(()=>{
        const dataCall = async ()=>{
            const indiaJsonUrl = `${stateDistrictDataJsonUrl}india.json`;
            const data = await fetchData(indiaJsonUrl);
            setIndiaJson(data);
        };
        if(fetchCovidData && fetchCovidData.statewise){
            dataCall();
        }
    },[fetchCovidData]);

    useEffect(()=>{
        if(indiaJson &&  fetchCovidData.statewise.length>0){
        indiaSvg = select(indiaSvgRef.current)
                    .attr("viewBox", `0 0 700 600`);
        const indianStates = indiajson.objects["india-states"];
        var states = feature(indiajson, indianStates);
        states.features.map((featurestate)=>{
            featurestate.properties["confirmed"] = parseInt(fetchCovidData.statewise.filter((data)=> data.state === featurestate.properties["st_nm"])[0].confirmed);
            
        });
        
        const minProp = min(states.features, feature => feature.properties['confirmed']);
        const maxProp = max(states.features, feature => feature.properties['confirmed']);
        const colorScale = scaleLinear().domain([minProp, maxProp]).range(["#ccc", "red"]);

        // projects geo-coordinates on a 2D plane
        const projection = geoMercator()
                            .fitSize([width, height], states);
        const pathGenerator = geoPath().projection(projection);                            
        
        indiaSvg.selectAll(".states")
            .data(states.features)
            .enter()
            .append('path')
            .on("click", feature => {
                console.log(feature);
                //stateSvgRef.current = null;
                setSelectedState(feature["id"] );
            })
            .attr('class',"state")
            .transition()   
            .attr("fill",feature=>colorScale(feature.properties['confirmed']))
            .attr('d',d=>pathGenerator(d))
            
        }
        return (()=>{
            // Clean up 
        })
    },[indiaJson]);
    useEffect(()=>{
        const dataCall = async ()=>{
            const stateJsonUrl = `${stateDistrictDataJsonUrl}${selectedState.toLowerCase().split(' ').join("")}.json`;
            const data = await fetchData(stateJsonUrl);
            setStateJson(data);
        };
        if(selectedState){
            dataCall();
        }
        
    },[selectedState]);
    useEffect(()=>{
        if(selectedState && stateJson){
            stateSvg = select(stateSvgRef.current)
                        .attr("viewBox", `0 0 500 600`);
            const statesDistrict = stateJson.objects[`${selectedState.toLowerCase().split(' ').join("")}_district`];
            const district = feature(stateJson, statesDistrict);
            console.log("statejson",district);
            console.log("distric",fetchCovidData.stateDistrict);
            // district.features.map((featurestate)=>{
            //     featurestate.properties["confirmed"] = parseInt(fetchCovidData.stateDistrict.districtData.filter((data)=> data.state === featurestate.properties["st_nm"])[0].confirmed);
                
            // });
           // projects geo-coordinates on a 2D plane
            const projection = geoMercator()
                                .fitSize([400, 400], district);
            const pathGenerator = geoPath().projection(projection);    
            var svgdistrict = stateSvg.selectAll(".district")
            .data(district.features)
            .enter()
            .append('path')
            .attr('class',"district")
            .transition()   
            .attr('d',d=>pathGenerator(d));
        }
        return(()=>{
            // Remove old selection before new Useeffect 
            selectAll(".indiastate path").remove();
        })
    },[stateJson])
    return (
        <>
            <div className="map">
                <div className="indiamap">
                    <svg ref={indiaSvgRef}></svg>
                </div>
                {selectedState && 
                    <div className="indiastate">
                        <svg ref={stateSvgRef}></svg>
                    </div>
                }      
            </div>
            
            
        </>
    )
}

export default IndiaComponent;