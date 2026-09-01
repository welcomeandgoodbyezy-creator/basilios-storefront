import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await request.json();
    
    const filePath = path.join(process.cwd(), "data", "reservations.json");
    const fileData = await readFile(filePath, "utf-8");
    let reservations = JSON.parse(fileData);
    
    const index = reservations.findIndex((r: any) => r.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Reservation not found" }, { status: 404 });
    }
    
    reservations[index] = { ...reservations[index], ...data };
    
    await writeFile(filePath, JSON.stringify(reservations, null, 2));
    
    return NextResponse.json({ success: true, reservation: reservations[index] });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update reservation" }, { status: 500 });
  }
}