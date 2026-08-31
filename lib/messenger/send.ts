export async function sendMessengerText(psid: string, text: string) {
  const token = process.env.MESSENGER_PAGE_ACCESS_TOKEN
  if (!token) throw new Error('Missing MESSENGER_PAGE_ACCESS_TOKEN')

  const res = await fetch(`https://graph.facebook.com/v21.0/me/messages?access_token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      recipient: { id: psid },
      message: { text },
      messaging_type: 'RESPONSE',
    }),
  })

  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`Meta send failed ${res.status}: ${detail}`)
  }

  return (await res.json()) as { message_id?: string }
}