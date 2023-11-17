import {Tree} from "@/model/Tree";

export const getAllParents = (tree: Tree, parentId? : string ) : string[]   => {
    if(!tree || !parentId) return [];
    const group = tree.groups[parentId]
    const parents = group ? Object.keys(tree.groups[parentId]?.parents) : [];
    const grandParents = parents?.flatMap(parentId => getAllParents(tree, parentId));
    return [...parents, ...grandParents];
}

export const getGroups = (tree?: Tree, parentId?: string) => {
    if(!tree) return [];
    const groups= Object.keys(tree.groups)
        .filter(groupId => parentId ? tree.groups[groupId].parents[parentId] : Object.keys(tree.groups[groupId].parents).length === 0)
        .map(groupId => ({id: groupId, name: tree.groups[groupId].name}));
    return groups;
}

export const getLocations = (tree: Tree, parentId?: string) => {
    return Object.keys(tree.locations)
        .filter(groupId => parentId ? tree.locations[groupId].parents[parentId] : Object.keys(tree.locations[groupId].parents).length === 0)
        .map(groupId => ({id: groupId, name: tree.locations[groupId].name}))
}
