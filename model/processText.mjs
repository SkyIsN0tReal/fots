import fs from 'fs';
import removeMd from 'remove-markdown';

const fileContent = fs.readFileSync('test.txt', 'utf-8');

const rules = [
  [/^>.*(\r?\n)?/gm, ''],
  //[/\s+/g, ' '],
  [/^.{5,100}\n/gm, ''],
  [/ \(.{0,5}\)/gm, ''],
];

function applyRules(text, rules) {
  for (const [pattern, replacement] of rules) {
    text = text.replace(pattern, replacement);
  }
  return text;
}

const processText = rawText => removeMd(applyRules(rawText, rules)).trim().toLowerCase();

const finalCleanedText = processText(fileContent);
console.log(finalCleanedText);
fs.writeFileSync('processed.txt', finalCleanedText);
