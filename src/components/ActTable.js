'use client';
import React, { useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import searchIcon from '../../public/searchIcon.svg';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Translate from '../language.json';

const ActTable = ({ 
    columns, 
    data, 
    language = "english", 
    customContainerClass, 
    clubType, 
    selectedCategory, 
    onCategoryChange, 
    showCategoryFilter = false 
}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        state,
        setGlobalFilter,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { globalFilter, pageIndex } = state;

    const memoizedColumns = useMemo(() => columns, [columns]);
    const containerClass = customContainerClass || 'introduction-container px-4 md:px-4 py-10 md:pb-28 lg:py-10 lg:pb-32 lg:px-8 xl:px-10 2xl:px-24 xl:pb-24'; // by Swati Mishra for setting listing table column in Club Membership on 02-02-2025
    //Category filter for Club Membership by Swati Mishra on 06-02-2025
    const categoryOptions = clubType === "IHC"
    ? [
        "Secretary/Spl. Secretary/Additional Secretary and equivalent",
        "Joint Secretaries / Directors and equivalent"
      ]
    : [
        "Secretary/ Special Secretary and equivalent",
        "Additional Secretary and equivalent",
        "Joint Secretary and equivalent",
        "Director and equivalent"
      ];


    return (
        <div className={containerClass}>
            <div className='w-full m-auto px-4'>
                <div className='filter-container flex items-center justify-between' data-aos="fade-up" data-aos-duration="1000">
                    {/* 🔍 Search Input */}
                    <div className='relative w-3/4 md:w-1/3 rounded-full bg-white border-zinc-500 dropdown-filter'>
                        <input
                            type="text"
                            value={globalFilter || ''}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder={Translate.searchPlaceholder[language]}
                            className='bg-transparent w-full outline-none pl-10 md:pl-16 text-lg py-2 lg:py-2'
                        />
                        <Image src={searchIcon} alt='Search' className='w-4 h-4 lg:w-6 lg:h-6 absolute top-1/2 -translate-y-1/2 left-4' />
                    </div>

                    {/* 🏷️ Category Filter for club membership by Swati Mishra on 06-02-2025*/}
                    {showCategoryFilter && (
                        <div className="relative w-1/3 md:w-1/4 lg:w-1/5">
                            <select
                                value={selectedCategory}
                                onChange={(e) => onCategoryChange(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 bg-white text-gray-700"
                            >
                                <option value="">Select Category</option>
                                {categoryOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
                
                {/* 📊 Table */}
                <div className='table-responsive y-hidden'>
                    <table {...getTableProps()} className='table-container' data-aos="fade-up" data-aos-duration="1000">
                        <thead>
                            {headerGroups.map((headerGroup, groupIndex) => (
                                <tr key={groupIndex} {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column, colIndex) => (
                                        <th key={colIndex} className='text-base font-semibold' {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row, rowIndex) => {
                                prepareRow(row);
                                return (
                                    <tr key={rowIndex} {...row.getRowProps()}>
                                        {row.cells.map((cell, cellIndex) => (
                                            <td key={cellIndex} className='text-base' {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                
                {/* 🔄 Pagination */}
                <div className='flex items-center gap-4 mt-5 justify-end'>
                    <button className='bg-zinc-300 w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded-md text-white pagination-btn' 
                        onClick={previousPage} 
                        disabled={!canPreviousPage}>
                        <ChevronLeft />
                    </button>{' '}
                    <span className='text-base lg:text-lg'>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {page.length}
                        </strong>{' '}
                    </span>
                    <button className='bg-zinc-300 w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded-md text-white pagination-btn' 
                        onClick={nextPage} 
                        disabled={!canNextPage}>
                        <ChevronRight />
                    </button>{' '}
                </div>
            </div>
        </div>
    );
};

export default ActTable;
