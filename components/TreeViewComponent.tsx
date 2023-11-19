import {TreeNodeComponent} from "@/components/TreeNodeComponent";
import React from "react";
import {Scope} from "@/model/Scope";
import {Tree} from "@/model/Tree";
import {ids} from "@/utils/misc";
import {getAllGroupParents, getGroups, getLocations} from "@/utils/TreeHelper";
import {initialScope} from "@/utils/ScopeHelper";

export interface ScopeInputProps {
    value?: Scope
    onChange: (newValue: Scope) => void;
    tree?: Tree,
    search?: Scope
}

function locationOrParentsSelected(tree: Tree, locationId: string, selectedScope: Scope) {
    const selected = !!selectedScope.locations[locationId];
    const locationParentGroup = ids(tree.locations[locationId].parents)[0];
    const allParents = getAllGroupParents(tree, locationParentGroup);
    return selected || [locationParentGroup, ...allParents].some(id => !!selectedScope.groups[id]);
}

function groupOrParentsSelected(tree: Tree, groupId: string, selectedScope: Scope) {
    const selected = !!selectedScope.groups[groupId];
    const groupParentId = getAllGroupParents(tree, groupId)
    return selected || groupParentId.some(id => !!selectedScope.groups[id]);
}

function locationVisible(locationId: string, search: Scope | undefined) {
    return !search || !!search?.locations[locationId]
}

function groupVisible(groupId: string, search: Scope | undefined) {
    return !search || !!search?.groups[groupId];
}

/* Helper factory to create the hierarchy of groups and location components */
const createNodeComponent = (groupId: string, scopeProps: ScopeInputProps): any => {
    const {tree, value, search, onChange} = scopeProps;
    try {
        if (!tree || !value) {
            return null;
        }
        // Find and create children of this group
        const childrenKeys = getGroups(tree, groupId);
        const childGroups = childrenKeys.map(child => createNodeComponent(child.id, scopeProps))

        // Find any locations of this group
        const locations = getLocations(tree, groupId);
        const locationComponents = locations.map(location => {
            return (<TreeNodeComponent
                    onChange={(id) => onChange(initialScope({locations: {[id]: {}}}))}
                    key={location.id}
                    id={location.id}
                    name={tree.locations[location.id].name}
                    checked={locationOrParentsSelected(tree, location.id, value)}
                    visible={locationVisible(location.id, search)}
                    isLocation={true}
                />
            )
        });
        // Return group component with children
        return (
            <TreeNodeComponent
                key={groupId}
                onChange={(id) => onChange(initialScope({groups: {[id]: {}}}))}
                id={groupId}
                name={tree.groups[groupId].name}
                checked={groupOrParentsSelected(tree, groupId, value)}
                visible={groupVisible(groupId, search)}>
                {childGroups.concat(locationComponents)}
            </TreeNodeComponent>);
    } catch (e) {
        console.error(e);
        return null;
    }
}

export const TreeViewComponent = (props: ScopeInputProps) => {
    const { tree , search } = props;

    // Get the group roots (i.e. got no parents)
    const rootGroups = getGroups(tree);

    const treeNodes = rootGroups.map(root => createNodeComponent(root.id, props));

    const noLocationsFound = search &&
        ids(search?.locations).length === 0 &&
        ids(search?.groups).length === 0;

    return (
        <div>
            { noLocationsFound && <div className='text-center text-gray-400'>No locations found</div> }

            <div className='min-h-[300px] max-h-[400px] overflow-auto '>
                {treeNodes}
            </div>
        </div>
    );
}