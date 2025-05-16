
import { saveAs } from 'file-saver';
import { ExportSection, ExportResult } from './types';

export const exportToWord = (data: any, section: ExportSection): ExportResult => {
  try {
    // For Word format, we'll create an HTML representation and save it as .docx
    // Note: This is a simplified approach; for better Word docs, consider libraries like docx
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>BelleCharm - ${section} Export</title>
        <style>
          body { font-family: 'Calibri', sans-serif; }
          h1 { color: #EC4899; }
          table { border-collapse: collapse; width: 100%; margin: 20px 0; }
          th { background-color: #EC4899; color: white; text-align: left; padding: 8px; }
          td { border: 1px solid #ddd; padding: 8px; }
          tr:nth-child(even) { background-color: #f2f2f2; }
          .section-title { margin-top: 30px; color: #EC4899; }
        </style>
      </head>
      <body>
        <h1>BelleCharm - ${section.charAt(0).toUpperCase() + section.slice(1)} Export</h1>
        <p>Exported on: ${new Date().toLocaleDateString()}</p>
    `;
    
    if (section === 'all') {
      // For 'all', create tables for all sections
      Object.entries(data).forEach(([key, sectionData]) => {
        if (Array.isArray(sectionData) && sectionData.length > 0) {
          htmlContent += `<h2 class="section-title">${key.charAt(0).toUpperCase() + key.slice(1)}</h2>`;
          htmlContent += '<table>';
          
          // Add headers
          htmlContent += '<tr>';
          Object.keys(sectionData[0]).forEach(header => {
            htmlContent += `<th>${header}</th>`;
          });
          htmlContent += '</tr>';
          
          // Add data rows
          sectionData.forEach((item: any) => {
            htmlContent += '<tr>';
            Object.values(item).forEach(value => {
              htmlContent += `<td>${value}</td>`;
            });
            htmlContent += '</tr>';
          });
          
          htmlContent += '</table>';
        }
      });
    } else {
      // For specific section, create single table
      if (data.length > 0) {
        htmlContent += '<table>';
        
        // Add headers
        htmlContent += '<tr>';
        Object.keys(data[0]).forEach(header => {
          htmlContent += `<th>${header}</th>`;
        });
        htmlContent += '</tr>';
        
        // Add data rows
        data.forEach((item: any) => {
          htmlContent += '<tr>';
          Object.values(item).forEach(value => {
            htmlContent += `<td>${value}</td>`;
          });
          htmlContent += '</tr>';
        });
        
        htmlContent += '</table>';
      }
    }
    
    htmlContent += '</body></html>';
    
    const blob = new Blob([htmlContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    saveAs(blob, `bellecharm_${section}_export.docx`);
    return {
      success: true,
      message: 'Word export completed successfully'
    };
  } catch (error) {
    console.error("Error exporting to Word:", error);
    return {
      success: false,
      message: 'Error exporting to Word'
    };
  }
};
