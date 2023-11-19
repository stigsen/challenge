import React, {useEffect} from "react";
import {dataRepository} from "@/Data/DataRepository";

type Props = {
    onSelect: (partner: string) => void;

}
export const PartnerSelector = (props: Props) => {
    const {onSelect} = props;
    const [partners, setPartners] = React.useState<string[] | undefined>(undefined);

    const partnerOptions = partners ?
        partners.map((partner, index) => <option key={index} value={partner}>{partner}</option> )
     : [<option key='option1'>Loading...</option>];

    // Simulate a backend call/delay in loading the partners
    useEffect(() => {
        const partners = dataRepository.getPartners();
            setTimeout(()=>{
                setPartners(partners);
            }, 700);
    }, []);

    useEffect(() => {
        if(partners && partners.length > 0) {
            onSelect(partners[0]);
        }
    }, [partners]);

    return (
        <div className="dropdown ">
            <select
                className="dropdown-select text-xs bg-gray-200 w-200 ml-2 px-2 py-1 rounded-md border-1 outline-0"
                name="partners"
                id="partner"
                onChange={(e) => onSelect(e.target.value)}>
                {partnerOptions}
            </select>
        </div>
    );
}