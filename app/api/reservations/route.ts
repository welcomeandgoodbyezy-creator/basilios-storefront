import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const reservation = await prisma.reservation.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        date: data.date,
        time: data.time,
        guests: data.guests,
        occasion: data.occasion,
        notes: data.notes,
      },
    });

    return NextResponse.json({ success: true, reservation });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save reservation" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(reservations);
  } catch (error) {
    return NextResponse.json([]);
  }
}