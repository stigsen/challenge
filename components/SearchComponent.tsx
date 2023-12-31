import Image from "next/image";
import deleteIcon from "@/app/images/delete.png";
import searchIcon from "@/app/images/search.png";
import React, {useState} from "react";

type Props = {
    search: string;
    setSearch: (value: string) => void;
    clearSearch: () => void;
}
export const SearchComponent = (props: Props) => {
    const {search, setSearch, clearSearch} = props;
    const [inputRef] = useState<React.RefObject<HTMLInputElement>>(React.createRef());

    return (
        <div className="w-full flex justify-end items-center relative">
            <input
                ref={inputRef}
                className=' focus:caret-gray-500 px-2 py-1 mt-4 w-full rounded-md border-2 outline-0'
                type='text'
                value={search}
                placeholder='Search locations or groups'
                onChange={(e) => setSearch(e.target.value)}/>
            {search.length > 0 ?
                <Image
                    src={deleteIcon}
                    className="cursor-pointer absolute mr-2 mt-4 w-4"
                    alt="Clear Search Icon"
                    onClick={() => {
                        clearSearch();
                        inputRef.current?.focus();
                    }}/>
                : <Image
                    src={searchIcon}
                    className="absolute mr-3 mt-4 w-4 hidden min-[390px]:block"
                    alt="Search Icon"/>}
        </div>
    );
}