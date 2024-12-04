"use server"

import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const createHtmlTemplate = (email: string, content: string) => `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liên hệ từ khách hàng</title>
</head>
<body class="bg-[hsl(var(--background))]">
    <div class="container my-8">
        <div class="card p-6">
            <h1 class="text-2xl font-bold text-[hsl(var(--foreground))] mb-4">Liên hệ mới từ khách hàng</h1>
            <p class="text-[hsl(var(--muted-foreground))] mb-4">Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi sớm nhất có thể trong 48 giờ 🥰.</p>
            <div class="bg-[hsl(var(--muted))] p-4 rounded-md">
                <h2 class="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">Thông tin liên hệ:</h2>
                <p class="text-[hsl(var(--muted-foreground))]"><strong>Email:</strong> ${email}</p>
                <p class="text-[hsl(var(--muted-foreground))] mt-2"><strong>Nội dung:</strong> ${content}</p>
            </div>
        </div>
    </div>
</body>
</html>
`;

export const sendEmail = async (
  email: string, 
  content: string,
  attachments?: {
    filename: string;
    content: string; // Changed from Buffer to string - will receive base64 string
    contentType: string;
  }[]
): Promise<boolean> => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD,
        },
    });

    const mailOptions: Mail.Options = {
        from: process.env.MY_EMAIL,
        to: [process.env.MY_EMAIL as string, email],
        subject: `Liên hệ từ ${process.env.MY_EMAIL}`,
        html: createHtmlTemplate(email, content),
        attachments: attachments?.map(attachment => ({
            filename: attachment.filename,
            content: Buffer.from(attachment.content, 'base64'),
            contentType: attachment.contentType
        }))
    };

    const sendMailPromise = () =>
        new Promise<string>((resolve, reject) => {
            transport.sendMail(mailOptions, function (err) {
                if (!err) {
                    resolve('Email sent');
                } else {
                    reject(err.message);
                }
            });
        });

    try {
        await sendMailPromise();
        return true;
    } catch (err) {
        console.error('Error sending email:', err);
        return false;
    }
}
