
import React, { useEffect, useReducer, useCallback, useRef} from 'react';
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
    case 'CLOSE':
          return {
            ...currentValue, showSelectOption:false
          }
    default :
      throw new Error("Please select dropdown value");
  }
};
const DropdownComponent = React.memo(props =>{
    const {type}  = props;
    const [dropDownValue, dispatchDropdown] = useReducer(dropDownReducer, initialState);
    const {getDropdownData,data,selectedValue,selectedType} = useDropdown();
    const dropdownList = useRef();
    let selectedDropdown = '';
    const selectDropdown =(e)=>{
      dispatchDropdown({type:'SET',selected:e.target.innerHTML});
      // Callback Event
      props.selectDropdown({selected:e.target.innerHTML, selectedtype:e.target.dataset.value,type:type,});
    };

    const clickOutside = useCallback((e)=>{
      
      if(dropdownList.current && !dropdownList.current.contains(e.target)){
        dispatchDropdown({type:'CLOSE'})
      }
    });
    useEffect(()=>{
      window.addEventListener("click",clickOutside);
      getDropdownData(type, {list:props.list} , props.params);
      return ()=>{
        
        window.removeEventListener("click",clickOutside);
      }
    },[]);
    useEffect(()=>{
      if(props.params && dropDownValue.traverseDropdown.length > 0){
        debugger;
        selectedDropdown  = dropDownValue.traverseDropdown.filter(item=> item.type === props.params)[0];
        dispatchDropdown({type:'SET',selected:selectedDropdown.value});
      }
     
    },[props.params]);
    useEffect(()=>{
      if(data){
        dispatchDropdown({type:'CREATE',traverseDropdown:data, value:selectedValue,selectedValue:selectedValue});
        // Callback Event
       
        if(type === 'states'){
          props.selectDropdown({selected:selectedValue, selectedtype:selectedType,type:type});
        }else{
          props.selectDropdown({selected:selectedValue, selectedtype:selectedValue,type:type});
        }
      }
    },[data]);
    return(
        <>
            
            <div className="dropdown">
                <div ref={dropdownList} className="dropdown__wrap">
                    <ul className="dropdown__default" onClick={e =>dispatchDropdown({type:'TOGGLE'})}>
                        <li className="dropdown__default-option">           
                            <div className="dropdown__value" >{dropDownValue.value}</div>
                            {/* <span className="verticle-line"></span> */}
                            {dropDownValue.showSelectOption ? 
                            <FontAwesomeIcon icon={faChevronUp}  color="#ea7e0b" className="dropdown__icon"/>:
                            <FontAwesomeIcon icon={faChevronDown}  color="#ea7e0b" className="dropdown__icon"/>
                            }
                        </li>
                    </ul>
                    { dropDownValue.showSelectOption &&
                    <ul  className="dropdown__select-list" onClick={e=>selectDropdown(e)}>
                        {
                            dropDownValue.traverseDropdown.map((item)=>(
                                <li key={item.type} data-value={item.type} className={`dropdown__option ${item.value === dropDownValue.value?'dropdown__active':''}` }>
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