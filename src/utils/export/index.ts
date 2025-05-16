
import { ExportFormat, ExportSection, ExportResult } from './types';
import { fetchDataForSection } from './mockData';
import { exportToExcel } from './excelExport';
import { exportToPdf } from './pdfExport';
import { exportToText } from './textExport';
import { exportToWord } from './wordExport';

// Main export function
export const exportData = async (format: ExportFormat, section: ExportSection): Promise<ExportResult> => {
  try {
    // Fetch data for the requested section
    const data = await fetchDataForSection(section);
    
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return { success: false, message: 'No data to export' };
    }
    
    // Export in the requested format
    switch (format) {
      case 'xlsx':
        return exportToExcel(data, section);
      case 'pdf':
        return exportToPdf(data, section);
      case 'txt':
        return exportToText(data, section);
      case 'docx':
        return exportToWord(data, section);
      default:
        return { success: false, message: 'Unsupported export format' };
    }
  } catch (error) {
    console.error('Export error:', error);
    return { success: false, message: 'An error occurred during export' };
  }
};

// Re-export types for convenience
export * from './types';
