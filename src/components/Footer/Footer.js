import React from 'react'
import classes from './Footer.module.css'

const footer = (props) => {
    return (
        <div>
            <div>
                GuildeLines|FAQ|Support | API | Security | Lists | Bookmarklet | Legal | Apply to YC | Contact
        </div>
            <div className={classes.SearchBox}>
                <div>Search: <input type='text'></input></div>
            </div>
        </div>
    );
}

export default footer;