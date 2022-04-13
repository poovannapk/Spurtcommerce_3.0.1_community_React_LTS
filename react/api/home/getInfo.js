async function getProfileApi(dispatch) {
        await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/customer/get-profile', {
            method: 'GET',
        })
        .then(json => {
            // console.log(json.data[0].symbolLeft)
        })
}
export default getProfileApi