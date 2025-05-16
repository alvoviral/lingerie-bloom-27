
export type ExportFormat = 'pdf' | 'xlsx' | 'txt' | 'docx';
export type ExportSection = 'inventory' | 'finances' | 'sales' | 'customers' | 'whatsapp' | 'marketplaces' | 'calendar' | 'reports' | 'settings' | 'all';

export interface ExportResult {
  success: boolean;
  message: string;
}
