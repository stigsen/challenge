import {Tree} from "@/model/Tree";

export const CustomerData: Tree[] = [
    {
        locations: {
            "aarhus-technologies": {
                name: "Aarhus Technologies",
                parents: {
                    "aarhus": {}
                }
            },
            "aarhus-office-hub": {
                name: "Aarhus Office Hub",
                parents: {
                    "aarhus": {}
                }
            },
            "copenhagen-towers": {
                name: "Copenhagen Towers",
                parents: {
                    "copenhagen": {}
                }
            },
            "cph-blox-hub": {
                name: "CPH Blox Hub",
                parents: {
                    "copenhagen": {}
                }
            },
            "paris-corp-hq": {
                name: "Paris Corp HQ",
                parents: {
                    "paris": {}
                }
            },
            "startup-lab-paris": {
                name: "Startup Lab Paris",
                parents: {
                    "paris": {}
                }
            },
        },
        groups: {
            "denmark": {
                name: "Denmark",
                parents: {}
            },
            "aarhus": {
                name: "Aarhus",
                parents: {
                    "denmark": {}
                }
            },
            "copenhagen": {
                name: "Copenhagen",
                parents: {
                    "denmark": {}
                }
            },
            "france": {
                name: "France",
                parents: {}
            },
            "paris": {
                name: "Paris",
                parents: {
                    "france": {}
                }
            },
        },
        partnerId: "partner-1"
    },
    {
        locations: {
            "aarhus-rnd": {
                name: "Aarhus R&D",
                parents: {
                    "aarhus": {}
                }
            },
            "aarhus-technologies": {
                name: "Aarhus Tech",
                parents: {
                    "aarhus": {}
                }
            },
            "aarhus-office-hub": {
                name: "Aarhus Office Hub",
                parents: {
                    "aarhus": {}
                }
            },
            "aalborg-technologies": {
                name: "Ålborg Technologies",
                parents: {
                    "aalborg": {}
                }
            },
            "aalborg-office-hub": {
                name: "Ålborg Office Hub",
                parents: {
                    "aalborg": {}
                }
            },
            "copenhagen-towers": {
                name: "Copenhagen Towers",
                parents: {
                    "copenhagen": {}
                }
            },
            "cph-blox-hub": {
                name: "CPH Blox Hub",
                parents: {
                    "copenhagen": {}
                }
            },
            "paris-corp-hq": {
                name: "Paris Corp HQ",
                parents: {
                    "paris": {}
                }
            },
            "startup-lab-paris": {
                name: "Startup Lab Paris",
                parents: {
                    "paris": {}
                }
            },
        },
        groups: {
            "denmark": {
                name: "Denmark",
                parents: {}
            },
            "jylland": {
                name: "Jylland",
                parents: {
                    "denmark": {}
                }
            },
            "region-midt": {
                name: "Region Nord",
                parents: {
                    "jylland": {}
                }
            },
            "region-nord" : {
                name: "Region Nord",
                parents: {
                    "jylland": {}
                }
            },
            "aarhus": {
                name: "Aarhus",
                parents: {
                    "region-midt": {}
                }
            },
            "aalborg": {
                name: "Ålborg",
                parents: {
                    "region-nord": {}
                }
            },
            "zealand": {
                name: "Sjælland",
                parents: {
                    "denmark": {}
                }
            },
            "region-h": {
                name: "Region H",
                parents: {
                    "zealand": {}
                }
            },
            "copenhagen": {
                name: "Copenhagen",
                parents: {
                    "region-h": {}
                }
            },
            "france": {
                name: "France",
                parents: {}
            },
            "paris": {
                name: "Paris",
                parents: {
                    "france": {}
                }
            },
        },
        partnerId: "partner-2-moreData"
    },
    {
        locations: {
            "aarhus-technologies": {
                name: "Aarhus Technologies - no parent",
                parents: {
                    // "aarhus": {}
                }
            },
            "aarhus-office-hub": {
                name: "Aarhus Office Hub",
                parents: {
                    "aarhus": {}
                }
            },
            "copenhagen-towers": {
                name: "Copenhagen Towers",
                parents: {
                    "copenhagen": {}
                }
            },
            "cph-blox-hub": {
                name: "CPH Blox Hub",
                parents: {
                    "copenhagen": {}
                }
            },
            "paris-corp-hq": {
                name: "Paris Corp HQ",
                parents: {
                    "paris": {}
                }
            },
            "startup-lab-paris": {
                name: "Startup Lab Paris",
                parents: {
                    "paris": {}
                }
            },
        },
        groups: {
            "denmark": {
                name: "Denmark",
                parents: {}
            },
            "jylland": {
                name: "Jylland",
                parents: {
                    "denmark": {}
                }
            },
            "aarhus": {
                name: "Aarhus",
                parents: {
                    "jylland": {}
                }
            },
            "zealand": {
                name: "Sjælland",
                parents: {
                    "denmark": {}
                }
            },
            "copenhagen": {
                name: "Copenhagen",
                parents: {
                    "zealand": {}
                }
            },
            "france": {
                name: "France",
                parents: {}
            },
            "paris": {
                name: "Paris",
                parents: {
                    "france": {}
                }
            },
        },
        partnerId: "partner-3-badData"
    }
]