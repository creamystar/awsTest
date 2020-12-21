import {firestore} from '../../firebase';

const quiz_db = firestore.collection('quiz')
const rank_db = firestore.collection('rank')

//Actions 
const GAMELIST = 'rank/GAMELIST';
const GAMEOX = 'rank/GAMEOX';
const GAMESCORE = 'rank/GAMESCORE';
const USERSCORE = 'rank/USERSCORE';
const RANKLIST = 'rank/RANKLIST';
const QUIZNUM = 'rank/QUIZNUM';
const QUIZNAME = 'rank/QUIZNAME';
const NEWMSG = 'rank/NEWMSG';
const SETLOADED = 'rank/SETLOADED';
const ANSLIST = 'rank/ANSLIST';

const initialState = {
    quizname: '재희',
    gamelist: [],
    gameox: [],
    gamescore: [],
    userscore: -1,
    ranklist: [],
    quiznum: 1,
    newmsg: {score:-1,name:'',text:''},
    isLoaded: false,
    anslist: [],
}

//Action Creators
export const setGamelist = (props) => {
    return {type: GAMELIST, props}
}
export const setGameox = (props) => {
    return {type: GAMEOX, props}
}
export const setGamescore = (props) => {
    return {type: GAMESCORE, props}
}
export const setUserscore = (props) => {
    return {type: USERSCORE, props}
}
export const setRanklist = (props) => {
    return {type: RANKLIST, props}
}
export const setQuiznum = (props) => {
    return {type: QUIZNUM, props}
}
export const setQuizname = (props) => {
    return {type: QUIZNAME, props}
}
export const setNewmsg = (props) => {
    return {type: NEWMSG, props}
}
export const setIsLoaded = (props) => {
    return {type: SETLOADED, props}
}
export const setAnslist = (props) => {
    return {type: ANSLIST, props}
}

//firestore function
export const gameListDB = () => {
    return function (dispatch,getState){
        quiz_db.get().then((docs) => {
            let gl = [];
            let ox = [];
            let sc = [];
            let al = [];
            docs.forEach((doc) => {
                // console.log(doc.data().quiz); //doc.quiz 하면 안된다 
                // console.log(doc.id); //doc.id만 바로 뽑을 수 있음 
                if(doc.exists){
                    // console.log(doc.ans);
                    gl = [...gl, doc.data().quiz];
                    ox = [...ox, doc.data().ans];
                    sc = [...sc, doc.data().score];
                    al = [...al, {...doc.data()}];
                    // console.log(al)
                }
            })
            // console.log(gl);
            // console.log(ox);
            dispatch(setGamelist(gl));
            dispatch(setGameox(ox));
            dispatch(setGamescore(sc));
            dispatch(setAnslist(al));
            // console.log(gl.length)
        }).catch(error => {
            console.log(error);
        })
    }
}

export const rankListDB = () => {
    return function(dispatch,getState){
        rank_db.get().then((docs) => {
            // console.log(docs)
            let rd = [];
            docs.forEach((doc) => {
                // console.log(doc.data().score);//75,50,25
                // console.log(rd.length)//0,1,2
                // console.log(rd)
                
                if (rd.length === 0){
                    // console.log("1")
                    rd = [...rd, {id: doc.id, ...doc.data()}]
                } else if (rd.length === 1){
                    // console.log("2")
                    if(rd[0].score <= doc.data().score){
                        rd = [{id: doc.id, ...doc.data()}].concat(rd)
                    } else {
                        rd = rd.concat({id: doc.id, ...doc.data()})
                    }
                } else {
                    // console.log("3")
                    // console.log(doc.data().score)
                    if(rd[0].score <= doc.data().score){
                        // console.log("3-1")
                        rd = [{id: doc.id, ...doc.data()}].concat(rd)
                    } else if(rd[rd.length-1].score > doc.data().score){
                        // console.log("3-2")
                        rd = rd.concat({id: doc.id, ...doc.data()})
                    } else {
                        // console.log("3-3")
                        let times = 0;
                        let check = true;
                        rd.forEach(item => {
                            if(item.score <= doc.data().score && check){
                                rd = rd.slice(0,times).concat({id: doc.id, ...doc.data()}).concat(rd.slice(times));
                                check = false;
                                //times는 index와 동일. 0,1,2 말고 1,2,3. 
                                //그러므로 현재 위치보다 크거나 같다면 현재위치 앞까지 잘라서 그 뒤에 
                                //새로운 데이터 붙이고 그 뒤에 현재위치부터 끝까지 붙이는 것. 
                            }
                            times++;
                        })
                    }
                }
            })
            // console.log(rd);
            dispatch(setRanklist(rd));
        })
    }
}

export const addRankDB = (props) => {
    return function(dispatch,getState){
        let rank = {name: props.name, score: props.score, text: props.text};
        // console.log(props.score, props.name, props.text)
        rank_db.add(props).then((docs) => {
            dispatch(rankListDB(rank));
            // console.log()
        })
        
    }
}

//Reducer
export default function reducer(state = initialState, action = {}){
    switch(action.type) {
        case "rank/ANSLIST": {
            return {...state, anslist: action.props};
        }
        case "rank/GAMELIST": {
            return {...state, gamelist: action.props, isLoaded: true};
        }
        case "rank/GAMEOX": {
            return {...state, gameox: action.props};
        }
        case "rank/GAMESCORE": {
            return {...state, gamescore: action.props};
        }
        case "rank/USERSCORE": {
            return {...state, userscore: action.props};
        }
        case "rank/QUIZNUM": {
            return {...state, quiznum: action.props};
        }
        case "rank/QUIZNAME": {
            return {...state, quizname: action.props};
        }
        case 'rank/NEWMSG': {
            return {...state, newmsg: action.props};
        }
        case "rank/RANKLIST": {
           return {...state, ranklist: action.props, isLoaded: true};
        }
        case "rank/SETLOADED": {
           return {...state, isLoaded: action.props};
        }
        default: return state;
    }
}