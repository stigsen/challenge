
# Code Challenge

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Requirements

The challenge app is the implementation of the code challenge for the position of Senior developer at KanPla

The requirements can be seen here:
[FigJam url](https://www.figma.com/file/ue4Que9xjl6WAXpvFBRuoN/Untitled?type=whiteboard&node-id=0-1&t=fzGgLcx67bGNPXct-0)
(You might need permission to access the document)

The implementation is including the following functionality:
* Hierarchical display of locations and groups
  * Groups as nodes and locations as leafs
  * Locations are displayed with italics
* Search for a location/groups by name
  * Search is case-insensitive
  * Search is done on the name of the location/group
* Selection of a location/group
  * Locations must be selected if their group is selected
* Dynamic display of the count of visual locations

The example implementation also contains functionality to choose separate customer data segments (for testing purposes)

## Deployed on Vercel
The implementation is done using Next.js and deployed on Vercel.
See the master deployed on Vercel [here](https://challenge-three-dusky.vercel.app/)

### NOT included in the implementation
The following functionality is _not_ included in the implementation:
* unit tests
* backend + API endpoints (for getting the customer data)
* I18N - Internationalization - all strings are hardcoded in English
* Logging
* Tracking (Google Analytics, etc)