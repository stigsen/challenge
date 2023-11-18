import {Tree, TreeNode} from "@/model/Tree";
import {Scope} from "@/model/Scope";

export const ids = (obj:any) : string[] => {
    return Object.keys(obj);
}

export const getAllGroupParents = (tree: Tree, groupId? : string ) : string[]   => {
    if(!tree || !groupId) return [];
    const group = tree.groups[groupId]
    const parents = group ? ids(tree.groups[groupId]?.parents) : [];
    const grandParents = parents?.flatMap(groupId => getAllGroupParents(tree, groupId));
    return [...parents, ...grandParents];
}

// Get root groups (with no parents) - or groups with a specific parent
export const getGroups = (tree?: Tree, parentId?: string) => {
    if(!tree) return [];
    return ids(tree.groups)
        .filter(groupId => parentId ? tree.groups[groupId].parents[parentId] : ids(tree.groups[groupId].parents).length === 0)
        .map(groupId => ({id: groupId, name: tree.groups[groupId].name}));
}

// Get root locations (with no parents) - or locations with a specific parent
export const getLocations = (tree: Tree, parentId?: string) => {
    return ids(tree.locations)
        .filter(groupId => parentId ? tree.locations[groupId].parents[parentId] : ids(tree.locations[groupId].parents).length === 0)
        .map(groupId => ({id: groupId, name: tree.locations[groupId].name}))
}

// Will merge the 2 objects - by adding missing properties and removing properties that are all-ready in the current scope
export const mergeScopes = ( scope1 : Scope, scope2 : Scope ) : Scope => {
    const groups = scope1.groups;
    ids(scope2.groups).forEach(id => { if( ids(groups).includes(id)) {
        delete groups[id];
    } else {
        groups[id] = {};
    }});
    const locations = scope1.locations;
    ids(scope2.locations).forEach(id => { if( ids(locations).includes(id)) {
        delete locations[id];
    } else {
        locations[id] = {};
    }});
    return  {
        groups,
        locations
    }
}