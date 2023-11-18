import {ids} from "@/utils/misc";

export interface TreeNode {
    name: string;
    parents: {
        [parentId: string]: {};
    };
}

export interface Tree {
    locations: {
        [locationId: string]: TreeNode;
    };
    groups: {
        [groupId: string]: TreeNode;
    };
    partnerId: string;
}

