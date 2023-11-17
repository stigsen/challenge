'use client';
import React, {Suspense, useState} from "react";
import {ScopeInputProps, TreeViewerComponent} from "@/components/TreeViewerComponent";
import {dataRepository, searchScope} from "@/components/DataRepository";
import {Scope} from "@/model/Scope";
import Spinner from "@/components/Spinner";

export default function Home() {
    const [search, setSearch] = useState<string>('');
    const [scope, setScope] = useState<Scope>({
        groups: {
            paris: {}
        },
        locations: {
            "aarhus-office-hub": {}
        },
    });

    const scopeInput: ScopeInputProps = {
        value: scope,
        onChange: (newValue) => {
            console.log(newValue)
        },
        tree: dataRepository.getTreeData(),
        search: searchScope(dataRepository.getTreeData(), search)
    }

    console.log("search", search, scopeInput.search);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div id="challenge">
                <Suspense fallback={<Spinner/>}>
                    <h2 className='place-content-around'>Select Locations</h2>
                    <input type='text' value={search} onChange={(e)=> setSearch(e.target.value)}/>
                    <TreeViewerComponent  {...scopeInput } />
                </Suspense>
            </div>
        </main>
    )
}
