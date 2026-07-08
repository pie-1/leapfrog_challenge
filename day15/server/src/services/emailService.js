const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    this.from = process.env.EMAIL_FROM || 'CollegeBuddy <noreply@collegebuddy.com>';
  }

  async sendEmail(to, subject, html, text = '') {
    try {
      const mailOptions = {
        from: this.from,
        to,
        subject,
        html,
        text: text || html.replace(/<[^>]*>/g, '')
      };

      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent to ${to}: ${info.messageId}`);
      return info;
    } catch (error) {
      logger.error(`Email sending failed to ${to}:`, error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  async sendVerificationEmail(email, name, token) {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #090933; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #d3d3ff, #9d9dcc); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9ff; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #575799; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #9d9dcc; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="color: #090933; margin: 0;">🎓 CollegeBuddy</h1>
              <p style="color: #575799; margin: 5px 0 0;">Welcome to the community!</p>
            </div>
            <div class="content">
              <h2>Hello ${name}!</h2>
              <p>Thank you for joining CollegeBuddy. Please verify your email address to get started.</p>
              <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">Verify Email Address</a>
              </div>
              <p>Or copy and paste this link in your browser:</p>
              <p style="background: #f0f0ff; padding: 10px; border-radius: 5px; word-break: break-all;">${verificationUrl}</p>
              <p>This link will expire in 24 hours.</p>
              <p>If you didn't create an account with CollegeBuddy, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} CollegeBuddy. All rights reserved.</p>
              <p>Building a better college community together.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail(email, 'Verify Your CollegeBuddy Account', html);
  }

  async sendPasswordResetEmail(email, name, token) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #090933; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #d3d3ff, #9d9dcc); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9ff; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #575799; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #9d9dcc; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="color: #090933; margin: 0;">🔐 Password Reset</h1>
            </div>
            <div class="content">
              <h2>Hi ${name}!</h2>
              <p>We received a request to reset your CollegeBuddy password.</p>
              <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset Password</a>
              </div>
              <p>Or copy and paste this link in your browser:</p>
              <p style="background: #f0f0ff; padding: 10px; border-radius: 5px; word-break: break-all;">${resetUrl}</p>
              <p>This link will expire in 1 hour.</p>
              <p>If you didn't request this, please ignore this email or contact support.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} CollegeBuddy. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail(email, 'Reset Your CollegeBuddy Password', html);
  }

  async sendBorrowRequestEmail(owner, borrower, item, request) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #090933; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #d3d3ff, #9d9dcc); padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9ff; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 20px; color: #9d9dcc; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="color: #090933; margin: 0;">📚 New Borrow Request</h2>
            </div>
            <div class="content">
              <p><strong>${borrower.name}</strong> wants to borrow your item.</p>
              <div style="background: #f0f0ff; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <p><strong>Item:</strong> ${item.title}</p>
                <p><strong>Expected Return:</strong> ${new Date(request.expected_return_date).toLocaleDateString()}</p>
                ${request.notes ? `<p><strong>Note:</strong> ${request.notes}</p>` : ''}
              </div>
              <div style="text-align: center;">
                <a href="${process.env.FRONTEND_URL}/dashboard/lending" style="display: inline-block; background: #575799; color: white; padding: 10px 25px; text-decoration: none; border-radius: 5px; margin: 5px;">View Request</a>
              </div>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} CollegeBuddy</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail(owner.email, 'New Borrow Request - CollegeBuddy', html);
  }
}

module.exports = new EmailService();