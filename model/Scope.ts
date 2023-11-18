import {Tree} from "@/model/Tree";
import {getAllGroupParents, ids} from "@/app/utils";

export interface Scope {
    groups: {
        [groupId: string]: {};
    };
    locations: {
        [locationId: string]: {};
    };
}

// Create a scope object from a given tree and a search query
export const searchScope = (tree: Tree, query: string): Scope | undefined => {
    if (query.length === 0) return undefined;

    //Find locations with name matching query
    const locations = ids(tree.locations)
        .filter(locationId => tree.locations[locationId].name.toLowerCase().includes(query.toLowerCase()))
        .reduce((acc, locationId) => {
            acc[locationId] = {};
            return acc;
        }, {} as Scope["locations"]);

    //Find groups parent groups of found locations matching query or with name matching query
    const parentGroups = ids(locations).reduce((acc, locationKey) => {
        const parentId = ids(tree.locations[locationKey].parents)[0];
        const parents = getAllGroupParents(tree, parentId);
        [parentId, ...parents].forEach(parentId => {
            acc[parentId] = {};
        });
        return acc;
    }, {} as Scope["groups"])

    //Find groups that is not in the parent group collection, but still matches query
    const groupsWithMatchingName = ids(tree.groups)
        .filter(groupId => tree.groups[groupId].name.toLowerCase().includes(query.toLowerCase()))
        .reduce((acc, groupId) => {
            const parents = getAllGroupParents(tree, groupId);
            parents.forEach(parentId => {
                acc[parentId] = {};
            });
            acc[groupId] = {};
            return acc;
        }, {} as Scope["groups"]);
    return {
        groups: {...parentGroups, ...groupsWithMatchingName},
        locations,
    }
}
