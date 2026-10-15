import { getJobs } from "@/lib/api/coople/server-client";

function parseSafeInteger(value: string): number | null {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) ? parsed : null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageNum = parseSafeInteger(searchParams.get("pageNum") ?? "0");
  const pageSize = parseSafeInteger(searchParams.get("pageSize") ?? "30");

  if (pageNum === null || pageNum < 0) {
    return Response.json(
      { error: true, message: "pageNum must be a non-negative safe integer." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (pageSize === null || pageSize < 1) {
    return Response.json(
      { error: true, message: "pageSize must be a positive safe integer." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const page = await getJobs({ pageNum, pageSize });
    return Response.json(page, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Failed to load jobs from Coople.", error);
    return Response.json(
      { error: true, message: "Failed to load jobs from Coople." },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
