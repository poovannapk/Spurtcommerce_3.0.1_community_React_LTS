import { footerAddress } from "../../store/setting/action"

async function getPageApi(dispatch) {
    
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/pages/pagelist?limit=&offset=&keyword=', {
        method: 'GET',
    })
    .then(json => {
        dispatch(footerAddress(json.data))
    })
}

export default getPageApi