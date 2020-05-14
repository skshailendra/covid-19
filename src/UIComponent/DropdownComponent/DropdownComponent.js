
import React, { useEffect, useReducer, useCallback} from 'react';
import './DropdownComponent.scss';
import { faChevronDown,faChevronUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useDropdown from '../../hooks/dropdown-type';
const initialState ={
  value:'',
  showSelectOption:false,
  traverseDropdown:[]
}
const dropDownReducer = (currentValue, action)=>{
  switch(action.type){
    case 'CREATE':
      return {
        ...currentValue,
        value:action.value,
        traverseDropdown:action.traverseDropdown
      }
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
const DropdownComponent = React.memo(props =>{
    const {type}  = props;debugger;
    const [dropDownValue, dispatchDropdown] = useReducer(dropDownReducer, initialState);
    const {getDropdownData,data,selectedValue} = useDropdown();
    const selectDropdown =(e)=>{
      dispatchDropdown({type:'SET',selected:e.target.innerHTML});
    };

    useEffect(()=>{
      getDropdownData(type);
    },[]);

    useEffect(()=>{
      dispatchDropdown({type:'CREATE',traverseDropdown:data, value:selectedValue});
    },[data]);
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
                            dropDownValue.traverseDropdown.map((item)=>(
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
});

export default DropdownComponent;