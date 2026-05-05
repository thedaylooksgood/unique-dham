import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Resend Configuration
const resend = new Resend(process.env.RESEND_API_KEY);

// Mailtrap Configuration (for local testing/alternate)
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST || "sandbox.smtp.mailtrap.io",
  port: Number(process.env.MAILTRAP_PORT) || 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, phone, subject, message, source, productId, pujaId } = data;

    const emailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #2c2c2c; line-height: 1.6; border: 2px solid #e95d24; border-radius: 15px; max-width: 600px; background-color: #fffbf5;">
        <div style="text-align: center; margin-bottom: 25px;">
           <h1 style="color: #e95d24; margin: 0; font-size: 24px; letter-spacing: 1px;">🚩 MAA UNIQUE DHAM</h1>
           <p style="color: #6b6b6b; font-size: 12px; margin-top: 5px; text-transform: uppercase; letter-spacing: 2px;">Sacred Enquiry Receipt</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 25px; border-radius: 10px; border: 1px solid #f1e4d7; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
          <h2 style="color: #3d2b1f; border-bottom: 1px solid #f1e4d7; padding-bottom: 15px; margin-top: 0; font-size: 18px;">New ${source || 'Enquiry'} Details</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #e95d24; width: 40%;">👤 Full Name:</td>
              <td style="padding: 10px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #e95d24;">📞 Phone Number:</td>
              <td style="padding: 10px 0;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #e95d24;">🏷️ Source:</td>
              <td style="padding: 10px 0;">${source || 'General Website'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #e95d24;">🎯 Topic/Ritual:</td>
              <td style="padding: 10px 0;">${subject}</td>
            </tr>
            ${productId || pujaId ? `
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #e95d24;">🆔 Reference ID:</td>
              <td style="padding: 10px 0;">${productId || pujaId}</td>
            </tr>` : ''}
          </table>
          
          <div style="background-color: #fdfaf7; padding: 20px; border-radius: 8px; margin-top: 25px; border-left: 4px solid #e95d24;">
            <p style="margin-top: 0; font-weight: bold; color: #3d2b1f; font-size: 14px;">📝 Message / Sacred Intentions:</p>
            <p style="margin-bottom: 0; font-style: italic; color: #4a4a4a;">"${message || "Interested in learning more about this ritual."}"</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 25px;">
          <p style="font-size: 11px; color: #888; margin-bottom: 5px;">
            This enquiry was generated via <strong>maauniquedham.com</strong>
          </p>
          <p style="font-size: 10px; color: #aaa;">
            ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' })}
          </p>
        </div>
      </div>
    `;

    // Decide whether to use Mailtrap or Resend
    // If we are on localhost OR if Mailtrap credentials are provided, use Mailtrap
    if (process.env.NODE_ENV === 'development' || (process.env.MAILTRAP_USER && !process.env.RESEND_API_KEY)) {
      await transporter.sendMail({
        from: '"Maa Unique Dham" <enquiry@maauniquedham.com>',
        to: "maauniquedham@gmail.com",
        subject: `🚩 [Local] ${source || 'Enquiry'}: ${name}`,
        html: emailHtml,
      });
      return NextResponse.json({ success: true, provider: 'mailtrap' });
    } else {
      // Use Resend for production
      const { data: resendData, error } = await resend.emails.send({
        from: 'Maa Unique Dham Website <onboarding@resend.dev>',
        to: ['maauniquedham@gmail.com'],
        subject: `✨ ${source || 'Enquiry'}: ${name}`,
        html: emailHtml,
      });
      if (error) throw error;
      return NextResponse.json({ success: true, provider: 'resend', data: resendData });
    }

  } catch (error: any) {
    console.error("Email API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
