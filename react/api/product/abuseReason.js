export async function abuseListApi(setAbuseReason) {

    fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/store-question-answer/abuse-reason-list', {
        method: 'GET',
    })
    .then(json => {
        setAbuseReason(json.data)            
    })
}