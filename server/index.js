const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const puppeteer = require("puppeteer");
const fs = require("fs");
const readline = require("readline");
const axios = require("axios");
const app = express();
const port = 3001;

// Enable CORS and parse JSON bodies
app.use(cors());
app.use(bodyParser.json());

// -----------------------
// Dropdown Option Arrays
// -----------------------
const courtOptions = [
  { index: 0, value: "", text: "Select Court Complex" },
  { index: 1, value: "DLNE01,DLNE02,DLNE03,DLNE04", text: "Karkardooma Court Complex" }
];

const caseTypeOptions = [
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
  { index: 68, value: "86", text: "T. P. Crl." }
];

// -----------------------
// Manual CAPTCHA Helper
// -----------------------
function askQuestion(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}
const ANTICAPTCHA_API_KEY = "69dadd6f725af218ffeea23d99926214";
async function solveCaptchaWithAntiCaptcha(imagePath) {
  const imageData = fs.readFileSync(imagePath, { encoding: "base64" });
  const createTaskPayload = {
    clientKey: ANTICAPTCHA_API_KEY,
    task: {
      type: "ImageToTextTask",
      body: imageData,
    },
  };

  let createResponse;
  try {
    createResponse = await axios.post("https://api.anti-captcha.com/createTask", createTaskPayload);
  } catch (err) {
    console.error("Error creating Anti-Captcha task:", err.message);
    return null;
  }
  if (createResponse.data.errorId !== 0) {
    console.error("Anti-Captcha error:", createResponse.data.errorDescription);
    return null;
  }
  const taskId = createResponse.data.taskId;
  console.log("Anti-Captcha task created:", taskId);
  const getTaskPayload = { clientKey: ANTICAPTCHA_API_KEY, taskId };
  for (let i = 0; i < 30; i++) {
    await delay(5000);
    let getResponse;
    try {
      getResponse = await axios.post("https://api.anti-captcha.com/getTaskResult", getTaskPayload);
    } catch (err) {
      console.error("Error fetching Anti-Captcha result:", err.message);
      return null;
    }
    if (getResponse.data.errorId !== 0) {
      console.error("Error in getTaskResult:", getResponse.data.errorDescription);
      return null;
    }
    if (getResponse.data.status === "ready") {
      return getResponse.data.solution.text;
    }
    console.log("Anti-Captcha: waiting for solution...");
  }
  console.log("Timed out waiting for Anti-Captcha solution.");
  return null;
}
/******************************************************
 * Helper: Delay Function
 ******************************************************/
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/******************************************************
 * Type Slowly for Input Fields (Simulating Keystrokes)
 ******************************************************/
async function typeSlowly(page, selector, text, delayMs = 100) {
  await page.click(selector, { clickCount: 3 });
  await page.keyboard.press("Backspace");
  for (const char of text) {
    await page.type(selector, char, { delay: delayMs });
  }
}

/******************************************************
 * Main Puppeteer Flow with Manual CAPTCHA Input
 * Accepts parameters from the frontend.
 ******************************************************/
