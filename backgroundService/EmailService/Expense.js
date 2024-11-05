const dotenv = require("dotenv");
const sendMail = require("../helpers/SendMail");
const Expense = require("../models/Expense");
dotenv.config();
const WarningStatus = require("../models/WarningStatus"); 

const expenseEmail = async () => {
  try {
    const expenses = await Expense.find({});
    const totalExpense = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    let warningStatus = await WarningStatus.findOne() || await WarningStatus.create({
      lastWarningTimeStamp: null,
      isWarningActive: false
    });
    if (totalExpense > 10000 && !warningStatus.isWarningActive) {
      let messageoption = {
        from: process.env.EMAIL,
        to: process.env.ADMIN_EMAIL,
        subject: "Warning",
        text: `Your total expense is Rs ${totalExpense.toFixed(2)}. Please review your expenses.`
      };

      await sendMail(messageoption);
      warningStatus.lastWarningTimeStamp = new Date();
      warningStatus.isWarningActive = true;
      await warningStatus.save();
    }
    else if (totalExpense < 10000 && warningStatus.isWarningActive) {
      warningStatus.lastWarningTimeStamp = null;
      warningStatus.isWarningActive = false;
      await warningStatus.save();
    }
  } catch (error) {
    console.error('Error in expenseEmail:', error);
  }
};

module.exports = {
  expenseEmail,
};