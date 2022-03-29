/*
 * @Author: wuaixiaoyao 
 * @Date: 2020-03-31 11:41:08 
 * @Last Modified by: wuaixiaoyao
 * @Last Modified time: 2020-03-31 12:53:14
 */

import React, { useState, useEffect, useRef } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   document.title = `You clicked ${count} times`;
  // }, []);

  // return (
  //   <div>
  //     <p>You clicked {count} times</p>
  //     <button onClick={() => setCount(count + 1)}>
  //       Click me
  //     </button>
  //   </div>
  // );
  const dom = useRef(null);
  useEffect(() => {
    dom.current.addEventListener('click', () => setCount(count + 1));
    return () => {
      dom.current.removeEventListener('click', () => setCount(count + 1))
    }
  }, [count]);
  return <div ref={dom}>{count}</div>;
}

export default Example;
