'use client';
import React, {useEffect, useState} from "react";
import {ScopeInputProps, TreeViewerComponent} from "@/components/TreeViewerComponent";
import {dataRepository} from "@/Data/DataRepository";
import LoadingComponent from "@/components/LoadingComponent";
import {Scope} from "@/model/Scope";
import {mergeScopes, searchScope} from "@/utils/ScopeHelper";
import {Card} from "@/components/Card";
import {SearchField} from "@/components/SearchField";
import {PartnerSelector} from "@/components/PartnerSelector";

export default function Home() {
    const [partner, setPartner] = useState<string>();
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
    const treeData = dataRepository.getTreeData(partner || '');

    useEffect(() => {
        if (treeData) {
            setSelectedSearch(searchScope(treeData, search));
        }
    }, [search]);

    const selectedScopeChanged = (scope: Scope) => {
        const newScope = mergeScopes(selectedScope, scope);
        setSelectedScope(newScope);
    }

    const changePartner = (partner: string) => {
        setPartner(partner);
        setSearch('');
        setSelectedSearch(undefined);
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
        <>
            <PartnerSelector onSelect={changePartner}/>
            <main className="flex min-h-screen flex-col items-center p-5">
                <Card>
                    <div className="px-6 py-4 items-center">
                        <h1 className='text-center font-bold'>Select Locations</h1>
                        <SearchField
                            search={search}
                            setSearch={setSearch}
                            clearSearch={clearSearch}/>
                            {partner ? <TreeViewerComponent {...scope}  /> : <LoadingComponent/>}
                    </div>
                </Card>
            </main>
        </>
    )
}
