import React, {ReactNode} from 'react'

export type TreeNodeProps = {
    name: string;
    id: string;
    checked?: boolean;
    visible?: boolean;
    onChange: (id: string) => void;
    children?: ReactNode[]
    isLocation?: boolean;
}

export const TreeNodeComponent = (props: TreeNodeProps) => {
    const {checked, visible, name, id, children, onChange, isLocation} = props;
    return (visible && <div className='ml-5'>
        <input
            type='checkbox'
            className='accent-emerald-800 cursor-pointer mr-1'
            checked={checked}
            onChange={() => onChange(id)}
        />
        <span className={`${isLocation ? 'italic' : 'normal'}`}>{name}</span>
        {children}
    </div>);
}