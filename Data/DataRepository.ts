import {Tree} from "@/model/Tree";
import {CustomerData} from "@/Data/CustomerData";

const customerData: Tree[] = CustomerData;

export const dataRepository = {

    getTreeData: (partnerId: string) : Tree | undefined => {
        return customerData.find((tree: Tree) => tree.partnerId === partnerId);
    },

    getPartners(): string[] {
        return customerData.map((tree: Tree) => tree.partnerId);
    }
};


