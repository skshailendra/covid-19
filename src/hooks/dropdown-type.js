import { useReducer } from "react";

const initialState = {
  data: null,
  selectedValue: null,
};
const casesType = [
  {
    type: "all",
    value: "All",
  },
  {
    type: "totalconfirmed",
    value: "Confirmed",
  },
  {
    type: "totalrecovered",
    value: "Recovered",
  },
  {
    type: "totaldeceased",
    value: "Deceased",
  },
];
const month = [
  {
    index: 0,
    type: "All",
    value: "All",
  },
  {
    index: 1,
    type: "Jan",
    value: "January",
  },
  {
    index: 2,
    type: "Feb",
    value: "February",
  },
  {
    index: 3,
    type: "March",
    value: "March",
  },
  {
    index: 4,
    type: "April",
    value: "April",
  },
  {
    index: 5,
    type: "May",
    value: "May",
  },
  {
    index: 6,
    type: "June",
    value: "June",
  },
  {
    index: 7,
    type: "July",
    value: "July",
  },
  {
    index: 8,
    type: "August",
    value: "August",
  },
  {
    index: 9,
    type: "September",
    value: "September",
  },
  {
    index: 10,
    type: "October",
    value: "October",
  },
  {
    index: 11,
    type: "November",
    value: "November",
  },
  {
    index: 12,
    type: "December",
    value: "December",
  },
];
const getCurrentMonth = () => {
  let selectedMonth = "";

  const currentDate = new Date().getDate();
  selectedMonth =
    currentDate < 9 ? new Date().getMonth() : new Date().getMonth() + 1;
  return month.find((val) => val.index === selectedMonth);
};

const dropDownReducer = (currDropdown, action) => {
  switch (action.type) {
    case "MONTHS":
      return {
        ...currDropdown,
        data: action.months,
        selectedValue: getCurrentMonth().value,
      };
    case "CASETYPE":
      return { ...currDropdown, data: action.casesType, selectedValue: "All" };
    case "STATES":
      return {
        ...currDropdown,
        data: action.casesType,
        selectedValue: action.selectedValue,
        selectedType: action.selectedType,
      };
    case "CUSTOM":
      return {
        ...currDropdown,
        data: action.casesType,
        selectedValue: action.selectedValue,
        selectedType: action.selectedType,
      };
    default:
      return [];
  }
};

const useDropdown = () => {
  const [dropDownType, dispatchDropdown] = useReducer(
    dropDownReducer,
    initialState
  );
  let selectedState = "";
  const getDropdownData = (dpdowntype, data = null, params = null) => {
    if (typeof dpdowntype === "string" && dpdowntype !== "undefined") {
      dpdowntype = dpdowntype.toUpperCase();
      switch (dpdowntype) {
        case "MONTHS":
          dispatchDropdown({
            type: dpdowntype,
            months: month.slice(0, new Date().getMonth() + 2),
          });
          break;
        case "CASETYPE":
          dispatchDropdown({ type: dpdowntype, casesType: casesType });
          break;
        case "CUSTOM":
          dispatchDropdown({
            type: dpdowntype,
            casesType: data.list,
            selectedValue: data.list[0].value,
            selectedType: data.list[0].type,
          });
          break;
        case "STATES":
          selectedState = params
            ? data.list.filter((state) => state.type === params)[0]
            : data.list[19];
          dispatchDropdown({
            type: dpdowntype,
            casesType: data.list,
            selectedValue: selectedState.value,
            selectedType: selectedState.type,
          });
          break;
        default:
          dispatchDropdown({ type: "" });
      }
    }
  };
  return {
    data: dropDownType.data,
    selectedValue: dropDownType.selectedValue,
    selectedType: dropDownType.selectedType,
    getDropdownData: getDropdownData,
  };
};

export default useDropdown;
