import { signOut } from "next-auth/react";

const Header = () => {
    return (
        <div className="grid w-full grid-cols-3 border-dashed border-2 border-red-700 p-1">
            <div></div>
            <div id="search-bar" className="flex justify-center border-dashed border-2 border-blue-300">
                <SearchBarInput />
            </div>
            <div id="sign-out" className="flex items-center justify-end border-dashed border-2 border-green-500">
                <button
                    onClick={() =>
                        signOut({
                            callbackUrl: "/auth/signin",
                        })
                    }
                    className="flex h-9 w-24 items-center justify-center rounded-md border border-solid border-slate-400 p-2"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

// TODO:
// add in keyboard shortcut to access search
// allow keywords so it onyl searches that item type `secret:`, `box:`, `item:`, etc...
const SearchBarInput: React.FC = () => {
    return (
        <input
            type="text"
            placeholder="Search"
            className="h-10 w-96 rounded-full border border-solid border-slate-400 p-2"
        />
    );
};

export default Header;
