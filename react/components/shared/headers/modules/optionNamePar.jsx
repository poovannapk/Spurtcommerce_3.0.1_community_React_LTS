/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React from 'react';

function OptionNameDisplay({optionName}){
    


    // useEffect(()=>{
        let totalOptionResponse=optionName.options 
        let optionArray=optionName.optionValueArray
        let myArrayOption=[]

        // console.log(optionArray)
        // console.log(totalOptionResponse)
        totalOptionResponse&&totalOptionResponse.forEach((a)=>{
            // console.log(a)
            a.optionValue.forEach((b)=>{
                // console.log(a,b)
                for( var i =a.optionValue.length - 1; i>=0; i--){
                    
                    for( var j=0; j<optionArray.length; j++){
                      if(b.optionValueName === optionArray[j]){
                        const found = myArrayOption.some(el => el.optionArrayName === a.optionname);
                        if (!found){
                            myArrayOption.push({optionArrayName:a.optionname,optionName:b.optionValueName})
                        } 
                       }
                     }
                   }
            })

        })



    return(
       <p>
           {console.log(optionName)}
           {myArrayOption&&myArrayOption.map((name,index)=>{
           return(<strong key={index}>{name.optionArrayName}:{name.optionName}{' '}</strong>)
           },[])}
         
       </p>
    )
    

}

export default OptionNameDisplay