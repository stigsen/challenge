'use client';
import React from "react";
import {ScopeInputProps, TreeViewerComponent} from "@/components/TreeViewerComponent";
import {dataRepository} from "@/components/DataRepository";

export default function Home() {
    const scope = {
        groups: {
            paris: {}
        },
        locations: {
            "aarhus-office-hub": {}
        },
    }

    const scopeInput: ScopeInputProps = {
        value: scope,
        onChange: (newValue) => {
            console.log(newValue)
        },
        tree: dataRepository.getTreeData()
    }

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div id="demo"  >
        <h2 className='place-content-around'>Select Locations</h2>
          <input type='text'/>
            <TreeViewerComponent { ...scopeInput } />
      </div>
      </main>
  )
}
