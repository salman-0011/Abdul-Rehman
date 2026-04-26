import { NextResponse } from "next/server"
import { unstable_noStore as noStore } from "next/cache"
import { defaultPortfolioContent, normalizePortfolioContent } from "@/lib/portfolio-content"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  noStore()

  return NextResponse.json(normalizePortfolioContent(defaultPortfolioContent), {
    headers: {
      "x-portfolio-source": "local-default",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  })
}
