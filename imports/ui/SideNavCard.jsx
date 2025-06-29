import React from 'react';
import './SideNavCard.css';

const SideNavCard = () => {
    return (
        <div className='card-retake'>
            <img src="/Frame 427320950-new.png" className='carddd' />
            <button style={{
                minWidth: '100px',
                background: '#00DC5E',
                /* margin-left: 3%; */
                /* margin-right: -100vh; */
                paddingRight: '40px',
                paddingLeft: '27px',
                border: 'none',
                borderRadius: '7px',
                alignSelf: 'flex-start',
                marginLeft: '-170px',
                height: '29px',
                cursor:'pointer',
            }}>Device on rent</button>
        </div>
    );
}
export default SideNavCard;