export async function questionsApi(productId,setQuestionInfo,keyword,setQuesLoader,limit) {

    fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/list/question-list?productId='+productId+'&limit='+limit+'&offset=&keyword='+keyword+'&count=', {
        method: 'GET',
    })
        .then(json => {
            if(json.data){
                setQuesLoader&& setQuesLoader(false)
                setQuestionInfo(json.data)
            }
        })
}