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

const initialState = {
    quizname: '상식',
    gamelist: ['재희는 간장게장보다 양념게장을 더 좋아한다',
            '재희는 빵보다 밥을 더 좋아한다',
            '재희는 아침을 거의 꼭 사먹는다',
            '재희는 스키 타는 것을 좋아한다',
            '재희는 수영하는 것을 좋아한다',
            '재희는 수년 내로 차를 살 계획이 있다',
            '재희는 단맛, 짠맛 중에 단맛을 더 좋아한다',
            '재희는 스벅, 할리스 중에 할리스를 더 좋아한다',
            '재희의 가장 좋아하는 핸드크림 브랜드는 이솝이다',
            '재희는 개, 고양이 중에 고양이를 더 좋아한다',
            '재희는 로맨스 영화보다 SF 영화를 더 좋아한다',
            '재희가 가장 좋아하는 색은 다크그린이다',
            '재희가 가본 해외 국가는 총 6개국이다'],
    gameox: ['X','O','O','X','O','O','X','X','O','X','O','X','X'],
    gamescore: [15,5,8,4,10,10,8,8,8,11,5,4,4],
    userscore: -1,
    ranklist: [],
    quiznum: 1,
    newmsg: {score:-1,name:'',text:''},
    isLoaded: false,
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

//firestore function
export const gameListDB = () => {
    return function (dispatch,getState){
        quiz_db.get().then((docs) => {
            let gl = [];
            let ox = [];
            let sc = [];
            docs.forEach((doc) => {
                // console.log(doc.data().quiz); //doc.quiz 하면 안된다 
                // console.log(doc.id); //doc.id만 바로 뽑을 수 있음 
                if(doc.exists){
                    // console.log(doc.ans);
                    gl = [...gl, doc.data().quiz];
                    ox = [...ox, doc.data().ans];
                    sc = [...sc, doc.data().score];
                }
            })
            // console.log(gl);
            dispatch(setGamelist(gl));
            dispatch(setGameox(ox));
            dispatch(setGamescore(sc));
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