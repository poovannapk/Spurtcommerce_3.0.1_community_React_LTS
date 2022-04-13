export async function pageDetApi(id,setDet,setPostLoading) {

        await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/pages/get_pagedetails/'+id, {
            method: 'GET',
        })
          
        .then(json => {
            setDet(json.data)
            setPostLoading(false)               
        })
}

