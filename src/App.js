import 'bootstrap/dist/css/bootstrap.min.css';
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
      },
      {
        Header : "CHR-F",
        accessor : "chr-f"
      },
      {
        Header : "CHR-G",
        accessor : "chr-g"

      },
      {
        Header : "CHR-H",
        accessor : "chr-h"
      },
      {
        Header : "CHR-I",
        accessor : "chr-i"
      },{
        Header : "CHR-J",
        accessor : "chr-j"

      },
      {
        Header : "CHR-K",
        accessor : "chr-k"
      }
    ],
    []
  );
  return (

    <div className="container container-fluid">
      <div className='d-flex bd-highlight'> {data && <Table columns={columns} data={data?.slice(0,3)} setData={setData} />}</div>
      <div className='mt-1'>
        <button className='btn btn-primary w-25' onClick={() => setData((old) => [...old, ...dataJSON])}>Add Group</button>
      </div>
      <div className='mt-1'>
        <button className='btn btn-danger w-25' onClick={() => setData((old) => old.slice(0, 3))}>Edit Group</button>
      </div>
      <div className='mt-1'>
        <button className='btn btn-success w-25' onClick={() => setData((old) => old.slice(0, 3))}>Group Email</button>
      </div>
    </div>
  );
}
