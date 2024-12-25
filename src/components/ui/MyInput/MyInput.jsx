import React from 'react';
import cls from '../MyInput/MyInput.module.css'

const MyInput = (props) => {
    return (
        <input className={cls.myInput} type="text" {...props}/>
    )
}

export default MyInput