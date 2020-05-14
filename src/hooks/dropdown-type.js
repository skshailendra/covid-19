import { useReducer, useCallback} from 'react';

const initialState = {
    data:null,
   
}
const  casesType= [
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
];
const month = [
    {
        type:'may',
        value:"May"
    },
    {
        type:'april',
        value:"April"
    },
    {
        type:'march',
        value:"March"
    },
    {
        type:'feb',
        value:"February"
    },
    {
        type:'jan',
        value:"january"
    }
];
const dropDownReducer = (currDropdown , action)=>{
    switch(action.type){
        case "MONTHS":
            return {...currDropdown,data:action.months}
        case "CASETYPE":
            return {...currDropdown,data:action.casesType}
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
        getDropdownData:getDropdownData
    }
};

export default useDropdown;