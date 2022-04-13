import { changeCurrency, footerPage, maintenanceState } from "../../store/setting/action"

async function getProfileApi(dispatch) {
    
        await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/settings/get-settings', {
            method: 'GET',
        })
        .then(json => {
            if(json.data){
                dispatch(footerPage(json.data[0]))
                dispatch(changeCurrency({symbol:json.data[0].symbolLeft,text:json.data[0].currencyCode}))
                dispatch(maintenanceState(json.data[0].maintenanceMode))
            }
         
        })    
}
export default getProfileApi