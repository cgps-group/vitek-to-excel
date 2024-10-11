/* eslint-disable no-plusplus */

import path from "node:path";

import XLSX from "xlsx";
import tmp from "tmp";
import unzipper from "unzipper";

import { parse } from "csv-parse";

const filesToSkip = [
  "assay_result_reading",
];

async function convertXPTStreamToExcelFile(inputStream) {
  const tmpobj = tmp.fileSync();

  const workbook = XLSX.utils.book_new();

  const zip = inputStream.pipe(unzipper.Parse({ forceStream: true }));
  let index = 0;
  let worksheet;
  for await (const entry of zip) {
    const fileName = path.parse(entry.path.replace(/\\/g, "/")).name;

    if (filesToSkip.includes(fileName)) {
      entry.autodrain();
      continue;
    }

    if (entry.path.endsWith(".col")) {
      const parser = entry.pipe(
        parse({ delimiter: "," })
      );

      for await (const record of parser) {
        worksheet = XLSX.utils.aoa_to_sheet([record]);
      }
    }
    else if (entry.path.endsWith(".dat")) {
      const parser = entry.pipe(
        parse({ delimiter: "\t" })
      );
      entry.on("end", () => parser.end());

      let count = 0;
      for await (const record of parser) {
        XLSX.utils.sheet_add_aoa(worksheet, [record], { origin: -1 });
        count += 1;
      }

      if (count > 0) {
        index += 1;
        const sheetName = `${index.toString().padStart(2, 0)}_${fileName.substring(0, 28)}`;
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      }
    }

    entry.autodrain();

    // if (fileName.endsWith(".col")) {
    //   // entry.pipe(fs.createWriteStream("output/path"));
    // }
    // else {
    //   entry.autodrain();
    // }

    // await workbook.commit();
  }

  XLSX.writeFile(workbook, tmpobj.name);

  return tmpobj.name;
}

export default convertXPTStreamToExcelFile;
