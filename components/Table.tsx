import { useTable, Column } from 'react-table';

const Table = ({ columns, data }: { columns: Column[]; data: any[] }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

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
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={i} className='even:bg-blue-100 odd:bg-white'>
              {row.cells.map((cell, j) => (
                <td
                  {...cell.getCellProps()}
                  className={`px-4 py-2 ${i === rows.length - 1 && j === 0 ? 'rounded-bl-md' : ''} ${
                    i === rows.length - 1 && j === row.cells.length - 1 ? 'rounded-br-md' : ''
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
    </table>
  );
};

export default Table



             // className={`${i === rows.length - 1 ? 'rounded-b-md' : ''} even:bg-blue-50 odd:bg-white`}