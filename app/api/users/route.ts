import { NextResponse } from "next/server";
import getServerSession from "next-auth";
import { config } from "@/auth";

export async function GET(req: Request) {
  const session = getServerSession(config);

  if (!session) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }

  try {
    const result = [
      {
        id: "1",
        name: "Fake User 1",
        email: "fake.user1@example.com",
        image: "https://example.com/fake-user1.jpg",
        status: "active",
      },
      {
        id: "2",
        name: "Fake User 2",
        email: "fake.user2@example.com",
        image: "https://example.com/fake-user2.jpg",
        status: "inactive",
      },
    ];

    return NextResponse.json(result)
  } catch (error) {
    console.log("[USERS_GET]", error);
    return new NextResponse("Initial error", { status: 500 });
  }
}
