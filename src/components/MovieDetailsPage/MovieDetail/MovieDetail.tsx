import React from 'react';

interface Props {
    label: string,
    value: JSX.Element
}

export default (props: Props) => {
    return <div className='Detail' key={props.label}>
        <div className='DetailLabel'>
            {props.label}:
        </div>
        <div className='DetailValue'>
            {props.value}
        </div>
    </div>
}