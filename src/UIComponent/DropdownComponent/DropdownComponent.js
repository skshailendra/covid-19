
import React, { useEffect, useState, useReducer} from 'react';
import './DropdownComponent.scss';
import { faChevronDown,faChevronUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DropdownComponent = props =>{
    const [value,setValue] = useState('Active');
    const [showSelectOption,setShowSelectOption] = useState(false);
    const selectDropdown =(e)=>{
        console.log(e.target);
        setValue(e.target.innerHTML);
        setShowSelectOption(!showSelectOption);
      };
      const toggleDropdown =(e)=>{
        console.log(e.target);
        setShowSelectOption(!showSelectOption);
      };
      const [cases,setCases] = useState([
        {
          type:"confirmed",
          value:"Confirmed"
        },
        {
          type:"active",
          value:"Active"
        },
        {
          type:"deceased",
          value:"Deceased"
        }
      ]);
    return(
        <>
            <div className="dropdown">
                <div className="dropdown__wrap">
                    <ul className="dropdown__default" onClick={e => toggleDropdown(e)}>
                        <li className="dropdown__default-option">           
                            <div className="dropdown__value">{value}</div>
                            <span className="verticle-line"></span>
                            {showSelectOption ? 
                            <FontAwesomeIcon icon={faChevronUp}  color="#ea7e0b" className="dropdown__icon"/>:
                            <FontAwesomeIcon icon={faChevronDown}  color="#ea7e0b" className="dropdown__icon"/>
                            }
                        </li>
                    </ul>
                    { showSelectOption &&
                    <ul className="dropdown__select-list" onClick={e=>selectDropdown(e)}>
                        {
                            cases.map((item)=>(
                                <li className={`dropdown__option ${item.value === value?'dropdown__active':''}` }>
                                    {item.value}
                                </li>
                            ))
                        }
                    </ul>
                    }
                </div>
            </div>
        </>
    )
}

export default DropdownComponent;