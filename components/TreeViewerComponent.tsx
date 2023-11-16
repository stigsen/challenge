import {dataRepository} from "@/components/DataRepository";
import {TreeNodeComponent} from "@/components/TreeNodeComponent";
import React from "react";
import {Scope} from "@/model/Scope";
import {Tree} from "@/model/Tree";
import {getGroups, getLocations} from "@/app/utils";

export interface ScopeInputProps {
    value?: Scope
    onChange?: (newValue: Scope) => void;
    tree?: Tree
}
export const TreeViewerComponent = (props: ScopeInputProps) => {

    const scope = props.value || { groups: {}, locations: {} };
    const tree = props.tree || dataRepository.getTreeData();

    const rootGroups = getGroups(tree).map((root, index) => {
        const groupChildrenNodes = getGroups(tree,root.id).map((groupChild, index) => {
            const locationNodes = getLocations(tree,groupChild.id).map((location, index) => (
                <TreeNodeComponent key={index} name={location.name} checked={!!scope.groups[groupChild.id] || !!scope.locations[location.id]} />));
            return (<TreeNodeComponent key={index} name={groupChild.name} checked={!!scope.groups[groupChild.id]}>
                {locationNodes}
            </TreeNodeComponent>)
        });
        return (<TreeNodeComponent key={index} name={root.name} checked={!!scope.groups[root.id]}>
            {groupChildrenNodes}
        </TreeNodeComponent>)
    });

    return (
        <div>{rootGroups}</div>);
}