import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.pathname.replace("/api", "");
  const searchParams = request.nextUrl.search;

  try {
    const response = await fetch(`${BACKEND_URL}${path}${searchParams}`, {
      headers: {
        ...Object.fromEntries(request.headers),
        "X-Forwarded-Host": request.headers.get("host") || "",
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { detail: "Backend unavailable" },
      { status: 503 }
    );
  }
}

export async function POST(request: NextRequest) {
  const path = request.nextUrl.pathname.replace("/api", "");
  const body = await request.json();

  try {
    const response = await fetch(`${BACKEND_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...Object.fromEntries(request.headers),
        "X-Forwarded-Host": request.headers.get("host") || "",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { detail: "Backend unavailable" },
      { status: 503 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const path = request.nextUrl.pathname.replace("/api", "");
  const body = await request.json();

  try {
    const response = await fetch(`${BACKEND_URL}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...Object.fromEntries(request.headers),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { detail: "Backend unavailable" },
      { status: 503 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const path = request.nextUrl.pathname.replace("/api", "");

  try {
    const response = await fetch(`${BACKEND_URL}${path}`, {
      method: "DELETE",
      headers: {
        ...Object.fromEntries(request.headers),
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { detail: "Backend unavailable" },
      { status: 503 }
    );
  }
}
