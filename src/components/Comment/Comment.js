import React from 'react'

var comment = (props) => {
    return (
        <div>
            <tr>
                <td>
                    <small>
                        <span>author</span>
                        <span>minutes ago</span>
                        <span><a>on : {props.title}</a></span>
                    </small>
                </td>
                
            </tr>
        </div>
    );
}