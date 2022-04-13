export async function homeBannerApi(setBanner) {
    return await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/list/banner-list', {
        method: 'GET',
    })
    .then(json => {
        setBanner(json.data)
    })
} 

