/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { colorShowContent, colorThemeCurrent } from '../../../store/colorPalette/action';

function ThemeChanger(){
    let showClass=useSelector(s=>s.palette.showContent)
    let showsass=useSelector(s=>s.palette)

   const dispatch = useDispatch()

   const handleThemeChange=(color)=>{
       localStorage.setItem("colorThemeSpurt",color)
       dispatch(colorThemeCurrent(color))
       console.log(showsass)

   }

    return(
        <div className={`colorOption transistionColor ${showClass}`}>
            {console.log(showClass)}
            <button className="button-palette" onClick={e=>showClass==="color-show"?dispatch(colorShowContent("")):dispatch(colorShowContent("color-show"))}>
                <img src="/static/img/palette.ico"></img>
            </button>
            <div className="palette-color-container">
                <span className="normal" onClick={e=>handleThemeChange("normal")}></span>
                <span className="green" onClick={e=>handleThemeChange("green")}></span>
                <span className="blue" onClick={e=>handleThemeChange("blue")}></span>
                {/* <span className="red" onClick={e=>handleThemeChange("red")}></span> */}
                <span className="pink" onClick={e=>handleThemeChange("pink")}></span>
                <span className="purple" onClick={e=>handleThemeChange("purple")}></span>
                <span className="grey" onClick={e=>handleThemeChange("grey")}></span>
            </div>

    </div>
    )
    


}
export default ThemeChanger