async function fetchCaseDetailsManualCaptcha({ courtIndex, caseIndex, caseNumber, caseYear }) {
  const browser = await puppeteer.launch({
    headless: false, // Visible browser for manual CAPTCHA entry
    defaultViewport: null,
  });
  const page = await browser.newPage();

  console.log("Navigating to the case status page...");
  await page.goto("https://northeast.dcourts.gov.in/case-status-search-by-case-number/", {
    waitUntil: "networkidle2",
  });

  // Look up dropdown values from our arrays using the provided indices
  const selectedCourt = courtOptions[parseInt(courtIndex, 10)];
  const selectedCaseType = caseTypeOptions[parseInt(caseIndex, 10)];

  if (!selectedCourt || !selectedCourt.value) {
    console.error("Invalid court option selected.");
    await browser.close();
    return;
  }
  if (!selectedCaseType || !selectedCaseType.value) {
    console.error("Invalid case type option selected.");
    await browser.close();
    return;
  }

  console.log("Selecting court complex using value:", selectedCourt.value);
  await page.select("#est_code", selectedCourt.value);
  console.log("Court complex selected.");
  await delay(2000);

  console.log("Enabling and selecting case type using value:", selectedCaseType.value);
  await page.evaluate(() => {
    const select = document.getElementById("case_type");
    if (select && select.disabled) select.disabled = false;
  });
  await page.select("#case_type", selectedCaseType.value);
  console.log("Case type selected.");
  await delay(2000);

  // Type the case number and year using simulated keystrokes
  console.log("Typing case number...");
  await typeSlowly(page, "#reg_no", caseNumber.toString(), 200);
  await delay(1000);
  const typedRegNo = await page.$eval("#reg_no", el => el.value);
  console.log("Case number typed as:", typedRegNo);

  console.log("Typing case year...");
  await typeSlowly(page, "#reg_year", caseYear.toString(), 200);
  await delay(1000);
  const typedRegYear = await page.$eval("#reg_year", el => el.value);
  console.log("Case year typed as:", typedRegYear);

  // --- Manual CAPTCHA Step ---
  // Capture the CAPTCHA image so you can view it
    // Capture the CAPTCHA image, solve it, and paste the solution
    const captchaEl = await page.waitForSelector("#siwp_captcha_image_0", { visible: true });
    await captchaEl.screenshot({ path: "captcha.png" });
    console.log("CAPTCHA image saved as captcha.png");
  
    const captchaSolution = await solveCaptchaWithAntiCaptcha("captcha.png");
    if (!captchaSolution) {
      console.log("No CAPTCHA solution returned. Exiting.");
      await browser.close();
      return;
    }
    console.log("Anti-Captcha returned:", captchaSolution);
  
    // Paste the CAPTCHA solution into the input field
    await page.evaluate((selector, value) => {
      const el = document.querySelector(selector);
      if (el) el.value = value;
    }, "#siwp_captcha_value_0", captchaSolution);
    const finalCaptcha = await page.$eval("#siwp_captcha_value_0", el => el.value);
    console.log("CAPTCHA input in DOM is:", finalCaptcha);
  
  // --- SUBMIT THE FORM ---
  console.log("Clicking submit button now...");
  await page.click('input[name="submit"]');
  console.log("Form submitted. Waiting for result page...");
  await delay(5000);

  // --- FETCH RESULT DETAILS ---
  // Wait for the results container to appear
  await page.waitForSelector(".resultsHolder.servicesResultsContainer", { visible: true });
  
  // Click any "View" links (not buttons) to reveal additional details
  await page.evaluate(() => {
    const viewLinks = Array.from(document.querySelectorAll("a.viewCnrDetails"));
    viewLinks.forEach(link => link.click());
  });
  await delay(2000);
  console.log('Clicked on "View" links if any were found.');
  
  // Extract details from the detailed results container
  let finalResults = "";
  try {
    finalResults = await page.$eval("#cnrResultsDetails", el => el.innerText);
  } catch (err) {
    console.log("Error fetching #cnrResultsDetails:", err.message);
  }
  
  if (finalResults && !finalResults.includes("No case details found")) {
    console.log("\nFinal Case Details:\n", finalResults);
  } else {
    console.log("\nEither CAPTCHA was incorrect or no case details found.");
  }

  await browser.close();
  return finalResults;
}

/******************************************************
 * Express Route: POST /run-case
 * Receives JSON from the frontend, runs the Puppeteer flow,
 * and returns the results.
 ******************************************************/
app.post("/run-case", async (req, res) => {
  console.log("Backend - Received data from frontend:", req.body);
  const { courtIndex, caseIndex, caseNumber, caseYear } = req.body;

  try {
    const caseDetails = await fetchCaseDetailsManualCaptcha({ courtIndex, caseIndex, caseNumber, caseYear });
    res.json({ success: true, caseDetails });
  } catch (error) {
    console.error("Error in Puppeteer automation:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
