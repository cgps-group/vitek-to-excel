import fs from "node:fs";

import convert from "../../lib/xpt.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handle(req, res) {
  const xlsx = await convert(req);

  res.setHeader("Content-Disposition", "attachment; filename=file.xlsx");

  fs.createReadStream(xlsx).pipe(res);
}

export default handle;
