export async function countryListApi(setCountryData) {

    fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/list/country-list?limit=&offset=&keyword=&count=', {
        method: 'GET',
    })
        
    .then(json => {
        setCountryData(json.data)
    })
} 