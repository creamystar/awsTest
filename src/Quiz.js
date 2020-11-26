import React from 'react';
import styled from "styled-components";


const Quiz = (props) => {

    const quizList = ['기린은 뿔이 있다',
                    '펭귄은 물 속에서 숨을 쉰다',
                    '피를 빨아먹는 모기는 수컷이다',
                    '남극의 얼음은 바닷물이 얼어서 만들어진 것이고, 북극의 얼음은 땅 위에 쌓인 눈이 단단해진 것이다',
                    '아프리카 코끼리의 귀가 아시아 코끼리의 귀보다 크다',
                    '철새는 이동중에 잠을 잔다.',
                    '펭귄은 단맛,쓴맛,신맛,짠맛,감칠맛 모두 느낄 수 있다.',
                    '상어는 고래와 같은 포유류 동물이다.',
                    '토끼는 주인이 부르는 이름을 알아듣는다.',
                    '개는 빨간색과 초록색만 구분하지 못한다.'];
    
    let i = props.qno;

    return (
        <Wrap>
            <Top>{i}번 문제</Top> <br/>
            <Quest>{quizList[i-1]}</Quest>
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