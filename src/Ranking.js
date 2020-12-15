import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import Spinner from './Spinner';
import {setIsLoaded} from './redux/modules/rank';

const Ranking = (props) => {
    const dispatch = useDispatch();

    const list = useSelector(state => state.rank.ranklist)
    // console.log(list);
    // console.log(list);
    const newmsg = useSelector(state => state.rank.newmsg)
    const isLoaded = useSelector(state => state.rank.isLoaded);
    console.log(newmsg);
    console.log(list);

    const goStart = () => {
        dispatch(setIsLoaded(false));
        props.history.push('/')
    }
    
    const wrapRef = React.useRef(null);
    const bottomRef = React.useRef(null);

    //useEffect : 화면에 렌더링이 완료된 후에 수행
    useEffect(() => {
        if(newmsg.score === -1){
            props.history.push('/')
        }
        setTimeout(function(){
            console.log("scroll");
            console.log(newmsg);
            var wrap = document.querySelector('#wrap');
            // var bottom = document.querySelector('#bottom'); //오류 
            console.log(wrapRef.current) //null 
            console.log(bottomRef.current) //null 
            console.log(bottomRef.current.offsetTop) //null 
            // console.log(bottom.offsetTop) //오류 
            wrapRef.current.scrollTo({top:bottomRef.current.offsetTop-130, left:0, behavior:"smooth"});
        },3000)
    },[])


    

    return (
        <>
        {!isLoaded || bottomRef == null ? <Spinner/> : 
        <Wrap>
            <Top><Nemo>{list.length}명</Nemo>의 사람들 중 당신은?</Top> 
            <Scroll id="wrap" ref={wrapRef}>
            {list.map((item,index) => {
                if(item.score === newmsg.score && item.name === newmsg.name && item.text === newmsg.text){
                    // console.log("find")
                    // console.log(item.score+","+item.name)
                    return (
                        <Box key = {index} ref={bottomRef} id="bottom">
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

                } else {

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

                }
                
            })}
            </Scroll>
            <But1 onClick={goStart}>다시하기</But1>
        </Wrap>}
        </>
    )
}

const Scroll = styled.div`
    height: 71.5vh;
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
        margin-bottom: 120px;
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
const Nemo = styled.div`
    display: inline-block;
    background-color: #FEF5D5;
    border-radius: 25px;
    padding: 8px;
`;

const Top = styled.div`
    width: 100%;
    padding-top: 2vh;
    padding-bottom: 2vh;
    font-size: 9pt;
    vertical-align: middle;
    border-bottom: 1px solid rgba(0,0,0,0.1);
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

const Wrap = styled.div`
    width: 400px;
    height: 80vh;
    margin: 8vh auto;
    border: 1px solid rgba(0,0,0,0.1);
    text-align: center;
`;

export default Ranking;

