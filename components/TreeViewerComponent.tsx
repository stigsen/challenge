import {TreeNodeComponent} from "@/components/TreeNodeComponent";
import React from "react";
import {Scope} from "@/model/Scope";
import {Tree} from "@/model/Tree";
import {getGroups, getLocations} from "@/app/utils";

export interface ScopeInputProps {
    value?: Scope
    onChange?: (newValue: Scope) => void;
    tree?: Tree,
    search?: Scope
}

/* Helper factory to create the hierarchy of groups and location components */
const createNodeComponent = (groupId: string, scopeProps: ScopeInputProps) : any => {
    const { tree, value, search } = scopeProps;
    if(!tree || !value) {
        return null;
    }
    const childrenKeys = getGroups(tree, groupId);
    const childGroups = childrenKeys.map(child => createNodeComponent(child.id, scopeProps))
    const locations = getLocations(tree, groupId);
    const locationComponents = locations.map(location => (
        <TreeNodeComponent
            key={location.id}
            name={tree.locations[location.id].name}
            checked={!!value.locations[location.id] || !!value.groups[groupId] }
            visible={ !search || !!search?.locations[location.id]}
        />
        ));

    // Return component with children
    return (
        <TreeNodeComponent
            key={groupId}
            name={tree.groups[groupId].name}
            checked={!!value.groups[groupId]}
            visible={ !search || !!search?.groups[groupId] } >
            {childGroups.concat(locationComponents)}
        </TreeNodeComponent>);
}

export const TreeViewerComponent = (props: ScopeInputProps) => {
    // Get the group roots (ie. got no parents)
    const rootGroups = getGroups(props.tree);

    // Create the node components for each root group
    const treeNodes = rootGroups.map(root => createNodeComponent( root.id, props));

    return (<div>{treeNodes}</div>);
}