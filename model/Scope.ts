import {Tree} from "@/model/Tree";

export interface Scope {
    groups: {
        [groupId: string]: {};
    };
    locations: {
        [locationId: string]: {};
    };
}

interface ScopeInputProps {
    value?: Scope
    onChange?: (newValue: Scope) => void;
    tree?: Tree
}