import React, {useEffect, useState} from 'react';
import './LineChartComponent.scss';
import LineGraph from '../LineGraph/LineGraph';
import DropdownComponent from '../../UIComponent/DropdownComponent/DropdownComponent';
const LineChartComponent = props =>{
    const [filterData, setFilter ] = useState('');

    const onSelectDropdown = (value)=>{
        console.log("value.. ",value);
    }
    return (
        <> 
            <div className="line-description-graph">
                <div className="line-dropdown-container">
                    <h3 className="line-caseheading">Case: </h3>
                    <DropdownComponent type ={"casetype"} selectDropdown = {e=>onSelectDropdown(e)}/>
                    <DropdownComponent type ={"months"} selectDropdown = {e=>onSelectDropdown(e)}/>
                </div>
                <LineGraph/>
            </div>
        </>
    );
};

export default LineChartComponent;