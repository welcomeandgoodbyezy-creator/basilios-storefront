import { NextResponse } from "next/server";

const VERIFY_TOKEN = "your_verify_token_here";
const PAGE_ACCESS_TOKEN = "your_page_access_token_here";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }

  return new Response("Forbidden", { status: 403 });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (body.object === "page") {
    body.entry.forEach((entry: any) => {
      entry.messaging.forEach((event: any) => {
        if (event.message) {
          handleIncomingMessage(event);
        }
      });
    });

    return NextResponse.json({ status: 200 });
  }

  return NextResponse.json({ status: 404 });
}

async function handleIncomingMessage(event: any) {
  const senderId = event.sender.id;
  const messageText = event.message.text.toLowerCase();

  let responseText = "";

  if (messageText.includes("reservation") || messageText.includes("book")) {
    responseText = "To make a reservation, please visit our website at basilio.vercel.app/reservations or call us at 0998-488-27-58";
  } else if (messageText.includes("menu")) {
    responseText = "Check out our full menu at basilio.vercel.app/menu 🍕";
  } else if (messageText.includes("hours") || messageText.includes("open")) {
    responseText = "We're open daily from 11AM to 9PM! 🔥";
  } else if (messageText.includes("location") || messageText.includes("address")) {
    responseText = "Find us at Brgy. Calicanto, San Juan, Batangas 📍";
  } else {
    responseText = "Hi! Welcome to Basilio's Brick Oven Pizza  How can we help you today? You can ask about our menu, hours, location, or make a reservation!";
  }

  await sendMessengerMessage(senderId, responseText);
}

async function sendMessengerMessage(recipientId: string, text: string) {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: { text },
      }),
    }
  );

  return response.json();
}