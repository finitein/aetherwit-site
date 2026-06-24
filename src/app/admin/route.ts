import { NextResponse } from "next/server";

export async function GET() {
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/admin/assets/favicon-eb31bc17.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TinaCMS</title>
    <script type="module" crossorigin src="/admin/assets/index-d9aa1791.js"></script>
    <link rel="stylesheet" href="/admin/assets/index-71ca28d0.css">
  </head>
  <body class="tina-tailwind">
    <div id="root"></div>
  </body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
