import {dataRepository} from "@/components/DataRepository";
import {TreeNodeComponent} from "@/components/TreeNodeComponent";
import React from "react";
import {Scope} from "@/model/Scope";
import {Tree, TreeNode} from "@/model/Tree";
import {getGroups, getLocations} from "@/app/utils";

export interface ScopeInputProps {
    value?: Scope
    onChange?: (newValue: Scope) => void;
    tree?: Tree
}


const ids = (obj: any ) : string[] => Object.keys(obj);
const hasId = (obj: any, id: string ) : boolean => obj.parents[id] !== undefined;

const createNodeComponent = (tree: Tree, groupId: string) : any => {
    const childrenKeys = getGroups(tree, groupId);
    const childGroups = childrenKeys.map(child => createNodeComponent(tree, child.id))
    const locations = getLocations(tree, groupId);
    console.log("XX:", groupId, childrenKeys, childGroups, locations  );
    const locationComponents = locations.map(location => (<TreeNodeComponent key={location.id} name={tree.locations[location.id].name} checked={true} />));
    const childGroupComponents = childGroups.map(group => (<TreeNodeComponent  key={group.id} name={tree.groups[group.id].name} checked={true} />));
    return (<TreeNodeComponent name={tree.groups[groupId].name} checked={true} >
        {childGroupComponents.concat(locationComponents)}
    </TreeNodeComponent>);
}

export const TreeViewerComponent = (props: ScopeInputProps) => {

    const scope = props.value || { groups: {}, locations: {} };
    const tree = props.tree || dataRepository.getTreeData();

    //Get root groups recursively
    //const roots = getRoots(tree)
    //const rootsWithChildren = roots.map(root => ({ ...root, children: getGroupChildren(tree, root.id) }))

    const rootGroups = getGroups(tree);
    const treeNodes = rootGroups.map(root => createNodeComponent(tree, root.id));
    // const rootGroups = getGroups(tree).map((root, index) => {
    //     const groupChildrenNodes = getGroups(tree,root.id).map((groupChild, index) => {
    //         const locationNodes = getLocations(tree,groupChild.id).map((location, index) => (
    //             <TreeNodeComponent key={index} name={location.name} checked={!!scope.groups[groupChild.id] || !!scope.locations[location.id]} />));
    //         return (<TreeNodeComponent key={index} name={groupChild.name} checked={!!scope.groups[groupChild.id]}>
    //             {locationNodes}
    //         </TreeNodeComponent>)
    //     });
    //     return (<TreeNodeComponent key={index} name={root.name} checked={!!scope.groups[root.id]}>
    //         {groupChildrenNodes}
    //     </TreeNodeComponent>)
    // });
    //
    return (
        <div>{treeNodes}</div>);
}