import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  const { name, phone, email, service, city, message } = await req.json();

  if (!name || !phone || !service || !city) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error } = await resend.emails.send({
    from: 'HammerHead Pools Website <noreply@hammerheadpoolsaz.com>',
    to: 'hammerheadpoolsaz@gmail.com',
    replyTo: email || undefined,
    subject: `New Quote Request — ${service} (${city})`,
    text: [
      `Name:    ${name}`,
      `Phone:   ${phone}`,
      `Email:   ${email || 'not provided'}`,
      `Service: ${service}`,
      `City:    ${city}`,
      message ? `Message: ${message}` : '',
    ]
      .filter(Boolean)
      .join('\n'),
  });

  console.log('Resend response — data:', JSON.stringify(data), 'error:', JSON.stringify(error));

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
