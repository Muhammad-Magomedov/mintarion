import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendConfirmationEmail = async (email: string, code: string, params: {
    subject?: string;
    html?: string;
} = {
    subject: 'Confirmation code',
}) => {
  try {
    const { subject, html } = params;

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: subject ?? 'Confirmation code',
      html: html ?? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Confirm your email address</h2>
          <p>Your confirmation code:</p>
          <div style="font-size: 32px; font-weight: bold; color: #4F46E5; text-align: center; padding: 20px; border: 2px dashed #4F46E5; margin: 20px 0;">
            ${code}
          </div>
          <p>The code is valid for 15 minutes</p>
          <p>If you have not registered on our website, simply ignore this email.</p>
        </div>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error('Failed to send email');
    }

    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};