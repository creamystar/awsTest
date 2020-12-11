import React from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {setRanklist,setUserscore,setNewmsg} from './redux/modules/rank';


const Ranking = (props) => {

    const dispatch = useDispatch();

    // const ranklist = useSelector(state => state.rank.ranklist);
    const userscore = useSelector(state => state.rank.userscore);
    const quizname = useSelector(state => state.rank.quizname);
    const newmsg = useSelector(state => state.rank.newmsg);

    const [name,setName] = React.useState('');
    const [text,setText] = React.useState('');

    const nameChange = (e) => {
        setName(e.target.value);
        console.log(name)
    }
    
    const textChange = (e) => {
        setText(e.target.value)
        console.log(text)
    }

    const onClick = () => {
        let item = {
            score: 0,
            name: '',
            text: ''
        }

        item.score = userscore;
        item.name = name;
        item.text = text;

        console.log("item")
        console.log(item)
        dispatch(setRanklist(item));
        dispatch(setNewmsg(item));
        console.log(newmsg)
        // console.log(ranklist)
        dispatch(setUserscore(0));
        props.history.push('/ranking')
    }
    
    const srcName = 'https://cdn2.iconfinder.com/data/icons/despicable-me-2-minions/128/despicable-me-2-Minion-icon-6.png'

    return (
        <Wrap>
            <img src= {srcName} alt='dog' style={{width: '100px',  marginTop: '20vh',}}/>
            <h4>
                <Ment>
                    <Nemo>{quizname} </Nemo> 에게 한마디를 남겨주세요!
                </Ment>
            </h4>
            <input type='text' style={{marginBottom: '7px', height: '4vh', width: '200px',}} placeholder='이름을 적어주세요' onChange={nameChange}/>
            <textarea style={{marginBottom: '20px', height: '10vh', width: '200px', }} placeholder='한마디를 남겨주세요' onChange={textChange}/>
            <But1 onClick={onClick}>진짜 랭킹 보러 가기</But1><br/>
        </Wrap>
    )
}

const Nemo = styled.div`
    display: inline-block;
    background-color: #FEF5D5;
    border-radius: 25px;
    padding: 8px;
`;

const Ment = styled.div`
    font-size: 9pt;
    margin-bottom: 10px;
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

const Wrap = styled.div`
width: 400px;
height: 80vh;
margin: 8vh auto;
border: 1px solid rgba(0,0,0,0.1);
text-align: center;
`;

export default Ranking;

