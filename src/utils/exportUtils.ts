
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { supabase } from "@/integrations/supabase/client";

// Types for export
type ExportFormat = 'pdf' | 'xlsx' | 'txt' | 'docx';
type ExportSection = 'inventory' | 'finances' | 'sales' | 'customers' | 'whatsapp' | 'marketplaces' | 'calendar' | 'reports' | 'settings' | 'all';

// Fetch data functions
const fetchInventoryData = async () => {
  const { data, error } = await supabase
    .from('inventory')
    .select('*');

  if (error) {
    console.error('Error fetching inventory data:', error);
    return [];
  }
  return data || [];
};

const fetchFinancesData = async () => {
  const { data, error } = await supabase
    .from('finances')
    .select('*');

  if (error) {
    console.error('Error fetching finances data:', error);
    return [];
  }
  return data || [];
};

const fetchSalesData = async () => {
  const { data, error } = await supabase
    .from('sales')
    .select('*');

  if (error) {
    console.error('Error fetching sales data:', error);
    return [];
  }
  return data || [];
};

const fetchCustomersData = async () => {
  const { data, error } = await supabase
    .from('customers')
    .select('*');

  if (error) {
    console.error('Error fetching customers data:', error);
    return [];
  }
  return data || [];
};

// Helper function to get mock data when no real data exists
const getMockData = (section: ExportSection) => {
  switch (section) {
    case 'inventory':
      return [
        { id: 1, name: 'Sutiã Rendado', sku: 'SUT001', price: 79.90, stock: 15 },
        { id: 2, name: 'Calcinha Básica', sku: 'CAL001', price: 29.90, stock: 25 },
        { id: 3, name: 'Conjunto Glamour', sku: 'CON001', price: 119.90, stock: 8 },
      ];
    case 'finances':
      return [
        { id: 1, description: 'Vendas Mensais', value: 5490.50, date: '2023-05-01', type: 'income' },
        { id: 2, description: 'Custos de Operação', value: 1250.00, date: '2023-05-05', type: 'expense' },
        { id: 3, description: 'Investimento em Marketing', value: 800.00, date: '2023-05-10', type: 'expense' },
      ];
    case 'sales':
      return [
        { id: 1, customer: 'Maria Silva', products: 'Conjunto Glamour', total: 119.90, date: '2023-05-12' },
        { id: 2, customer: 'Ana Oliveira', products: 'Sutiã Rendado, Calcinha Básica', total: 109.80, date: '2023-05-14' },
        { id: 3, customer: 'Carla Santos', products: 'Camisola Cetim', total: 149.90, date: '2023-05-15' },
      ];
    case 'customers':
      return [
        { id: 1, name: 'Maria Silva', email: 'maria@exemplo.com', phone: '(11) 98765-4321', purchases: 3 },
        { id: 2, name: 'Ana Oliveira', email: 'ana@exemplo.com', phone: '(21) 97654-3210', purchases: 2 },
        { id: 3, name: 'Carla Santos', email: 'carla@exemplo.com', phone: '(31) 96543-2109', purchases: 1 },
      ];
    // Add more sections as needed
    default:
      return [];
  }
};

// Fetch data based on section
const fetchDataForSection = async (section: ExportSection) => {
  try {
    switch (section) {
      case 'inventory':
        return await fetchInventoryData() || getMockData('inventory');
      case 'finances':
        return await fetchFinancesData() || getMockData('finances');
      case 'sales':
        return await fetchSalesData() || getMockData('sales');
      case 'customers':
        return await fetchCustomersData() || getMockData('customers');
      case 'all':
        // For 'all', combine data from all sections
        const inventory = await fetchInventoryData() || getMockData('inventory');
        const finances = await fetchFinancesData() || getMockData('finances');
        const sales = await fetchSalesData() || getMockData('sales');
        const customers = await fetchCustomersData() || getMockData('customers');
        return {
          inventory,
          finances,
          sales,
          customers,
          // Add other sections as needed
        };
      default:
        return getMockData(section);
    }
  } catch (error) {
    console.error(`Error fetching data for ${section}:`, error);
    return getMockData(section); // Fallback to mock data
  }
};

