const axios = require('axios');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

// Email Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service (e.g., Gmail, Outlook, etc.)
  auth: {
    user: 'rehannetwork000@gmail.com', // Replace with your email
    pass: 'REHAN786cric4you@', // Replace with your email password
  },
});

// Function to check services and send email
const checkAndSendEmail = async () => {
  try {
    // Fetch service records from the API
    const response = await axios.get(
      'http://localhost:4000/api/maintenance-services/674968935ce5d5ad126c0b1d'
    );

    const records = response.data.data;

    // Find the most recent service record
    const recentService = records.reduce((latest, record) =>
      new Date(record.date) > new Date(latest.date) ? record : latest
    );

    const { userId, description, date, nextServiceDue } = recentService;

    const currentDate = new Date();
    const serviceDueDate = new Date(nextServiceDue);

    // Check if the current date is close to or after the next service due date
    if (currentDate >= serviceDueDate) {
      // Compose the email
      const mailOptions = {
        from: 'rehannetwork000@gmail.com',
        to: userId.email, // User's email from the record
        subject: 'Car Maintenance Reminder',
        text: `Dear ${userId.name},\n\nWe hope you're doing well! This is a reminder to schedule your car service. Your last service was on ${new Date(
          date
        ).toLocaleDateString()} (${description}).\n\nPlease schedule your next service at your earliest convenience.\n\nThank you,\nCar Service Team`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);
      console.log(`Reminder email sent to ${userId.email}`);
    } else {
      console.log('No service reminder needed today.');
    }
  } catch (error) {
    console.error('Error checking service records or sending email:', error.message);
  }
};

// Schedule the task to run every day at 9:00 AM
cron.schedule('0 9 * * *', checkAndSendEmail);

console.log('Service reminder task scheduled.');
