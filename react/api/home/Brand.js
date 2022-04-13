import { getBrands } from "../../store/product/action"

export async function ManufacturerApi(dispatch,setBrands) {
    return await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/manufacturer/manufacturerlist',{
        method: 'GET',
    })
    .then(json => {
        dispatch(getBrands(json.data))
        setBrands(json.data)
    })
}
 