import {Tree} from "@/model/Tree";

export const ids = (obj:any) : string[] => {
    return Object.keys(obj);
}

export const getAllParents = (tree: Tree, parentId? : string ) : string[]   => {
    if(!tree || !parentId) return [];
    const group = tree.groups[parentId]
    const parents = group ? ids(tree.groups[parentId]?.parents) : [];
    const grandParents = parents?.flatMap(parentId => getAllParents(tree, parentId));
    return [...parents, ...grandParents];
}

export const getGroups = (tree?: Tree, parentId?: string) => {
    if(!tree) return [];
    return ids(tree.groups)
        .filter(groupId => parentId ? tree.groups[groupId].parents[parentId] : ids(tree.groups[groupId].parents).length === 0)
        .map(groupId => ({id: groupId, name: tree.groups[groupId].name}));
}

export const getLocations = (tree: Tree, parentId?: string) => {
    return ids(tree.locations)
        .filter(groupId => parentId ? tree.locations[groupId].parents[parentId] : ids(tree.locations[groupId].parents).length === 0)
        .map(groupId => ({id: groupId, name: tree.locations[groupId].name}))
}
