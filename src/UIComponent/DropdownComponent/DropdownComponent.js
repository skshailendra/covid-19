
import React, { useEffect, useReducer} from 'react';
import './DropdownComponent.scss';
import { faChevronDown,faChevronUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const initialState ={
  value:'Active',
  showSelectOption:false,
  cases: [
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
  ]
}
const dropDownReducer = (currentValue, action)=>{
  switch(action.type){
    case 'SET':
        return {
          ...currentValue,
          value:action.selected,
          showSelectOption:!currentValue.showSelectOption
        }
    case 'TOGGLE':
        return {
          ...currentValue, showSelectOption:!currentValue.showSelectOption
        }
    default :
      throw new Error("Please select dropdown value");
  }
};
const DropdownComponent = props =>{
    const [dropDownValue, dispatchDropdown] = useReducer(dropDownReducer, initialState);
    const selectDropdown =(e)=>{
        console.log("selectDropdown");
        dispatchDropdown({type:'SET',selected:e.target.innerHTML});
      };
    return(
        <>
            <div className="dropdown">
                <div className="dropdown__wrap">
                    <ul className="dropdown__default" onClick={e =>dispatchDropdown({type:'TOGGLE'})}>
                        <li className="dropdown__default-option">           
                            <div className="dropdown__value">{dropDownValue.value}</div>
                            {/* <span className="verticle-line"></span> */}
                            {dropDownValue.showSelectOption ? 
                            <FontAwesomeIcon icon={faChevronUp}  color="#ea7e0b" className="dropdown__icon"/>:
                            <FontAwesomeIcon icon={faChevronDown}  color="#ea7e0b" className="dropdown__icon"/>
                            }
                        </li>
                    </ul>
                    { dropDownValue.showSelectOption &&
                    <ul className="dropdown__select-list" onClick={e=>selectDropdown(e)}>
                        {
                            dropDownValue.cases.map((item)=>(
                                <li key={item.type} className={`dropdown__option ${item.value === dropDownValue.value?'dropdown__active':''}` }>
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