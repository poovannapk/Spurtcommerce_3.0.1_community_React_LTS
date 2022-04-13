async function alterVote(answerId,like){
    fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/store-question-answer/update-like-status',{
        method: 'POST',
        headers: {
            "Accept": 'application/json',
            "Content-type": 'application/json',
        },
        body: JSON.stringify({
            "type": like,//1- voted; 2- rmVote,
            "answerId":answerId
        })
    })             
}
export {alterVote}