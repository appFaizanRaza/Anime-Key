import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { User } from "../../types/users";

const filePath = path.join(process.cwd(), "app/data/users.json");

async function readUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
}

async function writeUsers(users: User[]) {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}

export async function POST(req: Request) {
  const body = await req.json();
  const { action, email, phone, password } = body;

  const users = await readUsers();
  if (action === "login") {
    const user = users.find(
      (u) =>
        (email && u.email === email && u.password === password) ||
        (phone && u.phone === phone && u.password === password),
    );

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email/phone or password" },
        { status: 401 },
      );
    }
    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
      },
    });
    response.cookies.set("auth-token", String(user.id), {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });

    return response;
  }
  if (action === "register") {
    const { firstName, lastName, dob } = body;

    const exists = users.some((u) => u.email === email || u.phone === phone);
    if (exists) {
      return NextResponse.json(
        { message: "Email or phone already registered" },
        { status: 409 },
      );
    }

    const newUser: User = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      email,
      phone,
      password,
      firstName,
      lastName,
      dob,
    };

    users.push(newUser);
    await writeUsers(users);

    return NextResponse.json(
      { message: "Registration successful" },
      { status: 201 },
    );
  }

  return NextResponse.json({ message: "Invalid request" }, { status: 400 });
}
