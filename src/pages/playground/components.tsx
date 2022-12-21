import TypeActions from "../../components/shared/TypeActions";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { TypeActionsItem } from "../../components/shared/TypeActions";

const PlaygroundPage: React.FC = () => {
    const itemData = [
        {
            name: "Item 1",
            id: "1",
            type: "item",
        },
        {
            name: "Item 2",
            id: "2",
            type: "item",
        },
        {
            name: "Item 3",
            id: "3",
            type: "item",
        },
    ];

    const [selectedCheckBoxes, setSelectedCheckBoxes] = useState<
        TypeActionsItem[]
    >([]);
    console.log("selectedCheckBox", selectedCheckBoxes);

    const handleChecked = (itemId: string) => {
        // if we find the item; take it out
        if (selectedCheckBoxes.find((item) => item.id == itemId)) {
            setSelectedCheckBoxes(
                selectedCheckBoxes.filter((item) => item.id != itemId)
            );
            return;
        }

        // if we don't find the item; add it
        if (selectedCheckBoxes) {
            setSelectedCheckBoxes([
                ...selectedCheckBoxes,
                { id: itemId, type: "item" },
            ]);
        } else {
            setSelectedCheckBoxes([{ id: itemId, type: "item" }]);
        }
    };

    return (
        <>
            <div className="p-2">
                <TypeActions selectedItems={selectedCheckBoxes} />
            </div>
            <div className="p-2">
                <div className="flex flex-col gap-2">
                    {itemData.map((item) => (
                        <>
                            <Checkbox.Root
                                className="align-center flex h-[25px] w-[25px] items-center justify-center rounded border border-solid border-black bg-white shadow-md"
                                value="Item1"
                                onCheckedChange={() => handleChecked(item.id)}
                                checked={
                                    selectedCheckBoxes.find(
                                        (e) => e.id == item.id
                                    )
                                        ? true
                                        : false
                                }
                            >
                                <Checkbox.Indicator>
                                    <CheckIcon />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            <label>{item.name}</label>
                        </>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PlaygroundPage;
