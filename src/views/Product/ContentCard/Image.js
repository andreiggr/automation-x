import React from 'react';

export function Image(props) {
    return <img
        {...props}
        style={{ maxWidth: '100%' }}
           />
}


export const ImageOrLink = props => {
    if (props.href.match(/\.(jpe?g|png|gif)$/)) {
        return <img src={props.href} />
    }

    return <a href={props.href}>{props.children}</a>
}