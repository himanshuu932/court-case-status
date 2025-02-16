import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Dropdown data (fetched or hardcoded)
  const [courtOptions, setCourtOptions] = useState([]);
  const [caseTypeOptions, setCaseTypeOptions] = useState([]);

  // User selections and results
  const [selectedCourtIndex, setSelectedCourtIndex] = useState("");
  const [selectedCaseIndex, setSelectedCaseIndex] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [caseYear, setCaseYear] = useState("");
  const [rawResults, setRawResults] = useState("");

  const [testRaw, setTestRaw] = useState(
    `District and Sessions Judge, North-East, KKD
Case Details
Case Type       Filing Number   Filing Date     Registration Number     Registration Date       CNR Number
CS - CIVIL SUIT FOR DJ ADJ      224/2024        14-02-2024      40/2024        14-02-2024      DLNE010004352024
Case Status
First Hearing Date      Decision Date   Case Status     Nature of Disposal      Court Number and Judge
16-February-2024        23-September-2024       Case Disposed   Uncontested - DISMISSED AS WITHDRAWN    429-District Judge
Petitioner and Advocate

1) RAJ KUMAR SINGH

Advocate - Gaurav Kumar Sharma
Respondent and Advocate

1) RANJIT FIN TRADE PRIVATE LIMITED

2) REGISTRAR/SUB-REGISTRAR

Acts
Under Act(s)    Under Section(s)
Civil Procedure Code 1908       DECLARATION, CANCEL
Case History
Registration Number     Judge   Business On Date        Hearing Date    Purpose of hearing
40/2024        District Judge      16-02-2024      08-04-2024      Misc. cases
40/2024        District Judge      08-04-2024      04-06-2024      Misc. cases
40/2024        District Judge      04-06-2024      16-07-2024      Misc. cases
40/2024        District Judge      16-07-2024      23-07-2024      Misc. cases
40/2024        District Judge      23-07-2024      29-07-2024      Misc. cases
40/2024        District Judge      29-07-2024      23-09-2024      Misc. cases
40/2024        District Judge      23-09-2024              Disposed
Orders
Order Number    Order Date      Order Details
1       16-02-2024      COPY OF JUDICIAL PROCEEDINGS
2       04-06-2024      COPY OF ORDER
3       16-07-2024      COPY OF ORDER
4       23-07-2024      COPY OF ORDER
Final Order
Order Number    Order Date      Order Details
5       23-09-2024      COPY OF ORDER
Process Details
Process id      Process Date    Process title   Party Name      Issued Process
PDLNE010004352024       16-02-2024      Summons for settlement of issues [O. 5, R. 1, 5.]       RANJIT FIN TRADE PRIVATE LIMITED, Registrar/sub Registrar     0/2`
  );
  const handleLoadTestData = () => {
    setRawResults(testRaw);
  };

  useEffect(() => {
    const mockCourtOptions = [
      { index: 0, value: "", text: "Select Court Complex" },
      {
        index: 1,
        value: "DLNE01,DLNE02,DLNE03,DLNE04",
        text: "Karkardooma Court Complex",
      },
    ];
    const mockCaseTypeOptions = [
      { index: 0, value: "", text: "--Select--" },
      { index: 1, value: "78", text: "ARB A (COMM)" },
      { index: 2, value: "58", text: "ARBTN" },
      { index: 3, value: "61", text: "ARBTN CASES" },
      { index: 4, value: "71", text: "BAIL MATTERS" },
      { index: 5, value: "20", text: "CA" },
      { index: 6, value: "26", text: "CBI" },
      { index: 7, value: "29", text: "CC" },
      { index: 8, value: "16", text: "Civ Suit" },
      { index: 9, value: "62", text: "CLOR" },
      { index: 10, value: "21", text: "CR Cases" },
      { index: 11, value: "22", text: "Cr Rev" },
      { index: 12, value: "17", text: "CS" },
      { index: 13, value: "73", text: "C.S. (COMM)" },
      { index: 14, value: "24", text: "CT Cases" },
      { index: 15, value: "30", text: "DPT EQ" },
      { index: 16, value: "31", text: "DPT EQ CR" },
      { index: 17, value: "83", text: "DR" },
      { index: 18, value: "67", text: "E P" },
      { index: 19, value: "70", text: "ESIC" },
      { index: 20, value: "38", text: "EX" },
      { index: 21, value: "89", text: "Ex. - Award by Arb." },
      { index: 22, value: "88", text: "Ex. Comm - Award by Arb. Comm" },
      { index: 23, value: "82", text: "Execution (Comm.)" },
      { index: 24, value: "45", text: "GP" },
      { index: 25, value: "15", text: "HINDU ADP" },
      { index: 26, value: "1", text: "HMA" },
      { index: 27, value: "4", text: "HTA" },
      { index: 28, value: "59", text: "IDA" },
      { index: 29, value: "2", text: "LAC" },
      { index: 30, value: "10", text: "LC" },
      { index: 31, value: "52", text: "LCA" },
      { index: 32, value: "56", text: "L I D" },
      { index: 33, value: "19", text: "L I R" },
      { index: 34, value: "12", text: "MACT" },
      { index: 35, value: "37", text: "MACT CR" },
      { index: 36, value: "25", text: "MC" },
      { index: 37, value: "32", text: "MCA DJ" },
      { index: 38, value: "34", text: "MCA SCJ" },
      { index: 39, value: "64", text: "MCD APPL" },
      { index: 40, value: "36", text: "MISC CRL" },
      { index: 41, value: "33", text: "MISC DJ" },
      { index: 42, value: "84", text: "Misc.DR" },
      { index: 43, value: "66", text: "MISC RC ARC" },
      { index: 44, value: "35", text: "MISC SCJ" },
      { index: 45, value: "14", text: "MUSLIM LAW" },
      { index: 46, value: "77", text: "OMP (COMM)" },
      { index: 47, value: "76", text: "OMP (E) (COMM)" },
      { index: 48, value: "72", text: "OMP (I) (COMM)" },
      { index: 49, value: "75", text: "OMP MISC (COMM)" },
      { index: 50, value: "74", text: "OMP (T) (COMM)" },
      { index: 51, value: "53", text: "OP" },
      { index: 52, value: "7", text: "PC" },
      { index: 53, value: "11", text: "POIT" },
      { index: 54, value: "3", text: "PPA" },
      { index: 55, value: "27", text: "RCA DJ" },
      { index: 56, value: "8", text: "RC ARC" },
      { index: 57, value: "28", text: "RCA SCJ" },
      { index: 58, value: "9", text: "RCT ARCT" },
      { index: 59, value: "51", text: "REC CASES" },
      { index: 60, value: "55", text: "REVOCATION" },
      { index: 61, value: "79", text: "R P" },
      { index: 62, value: "23", text: "SC" },
      { index: 63, value: "18", text: "S C COURT" },
      { index: 64, value: "57", text: "SMA" },
      { index: 65, value: "13", text: "SUCCESSION COURT" },
      { index: 66, value: "87", text: "TC" },
      { index: 67, value: "85", text: "T. P. Civil" },
      { index: 68, value: "86", text: "T. P. Crl." },
    ];
    setCourtOptions(mockCourtOptions);
    setCaseTypeOptions(mockCaseTypeOptions);
  }, []);

  // Helper function to split a line into columns.
  const splitLine = (line) => {
    if (line.includes("\t")) {
      return line
        .split("\t")
        .map((cell) => cell.trim())
        .filter((cell) => cell.length > 0);
    }
    return line
      .split(/\s{2,}/)
      .map((cell) => cell.trim())
      .filter((cell) => cell.length > 0);
  };

  // New parser: Splits the raw text into blocks.
  const parseRawText = (raw) => {
    const lines = raw
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    // Define markers for table sections and plain-text extra sections.
    const tableMarkers = new Set([
      "Case Details",
      "Case Status",
      "Acts",
      "Case History",
      "Orders",
      "Final Order",
      "Process Details",
    ]);
    const plainMarkers = new Set(["Petitioner and Advocate", "Respondent and Advocate"]);
    const allMarkers = new Set([...tableMarkers, ...plainMarkers]);

    let blocks = [];
    let currentBlock = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // If the line is a marker, start a new block.
      if (allMarkers.has(line)) {
        if (currentBlock) {
          blocks.push(currentBlock);
        }
        const type = tableMarkers.has(line) ? "table" : "plain";
        currentBlock = { marker: line, type, lines: [line] };
      } else if (i === 0 && !allMarkers.has(line)) {
        // The very first line (if not a marker) is treated as a heading.
        currentBlock = { marker: "Heading", type: "heading", lines: [line] };
      } else {
        if (!currentBlock) {
          currentBlock = { marker: "", type: "plain", lines: [line] };
        } else {
          currentBlock.lines.push(line);
        }
      }
    }
    if (currentBlock) {
      blocks.push(currentBlock);
    }

    // Process each block.
    const processedBlocks = blocks.map((block) => {
      if (block.type === "table") {
        if (block.lines.length >= 2) {
          const marker = block.marker;
          const headerLine = block.lines[1];
          const headers = splitLine(headerLine);
          const rows = block.lines.slice(2).map((l) => splitLine(l));
          return { type: "table", title: marker, headers, rows };
        } else {
          return { type: "table", title: block.marker, headers: [], rows: [] };
        }
      } else {
        // For plain and heading blocks, join all lines.
        return { type: block.type, title: block.marker, content: block.lines.join("\n") };
      }
    });
    return processedBlocks;
  };

  // Submit form and retrieve backend result.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      courtIndex: selectedCourtIndex,
      caseIndex: selectedCaseIndex,
      caseNumber,
      caseYear,
    };
    console.log("Frontend - Form Details:", data);
    try {
      const response = await fetch("http://localhost:3001/run-case", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Frontend - Response from backend:", result);
      if (result.success) {
        setRawResults(result.caseDetails);
      }
    } catch (err) {
      console.error("Frontend - Error sending data:", err);
    }
  };

  // Parse rawResults into blocks.
  const blocks = rawResults ? parseRawText(rawResults) : [];

  return (
    <div className="container">
      <h2>Case Details Form (React Demo)</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Court Complex:
          <select value={selectedCourtIndex} onChange={(e) => setSelectedCourtIndex(e.target.value)}>
            {courtOptions.map((opt) => (
              <option key={opt.index} value={opt.index}>
                {opt.text} {opt.value && `(value="${opt.value}")`}
              </option>
            ))}
          </select>
        </label>
        <label>
          Case Type:
          <select value={selectedCaseIndex} onChange={(e) => setSelectedCaseIndex(e.target.value)}>
            {caseTypeOptions.map((opt) => (
              <option key={opt.index} value={opt.index}>
                {opt.text} {opt.value && `(value="${opt.value}")`}
              </option>
            ))}
          </select>
        </label>
        <label>
          Case Number:
          <input
            type="text"
            value={caseNumber}
            onChange={(e) => setCaseNumber(e.target.value)}
            placeholder="e.g. 40"
          />
        </label>
        <label>
          Case Year:
          <input
            type="text"
            value={caseYear}
            onChange={(e) => setCaseYear(e.target.value)}
            placeholder="e.g. 2024"
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <p className="note">
        <strong>Note:</strong> This demo uses manual CAPTCHA entry. After the Puppeteer browser launches, please complete the CAPTCHA and press Enter in the server console.
      </p>
      <div style={{ marginTop: "1rem" }}>
        <h3>Test Raw Data</h3>
        <textarea
          rows="12"
          style={{ width: "100%", fontFamily: "monospace" }}
          value={testRaw}
          onChange={(e) => setTestRaw(e.target.value)}
        ></textarea>
        <button style={{ marginTop: "0.5rem" }} onClick={handleLoadTestData}>
          Load Test Data
        </button>
      </div>







      {rawResults && (
        <div className="results">
          <h3>Parsed Case Details</h3>
          {blocks.map((block, idx) => {
            if (block.type === "table") {
              return (
                <div key={idx} className="block">
                  <h4>{block.title}</h4>
                  <table className="data-table">
                    <thead>
                      <tr>
                        {block.headers.map((header, i) => (
                          <th key={i}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, j) => (
                        <tr key={j}>
                          {row.map((cell, k) => (
                            <td key={k}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            } else {
              return (
                <div key={idx} className="block">
                  {block.type === "heading" ? (
                    <h3>{block.content}</h3>
                  ) : (
                    <div>
                      <strong>{block.title}</strong>
                      <br />
                      <pre className="plain-text">
                        {block.content.replace(block.title, "").trim()}
                      </pre>
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

export default App;
