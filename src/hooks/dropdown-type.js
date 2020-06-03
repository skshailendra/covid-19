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
      "index": 0,
      "type": "All",
      "value": "All"
    },
    {
      "index": 1,
      "type": "Jan",
      "value": "January"
    },
    {
      "index": 2,
      "type": "Feb",
      "value": "February"
    },
    {
      "index": 3,
      "type": "March",
      "value": "March"
    },
    {
      "index": 4,
      "type": "April",
      "value": "April"
    },
    {
      "index": 5,
      "type": "May",
      "value": "May"
    },
    {
      "index": 6,
      "type": "June",
      "value": "June"
    },
    {
      "index": 7,
      "type": "July",
      "value": "July"
    },
    {
      "index": 8,
      "type": "August",
      "value": "August"
    },
    {
      "index": 9,
      "type": "September",
      "value": "September"
    },
    {
      "index": 10,
      "type": "October",
      "value": "October"
    },
    {
      "index": 11,
      "type": "November",
      "value": "November"
    },
    {
      "index": 12,
      "type": "December",
      "value": "December"
    }
  ];
const monthList = {
    1:"January",
    2:"February",
    3:"March",
    4:"April",
    5:"May",
    6:"June",
    7:"July",
    8:"August",
    9:"September",
    10:"October",
    11:"November",
    12:"December"
};
const getCurrentMonth = ()=>{
    let selectedMonth = '';
    
    const currentDate = new Date().getDate();  
    selectedMonth = currentDate < 15 ? new Date().getMonth() : new Date().getMonth() + 1;
    return month.find( val=> val.index === selectedMonth);

};
const dropDownReducer = (currDropdown , action)=>{
    switch(action.type){
        case "MONTHS":
            return {...currDropdown,data:action.months, selectedValue:getCurrentMonth().value}
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
                    dispatchDropdown({type:dpdowntype , months:month.slice(0,(new Date().getMonth()+2) )});
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