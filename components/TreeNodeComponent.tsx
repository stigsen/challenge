import React, { ReactNode} from 'react'

export type TreeNodeProps = {
    name: string;
    checked?: boolean;
    children?: ReactNode[]
}
export const TreeNodeComponent = ( props: TreeNodeProps) => {
    return (
        <div className='ml-5'>
            <input className='checked:bg-red-500 checked:before:bg-red-500' type='checkbox' checked={props.checked}/><span> {props.name}</span>
            {props.children }
        </div>
    )
}