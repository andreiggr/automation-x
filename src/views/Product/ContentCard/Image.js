import React from 'react';

export default function Image(props) {
    return <img
        {...props}
        style={{ maxWidth: '100%' }}
           />
}