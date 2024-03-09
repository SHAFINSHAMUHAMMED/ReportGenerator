import React, { useState } from 'react';
import './App.css';
import Form from './components/form';
import First_page from './components/OUT/first_page';
import Table1 from './components/OUT/table1';
import Charts from './components/OUT/charts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
`;

function App() {
  const [totalRows, setTotalRows] = useState([]);
  const [chartPages, setChartPages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddTotalRow = (newRow) => {
    setTotalRows([...totalRows, newRow]);
    setChartPages([...chartPages, newRow]);
  };

  const downloadPDF = async () => {
    setLoading(true);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4'
    });
  
    let isFirstElement = true;
  
    const addElementToPDF = async (elementId) => {
      const element = document.getElementById(elementId);
      if (!element) return;
  
      const canvas = await html2canvas(element, { scale: 5, useCORS: true });
      const imgData = canvas.toDataURL('image/jpeg', 1);
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      const topMargin = 20;
      const availableHeight = pdfHeight - topMargin;
  
      let contentHeight = (imgProps.height * pdfWidth) / imgProps.width;
      let contentWidth = pdfWidth;
  
      if (contentHeight > availableHeight) {
        const scalingFactor = availableHeight / contentHeight;
        contentHeight *= scalingFactor;
        contentWidth *= scalingFactor;
      }
  
      const xPosition = (pdfWidth - contentWidth) / 2;
      let yPosition = topMargin;
  
      if (contentHeight < availableHeight) {
        yPosition += (availableHeight - contentHeight) / 2 - topMargin;
      }
  
      // Add a new page only if this is not the first element
      if (!isFirstElement) {
        pdf.addPage();
      } else {
        isFirstElement = false; // After adding the first element, set this to false
      }
  
      pdf.addImage(imgData, 'JPEG', xPosition, yPosition, contentWidth, contentHeight, '', 'FAST');
    };
  
    // Sequence for adding elements to the PDF
    await addElementToPDF('first-page-to-download');
    // await addElementToPDF('table-to-download');
    for (const [index] of chartPages.entries()) {
      await addElementToPDF(`chart-to-download-${index}`);
    }
  
    pdf.save('download.pdf');
    setLoading(false);
  };


  return (
    <>
      <Form onGenerate={handleAddTotalRow} />
      <div id='first-page-to-download'>
        <First_page />

        <Table1 rows={totalRows} />
      </div>
      {chartPages.map((data, index) => (
        <div id={`chart-to-download-${index}`} key={index}>
          <Charts data={data.weeks} name={data.campaignName} campaignNumber={index + 1} />
          <div className='text-center pt-20 pb-10'>
            <p>If you have any questions <br /> contact us at <span className='text-blue-500'>arshad@webqmedia.com</span></p>
            <p>webqmedia.com</p>
          </div>
        </div>
      ))}
     <button onClick={downloadPDF} disabled={loading} className="download-button flex m-auto items-center p-3 rounded-md bg-blue-400 mt-20 mb-20">
        {loading ? <BeatLoader color={"#ffffff"} loading={loading} css={override} size={10} /> : 'Download as PDF'}
      </button>
    </>
  );
  
}

export default App;

