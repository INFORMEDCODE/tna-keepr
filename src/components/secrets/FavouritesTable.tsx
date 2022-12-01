import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { trpc } from "../../utils/trpc";
import type { Secret } from "@prisma/client";
import React from "react";

const columnHelper = createColumnHelper<Secret>();
const columns = [
    columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
    }),
    columnHelper.accessor("value", {
        cell: (info) => info.getValue(),
        header: () => <span>Value</span>,
    }),
    columnHelper.accessor("description", {
        cell: (info) => info.getValue(),
        header: () => <span>Description</span>,
    }),
    columnHelper.accessor("updatedAt", {
        cell: (info) => info.getValue().toDateString(),
        header: () => <span>Last Updated</span>,
    }),
    columnHelper.accessor("createdAt", {
        cell: (info) => info.getValue().toDateString(),
        header: () => <span>Created</span>,
    }),
    columnHelper.display({
        id: "favourite",
        cell: () => <span className="flex justify-center">...</span>,
        header: () => <span>Favourite</span>,
    }),
];

const FavouritesTable = () => {
    const favouriteSecrets = trpc.secrets.listFavouriteSecrets.useQuery();
    const protectedSecrets =
        trpc.secrets.listFavouriteSecretsProtected.useQuery();

    console.log("protectedSecrets", protectedSecrets.data);

    if (favouriteSecrets.isLoading) {
        return <h1>Loading...</h1>;
    }

    if (!favouriteSecrets.data) {
        return <h1>No Data</h1>;
    }

    return <FavouritesTableInner favouritesData={favouriteSecrets.data} />;
};

const FavouritesTableInner: React.FC<{ favouritesData: Secret[] }> = ({
    favouritesData,
}) => {
    const table = useReactTable({
        data: favouritesData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="w-full p-2">
            <table className="w-full border-2 border-dashed border-blue-600">
                <thead className="text-left">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="border-b-2">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FavouritesTable;
