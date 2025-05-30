import React from 'react';
import '@/css/Table.css';
import { Customers } from '@/types/Customers';
import { Sale } from '@/types/Sales';

type TableProps = {
    setDialogOpen: (val: boolean) => void;
    open: any;
    data: Sale[] | null | undefined;
    onTransactionClick?: any
};

export const Table: React.FC<TableProps> = ({ setDialogOpen, data, onTransactionClick }) => {
    return (
        <div className="dark:bg-gray-800 text-sm">
            <table className="w-full dark:text-gray-200">
                <thead className="bg-[#F8F9FA] shadow-md dark:bg-gray-700 text-sm dark:text-gray-200">
                    <tr>
                        <th className="text-left p-2">SALE ID</th>
                        <th className="text-left p-2 hidden md:table-cell">PRODUCT ID</th>
                        <th className="text-left p-2 hidden md:table-cell">CUSTOMER ID</th>
                        <th className="text-left p-2 hidden md:table-cell">USER ID</th>
                        <th className="text-left p-2">AMOUNT</th>
                        <th className="text-left p-2">SALE DATE</th>
                    </tr>
                </thead>
                <tbody className="dark:text-gray-300">
                    {data?.map((sale) => (
                        <tr
                            key={sale.sale_id}
                            onClick={() => {
                                setDialogOpen(true);
                                onTransactionClick?.(sale);
                            }}
                            className="cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                            <td className="p-2">{sale.sale_id}</td>
                            <td className="p-2 hidden md:table-cell">{sale.product_id}</td>
                            <td className="p-2 hidden md:table-cell">{sale.customer_id ?? 'N/A'}</td>
                            <td className="p-2 hidden md:table-cell">{sale.user_id ?? 'N/A'}</td>
                            <td className="p-2">K{sale.amount.toFixed(2)}</td>
                            <td className="p-2">
                                {sale.sale_date
                                    ? new Date(sale.sale_date).toLocaleDateString()
                                    : new Date(sale.created_at).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};
