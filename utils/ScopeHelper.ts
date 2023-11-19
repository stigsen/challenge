// Will merge the 2 objects - by adding missing properties and removing properties that are all-ready in the current scope
import {Scope} from "@/model/Scope";
import {ids} from "@/utils/misc";
import {Tree} from "@/model/Tree";
import {getAllGroupParents} from "@/utils/TreeHelper";

export const initialScope = ( defaultScope?: Partial<Scope>): Scope => ({
    groups: {
    },
    locations: {
    },
    ...defaultScope
});

export const mergeScopes = (scope1 : Scope, scope2 : Scope ) : Scope => {
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

// Create a scope object from a given tree and a search query
export const createSearchScope = (tree: Tree, query: string): Scope | undefined => {
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

    //Find groups that is _not_ in the parent group collection, but still matches query
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
