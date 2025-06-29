import React from 'react';
import "./Accountbar.css";
import { AccountbarData } from './AccountBarData';

function Accountbar(){
    return(
      <div className='accbar'>
      <ul className='accbar-list'>
      {AccountbarData.map((val, key) => {
      return(
      <ul key={key} 
          className="row" 
          id={window.location.pathname === val.path ? "active" : ""}
          onClick = { ()=> {window.location.pathname = val.path}} > {" "}
      <div id="title">{val.title}</div>
      </ul>
      );
})}
</ul>
    </div>
  );
}

export default Accountbar