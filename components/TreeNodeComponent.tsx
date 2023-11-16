import React, { ReactNode} from 'react'
import {Checkbox} from "@material-tailwind/react";

export type TreeNodeProps = {
    name: string;
    checked?: boolean;
    children?: ReactNode[]
}
export const TreeNodeComponent = ( props: TreeNodeProps) => {
    return (
        <div className='ml-5'>
            <Checkbox className='accent-emerald-800' checked={props.checked} crossOrigin={undefined}/>
            <span> {props.name}</span>
            {props.children }
        </div>
    )
}