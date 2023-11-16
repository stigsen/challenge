import {Tree} from "@/model/Tree";

export interface Scope {
    groups: {
        [groupId: string]: {};
    };
    locations: {
        [locationId: string]: {};
    };
}
