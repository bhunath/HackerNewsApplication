import React from 'react'
import classes from './Footer.module.css'

const footer = (props) => {
    return (
        <div>
            <div>
                GuildeLines|FAQ|Support | API | Security | Lists | Bookmarklet | Legal | Apply to YC | Contact
        </div>
            <div className={classes.SearchBox}>
                <label>Search: <input type='text'></input></label>
            </div>
        </div>
    );
}

export default footer;