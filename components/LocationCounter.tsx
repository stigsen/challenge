import {ids} from "@/utils/misc";
import React from "react";
import {ScopeInputProps} from "@/components/TreeViewComponent";

export const LocationCounter = (props: ScopeInputProps) => {
    const locationsTotal = ids(props.tree?.locations).length;
    const locationsShown: string = props.search ? `${ids(props.search?.locations || {}).length}/` : '';

    const locationsString = `Locations: ${locationsShown}${locationsTotal}`;

    return (<div className='flex justify-end text-[6px] text-gray-400'>
        <span>{locationsString}</span>
    </div>);
}