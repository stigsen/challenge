import {Tree} from "@/model/Tree";

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
        "aarhus": {
            name: "Aarhus",
            parents: {
                "denmark": {}
            }
        },
        "copenhagen": {
            name: "Copenhagen",
            parents: {
                "denmark": {}
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

export const dataRepository= {
    getTreeData: () => {
        return tree;
    },
    getGroups: (parentId?: string) => {
            return Object.keys(tree.groups)
                .filter(groupId => parentId ? tree.groups[groupId].parents[parentId] : Object.keys(tree.groups[groupId].parents).length === 0)
                .map(groupId => ({id: groupId, name: tree.groups[groupId].name}))
    },
    getLocations: (parentId?: string) => {
            return Object.keys(tree.locations)
                .filter(groupId => parentId ? tree.locations[groupId].parents[parentId] : Object.keys(tree.locations[groupId].parents).length === 0)
                .map(groupId => ({id: groupId, name: tree.locations[groupId].name}))
    }
};

