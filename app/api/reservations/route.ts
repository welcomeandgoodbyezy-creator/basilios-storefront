import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // <-- CHANGED THIS LINE
) {
  try {
    const { id } = await params; // <-- AND THIS LINE
    const data = await request.json();
    
    const reservation = await prisma.reservation.update({
      where: { id },
      data: { status: data.status },
    });
    
    return NextResponse.json({ success: true, reservation });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update reservation" }, { status: 500 });
  }
}