import './App.css';
import { useState } from 'react';

function LogMonitor() {
  const [logs, setLogs] = useState([])
  const [fileName, setFileName] = useState("")
  const [keyword, setKeyword] = useState("")
  const [size, setSize] = useState("")

  const buttonClickHandler = () => {      
    fetch('http://localhost:8080/api/v1/logs?' + new URLSearchParams({
      filename: fileName !== "" ?fileName: "var5MB.txt",
      size: size !== ""? size: 100,
      keyword: keyword,
    }), {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => {
       setLogs(data);
    })
    .catch((err) => {
       console.log(err.message);
    });
  }

  const listLogs = logs.map(log =>
    <li>
      <div>{log}</div>
      <div style={{height: "20px"}}></div>
    </li>)
  return (
    <div style={{
      width: "80%",
      paddingLeft:"10%",
      display: "flex", 
      flexDirection: "column",
      justifyContent: "center"}}>

      <div style={{height: "30px"}}></div>
      <div style={{color:"green"}}>Usage: query a log file under /var/log/ folder with the latest events at the top</div>
      <div style={{height: "30px"}}></div>
      <h2 style={{marginBottom:"10px"}}>Specify a File Name</h2>
      <div style={{paddingBottom:"20px"}}>Default is var5MB.txt which contains 100k lines of log</div>
      <input
        style={{width:"20%"}}
        placeholder='var5MB.txt'
        value={fileName}
        onChange={e => setFileName(e.target.value)}
      />
      <h2 style={{marginBottom:"10px"}}>Search Keyword</h2>
      <div style={{paddingBottom:"20px"}}>Default is empty, i.e., return all log lines</div>
      <input
        style={{width:"20%"}}
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />
      <h2 style={{marginBottom:"10px"}}>How Many Entries to Return</h2>
      <div style={{paddingBottom:"20px"}}>Default is 100</div>
      <input
        style={{width:"20%"}}
        placeholder='100'
        value={size}
        onChange={e => setSize(e.target.value)}
      />
      <div style={{
        paddingTop: "5%",
      }}>
      <button onClick={buttonClickHandler}>
        Run
      </button>      
    </div>
    {
      listLogs.length === 0 ? 
        <div style={{color:"red"}}>no entries found</div>
        :<ul id="logsID" style={{listStyle: "none", paddingLeft: "0px"}}>{listLogs}</ul>
    }
    
    
    </div>
  )
}


function App() {
  return (
    <>
    {LogMonitor()}
    </>
    
  );
}

export default App;
