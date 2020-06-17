import React ,{useContext,useEffect,useState}from 'react';
import './Overview.scss';
import { faSlash,faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import useDatetime from '../hooks/datetime';
import {withRouter, Link} from 'react-router-dom';
import {FetchDataContext} from '../context/fetch-data';
import {ThemeContext} from '../context/theme';
const Overview = props =>{
  const {lastupdatedTime} = useDatetime();
  const fetchCovidData = useContext(FetchDataContext); 
  const {thememode} = useContext(ThemeContext);
  const [statename,setStatename] = useState();
  //props.match && props.match.params.statecode === 'allstates'? 'All States' : null;
  useEffect(() => {
    if (fetchCovidData && 
      fetchCovidData.statewise.length > 0 && props.match.params.statecode){
      if(props.match.params.statecode ===  'allstates'){
        setStatename('All States');
      }else{
        let filterArray = fetchCovidData.statewise.slice(1).filter( (item)=>item.statecode === props.match.params.statecode)[0];
        setStatename(filterArray.state);
      }       
    }
  },[fetchCovidData,props.match.params]);
  return (
    <div className={`overview ${thememode}`}>
      <div className="overview__location">
        <Link to='/' className={`overview__heading ${thememode}`}>
          <h3>
            India
          </h3>
        </Link>
        {/* <div className="overview__location-save">
          <FontAwesomeIcon icon={faStar}  color="#f5dbda" className="overview__icon"/>
          <span className="overview__save-text">Save Location</span>
        </div> */}
        { statename &&
          <div className="overview__location-save">
            <FontAwesomeIcon icon={faSlash}  color="#f5dbda" />
            <span className="overview__save-text">{statename}</span>
          </div>
        }
      </div>
        {  (!props.match.url.includes('/faq') && !props.match.url.includes('/preventaion')) && 
        <div className="overview__refresh">
          <FontAwesomeIcon icon={faSync}  color="grey" className="overview__icon"/>
          <span className="overview__last-update">Last updated about {lastupdatedTime} ago</span>
        </div>
        }
        { props.match.url.includes('/faq') && 
          <div className="faq-header">
            <p>The central helpline number: 011-23978046</p>
          </div>
        }
    </div>
  )
};

export default  React.memo(withRouter(Overview));