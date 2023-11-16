import { useMemo } from 'react';
import { useTable, usePagination, Column } from 'react-table';

const Table = ({ columns, data }: { columns: Column[]; data: any[] }) => {
  const columnsWithRowNumbers = useMemo(
    () => [
      {
        Header: 'Row',
        id: 'row',
        Cell: ({ row }: { row: any }) => <div>{row.index + 1}</div>,
      },
      ...columns,
    ],
    [columns]
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: columnsWithRowNumbers,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <table {...getTableProps()} className='table-auto w-full border-collapse-separate border-spacing-0 rounded-md'>
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={i} className='rounded-t-md'>
            {headerGroup.headers.map((column, i) => (
              <th
                {...column.getHeaderProps()}
                className={`px-4 py-2 font-semibold text-left bg-blue-500 text-white ${
                  i === 0 ? 'rounded-tl-md' : ''
                } ${i === headerGroup.headers.length - 1 ? 'rounded-tr-md' : ''}`}
                key={i}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row: any, i: any) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={i} className='even:bg-blue-100 odd:bg-white'>
              {row.cells.map((cell: any, j: any) => (
                <td
                  {...cell.getCellProps()}
                  className={`px-4 py-2 ${i === row.length - 1 && j === 0 ? 'rounded-bl-md' : ''} ${
                    i === row.length - 1 && j === row.cells.length - 1 ? 'rounded-br-md' : ''
                  }`}
                  key={j}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
      <div className='flex space-x-2 items-center mt-4'>
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className={`bg-blue-100 hover:bg-blue-200 px-2 rounded-md text-sm text-blue-600 hover:text-blue-800 ${
            !canPreviousPage ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {'<<'}
        </button>{' '}
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className={`bg-blue-100 hover:bg-blue-200 px-2 rounded-md text-sm text-blue-600 hover:text-blue-800 ${
            !canPreviousPage ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {'<'}
        </button>{' '}
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className={`bg-blue-100 hover:bg-blue-200 px-2 rounded-md text-sm text-blue-600 hover:text-blue-800 ${
            !canNextPage ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {'>'}
        </button>{' '}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className={`bg-blue-100 hover:bg-blue-200 px-2 rounded-md text-sm text-blue-600 hover:text-blue-800 ${
            !canNextPage ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {'>>'}
        </button>{' '}
        <span className='items-center'>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span className='items-center'>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            className='border border-blue-100 rounded-md p-1 text-sm w-12'
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          className='border border-blue-100 rounded-md p-1 text-sm'
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </table>
  );
};

export default Table;
