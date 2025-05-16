
import { saveAs } from 'file-saver';
import { ExportSection, ExportResult } from './types';

export const exportToText = (data: any, section: ExportSection): ExportResult => {
  try {
    let textContent = `BelleCharm - ${section.charAt(0).toUpperCase() + section.slice(1)} Export\n`;
    textContent += `Exported on: ${new Date().toLocaleDateString()}\n\n`;
    
    if (section === 'all') {
      // For 'all', format all sections
      Object.entries(data).forEach(([key, sectionData]) => {
        if (Array.isArray(sectionData) && sectionData.length > 0) {
          textContent += `=== ${key.toUpperCase()} ===\n\n`;
          
          sectionData.forEach((item: any, index: number) => {
            textContent += `Item ${index + 1}:\n`;
            Object.entries(item).forEach(([field, value]) => {
              textContent += `${field}: ${value}\n`;
            });
            textContent += '\n';
          });
          
          textContent += '\n\n';
        }
      });
    } else {
      // For specific section, format single section
      data.forEach((item: any, index: number) => {
        textContent += `Item ${index + 1}:\n`;
        Object.entries(item).forEach(([field, value]) => {
          textContent += `${field}: ${value}\n`;
        });
        textContent += '\n';
      });
    }
    
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `bellecharm_${section}_export.txt`);
    return {
      success: true,
      message: 'Text export completed successfully'
    };
  } catch (error) {
    console.error("Error exporting to Text:", error);
    return {
      success: false,
      message: 'Error exporting to Text'
    };
  }
};
