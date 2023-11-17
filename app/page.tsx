'use client';
import React, {Suspense, useEffect, useState} from "react";
import {ScopeInputProps, TreeViewerComponent} from "@/components/TreeViewerComponent";
import {dataRepository, searchScope} from "@/components/DataRepository";
import Spinner from "@/components/Spinner";
import {Scope} from "@/model/Scope";
import {mergeScopes} from "@/app/utils";

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
            const newScope = mergeScopes(selectedScope, newValue);
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
