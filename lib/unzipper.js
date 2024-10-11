// import path from "node:path";

// import ExcelJS from "exceljs";
// import tmp from "tmp";
// import unzipper from "unzipper";

// function convertXPTToWorkbook(inputStream) {

//   // Add a worksheet to the workbook
//   // workbook.addWorksheet("My Data Sheet");

//   // // Define headers for your columns
//   // worksheet.columns = [
//   //   { header: "ID", key: "id", width: 10 },
//   //   { header: "Name", key: "name", width: 30 },
//   //   { header: "Age", key: "age", width: 10 },
//   //   { header: "Email", key: "email", width: 30 },
//   // ];

//   // Stream data into the worksheet
//   // For large datasets, stream data from any source like a database, API, etc.
//   // for (let i = 1; i <= 10000; i++) {
//   //   worksheet.addRow({
//   //     id: i,
//   //     name: `User ${i}`,
//   //     age: Math.floor(Math.random() * 100) + 1,
//   //     email: `user${i}@example.com`,
//   //   }).commit(); // Commit the row to the worksheet
//   // }

//   return new Promise((resolve, reject) => {
//     inputStream.pipe(unzipper.Parse())
//       .on("entry", (entry) => {
//         const fileName = entry.path;
//         const type = entry.type; // 'Directory' or 'File'
//         const size = entry.vars.uncompressedSize; // There is also compressedSize;
//         console.log({ fileName });
//         if (fileName.endsWith(".col")) {
//           // console.log({ entry });
//           // // Add a worksheet to the workbook
//           // const worksheet = workbook.addWorksheet(fileName);

//           // // Define headers for your columns
//           // worksheet.columns = [
//           //   { header: "ID", key: "id", width: 10 },
//           //   { header: "Name", key: "name", width: 30 },
//           //   { header: "Age", key: "age", width: 10 },
//           //   { header: "Email", key: "email", width: 30 },
//           // ];

//           // // Stream data into the worksheet
//           // // For large datasets, stream data from any source like a database, API, etc.
//           // for (let i = 1; i <= 1; i++) {
//           //   worksheet.addRow({
//           //     id: i,
//           //     name: `User ${i}`,
//           //     age: Math.floor(Math.random() * 100) + 1,
//           //     email: `user${i}@example.com`,
//           //   }).commit(); // Commit the row to the worksheet
//           // }
//         }
//         entry.autodrain();
//       })
//       .on("end", () => resolve(workbook))
//       .on("error", (err) => reject(err));
//   });
// }

// // Function to create an Excel file and stream data
// async function convertXPTStreamToExcelFile(inputStream) {
//   const tmpobj = tmp.fileSync();

//   const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
//     filename: tmpobj.name,
//   });

//   // workbook.addWorksheet("aes_drug_resistance");
//   // workbook.addWorksheet("aes_phenotype");
//   // workbook.addWorksheet("assay");
//   // workbook.addWorksheet("assay_aes_correcting_phenotypes");
//   // workbook.addWorksheet("assay_aes_deduction_method");
//   // workbook.addWorksheet("assay_aes_deduction_method_drugs");

//   for (let index = 0; index < names.length; index++) {
//     if (names[index].length > "assay_aes_deduction_method_drug".length) {
//       console.log(names[index])
//     }
//     else {
//       workbook.addWorksheet(names[index]);
//     }
//   }

//   let index = 0;

//   const zip = inputStream.pipe(unzipper.Parse({ forceStream: true }));
//   for await (const entry of zip) {
//     const fileName = path.parse(entry.path.replace(/\\/g, "/")).name;
//     const type = entry.type; // 'Directory' or 'File'
//     const size = entry.vars.uncompressedSize; // There is also compressedSize;

//     if (entry.path.endsWith(".col")) {
//       // console.log(fileName)
//       // workbook.addWorksheet((index++).toString());
//     }

//     // if (fileName.endsWith(".col")) {
//     //   // entry.pipe(fs.createWriteStream("output/path"));
//     // }
//     // else {
//     //   entry.autodrain();
//     // }

//     entry.autodrain();

//     // await workbook.commit();
//   }

//   await workbook.commit();

//   return workbook.stream.path;
// }

// export default convertXPTStreamToExcelFile;
