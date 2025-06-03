import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  return NextResponse.json(data);
}

export async function GET(req: Request) {
  const data = await req.json();
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  const data = await req.json();
  return NextResponse.json(data);
}
