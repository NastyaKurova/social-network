let renderApp=()=>{}

const dialogsData = [
    {id: 1, name: "Lena"},
    {id: 2, name: "Zhenya"},
    {id: 3, name: "Sasha"},
    {id: 4, name: "Genna"},
];
const messagesData = [
    {id: 2, text: "Hi, my friend"},
    {id: 2, text: "Have been to the cinema today"},
    {id: 3, text: "Watch new tv show!"},
    {id: 4, text: "Hi"},
]
const postData = [
    {id: 2, text: "Hi, my friend",likes:5},
    {id: 2, text: "Have been to the cinema today",likes:2},
    {id: 3, text: "Watch new tv show!",likes:0},
    {id: 4, text: "Hi",likes:0},
]
export const State={
    dialogsData,
    messagesData,
    postData
}
export function addPost(text){
    const post = {id: 5, text: text,likes:0}
    State.postData.push(post)
    renderApp(State)
}

export function subscribe(observer){
    renderApp=observer;
}
