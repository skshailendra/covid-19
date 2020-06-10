import React , {Suspense , lazy , useEffect ,useState}from 'react';
import './MainContent.scss';
import BarChartComponent from '../GraphComponent/BarChartComponent/BarChartComponent';
import LineChartComponent from '../GraphComponent/LineChartComponent/LineChartComponent';
import PieGraph from '../GraphComponent/PieGraph/PieGraph';
import Overview from '../Overview/Overview';
import DisplayTotal from '../DisplayTotal/DisplayTotal';
import SyncAreaComponent from '../GraphComponent/SyncAreaComponent/SyncAreaComponent';
//import TableComponent from '../UIComponent/TableComponent/TableComponent';
const TableComponent = lazy(()=>import('../UIComponent/TableComponent/TableComponent'))
const MainContent = props =>{
    const [showTable,setShowTable] = useState(false);
    useEffect(()=>{
       const handleScrollEvent = () =>{
        if ((window.innerHeight + window.pageYOffset + 200) >= document.body.offsetHeight) {
           setShowTable(true);
         }
       };
       // setShowTable(true);
       window.addEventListener('scroll', handleScrollEvent);
       return(()=> window.removeEventListener('scroll',handleScrollEvent));
    },[]);
    return (
        <>
            <Overview/>
            <DisplayTotal/>
            <div className="description">
                <BarChartComponent/>
                {/* <LineChartComponent/> */}
                {/* <PieGraph/> */}
                <SyncAreaComponent/>
                { showTable && 
                <Suspense fallback={<div>Loading...</div>}>
                    <TableComponent/>
                </Suspense>
                }
            </div>
        </>
    );
};

export default MainContent;