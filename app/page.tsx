'use client';
import React from "react";
import {TreeViewerComponent} from "@/components/TreeViewerComponent";

export default function Home() {
    const scope = {
        groups: {
            paris: {}
        },
        locations: {
            "aarhus-office-hub": {}
        },
    }
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div id="demo"  >
        <h2 className='place-content-around'>Select Locations</h2>
          <input type='text'/>
            <TreeViewerComponent { ...scope } />
      </div>
      </main>
  )
}
