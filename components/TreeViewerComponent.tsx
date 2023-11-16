import {dataRepository} from "@/components/DataRepository";
import {TreeNodeComponent} from "@/components/TreeNodeComponent";
import React from "react";
import {Scope} from "@/model/Scope";

export const TreeViewerComponent = (props: Scope) => {

    const rootGroups = dataRepository.getGroups().map((root, index) => {
        const groupChildrenNodes = dataRepository.getGroups(root.id).map((groupChild, index) => {
            const locationNodes = dataRepository.getLocations(groupChild.id).map((location, index) => (
                <TreeNodeComponent key={index} name={location.name} checked={!!props.groups[groupChild.id] || !!props.locations[location.id]} />));
            return (<TreeNodeComponent key={index} name={groupChild.name} checked={!!props.groups[groupChild.id]}>
                {locationNodes}
            </TreeNodeComponent>)
        });
        return (<TreeNodeComponent key={index} name={root.name} checked={!!props.groups[root.id]}>
            {groupChildrenNodes}
        </TreeNodeComponent>)
    });

    return (
        <div>{rootGroups}</div>);
}