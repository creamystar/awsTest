import React from 'react';
import TinderCard from 'react-tinder-card';
import styled from "styled-components";
import Quiz from "./Quiz";
import {useSelector,useDispatch} from 'react-redux';
import { setQuiznum, setUserscore } from './redux/modules/rank';
import icon from './image/i1130.png';
import Progress from './Progress';



let tinderqno = 1;
let tinderscore = 0;

const SwipeItem = (props) => {
    // console.log(props.history)

    const dispatch = useDispatch();
    const qno = useSelector(state => state.rank.quiznum);
    const quizAnswer = useSelector(state => state.rank.gameox);
    const gamescore = useSelector(state => state.rank.gamescore);
    const userscore = useSelector(state => state.rank.userscore);


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
            if(quizAnswer[qno-1] === 'O'){
                // console.log("rightO")
                console.log(userscore,tinderscore,gamescore[qno-1])
                tinderscore = tinderscore + gamescore[qno-1];
                // console.log(qno)
            }
        } else {
            if(quizAnswer[qno-1] === 'X'){
                // console.log("rightX")
                console.log(userscore,tinderscore,gamescore[qno-1])
                tinderscore = tinderscore + gamescore[qno-1];
            }
        }
        console.log("left: o right: x")
        console.log(dir,quizAnswer[qno-1])
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
      

       
    return(
        <Wrap>
            <Progress/>
            <Quiz/>
            <Two onClick={oClick}>O</Two>
            <One>
                <TinderCard flickOnSwipe={['false']} onSwipe={(dir) => onSwipe(dir)}
                preventSwipe={['right', 'left','up','down']} swipe={['left','right']} >
                    <img src={icon}  
                    alt='dog' style={{width: '130px'}}/>
                </TinderCard>
            </One>
            <Two onClick={xClick}>X</Two>
        </Wrap>
    );
}

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
    margin: 8vh auto;
    border: 1px solid rgba(0,0,0,0.1);
    text-align: center;
  `;

export default SwipeItem;