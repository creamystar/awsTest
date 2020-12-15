import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

const Progress = (props) => {
    
    const quizList = useSelector(state => state.rank.gamelist);
    const num = useSelector(state => state.rank.quiznum);

    // console.log(quizList)
    // console.log(num)

    return (
        <Wrap>
            <Bar count={((num - 1)/quizList.length*100+"%")}></Bar>
            <Bar2 count={((num - 1)/quizList.length*100-5 > 0?(num - 1)/quizList.length*100-5+"%":0+"%")}></Bar2>
            <Circle count={(((num - 1)/quizList.length*100)-5+"%")}></Circle>
        </Wrap>
    )
}

const Wrap = styled.div`
    background-color: #eee;
    border-radius: 20px;
    width: 77%;
    height: 15px;
    margin-top: 4vh;
    margin-left: 11%;
`;

const Bar = styled.div`
    width: ${props => props.count};
    transition: width 1s; 
    height: 100%;
    background-color: purple;
    border-radius: 20px;
`;

const Bar2 = styled.div`
    width: ${props => props.count};
    transition: width 1s; 
    height: 2px;
    background-color: #c229c2;
    border-radius: 100px;
    margin-top: -12px;
    margin-left: 3%;
`;
const Circle = styled.div`
    margin-left: ${props => props.count};
    transition: margin-left 1s; 
    margin-top: -12px;
    width: 20px;
    height: 20px;
    border-radius: 50px;
    background-color: white;
    border: 5px solid purple;
`;

export default Progress;