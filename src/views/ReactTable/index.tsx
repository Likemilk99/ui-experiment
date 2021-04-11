import React, { useState } from "react"
import { useTable } from "react-table"
import makeData from "./makeData"
import { Styles } from "./table.styled"

const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
}: any) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    const onChange = (e: any) => {
        setValue(e.target.value)
    }

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return <input value={value} onChange={onChange} onBlur={onBlur} />
}

const defaultColumn = {
    Cell: EditableCell,
}

const Table = ({ columns, data, updateMyData }: any) => {
    // For this example, we're using pagination to illustrate how to stop
    // the current page from resetting when our data changes
    // Otherwise, nothing is different here.
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
        defaultColumn,
        //@ts-ignore
        updateMyData,
    })

    // Render the UI for your table
    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row: any) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell: any) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

const ReactTableView = () => {
    const [data, setData] = useState(() => makeData(20))
    const [originalData] = useState(data)

    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                columns: [
                    {
                        Header: "First Name",
                        accessor: "firstName",
                    },
                    {
                        Header: "Last Name",
                        accessor: "lastName",
                    },
                ],
            },
            {
                Header: "Info",
                columns: [
                    {
                        Header: "Age",
                        accessor: "age",
                    },
                    {
                        Header: "Visits",
                        accessor: "visits",
                    },
                    {
                        Header: "Status",
                        accessor: "status",
                    },
                    {
                        Header: "Profile Progress",
                        accessor: "progress",
                    },
                ],
            },
        ],
        [],
    )

    const updateMyData = (rowIndex: number, columnId: number, value: any) => {
        // We also turn on the flag to not reset the page
        setData((old) =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    }
                }
                return row
            }),
        )
    }

    const resetData = () => setData(originalData)

    return (
        <>
            <Styles>
                <button onClick={resetData}>Reset data</button>
                <Table
                    columns={columns}
                    data={data}
                    updateMyData={updateMyData}
                />
            </Styles>
        </>
    )
}

export default ReactTableView
