'use client';
import React, {useEffect, useState} from "react";
import {ScopeInputProps, TreeViewComponent} from "@/components/TreeViewComponent";
import {dataRepository} from "@/Data/DataRepository";
import LoadingComponent from "@/components/LoadingComponent";
import {Scope} from "@/model/Scope";
import {createSearchScope, initialScope, mergeScopes} from "@/utils/ScopeHelper";
import {Card} from "@/components/Card";
import {SearchComponent} from "@/components/SearchComponent";
import {PartnerSelector} from "@/components/PartnerSelector";


export default function Home() {

    const [partner, setPartner] = useState<string>();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedScope, setSelectedScope] = useState<Scope>(initialScope());
    const [searchScope, setSearchScope] = useState<Scope | undefined>(undefined);
    const treeData = dataRepository.getTreeData(partner || '');

    useEffect(() => {
        if (treeData) {
            setSearchScope(createSearchScope(treeData, searchQuery));
        }
    }, [searchQuery]);

    const selectedScopeChanged = (scope: Scope) => {
        const newScope = mergeScopes(selectedScope, scope);
        setSelectedScope(newScope);
    }

    const changePartner = (partner: string) => {
        setPartner(partner);
        setSearchQuery('');
        setSearchScope(undefined);
        setSelectedScope(initialScope());
    }

    const clearSearch = () => {
        setSearchQuery('');
        setSearchScope(undefined);
    }

    const scope: ScopeInputProps = {
        value: selectedScope,
        onChange: selectedScopeChanged,
        tree: treeData,
        search: searchScope
    }

    return (
        <>
            <PartnerSelector onSelect={changePartner}/>
            <main className="flex min-h-screen flex-col items-center p-5">
                <Card>
                    <div className="px-6 py-4 items-center">
                        <h1 className='text-center font-bold'>Select Locations</h1>
                        <SearchComponent
                            search={searchQuery}
                            setSearch={setSearchQuery}
                            clearSearch={clearSearch}/>
                            {partner ? <TreeViewComponent {...scope}  /> : <LoadingComponent/>}
                    </div>
                </Card>
            </main>
        </>
    )
}
