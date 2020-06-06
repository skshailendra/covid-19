import {useReducer,useEffect, useCallback} from 'react';

const deviceAgentReducer = (currDevice , action)=>{
    switch(action.type){
        case "DEVICE":
            return {device : action.device}
        default:
            return currDevice
    }
};
const getWindowsDimension = ()=>{
    const width = document.documentElement.clientWidth;

    // Small Device  i.e. mobile phones
    if(width < 768) {
        return {
            width: width,isSmallDevice:true,isMediumDevice:false,isLargeDevice:false,isExtraLargeDevice: false
        }
    }
    // Medium Device i.e Tablet ipad 
    if(width >= 768 && width <=1024){
        return {
            width: width,isSmallDevice:false,isMediumDevice:true,isLargeDevice:false,isExtraLargeDevice: false
        }
    }
    // Large Device  i.e landscape, monitor 
    if(width > 1024 && width <=1200){
        return {
            width: width,isSmallDevice:false,isMediumDevice:false,isLargeDevice:true,isExtraLargeDevice: false
        }
    }
    // Extra Large i.e laptops
    if(width > 1200 ){
        return {
            width: width,isSmallDevice:false,isMediumDevice:false,isLargeDevice:false,isExtraLargeDevice: true
        }
    }
    // Extra Large 
    // if(width >1200){ 
    //     return {
    //         width: width,isSmallDevice:false,isMediumDevice:false,isLargeDevice:false,isExtraLargeDevice: true
    //     }
    // }
};
const useDeviceAgent = ()=>{
    const [deviceAgent,dispatchDeviceAgent] = useReducer(deviceAgentReducer, getWindowsDimension());

    const getDevice = ()=>{
        dispatchDeviceAgent({type:'DEVICE', device:getWindowsDimension()});
    };
    useEffect(()=>{
        dispatchDeviceAgent({type:'DEVICE', device:getWindowsDimension()});
        window.addEventListener("resize", getDevice);
        return ()=>{
           
            window.removeEventListener('resize', getDevice)
        };
    },[]);
    return{
        device:deviceAgent.device
    }
}

export default useDeviceAgent;