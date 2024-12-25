import React from 'react'

export const TopSelling = () => {
    type Product = {
        name: string;
        itemCode: string;
        price: string;
      };
      
      const topSelling: Product[] = [
        { name: "Apple iPhone 13", itemCode: "#FXZ-4567", price: "$999.29" },
        { name: "Nike Air Jordan", itemCode: "#FXZ-3456", price: "$72.40" },
        { name: "Beats Studio 2", itemCode: "#FXZ-9485", price: "$99.90" },
        { name: "Apple Watch Series 7", itemCode: "#FXZ-2345", price: "$249.99" },
        { name: "Amazon Echo Dot", itemCode: "#FXZ-8959", price: "$79.40" },
        { name: "PlayStation Console", itemCode: "#FXZ-7892", price: "$129.48" },
      ];
      return (
        <div className="w-full max-w-sm rounded-lg bg-white p-4 shadow-md dark:bg-boxdark">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-black dark:text-gray-300">
              Top Selling
            </h2>
            <button className="  text-black focus:outline-none dark:text-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 12h.01M12 12h.01M18 12h.01"
                />
              </svg>
            </button>
          </div>
          <ul>
            {topSelling.map((product, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b border-gray-50 py-2 pl-7 dark:border-strokedark"
              >
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-300">
                    {product.name}
                  </h3>
                  <p className="text-sm font-normal text-gray-400 dark:text-gray-400">
                    Item: {product.itemCode}
                  </p>
                </div>
                <span className="font-semibold text-gray-900 dark:text-gray-400">
                  {product.price}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
}
