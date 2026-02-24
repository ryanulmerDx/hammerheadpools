import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, phone, email, service, city, message } = await req.json();

  if (!name || !phone || !service || !city) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { error } = await resend.emails.send({
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

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
