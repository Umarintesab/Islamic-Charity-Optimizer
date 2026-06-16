const XLSX = require('xlsx');
const fs = require('fs');

// Excel file ka path
const excelPath = 'C:/Users/Dell2004/Desktop/ISO WEB ENG/city_area_mapping.xlsx';

// JSON save path
const jsonPath = 'C:/Users/Dell2004/Desktop/ISO WEB ENG/frontend/public/data/city_area_mapping.json';

// Excel read
const workbook = XLSX.readFile(excelPath);
const sheet = workbook.Sheets['mapping'];
const data = XLSX.utils.sheet_to_json(sheet);

// Convert
const filteredData = data.map(row => ({
  City: row.City,
  Area: row.Area,
  Poverty_Cluster: row.Poverty_Cluster
}));

// Save JSON
fs.writeFileSync(jsonPath, JSON.stringify(filteredData, null, 2));

console.log(`✅ Done! ${filteredData.length} records saved.`);