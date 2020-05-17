import { useReducer, useCallback} from 'react';

const initialState = {
    data:null,
    selectedValue:null
}
const  casesType= [
    {
        type:"all",
        value:"All"
    },
    {
      type:"totalconfirmed",
      value:"Confirmed"
    },
    {
      type:"totalrecovered",
      value:"Recovered"
    },
    {
      type:"totaldeceased",
      value:"Deceased"
    }
];
const month = [
    {
        type:'May',
        value:"May"
    },
    {
        type:'April',
        value:"April"
    },
    {
        type:'March',
        value:"March"
    },
    {
        type:'Feb',
        value:"February"
    },
    {
        type:'Jan',
        value:"January"
    }
];
const dropDownReducer = (currDropdown , action)=>{
    switch(action.type){
        case "MONTHS":
            return {...currDropdown,data:action.months, selectedValue:month[0].value}
        case "CASETYPE":
            return {...currDropdown,data:action.casesType,selectedValue:'All'}
        default:
            return []
    }
};
const useDropdown = ()=>{

    const [dropDownType,dispatchDropdown] = useReducer(dropDownReducer, initialState);

    const getDropdownData = useCallback((dpdowntype) => {
       
        if(typeof dpdowntype === 'string' && dpdowntype != 'undefined'){
            dpdowntype = dpdowntype.toUpperCase();
            switch (dpdowntype){
                case 'MONTHS':
                    dispatchDropdown({type:dpdowntype , months:month});
                    break;
                case 'CASETYPE':
                    dispatchDropdown({type:dpdowntype, casesType:casesType});
                    break;
                default:
                     dispatchDropdown({type:''});
            }
        }
    });
    return {
        data:dropDownType.data,
        selectedValue:dropDownType.selectedValue,
        getDropdownData:getDropdownData
    }
};

export default useDropdown;