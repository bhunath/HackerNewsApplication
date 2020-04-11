import React from 'react'
import classes from './Login.module.css'

var loginPage = (props) => {

    return (
        <div className={classes.Login}>
            <h1>Login</h1>
            <table>
                <tr>
                    <td><div>username :</div></td>
                    <td><input type='text'></input></td>
                </tr>
                <tr>
                    <td>
                        <div>password</div>
                    </td>
                    <td>
                        <input type='password'></input>
                    </td>
                </tr>
            </table>
        </div>
    )

}

export default loginPage;