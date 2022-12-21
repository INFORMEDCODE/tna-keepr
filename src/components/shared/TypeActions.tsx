// a BASE menu bar that allows certain types of actions - can then accept further actions for each type
import * as Toolbar from "@radix-ui/react-toolbar";
import {
    PlusCircledIcon,
    Link2Icon,
    CrossCircledIcon,
    CodeIcon,
} from "@radix-ui/react-icons";

const objectTypes = {
    item: "ITEM",
    organisation: "ORGANISATION",
    location: "LOCATION",
    box: "BOX",
} as const;

type TypeActions = {
    selectedItems: TypeActionsItem[];
    objectType?: typeof objectTypes;
};

export type TypeActionsItem = {
    id: string;
    type: string;
};

type TypeActionsButton = {
    disabled: boolean;
    label: string;
    icon: React.ReactNode;
};

const TypeActions: React.FC<TypeActions> = ({ selectedItems }) => {
    return (
        <Toolbar.Root className="flex w-full rounded-b border-b border-solid border-slate-300 bg-white p-1 shadow-md">
            <TypeActionsButton
                disabled={false}
                label="New"
                icon={<PlusCircledIcon className="ml-2" />}
            />
            <Toolbar.Separator className="m-1 w-[1px] bg-slate-400" />
            <TypeActionsButton
                disabled={selectedItems.length < 1}
                label="Edit"
                icon={<CodeIcon className="ml-2" />}
            />
            <Toolbar.Separator className="m-1 w-[1px] bg-slate-400" />
            <TypeActionsButton
                disabled={selectedItems.length < 1}
                label="Delete"
                icon={<CrossCircledIcon className="ml-2" />}
            />
            <Toolbar.Separator className="m-1 w-[1px] bg-slate-400" />
            <TypeActionsButton
                disabled={selectedItems.length < 1}
                label="Share"
                icon={<Link2Icon className="ml-2" />}
            />
        </Toolbar.Root>
    );
};

export const TypeActionsButton: React.FC<TypeActionsButton> = ({
    disabled,
    label,
    icon,
}) => {
    return (
        <Toolbar.Button
            className="align-center flex items-center justify-center rounded px-4 py-1 text-sm enabled:hover:bg-slate-100 disabled:opacity-50"
            disabled={disabled}
        >
            {label}
            {icon}
        </Toolbar.Button>
    );
};

export default TypeActions;
