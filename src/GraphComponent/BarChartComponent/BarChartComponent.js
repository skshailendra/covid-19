import React, {useEffect, useState} from 'react';
import './BarChartComponent.scss';
import BarGraph from '../BarGraph/BarGraph';
import DropdownComponent from '../../UIComponent/DropdownComponent/DropdownComponent';
const BarChartComponent = props =>{
    const [filterData, setFilter ] = useState('');

    const onSelectDropdown = (value)=>{
        console.log("value.. ",value);
    }
    return (
        <> 
            <div className="bar-description-graph">
                <div className="bar-dropdown-container">
                    <h3 className="bar-caseheading">Case: </h3>
                    <DropdownComponent type ={"casetype"} selectDropdown = {e=>onSelectDropdown(e)}/>
                    <DropdownComponent type ={"months"} selectDropdown = {e=>onSelectDropdown(e)}/>
                </div>
                <BarGraph filterData= {filterData}/>
            </div>
        </>
    );
};

export default BarChartComponent;