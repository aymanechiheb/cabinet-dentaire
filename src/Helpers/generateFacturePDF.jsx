/* eslint-disable no-unused-vars */
// generateFacturePDF.js
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logoo from '../assets/logoo.png';

export const generateFacturePDF = (doctorName, patientName, soins) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  let y = 20;

  // Add logo with a fancy border
  const logoWidth = 50;
  const logoHeight = 20;
  doc.addImage(logoo, 'PNG', 10, 10, logoWidth, logoHeight);
  
  // Adding date with modern font
  const currentDate = new Date().toLocaleDateString();
  doc.setFont('times', 'normal');
  doc.setFontSize(12);
  doc.text(`Date: ${currentDate}`, 150, 20);

  // Title Section
  doc.setFontSize(26);
  doc.setTextColor(30, 57, 99);  // Dark blue
  doc.text('Facture', 105, 40, { align: 'center' });

  // Horizontal line with softer edges
  doc.setDrawColor(0, 51, 102);
  doc.setLineWidth(0.5);
  doc.line(10, 45, 200, 45);

  // Doctor and Patient Info Section
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text(`Doctor: ${doctorName}`, 10, 60);
  doc.text(`Patient: ${patientName}`, 10, 75);

  // Horizontal line
  doc.setDrawColor(0, 51, 102);
  doc.setLineWidth(0.5);
  doc.line(10, 80, 200, 80);

  // Soins Details Section
  doc.setFontSize(16);
  doc.setTextColor(30, 57, 99);  // Dark blue
  doc.text('Details of Soins:', 10, 90);

  y = 100;
  let totalPrice = 0;
  soins.forEach((soin, index) => {
    const soinPrice = soin.price || "N/A";
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Soin #${soin.id}:`, 10, y);
    doc.text(`Comment: ${soin.comment}`, 10, y + 12);
    doc.text(`Price: ${soinPrice} dh`, 10, y + 24);
    y += 36;
    totalPrice += soinPrice === "N/A" ? 0 : parseFloat(soinPrice);
  });

  // Total Price Section
  doc.setFontSize(14);
  doc.setTextColor(30, 57, 99);  // Dark blue
  doc.text(`Total Price: ${totalPrice.toFixed(2)} dh`, 10, y);

  // Signature & Stamp Section with more attractive formatting
  doc.setFontSize(14);
  doc.setTextColor(30, 57, 99);  // Dark blue
  doc.text('Signature & Stamp', 10, y + 20);

  // Doctor's Signature
  doc.setFontSize(12);
  doc.setTextColor(80, 80, 80); // Gray color for text
  doc.text('______________________', 10, y + 30);
  doc.text('Doctor\'s Signature', 10, y + 40);

  // Stamp Box
  doc.setLineWidth(1);
  doc.setDrawColor(30, 57, 99); // Dark blue border for the stamp box
  doc.rect(150, y + 20, 50, 30); // Box for stamp
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);  // Gray text inside the stamp box
  doc.text(' Cachet', 168, y + 35); // Label inside the stamp box

  // Footer Section with Page Number and Fancy Style
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150); // Light gray for footer
  doc.text('Page 1', 105, 290, { align: 'center' });

  // Save PDF
  doc.save('facture.pdf');
};