// Export to Excel
const exportToExcel = (data: any, section: ExportSection) => {
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
    return true;
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    return false;
  }
};

// Export to PDF
const exportToPdf = (data: any, section: ExportSection) => {
  try {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`BelleCharm - ${section.charAt(0).toUpperCase() + section.slice(1)} Report`, 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    
    const exportDate = new Date().toLocaleDateString('pt-BR');
    doc.text(`Exportado em: ${exportDate}`, 14, 30);
    
    if (section === 'all') {
      // For 'all', create multiple tables
      let yPos = 40;
      Object.entries(data).forEach(([key, sectionData]) => {
        if (Array.isArray(sectionData) && sectionData.length > 0) {
          const title = key.charAt(0).toUpperCase() + key.slice(1);
          doc.setFontSize(14);
          doc.text(title, 14, yPos);
          doc.setFontSize(11);
          
          const headers = Object.keys(sectionData[0]);
          const dataRows = sectionData.map(item => Object.values(item));
          
          // @ts-ignore - jspdf-autotable types are not fully compatible
          doc.autoTable({
            startY: yPos + 5,
            head: [headers],
            body: dataRows,
            theme: 'striped',
            headStyles: { fillColor: [236, 72, 153] },
            margin: { top: 10 },
          });
          
          // @ts-ignore - jspdf-autotable types are not fully compatible
          yPos = doc.lastAutoTable.finalY + 15;
          
          // Add new page if needed
          if (yPos > 250) {
            doc.addPage();
            yPos = 20;
          }
        }
      });
    } else {
      // For specific section, create single table
      const headers = Object.keys(data[0] || {});
      const dataRows = data.map((item: any) => Object.values(item));
      
      // @ts-ignore - jspdf-autotable types are not fully compatible
      doc.autoTable({
        startY: 40,
        head: [headers],
        body: dataRows,
        theme: 'striped',
        headStyles: { fillColor: [236, 72, 153] },
        margin: { top: 10 },
      });
    }
    
    doc.save(`bellecharm_${section}_export.pdf`);
    return true;
  } catch (error) {
    console.error("Error exporting to PDF:", error);
    return false;
  }
};

// Export to Text
const exportToText = (data: any, section: ExportSection) => {
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
    return true;
  } catch (error) {
    console.error("Error exporting to Text:", error);
    return false;
  }
};

// Export to Word (DOCX)
const exportToWord = (data: any, section: ExportSection) => {
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
    return true;
  } catch (error) {
    console.error("Error exporting to Word:", error);
    return false;
  }
};

// Main export function
export const exportData = async (format: ExportFormat, section: ExportSection) => {
  try {
    // Fetch data for the requested section
    const data = await fetchDataForSection(section);
    
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return { success: false, message: 'No data to export' };
    }
    
    // Export in the requested format
    switch (format) {
      case 'xlsx':
        const excelResult = exportToExcel(data, section);
        return { 
          success: excelResult, 
          message: excelResult ? 'Excel export completed successfully' : 'Error exporting to Excel'
        };
      case 'pdf':
        const pdfResult = exportToPdf(data, section);
        return { 
          success: pdfResult, 
          message: pdfResult ? 'PDF export completed successfully' : 'Error exporting to PDF'
        };
      case 'txt':
        const txtResult = exportToText(data, section);
        return { 
          success: txtResult, 
          message: txtResult ? 'Text export completed successfully' : 'Error exporting to Text'
        };
      case 'docx':
        const wordResult = exportToWord(data, section);
        return { 
          success: wordResult, 
          message: wordResult ? 'Word export completed successfully' : 'Error exporting to Word'
        };
      default:
        return { success: false, message: 'Unsupported export format' };
    }
  } catch (error) {
    console.error('Export error:', error);
    return { success: false, message: 'An error occurred during export' };
  }
};
