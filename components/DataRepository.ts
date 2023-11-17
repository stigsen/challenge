import {Tree} from "@/model/Tree";
import {Scope} from "@/model/Scope";
import {getAllParents, getGroups} from "@/app/utils";

const tree: Tree = {
    locations: {
        "aarhus-technologies": {
            name: "Aarhus Technologies",
            parents: {
                "aarhus": {}
            }
        },
        "aarhus-office-hub": {
            name: "Aarhus Office Hub",
            parents: {
                "aarhus": {}
            }
        },
        "copenhagen-towers": {
            name: "Copenhagen Towers",
            parents: {
                "copenhagen": {}
            }
        },
        "cph-blox-hub": {
            name: "CPH Blox Hub",
            parents: {
                "copenhagen": {}
            }
        },
        "paris-corp-hq": {
            name: "Paris Corp HQ",
            parents: {
                "paris": {}
            }
        },
        "startup-lab-paris": {
            name: "Startup Lab Paris",
            parents: {
                "paris": {}
            }
        },
    },
    groups: {
        "denmark": {
            name: "Denmark",
            parents: {}
        },
        "jylland": {
            name: "Jylland",
            parents: {
                "denmark": {}
            }
        },
        "aarhus": {
            name: "Aarhus",
            parents: {
                "jylland": {}
            }
        },
        "zealand": {
            name: "Sjælland",
            parents: {
                "denmark": {}
            }
        },
        "copenhagen": {
            name: "Copenhagen",
            parents: {
                "zealand": {}
            }
        },
        "france": {
            name: "France",
            parents: {}
        },
        "paris": {
            name: "Paris",
            parents: {
                "france": {}
            }
        },
    },
    partnerId: "partner-1"
}

export const dataRepository = {
    getTreeData: () => {
        return tree;
    },
};

export const searchScope = (tree: Tree, query: string): Scope => {
    if(!query) return {groups: {}, locations: {}};
    //Find locations with name matching query
    const locations = Object.keys(tree.locations)
        .filter(locationId => tree.locations[locationId].name.toLowerCase().startsWith(query.toLowerCase()))
        .reduce((acc, locationId) => {
            acc[locationId] = {};
            return acc;
        }, {} as Scope["locations"]);

    //Find groups parent groups of found locations matching query or with name matching query
    const groups =  Object.keys(locations).reduce((acc, locationKey) => {
        const parentId = Object.keys(tree.locations[locationKey].parents)[0];
        const parents = getAllParents(tree, parentId);
        [ parentId, ...parents].forEach(parentId => {
            acc[parentId] = {};
        });
        return acc;
    },{ } as Scope["groups"])

    //Find groups that is not in the parent group collection, but still matches query
    const groupsWithMatchingName = Object.keys(tree.groups)
        .filter(groupId => groups[groupId] !== undefined)
        .filter(groupId => tree.groups[groupId].name.toLowerCase().startsWith(query.toLowerCase()))
        .reduce((acc, groupId) => {
            acc[groupId] = {};
            return acc;
        }, {} as Scope["groups"]);
    return {
        groups : {...groups, ...groupsWithMatchingName},
        locations,
    }
}

