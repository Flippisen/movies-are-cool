import React from 'react';

interface Props {
    label: string,
    value: JSX.Element
}

export default (props: Props) => {
    return <div className='Detail'>
        <div className='DetailLabel'>
            {props.label}:
        </div>
        <div className='DetailValue'>
            {props.value}
        </div>
    </div>
}