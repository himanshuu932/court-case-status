import React, { useState, useEffect } from "react";
import "./App.css";

/**
 * Main App component for the Court Case Fetcher.
 *
 * @component
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  // State variables for dropdown options.
  const [courtOptions, setCourtOptions] = useState([]);
  const [caseTypeOptions, setCaseTypeOptions] = useState([]);

  // State variables for user selections and results.
  const [selectedCourtIndex, setSelectedCourtIndex] = useState("");
  const [selectedCaseIndex, setSelectedCaseIndex] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [caseYear, setCaseYear] = useState("");
  const [rawResults, setRawResults] = useState("");

  // Loading and error states for fetch operations and form validation.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * useEffect hook to load mock dropdown data when the component mounts.
   */
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

  /**
   * Splits a line into columns based on tab or multiple spaces.
   *
   * @param {string} line - The line of text to split.
   * @returns {string[]} Array of cell values.
   */
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

  /**
   * Parses raw text into structured blocks for display.
   *
   * The parser splits the raw text into non-empty lines, then creates blocks
   * based on predefined markers for table and plain text sections. It processes
   * each block to extract headers and rows for table blocks.
   *
   * @param {string} raw - The raw text to parse.
   * @returns {Object[]} Array of parsed blocks.
   */
  const parseRawText = (raw) => {
    // Split raw text into non-empty lines.
    const lines = raw
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    // Define markers for table sections and plain text sections.
    const tableMarkers = new Set([
      "Case Details",
      "Case Status",
      "Acts",
      "Case History",
      "Orders",
      "Final Order",
      "Process Details",
    ]);
    const plainMarkers = new Set([
      "Petitioner and Advocate",
      "Respondent and Advocate",
    ]);
    const allMarkers = new Set([...tableMarkers, ...plainMarkers]);

    let blocks = [];
    let currentBlock = null;

    // Iterate through lines and form blocks based on markers.
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (allMarkers.has(line)) {
        if (currentBlock) {
          blocks.push(currentBlock);
        }
        const type = tableMarkers.has(line) ? "table" : "plain";
        currentBlock = { marker: line, type, lines: [line] };
      } else if (i === 0 && !allMarkers.has(line)) {
        // The first line is treated as a heading if it is not a marker.
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

    // Process each block into a structured format.
    const processedBlocks = blocks.map((block) => {
      if (block.type === "table") {
        if (block.lines.length >= 2) {
          const marker = block.marker;
          const headerLine = block.lines[1];
          const headers = splitLine(headerLine);
          const rows = block.lines.slice(2).map((l) => {
            const row = splitLine(l);
            // If the row has exactly one cell fewer than the headers,
            // insert a dash at the penultimate position.
            if (row.length === headers.length - 1) {
              row.splice(headers.length - 2, 0, "-");
            }
            return row;
          });
          return { type: "table", title: marker, headers, rows };
        } else {
          return { type: "table", title: block.marker, headers: [], rows: [] };
        }
      } else {
        // For plain and heading blocks, join all lines.
        return {
          type: block.type,
          title: block.marker,
          content: block.lines.join("\n"),
        };
      }
    });
    return processedBlocks;
  };

  /**
   * Validates the form input before submission.
   *
   * @returns {boolean} True if the form is valid, otherwise false.
   */
  const validateForm = () => {
    // Validate court complex selection.
    if (!selectedCourtIndex) {
      setError("Please select a valid court complex.");
      return false;
    }
    // Validate case type selection.
    if (!selectedCaseIndex) {
      setError("Please select a valid case type.");
      return false;
    }
    // Validate case number.
    if (!caseNumber.trim()) {
      setError("Please enter a valid case number.");
      return false;
    }
    // Validate case year (ensure it's not empty and is a number).
    if (!caseYear.trim() || isNaN(caseYear)) {
      setError("Please enter a valid case year.");
      return false;
    }
    // If all validations pass, clear any existing error and return true.
    setError("");
    return true;
  };

  /**
   * Handles form submission by validating input and sending the case details to the backend.
   *
   * @param {React.FormEvent} e - The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation before submitting.
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    const data = {
      courtIndex: selectedCourtIndex,
      caseIndex: selectedCaseIndex,
      caseNumber,
      caseYear,
    };

    try {
      const response = await fetch("http://localhost:3001/run-case", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      // Check if the backend response is successful and contains non-empty case details.
      if (
        result.success &&
        result.caseDetails &&
        result.caseDetails.trim() !== ""
      ) {
        setRawResults(result.caseDetails);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Parse raw results into blocks for rendering, if available.
  const blocks = rawResults ? parseRawText(rawResults) : [];

  return (
    <div className="container">
      <div className="container-form">
        <header>
          <h1>Court Case Fetcher</h1>
        </header>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Court Complex:
            <select
              value={selectedCourtIndex}
              onChange={(e) => setSelectedCourtIndex(e.target.value)}
            >
              {courtOptions.map((opt) => (
                <option key={opt.index} value={opt.index}>
                  {opt.text}
                </option>
              ))}
            </select>
          </label>
          <label>
            Case Type:
            <select
              value={selectedCaseIndex}
              onChange={(e) => setSelectedCaseIndex(e.target.value)}
            >
              {caseTypeOptions.map((opt) => (
                <option key={opt.index} value={opt.index}>
                  {opt.text} 
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

        {loading && (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}

        {error && <div className="error">{error}</div>}
      </div>

      {rawResults && (
        <div className="results">
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
                    <h3 className="heading">{block.content}</h3>
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
