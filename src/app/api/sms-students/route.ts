import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get("studentId") || "SE160001";

  // Simulate database & cache lookup
  await new Promise((r) => setTimeout(r, 45));

  const response = NextResponse.json({
    studentId,
    fullName: "Nguyễn Văn An",
    major: "Software Engineering",
    gpa: 3.65,
    enrolledCourses: ["PRN232", "SWD392", "MLN111"],
    status: "Active",
    cached: true,
    cacheTtl: "3600s"
  });

  response.headers.set("ETag", 'W/"3a2-b91c0e"');
  response.headers.set("Cache-Control", "public, max-age=3600");
  return response;
}

export async function POST(request: NextRequest) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    body = { fullName: "Trần Thị Mai", major: "Information Assurance" };
  }

  await new Promise((r) => setTimeout(r, 80));

  const newStudent = {
    studentId: "SE180099",
    ...body,
    status: "Active",
    createdAt: new Date().toISOString()
  };

  const response = NextResponse.json(newStudent, { status: 201 });
  response.headers.set("Location", "/api/v1/students/SE180099");
  return response;
}

export async function PUT(request: NextRequest) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    body = { fullName: "Nguyễn Văn An", phone: "+84 912 345 678" };
  }

  await new Promise((r) => setTimeout(r, 60));

  return NextResponse.json({
    studentId: "SE160001",
    ...body,
    updatedAt: new Date().toISOString()
  });
}

export async function DELETE(request: NextRequest) {
  await new Promise((r) => setTimeout(r, 50));
  return new NextResponse(null, { status: 204 });
}
