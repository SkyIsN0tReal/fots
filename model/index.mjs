import { GoogleGenAI } from "@google/genai";
import fs from "fs"
import removeMd from "remove-markdown"
import path from "path"
import dotenv from "dotenv"

dotenv.config()

//function to get all text files in a folder including subfolders
function getAllFilePaths(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) results = results.concat(getAllFilePaths(fullPath));
    else results.push(fullPath);
  }
  return results;
}

const files = getAllFilePaths("data/test-dir");
console.log(fs.readFileSync(files[0], 'utf-8'));
fs.writeFileSync("test.txt", fs.readFileSync(files[0], 'utf-8'));

//const mdText = removeMd(fs.readFileSync("facebook.com.md", 'utf-8'))

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function getScore(contractText) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `You are a legal and consumer rights assistant. I will give you the full text of a website's Terms of Service or Privacy Policy. Your task is to rate the document on a scale from 1 to 10 based on how fair, user-friendly, privacy-respecting, and transparent it is. Return only one number from 1 to 10, where 1 represents a contract that is extremely harmful or unfair to users and 10 represents an incredibly friendly and transparent contract that is fair and is beneficial to users. Here is the contract:\n${contractText}`,
  });
  console.log(response.text);
}