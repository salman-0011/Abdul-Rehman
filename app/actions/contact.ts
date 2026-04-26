"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Basic validation
    if (!name || !email || !subject || !message) {
      return { success: false, error: "All fields are required" }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { success: false, error: "Invalid email address" }
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // You'll update this with your domain
      to: ["abdul.rehman@example.com"], // Abdul Rehman's email
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Portfolio Contact</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 20px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #667eea; border-radius: 4px;">
              <h3 style="margin: 0 0 10px 0; color: #333; font-size: 18px;">Contact Details</h3>
              <p style="margin: 5px 0; color: #666;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0; color: #666;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0; color: #666;"><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #333; font-size: 18px; margin-bottom: 10px;">Message</h3>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef;">
                <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                This message was sent from your portfolio contact form
              </p>
              <p style="color: #666; font-size: 12px; margin: 10px 0 0 0;">
                Sent on ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      `,
      // Plain text version for email clients that don't support HTML
      text: `
New Portfolio Contact

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Sent on ${new Date().toLocaleString()}
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return { success: false, error: "Failed to send email" }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Server action error:", error)
    return { success: false, error: "Server error occurred" }
  }
}
