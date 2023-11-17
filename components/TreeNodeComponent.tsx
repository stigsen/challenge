import React, { ReactNode} from 'react'

export type TreeNodeProps = {
    name: string;
    checked?: boolean;
    children?: ReactNode[]
}
export const TreeNodeComponent = ( props: TreeNodeProps) => {
    return (
        <div className='ml-5'>
            <input
                type='checkbox'
                className='accent-emerald-800'
                checked={props.checked}
                onChange={(e) => {
                    console.log(e.target.checked);
                }}
            />
            <span>{ props.name}</span>
            {props.children}
        </div>
    )
}