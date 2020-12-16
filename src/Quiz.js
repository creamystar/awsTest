import React from 'react';
import styled from "styled-components";
import {useSelector} from 'react-redux';

const Quiz = (props) => {

    const quizList = useSelector(state => state.rank.gamelist);
    const num = useSelector(state => state.rank.quiznum);
    // console.log(quizList[num-1]);
    // console.log(quizList);

    

    return (
        <Wrap>
            <Top>{num}번 문제</Top> <br/>
            <Quest>{quizList[num-1]}</Quest>
        </Wrap>
    )
}

const Quest = styled.h3`
    margin-left: 5vw;
    margin-right: 5vw;
`;

const Top = styled.div`
    display: inline-block;
    margin-top: 5vh;
    background-color: #FEF5D5;
    border-radius: 25px;
    padding: 8px;
`;

const Wrap = styled.div`
    width: 400px;
    height: 30vh;
    margin-bottom: 7vh;
`;
export default Quiz;