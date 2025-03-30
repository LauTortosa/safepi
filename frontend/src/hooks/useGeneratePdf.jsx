import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const useGeneratePdf = () => {
    const generatePDF = (fileName, sections) => {
        const doc = new jsPDF();
        let startY = 15;

        sections.forEach(({ title, headers, rows, excludeColumns = [] }, index) => {
            if (index > 0) doc.addPage();
            
            doc.setFontSize(18);
            doc.text(title, 14, startY);
            
            const filteredHeaders = headers.filter((_, i) => !excludeColumns.includes(i));
            const filteredRows = rows.map(row => row.filter((_, i) => !excludeColumns.includes(i)));

            autoTable(doc, {
                startY: startY + 10,
                head: [filteredHeaders],
                body: filteredRows,
            });
        });

        doc.save(fileName);
    };

    return { generatePDF };
};

export default useGeneratePdf;