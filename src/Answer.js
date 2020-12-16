import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {Link} from "react-router-dom";

const Answer = (props) => {

    const list = useSelector(state => state.rank.anslist)
    
    // const onClick = () => {
    //     console.log("click")
    //     console.log(list)
    //     list.map((item,index) => {
    //         console.log("map")
    //         console.log(item)
    //     })
    // }

    return (
        <Wrap>
            <Link to = "/">back</Link>
            <Scroll>
                {
                    list.map((item,index) => {
                        return (
                            <div>
                                <div>
                                    {index+1}.{item.quiz}
                                </div>
                                <div>
                                    {item.ans?<div>O</div>:<div>X</div>}
                                </div>
                                { item.exp ? <div>해설: {item.exp}</div>:<></> }
                            </div>

                        )
                    })
                }
            </Scroll>
        </Wrap>
    );
}

const Scroll = styled.div`
    height: 73vh;
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
    &>div {
        border: 1px solid rgba(0,0,0,0.1);
        font-size: 9pt;
        text-align: left;
        padding: 10px;
        margin: 10px;
        border-radius: 10px;
        &>div:nth-child(1){
            display: inline-block;
            margin-right: 10px;
        }
        &>div:nth-child(2){
            display: inline-block;
            color: red;
        }
        &>div:nth-child(3){
            color: gray;
        }
    }
`;

const Wrap = styled.div`
    width: 400px;
    height: 80vh;
    margin: 7vh auto;
    border: 1px solid rgba(0,0,0,0.1);
    text-align: center;
`;

export default Answer;