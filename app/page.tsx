'use client';
import React, {Suspense, useEffect, useState} from "react";
import {ScopeInputProps, TreeViewerComponent} from "@/components/TreeViewerComponent";
import {dataRepository} from "@/Data/DataRepository";
import Spinner from "@/components/Spinner";
import {Scope} from "@/model/Scope";
import {mergeScopes, searchScope} from "@/utils/ScopeHelper";
import searchIcon from "./images/search.png";
import deleteIcon from "./images/delete.png";
import Image from "next/image";
import {Card} from "@/components/Card";

export default function Home() {
    const [inputRef] = useState<React.RefObject<HTMLInputElement>>(React.createRef());
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
        inputRef.current?.focus();
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
                    <div className="w-full flex justify-end items-center relative">
                        <input
                            ref={inputRef}
                            className=' focus:caret-gray-500 px-2 py-1 my-4 w-full rounded-md border-2 outline-0'
                            type='text'
                            value={search}
                            placeholder='Search locations or groups'
                            onChange={(e) => setSearch(e.target.value)}/>
                        {search.length > 0 ?
                            <Image
                                src={deleteIcon}
                                className="cursor-pointer absolute mr-3 w-4"
                                alt="Clear Search Icon"
                                onClick={clearSearch}/>
                            : <Image
                                src={searchIcon}
                                className="absolute mr-3 w-4"
                                alt="Search Icon"/>}
                    </div>
                    <Suspense fallback={<Spinner/>}>
                        <TreeViewerComponent {...scope}  />
                    </Suspense>
                </div>
            </Card>
        </main>
    )
}
