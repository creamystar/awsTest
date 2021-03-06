import React from 'react';
import styled from 'styled-components';
import {useSelector,useDispatch} from 'react-redux';
import {setIsLoaded, setUserscore} from './redux/modules/rank';

const Score = (props) => {

    const dispatch = useDispatch();

    const quizname = useSelector(state => state.rank.quizname);
    const userscore = useSelector(state => state.rank.userscore);

    // console.log(props)
    React.useEffect(() => {
        if(userscore === -1){
            props.history.push('/')
        }
    })
    const goAgain = () => {
        dispatch(setUserscore(0));
        dispatch(setIsLoaded(false));
        props.history.push('/')
    }

    
    
    return (
        <Wrap>
            <Top><Nemo>{quizname}</Nemo> 퀴즈에 대한 <br/>내 점수는?</Top>
            <h4><Nemo>{userscore}</Nemo> 점 </h4>
            <Ment>
                {userscore > 80 ? `와우! 😍 ${quizname} 잘 알고있어요!` : 
                userscore > 60 ? `😘 ${quizname} 좋아하시나봐요?` : 
                userscore > 40 ? `${quizname} 알아가는 시간이었길 😊` : 
                userscore > 20 ? `😥 ${quizname} 관심을 주세요!` : `${quizname} 싫어하시나요? 😭`}
            </Ment><br/>
            <But1 onClick={goAgain}>다시하기</But1><br/>
            <But2 onClick={() => {
                props.history.push('/message');
            }}>메세지남기고 랭크보기</But2>
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
    width: 350px;
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
    width: 350px;
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

