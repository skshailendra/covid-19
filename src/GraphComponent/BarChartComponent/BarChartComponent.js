import React, {useEffect, useState} from 'react';
import './BarChartComponent.scss';
import BarGraph from '../BarGraph/BarGraph';
import DropdownComponent from '../../UIComponent/DropdownComponent/DropdownComponent';
const BarChartComponent = props =>{
    const [filter, setFilter ] = useState('');
    return (
        <> 
            <div className="description-graph">
                <div className="dropdown-container">
                    <DropdownComponent type ={"casetype"}/>
                    <DropdownComponent type ={"months"}/>
                </div>
                <BarGraph />
            </div>
        </>
    );
};

export default BarChartComponent;