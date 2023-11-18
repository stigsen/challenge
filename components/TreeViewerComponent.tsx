import {TreeNodeComponent} from "@/components/TreeNodeComponent";
import React from "react";
import {Scope} from "@/model/Scope";
import {Tree} from "@/model/Tree";
import {getAllGroupParents, getGroups, getLocations, ids} from "@/app/utils";

export interface ScopeInputProps {
    value?: Scope
    onChange?: (newValue: Scope) => void;
    tree?: Tree,
    search?: Scope
}

function anyLocationParentSelected(tree: Tree, locationId: string, selectedScope: Scope) {
    const locationParentGroup = ids(tree.locations[locationId].parents)[0];
    const allParents = getAllGroupParents(tree, locationParentGroup);
    return [ locationParentGroup, ...allParents].some(id => !!selectedScope.groups[id]);
}

function anyGroupParentSelected(tree: Tree, groupId: string, selectedScope: Scope) {
    const groupParentId = getAllGroupParents(tree, groupId)
    return groupParentId.some(id => !!selectedScope.groups[id]);
}

/* Helper factory to create the hierarchy of groups and location components */
const createNodeComponent = (groupId: string, scopeProps: ScopeInputProps) : any => {
    const { tree, value, search, onChange } = scopeProps;
    if(!tree || !value) {
        return null;
    }
    // Find and create children of this group
    const childrenKeys = getGroups(tree, groupId);
    const childGroups = childrenKeys.map(child => createNodeComponent(child.id, scopeProps))

    // Find any locations of this group
    const locations = getLocations(tree, groupId);
    const locationComponents = locations.map(location => {
        return (<TreeNodeComponent
            onChange={(id) => { onChange ? onChange({ locations: { [id] : {} }, groups:{}  }) : undefined } }
            key={location.id}
            id={location.id}
            name={tree.locations[location.id].name}
            checked={!!value.locations[location.id] || anyLocationParentSelected(tree, location.id, value) }
            visible={ !search || !!search?.locations[location.id]}
        />
        )});

    // Return group component with children
    return (
        <TreeNodeComponent
            key={groupId}
            onChange={(id) => { onChange ? onChange({ groups: { [id] : {} }, locations:{}  }) : undefined } }
            id={groupId}
            name={tree.groups[groupId].name}
            checked={!!value.groups[groupId] || anyGroupParentSelected(tree,groupId,value) }
            visible={ !search || !!search?.groups[groupId] } >
                {childGroups.concat(locationComponents)}
        </TreeNodeComponent>);
}

export const TreeViewerComponent = (props: ScopeInputProps) => {
    // Get the group roots (ie. got no parents)
    const rootGroups = getGroups(props.tree);

    const treeNodes = rootGroups.map(root => createNodeComponent( root.id, props));

    return (<div>{treeNodes}</div>);
}