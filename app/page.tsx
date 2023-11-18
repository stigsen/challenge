'use client';
import React, {Suspense, useEffect, useState} from "react";
import {ScopeInputProps, TreeViewerComponent} from "@/components/TreeViewerComponent";
import {dataRepository} from "@/Data/DataRepository";
import Spinner from "@/components/Spinner";
import {Scope} from "@/model/Scope";
import {mergeScopes, searchScope} from "@/utils/ScopeHelper";
import {Card} from "@/components/Card";
import {SearchField} from "@/components/SearchField";

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

    const selectedScopeChanged = (scope: Scope) => {
        const newScope = mergeScopes(selectedScope, scope);
        setSelectedScope(newScope);
    }

    const clearSearch = () => {
        setSearch('');
        setSelectedSearch(undefined);
    }

    const scope: ScopeInputProps = {
        value: selectedScope,
        onChange: selectedScopeChanged,
        tree: treeData,
        search: selectedSearch
    }
    return (
        <main className="flex min-h-screen flex-col items-center p-8">
            <Card>
                <div className="px-6 py-4 items-center">
                    <h1 className='text-center font-bold'>Select Locations</h1>
                    <SearchField
                        search={search}
                        setSearch={setSearch}
                        clearSearch={clearSearch}/>
                    <Suspense fallback={<Spinner/>}>
                        <TreeViewerComponent {...scope}  />
                    </Suspense>
                </div>
            </Card>
        </main>
    )
}
