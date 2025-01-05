import axios from 'axios';
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Email Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Email from environment variables
    pass: process.env.EMAIL_PASS, // Email password from environment variables
  },
});

// Function to check services and send email
const checkAndSendEmail = async () => {
  try {
    const response = await axios.get(
      'http://localhost:4000/api/maintenance-services/67593cfc95c8614fa13c9ccb'
    );

    const records = response.data.data;

    // Find the most recent service record
    const recentService = records.reduce((latest, record) =>
      new Date(record.date) > new Date(latest.date) ? record : latest
    );

    const { userId, description, date, nextServiceDue } = recentService;

    const currentDate = new Date();
    const serviceDueDate = new Date(nextServiceDue);

    if (currentDate >= serviceDueDate) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userId.email,
        subject: 'Car Maintenance Reminder',
        text: `Dear ${userId.name},\n\nWe hope you're doing well! This is a reminder to schedule your car service. Your last service was on ${new Date(
          date
        ).toLocaleDateString()} (${description}).\n\nPlease schedule your next service at your earliest convenience.\n\nThank you,\nCar Service Team`,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Reminder email sent to ${userId.email}`);
    } else {
      console.log('No service reminder needed today.');
    }
  } catch (error) {
    console.error('Error checking service records or sending email:', error.message);
  }
};

// Schedule the task
export const scheduleEmailReminders = () => {
  cron.schedule('0 9 * * *', checkAndSendEmail); // Runs every day at 9:00 AM
  console.log('Service reminder task scheduled.');
  checkAndSendEmail();
};

// Call the function to send an email immediately

