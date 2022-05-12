import React, { useCallback } from 'react'

// UseCallbackDemo
export default function UseCallbackDemo() {

    const memoCallback = useCallback(() => {
        console.log("1");
    }, []);
  
    return (
        <div style={{
            backgroundColor: 'gray',
            width: '100%',
            height: '100px'
        }}>
            <button onClick={ () => { memoCallback() } }>点击</button>
        </div>
    );
}
