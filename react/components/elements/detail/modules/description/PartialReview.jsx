import React from 'react';
import { Rate } from 'antd';
import Rating from '../../../Rating';
import { useEffect } from 'react';
import { useState } from 'react';
import OrderDate from '../../../../partials/account/modules/DateOrder';
import DateRev from '../../../../partials/account/modules/DateReview';


function PartialReview({ratingInfo}){
    const[overallRating,setOverallRating]=useState("")
    const [dateArray,setDateArray]=useState([])
    const [fivePercent,setFivePercent]=useState("")
    const [fourPercent,setFourPercent]=useState("")
    const [threePercent,setThreePercent]=useState("")
    const [twoPercent,setTwoPercent]=useState("")
    const [onePercent,setOnePercent]=useState("")
// let any=[]

    

    useEffect(()=>{
        totalInCart()
        ratingArray()

    },[])

    const totalInCart=()=>{
        const locale=ratingInfo
        let momentArray={}
        var len = locale&&locale.length;
        let totalRatingArray=[]
        for (var i = 0; i < len; i++) {
            totalRatingArray.push(locale[i].rating)
            momentArray[i] = locale[i].createdDate
            // momentArray.push(moment(locale[i].createdDate, 'YYYY-MM-DD HH:mm')._d)
            // console.log(momentArray)

        }
        var sum = totalRatingArray.reduce(function(a, b){
            return a + b;
        }, 0);
        setOverallRating((sum/len).toFixed(2))
        setDateArray(momentArray)
    
       }

    const ratingArray=()=>{
        const locale=ratingInfo
        var len = locale&&locale.length;
        let totalRatingArray=[]
        for (var i = 0; i < len; i++) {
            totalRatingArray.push(locale[i].rating)
        }
        console.log(totalRatingArray)
        //count number of occurance of a value inside array 
        const countOccurrences = (totalRatingArray, val) => totalRatingArray.reduce((a, v) => (v === val ? a + 1 : a), 0);
        setFivePercent(Math.round((countOccurrences(totalRatingArray, 5)/len)*100))
        setFourPercent(Math.round((countOccurrences(totalRatingArray, 4)/len)*100))
        setThreePercent(Math.round((countOccurrences(totalRatingArray, 3)/len)*100))
        setTwoPercent(Math.round((countOccurrences(totalRatingArray, 2)/len)*100))
        setOnePercent(Math.round((countOccurrences(totalRatingArray, 1)/len)*100))

    }


 return (
    // <div className="row">
       
        ratingInfo&&ratingInfo.length!==0? <div className="row">
        <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 ">
         {console.log(fourPercent)}
            <div className="ps-block--average-rating">
                <div className="ps-block__header">
                  <h3>{overallRating&&overallRating}</h3>
                    <Rating rating={overallRating}/>
                    {/* <p>{dateArray[0]}</p> */}
                    
                    <span>{ratingInfo&&ratingInfo.length}</span>
                </div>
                <div className="ps-block__star">
                    <span>5 Star</span>
                    <div className="ps-progress" data-value="100%">
                        <span style={{width:fivePercent+"%"}}></span>
                    </div>
                    <span>{fivePercent}%</span>
                </div>
                <div className="ps-block__star">
                    <span>4 Star</span>
                    <div className="ps-progress" data-value="0">
                        <span style={{width:fourPercent+"%"}}></span>
                    </div>
                    <span>{fourPercent}%</span>
                </div>
                <div className="ps-block__star">
                    <span>3 Star</span>
                    <div className="ps-progress" data-value="0">
                        <span style={{width: threePercent+"%"}}></span>
                    </div>
                    <span>{threePercent}%</span>
                </div>
                <div className="ps-block__star">
                    <span>2 Star</span>
                    <div className="ps-progress" data-value="0">
                        <span style={{width:twoPercent+"%"}}></span>
                    </div>
                    <span>{twoPercent}%</span>
                </div>
                <div className="ps-block__star">
                    <span>1 Star</span>
                    <div className="ps-progress" data-value="0">
                        <span style={{width:onePercent+"%"}}></span>
                    </div>
                   <span>{onePercent}%</span>
                </div>
            </div>
        </div>
        {/* <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 ">
            <form className="ps-form--review" action="/" method="get">
                <h4>Submit Your Review</h4>
                <p>
                    Your email address will not be published. Required fields are marked
                    <sup>*</sup>
                </p>
                <div className="form-group form-group__rating">
                    <label>Your rating of this product</label>
                    <Rate defaultValue={1} />
                </div>
                <div className="form-group">
                    <textarea
                        className="form-control"
                        rows="6"
                        placeholder="Write your review here"></textarea>
                </div>
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Your Name" />
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">
                        <div className="form-group">
                            <input className="form-control" type="email" placeholder="Your Email" />
                        </div>
                    </div>
                </div>
                <div className="form-group submit">
                    <button className="ps-btn">Submit Review</button>
                </div>
            </form>
        </div> */}
        <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 ">
            <form className="ps-form--review" action="/" method="get">
            
            {ratingInfo&&ratingInfo.map((customer,index)=>{
                return(
                    <div key={index}>
            <div className="custom-rating-form">
            <h4>{customer.firstName}</h4>
                </div>
                <Rating rating={customer.rating} />
                {customer.review!==null&&<div>
                  <DateRev dateCarry={customer&&customer.createdDate}/>
                    
                  <p>{customer.review}</p>
                </div>}

            </div>


                )})}
            

            </form>
        </div>
        </div>:<div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 "><p>No reviews found</p></div>
 )}

export default PartialReview;
