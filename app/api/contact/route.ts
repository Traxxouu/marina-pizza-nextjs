// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is missing');
      return NextResponse.json({ error: 'Service de mail non configuré' }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: 'Marina Pizza <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'contact@marinapizza.fr',
      replyTo: email,
      subject: `Nouveau message de ${name}`,
      html: `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>body{font-family:Arial,sans-serif;line-height:1.6;color:#333}.container{max-width:600px;margin:0 auto;padding:20px}.header{background-color:#dc2626;color:white;padding:20px;text-align:center;border-radius:8px 8px 0 0}.content{background-color:#f9fafb;padding:30px;border-radius:0 0 8px 8px}.field{margin-bottom:20px}.label{font-weight:bold;color:#dc2626;display:block;margin-bottom:5px}.value{background-color:white;padding:12px;border-radius:4px;border:1px solid #e5e7eb}</style></head><body><div class="container"><div class="header"><h1>🍕 Nouveau Message - Marina Pizza</h1></div><div class="content"><div class="field"><span class="label">Nom :</span><div class="value">${name}</div></div><div class="field"><span class="label">Email :</span><div class="value"><a href="mailto:${email}">${email}</a></div></div><div class="field"><span class="label">Téléphone :</span><div class="value"><a href="tel:${phone}">${phone}</a></div></div><div class="field"><span class="label">Message :</span><div class="value">${message.replace(/\n/g,'<br>')}</div></div></div></div></body></html>`,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'envoi du message' }, { status: 500 });
  }
}