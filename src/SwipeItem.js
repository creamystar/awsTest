import React from 'react';
import TinderCard from 'react-tinder-card';
import styled from "styled-components";
import Quiz from "./Quiz";

let ansRight = 0;

const SwipeItem = (props) => {

    const [qno,setQno] = React.useState(1);
    let qnos = 1;
    const quizAnswer = ['O','X','X','O','O','O','X','X','O','O'];
    let direc = '';
    
    // console.log('컴포넌트가 렌더되었습니다!')
    // console.log(qno);
    // console.log(ansRight)
    const ansCheck = (dir,qno) => {
        console.log('ansCheck')
        console.log(dir)
        console.log(qno)
        //console.log(qno)
        //console.log(dir)
        //console.log(quizAnswer[qno-1])
        if(dir === 'left'){
            if(quizAnswer[qno-1] === 'O'){
                console.log("rightO")
                ansRight = ansRight+1;
                console.log(ansRight)
            }
        } else {
            if(quizAnswer[qno-1] === 'X'){
                console.log("rightX")
                ansRight = ansRight+1;
                console.log(ansRight)
            }
        }
        console.log(ansRight)
        // console.log(qno)
        // console.log(ansRight)
    }

    const onSwipe = (direction) => {
        // console.log('You swiped: ' + direction)
        direc = direction;
        // console.log(direc);
        if(direc === 'left' | direc === 'right'){
            ansCheck(direc,qnos);
            qnos = qnos+1;
            setQno(qnos);
            if(qnos > 10){
                checkScore();
            }
            // console.log(qno);
            // console.log(direc);
            // console.log(ansRight);
        }
      }

      const checkScore = () => {
          props.checkScore(ansRight);
      }

      const oClick = () => {
          onClick('O');
      }

      const onClick = (e) => {

        let direction;

        if(e === 'O'){
            direction = 'left'
        } else {
            direction = 'right'
        }

        ansCheck(direction,qno);
        setQno(qno+1);
        if(qno > 9){
            checkScore();
        }
        // console.log(qno)
        // console.log(direction)
        // console.log(ansRight) //1에서 고정이 된다... 
      }

      const xClick = () => {
          onClick('X');
      }

       
    return(
        <Wrap>
            <Quiz qno={qno}/>
            <Two onClick={oClick}>O</Two>
            <One>
                <TinderCard flickOnSwipe={['false']} onSwipe={(dir) => onSwipe(dir)}
                preventSwipe={['right', 'left']} swipe={['left','right']} >
                    <img src='https://cdn2.iconfinder.com/data/icons/japan-flat-2/340/dog_pet_animal_japanese_shiba_inu_japan-512.png' 
                    alt='dog' style={{width: '150px', height: '150px'}}/>
                </TinderCard>
            </One>
            <Two onClick={xClick}>X</Two>
        </Wrap>
    );
}

    const One = styled.div`
        display: inline-block;
        z-index: 2;
    `;
    const Two = styled.div`
        display: inline-block;
        font-size: 100pt;
        color: #EEEEFD;
        font-weight: 500;
        cursor: pointer;
    `;
  const Wrap = styled.div`
    width: 400px;
    height: 80vh;
    margin: 8vh auto;
    border: 1px solid rgba(0,0,0,0.1);
    text-align: center;
  `;

export default SwipeItem;