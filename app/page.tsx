'use client';
import React, {Suspense, useEffect, useState} from "react";
import {ScopeInputProps, TreeViewerComponent} from "@/components/TreeViewerComponent";
import {dataRepository, searchScope} from "@/components/DataRepository";
import Spinner from "@/components/Spinner";
import {Scope} from "@/model/Scope";
import {ids} from "@/app/utils";

export default function Home() {
    const [search, setSearch] = useState<string>('');
    const [selectedScope, setSelectedScope] = useState<Scope>({
        groups: {
            paris: {}
        },
        locations: {
            "aarhus-office-hub": {}
        },
    });
    const [selectedSearch, setSelectedSearch] = useState<Scope | undefined>(undefined);
    const treeData = dataRepository.getTreeData();

    useEffect(() => {
        setSelectedSearch(searchScope(treeData, search));
    }, [search]);

    const scope: ScopeInputProps = {
        value: selectedScope,
        onChange: (newValue) => {
            const groups = selectedScope.groups;
            ids(newValue.groups).forEach(id => { if( ids(groups).includes(id)) {
                delete groups[id];
            } else {
                groups[id] = {};
            }});
            const locations = selectedScope.locations;
            ids(newValue.locations).forEach(id => { if( ids(locations).includes(id)) {
                delete locations[id];
            } else {
                locations[id] = {};
            }});
            //add the missing properties to the selected scope
            const newScope = {
                groups,
                locations
            }
            setSelectedScope(newScope);
        },
        tree: treeData,
        search: selectedSearch
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div id="challenge">
                <Suspense fallback={<Spinner/>}>
                    <h2 className='place-content-around'>Select Locations</h2>
                    <input type='text' value={search} onChange={(e)=> setSearch(e.target.value)}/>
                    <TreeViewerComponent { ...scope }  />
                </Suspense>
            </div>
        </main>
    )
}
