import React from 'react';
import styled from 'styled-components';

const Spinner = (props) => {
    return (
        <Spin>
            <img src="https://media0.giphy.com/media/sSgvbe1m3n93G/giphy.gif"  
                        alt='loading' style={{width: '50px'}}/>
        </Spin>
    )
}

const Spin = styled.div`
    position: absolute;
    width: 100vw;
    height: 80vh;
    background-color: white;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default Spinner;