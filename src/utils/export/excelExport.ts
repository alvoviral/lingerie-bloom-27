
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ExportSection, ExportResult } from './types';

export const exportToExcel = (data: any, section: ExportSection): ExportResult => {
  try {
    const wb = XLSX.utils.book_new();
    
    if (section === 'all') {
      // For 'all', create multiple sheets
      Object.entries(data).forEach(([key, sectionData]) => {
        if (Array.isArray(sectionData) && sectionData.length > 0) {
          const ws = XLSX.utils.json_to_sheet(sectionData);
          XLSX.utils.book_append_sheet(wb, ws, key.charAt(0).toUpperCase() + key.slice(1));
        }
      });
    } else {
      // For specific section, create single sheet
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, section.charAt(0).toUpperCase() + section.slice(1));
    }
    
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data_blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    saveAs(data_blob, `bellecharm_${section}_export.xlsx`);
    return {
      success: true,
      message: 'Excel export completed successfully'
    };
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    return {
      success: false,
      message: 'Error exporting to Excel'
    };
  }
};
