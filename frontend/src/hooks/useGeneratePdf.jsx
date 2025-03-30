import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const useGeneratePdf = () => {
    const generatePDF = (title, headers, rows, fileName, excludeColumns = []) => {
        const doc = new jsPDF();
    
        doc.setFontSize(18);
        doc.text(title, 14, 15);

        const filteredHeaders = headers.filter((_, index) => !excludeColumns.includes(index));
        const filteredRows = rows.map(row => row.filter((_, index) => !excludeColumns.includes(index)));
            
        autoTable(doc, {
            startY: 25,
            head: [filteredHeaders],
            body: filteredRows,
        });
    
        doc.save(fileName);
    };
    
    return{ generatePDF }; 
};

export default useGeneratePdf;