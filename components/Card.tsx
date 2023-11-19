import {ReactNode} from "react";

type Props = {
    children: ReactNode;
}
export const Card = (props: Props) => {
    return (
        <div className="min-h-200 w-5/6 bg-white rounded shadow-lg">
            {props.children}
        </div>
    )
}