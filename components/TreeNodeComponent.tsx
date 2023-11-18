import React, {ReactNode} from 'react'

export type TreeNodeProps = {
    name: string;
    id: string;
    checked?: boolean;
    visible?: boolean;
    onChange: (id: string) => void;
    children?: ReactNode[]
}

export const TreeNodeComponent = (props: TreeNodeProps) => {
    const {checked, visible, name, id, children, onChange} = props;
    return (visible && <div className='ml-5'>
        <input
            type='checkbox'
            className='accent-emerald-800'
            checked={checked}
            onChange={() => onChange(id)}
        />
        <span>{name}</span>
        {children}
    </div>);
}