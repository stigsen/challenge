import {Tree} from "@/model/Tree";

export const getGroups = (tree: Tree, parentId?: string) => {
    return Object.keys(tree.groups)
        .filter(groupId => parentId ? tree.groups[groupId].parents[parentId] : Object.keys(tree.groups[groupId].parents).length === 0)
        .map(groupId => ({id: groupId, name: tree.groups[groupId].name}))
}

export const getLocations = (tree: Tree, parentId?: string) => {
    return Object.keys(tree.locations)
        .filter(groupId => parentId ? tree.locations[groupId].parents[parentId] : Object.keys(tree.locations[groupId].parents).length === 0)
        .map(groupId => ({id: groupId, name: tree.locations[groupId].name}))
}
