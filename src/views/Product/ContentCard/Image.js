import React from 'react';

export function Image(props) {
    return <img
        {...props}
        style={{marginBottom: '30px' }}
    />
}


export const ImageOrLink = props => {
    if (props.href.match(/\.(jpe?g|png|gif|webp)$/)) {
        return <img src={props.href} style={{ marginBottom: '30px' }} />
    }

    return <a href={props.href}>{props.children}</a>
}