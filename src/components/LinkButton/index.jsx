// import React from 'react'
import './index.css'
/* 
外形像链接的按钮
*/

function LinkButton(props) {
  return <button className='link-button' {...props}>{props.children}</button>
}

export default LinkButton
