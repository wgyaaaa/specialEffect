import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

// 读取 Excel 文件
const workbook = XLSX.readFile('校长EMBA-招才选将 71期.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
// 获取第一列数据
const firstColumnData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }).map(row => row[8]);

// 将第一列数据转换为 JSON 格式
const jsonData = firstColumnData.map(value => ({ value }));

// 设置本地存储文件夹
const downloadFolder = './folder';
// 遍历数据列表,下载并保存文件
jsonData.forEach(async (item) => {
  try {
    const response = await fetch(item.value);
    const buffer = await response.buffer();
    
    // 从 URL 中提取文件名
    const fileName = path.basename(item.value);
    const filePath = path.join(downloadFolder, fileName);
    
    // 将文件写入本地
    fs.writeFileSync(filePath, buffer);
    console.log(`已下载并保存: ${fileName}`);
  } catch (error) {
    console.error(`下载失败: ${item.value}`, error);
  }
});