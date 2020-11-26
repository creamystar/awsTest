import React from 'react';
import styled from 'styled-components';

const Score = (props) => {
    console.log(props)

    const goAgain = () => {
        props.goAgain();
    }
    
    return (
        <Wrap>
            <Top><Nemo>{props.title}</Nemo> 퀴즈에 대한 <br/>내 점수는?</Top>
            <h4><Nemo>{props.score}</Nemo> 점 </h4>
            <Ment>축하드려요! <br/>동물과 더 친해지는 시간이었길:)</Ment><br/>
            <But1 onClick={goAgain}>다시하기</But1><br/>
            <But2>랭킹보기</But2>
        </Wrap>
    )
}

const Nemo = styled.div`
    display: inline-block;
    background-color: #FEF5D5;
    border-radius: 25px;
    padding: 8px;
`;

const Top = styled.h3`
    margin-top: 20vh;
`;
const Ment = styled.div`
    font-size: 9pt;
    margin-bottom: 10vh;
`;
const But1 = styled.button`
    font-size: 8pt;
    background-color: #DBDAFC;
    border: 0;
    outline: 0;
    width: 35vw;
    padding: 7px;
    border-radius: 25px;
    margin-bottom: 1vw;
    cursor: pointer;
`;
const But2 = styled.button`
    font-size: 8pt;
    border: 1px solid #DBDAFC;
    background-color: white;
    outline: 0;
    width: 35vw;
    padding: 5px;
    border-radius: 25px;
    margin-bottom: 1vw;
    cursor: pointer;
`;

const Wrap = styled.div`
width: 400px;
height: 80vh;
margin: 8vh auto;
border: 1px solid rgba(0,0,0,0.1);
text-align: center;
`;

export default Score;

