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
    // Extra Small Device i.e old smart phones
    if(width < 320){
        return {
            width: width,isExtraSmallDevice: true,isSmallDevice:true,isMediumDevice:false,isLargeDevice:false,
        }
    }
    // Small Device  i.e. smart phones
    if(width >= 320 && width <= 400) {
        return {
            width: width,isExtraSmallDevice: false,isSmallDevice:true,isMediumDevice:false,isLargeDevice:false,isMediumLargeDevice:false,isExtraLargeDevice: false
        }
    }
    // Medium Device i.e Tablet ipad 
    if(width > 400 && width <=768){
        return {
            width: width,isExtraSmallDevice: false,isSmallDevice:false,isMediumDevice:true,isLargeDevice:false,isMediumLargeDevice:false,isExtraLargeDevice: false
        }
    }
    // Large Device  i.e landscape, monitor 
    if(width > 768 && width <=1024){
        return {
            width: width,isExtraSmallDevice: false,isSmallDevice:false,isMediumDevice:false,isLargeDevice:true,isMediumLargeDevice:false,isExtraLargeDevice: false
        }
    }
    // Medium Large i.e laptops
    if(width > 1024  && width <=1399){
        return {
            width: width,isExtraSmallDevice: false,isSmallDevice:false,isMediumDevice:false,isLargeDevice:false,isMediumLargeDevice:true,isExtraLargeDevice: false
        }
    }
    // Extra Large 
    if(width >1400){ 
        return {
            width: width,isExtraSmallDevice: false,isSmallDevice:false,isMediumDevice:false,isLargeDevice:false,isMediumLargeDevice:false,isExtraLargeDevice: true
        }
    }
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
            console.log("destroy");
            window.removeEventListener('resize', getDevice)
        };
    },[]);
    return{
        device:deviceAgent.device
    }
}

export default useDeviceAgent;