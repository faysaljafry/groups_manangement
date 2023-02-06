
export default function Table ({data, columns}) {
    

    return(
        <div>
            <table className="table-bordered table-responsive">
                <thead>
                    <tr>
                        {columns.map((column) => {
                            return (
                                column.show && <th key={column.Header}>{column.Header}</th>
                            )
                        })}
                    </tr>
                </thead>
                {/* <tbody>

                    {data.map((row) => (
                        <tr key={row.id}>
                            <td>{row.firstName}</td>
                            {row.groups.map((group) => (
                                columns.slice(1).map((column, index) => (
                                    <td key={index}>
                                       {column.show}
                                    </td>
                                ))
                            ))}
                        </tr>
                    ))}
                </tbody> */}
            </table>
        </div>
    )
}