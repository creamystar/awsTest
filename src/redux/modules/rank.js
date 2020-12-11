/* eslint-disable default-case */
//Actions 
const GAMELIST = 'rank/GAMELIST';
const GAMEOX = 'rank/GAMEOX';
const GAMESCORE = 'rank/GAMESCORE';
const USERSCORE = 'rank/USERSCORE';
const RANKLIST = 'rank/RANKLIST';
const QUIZNUM = 'rank/QUIZNUM';
const QUIZNAME = 'rank/QUIZNAME';
const NEWMSG = 'rank/NEWMSG'

const initialState = {
    quizname: '재희',
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
    userscore: 0,
    ranklist: [{score:72,name:'김선호',text:'재희는 아주 멋진 친구구나'},
            {score:66,name:'박보검',text:'재희누나! 재밌어요!'},
            {score:52,name:'성시경',text:'잘자요'},
            {score:47,name:'이수혁',text:'제법 알찬 게임이었다'},
            {score:38,name:'김우빈',text:'대박'},
            {score:33,name:'김남길',text:'재희 짱짱!'},
            {score:21,name:'이영지',text:'좋아요'},],
    quiznum: 1,
    newmsg: {score:0,name:'',text:''},
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

//Reducer
export default function reducer(state = initialState, action = {}){
    switch(action.type) {
        case "rank/GAMELIST": {
            return state;
        }
        case "rank/GAMEOX": {
            return state;
        }
        case "rank/GAMESCORE": {
            return state;
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
            let indexCheck = -1;
            let newRanklist = [];
            // console.log("action.props")
            // console.log(action.props)
            for(var i = 0; i < state.ranklist.length; i++){
                if(action.props.score > state.ranklist[i].score){
                    indexCheck = i;
                    break;
                }
            }
            if(indexCheck == 0){
                newRanklist = [action.props].concat(state.ranklist);
            } else if(indexCheck == -1){
                newRanklist = state.ranklist.concat([action.props]);
            } else {
                console.log(state.ranklist.slice(0,indexCheck))
                console.log(action.props)
                console.log(state.ranklist.slice(indexCheck));

                newRanklist = state.ranklist.slice(0,indexCheck).concat(action.props).concat(state.ranklist.slice(indexCheck));
            }
            
            console.log(newRanklist)
            return {...state, ranklist: newRanklist};
        }
        default: return state;
    }
}