
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { ExportSection, ExportResult } from './types';

export const exportToPdf = (data: any, section: ExportSection): ExportResult => {
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
    return {
      success: true,
      message: 'PDF export completed successfully'
    };
  } catch (error) {
    console.error("Error exporting to PDF:", error);
    return {
      success: false,
      message: 'Error exporting to PDF'
    };
  }
};
