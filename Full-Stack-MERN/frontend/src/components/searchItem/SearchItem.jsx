import { Link } from "react-router-dom";
import "./searchItem.css"
import {faStar} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const SearchItem = ({item}) => {
    
    return (
        <div className="searchItem">
           <img
            src={item.photos[0]}
            alt=""
            className="siImg"
            /> 
            <div className="siDesc">
                <h1 className="siTitle">{item.name}</h1>
                <span className="siTaxiOp">Free airport taxi</span>
                <span className="siSubtitle">
                    JOHNRESERVATION
                </span>
                <span className="siFeatures">
                    {item.description}
                </span>
                <span className="siCancelOp"> Top location: Highly rated by recent guests <FontAwesomeIcon id="starla" icon={faStar}/> </span>
                <span className="siCancelOpSubtitle">
                travel journey of a thousand miles begins with a single step
                </span>
            </div>
            <div className="siDetails">
                {item.rating && <div className="siRating">
                    <span>Excellent</span>
                    <button>{item.rating}</button>
                </div>}
                <div className="siDetailTexts">
                    <span className="siPrice">${item.cheapestPrice}</span>
                    <span className="siTaxOp">Includes taxes and fees</span>
                    <Link to={`/hotels/${item._id}`}>
                        <button className="siCheckButton">See availability</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SearchItem;