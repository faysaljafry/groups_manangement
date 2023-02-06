import { useEffect, useMemo, useState } from "react";
import Table from "./components/Table";
import "./styles.css";
import dataJSON from "./users.json";
export default function App() {
  const [data, setData] = useState(() => ([...dataJSON]));


  useEffect(() => {
  }, [data])
  const columns = useMemo(
    () => [
      
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header : "CHR-A",
        accessor : "chr-a"
      },
      {
        Header : "CHR-B",
        accessor : "chr-b"
      },
      {
        Header : "CHR-C",
        accessor : "chr-c"
      },
      {
        Header : "CHR-D",
        accessor : "chr-d"
      },
      {
        Header : "CHR-E",
        accessor : "chr-e"
      }
    ],

    []
  );
  return (
    <div className="App">
      {data && <Table columns={columns} data={data?.slice(0,3)} setData={setData} />}
    </div>
  );
}
