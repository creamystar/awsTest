import React, { useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import styled from "styled-components";
import Quiz from "./Quiz";
import {useSelector,useDispatch} from 'react-redux';
import { setQuiznum, setUserscore, gameListDB, rankListDB } from './redux/modules/rank';
import Progress from './Progress';
import Spinner from './Spinner';

let tinderqno = 1;
let tinderscore = 0;
let rankCheck = false;

const SwipeItem = (props) => {
    // console.log(props.history)

    const dispatch = useDispatch();
    const qno = useSelector(state => state.rank.quiznum);
    const quizAnswer = useSelector(state => state.rank.gameox);
    const gamescore = useSelector(state => state.rank.gamescore);
    const list = useSelector(state => state.rank.ranklist);
    const isLoaded = useSelector(state => state.rank.isLoaded);

    // console.log(quizAnswer);
    // console.log(gamescore);

    useEffect(() => {
        dispatch(gameListDB());
        dispatch(rankListDB());

    })//[]안에 들어가는 변수가 바뀔 때만 재구독 

    // console.log(gamescore)
    // console.log(ranklist)

    //개를 움직여서 ox 선택 
    const onSwipe = (direction) => { //자꾸 2로 돌아간다.. 와이?
        // console.log("direction: "+direction)
        if(direction === 'left' | direction === 'right'){
            ansCheck(direction, tinderqno);
        }
    }

    //버튼을 클릭해서 ox 선택 
    const oClick = () => {
        onClick('O');
    }

    const xClick = () => {
        onClick('X');
    }

    const onClick = (e) => {

        let direction;

        if(e === 'O'){
            direction = 'left'
        } else {
            direction = 'right'
        }

        ansCheck(direction, qno);
    }

    //디렉션, 퀴즈넘버 체크, 넘기기 
    const ansCheck = (dir, qno) => {
        //돌리는 순간 qno는 1로 먹고 아무리 추가해도 qno는 계속 1로 먹는다... 
        //틴더에 처음에 qno가 1로 들어가버리니까.
        //props로 넘기지 않고 스토어여도 틴더처럼 가져온 애는 그냥 초기값으로 고정인가보다.
        // console.log(qno)
        if(dir === 'left'){
            if(quizAnswer[qno-1]){
                // console.log("rightO")
                // console.log(userscore,tinderscore,gamescore[qno-1])
                tinderscore = tinderscore + gamescore[qno-1];
                // console.log(qno)
            }
        } else {
            if(!quizAnswer[qno-1]){
                // console.log("rightX")
                // console.log(userscore,tinderscore,gamescore[qno-1])
                tinderscore = tinderscore + gamescore[qno-1];
            }
        }
        // console.log("left: o right: x")
        // console.log(dir,quizAnswer[qno-1])
        // console.log(tinderscore);
        dispatch(setQuiznum(qno + 1));
        tinderqno += 1;
        // console.log("change no: "+qno)
        if(qno > gamescore.length-1){
            goScore();
        }
    }

    //score 화면으로 넘어가기 
    const goScore = () => {
        dispatch(setQuiznum(1))
        dispatch(setUserscore(tinderscore))
        tinderqno = 1;
        tinderscore = 0;
        // console.log(props)
        props.history.push('/score');
    }

    const hideClick = () => {
        props.history.push('/answer');
    }
      
    const rankClick = () => {
        rankCheck = true;
        console.log("rankClick")
        console.log(rankCheck)
    }
    const goStart = () => {
        rankCheck = false;
    }
       
    return(
        <>
            {!isLoaded && <Spinner/>}
            <SeeRank onClick={rankClick}>랭크보기🎈</SeeRank>
            {rankCheck? 
                <RankModal>
                    <div onClick={goStart}>뒤로🎈</div>
                    {list.map((item,index) => {
                            return (
                                <Box key = {index}>
                                    <div>
                                        <div>{index+1}등</div>
                                        <div>{item.score}점</div>
                                    </div>
                                    <div>
                                        <div>{item.name}</div>
                                        <div>{item.text}</div>
                                    </div>
                                </Box>
                            )
                    })}
                </RankModal>:
                <Wrap>
                    <Progress/>
                    <Quiz/>
                    <Two onClick={oClick}>O</Two>
                    <One>
                        <TinderCard flickOnSwipe={['false']} onSwipe={(dir) => onSwipe(dir)}
                        preventSwipe={['right', 'left','up','down']} swipe={['left','right']} >
                            <img src="https://cdn0.iconfinder.com/data/icons/valentine-s-heart/128/__heart_cute_emoji-256.png"  
                            alt='dog' style={{width: '100px'}}/>
                        </TinderCard>
                    </One>
                    <Two onClick={xClick}>X</Two>
                </Wrap>
            }
            <Hided onClick={hideClick}></Hided>
        </>
    )
}
    const Hided = styled.div`
        background-color: rgba(0,0,0,0.1);
        width: 400px;
        height: 20px;
        width: 400px;
        display: flex;
        justify-content: center;
        text-align: center;
        margin: 0 auto;
    `;
    const But1 = styled.button`
        font-size: 8pt;
        background-color: #DBDAFC;
        border: 0;
        outline: 0;
        width: 350px;
        padding: 7px;
        border-radius: 25px;
        margin-bottom: 1vw;
        cursor: pointer;
        z-index: 2;
        position: absolute;
        left: calc(50vw - 175px);
        top: 79vh;
    `;
    const RankModal = styled.div`
        width: 400px;
        height: 80vh;
        margin: 0 auto;
        border: 1px solid rgba(0,0,0,0.1);
        text-align: center;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            width: 8px;
            height: 8px;
            border-radius: 6px;
            background: rgba(255,255,255,0.4);
        };
        &::-webkit-scrollbar-thumb{
            background-color: rgba(0,0,0,0.3);
            border-radius: 6px;
        }
        &>div:last-child {
            margin-bottom: 150px;
        }
        &>div:first-child {
            font-size: 9pt;
            color: purple;
            cursor: pointer;
            padding: 10px;
        }
    `;

    const Box = styled.div`
    border-radius: 10px;
    border: 1px solid rgba(0,0,0,0.1);
    width: 94%;
    margin: 3%;
    height: 120px;
    font-size: 10pt;

    &>div:nth-child(1) {
        display: inline-block;
        width: 20%;
        float: left;
        border-right: 1px solid rgba(0,0,0,0.1);
        margin-top: 33px;

        &>div:nth-child(1) {
            font-size:15pt;
            font-weight: bold;
        }
    }

    &>div:nth-child(2) {
        width: 70%;
        height: 50%;
        display: inline-block;
        float: left;
        margin-top: 33px;
        margin-left: 15px;
        text-align: left;

        &>div:nth-child(1) {
            margin-bottom: 5px;
        }

        &>div:nth-child(2) {
            height: 100%;
            width: 100%;
            overflow-y: scroll;
            &::-webkit-scrollbar {
                width: 8px;
                height: 8px;
                border-radius: 6px;
                background: rgba(255,255,255,0.4);
            };
            &::-webkit-scrollbar-thumb{
                background-color: rgba(0,0,0,0.3);
                border-radius: 6px;
            }
        }
    }
    `;
    const SeeRank = styled.div `
        width: 100px;
        display: flex;
        justify-content: center;
        text-align: center;
        margin: 0 auto;
        cursor: pointer;
        font-size: 8pt;
        margin-top: 2vh;
        margin-bottom: 1vh;
        color: purple;
        padding: 10px;
    `;
    const One = styled.div`
        display: inline-block;
        z-index: 2;
        vertical-align: middle;
    `;
    const Two = styled.div`
        display: inline-block;
        font-size: 100pt;
        color: #EEEEFD;
        font-weight: 500;
        cursor: pointer;
        vertical-align: middle;
    `;
  const Wrap = styled.div`
    
    width: 400px;
    height: 80vh;
    margin: 0 auto;
    border: 1px solid rgba(0,0,0,0.1);
    text-align: center;
  `;

export default SwipeItem;