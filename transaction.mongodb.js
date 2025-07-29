const session = db.getMongo().startSession();

session.startTransaction();

try {
  const bankDB = session.getDatabase("bank");

  // 1. Debit sender
  bankDB.accounts.updateOne(
    { accountNumber: "123" },
    { $inc: { balance: -500 } }
  );

  // 2. Credit receiver
  bankDB.accounts.updateOne(
    { accountNumber: "456" },
    { $inc: { balance: 500 } }
  );

  // 3. Log transaction
  bankDB.transactions.insertOne({
    from: "123",
    to: "456",
    amount: 500,
    timestamp: new Date()
  });

  session.commitTransaction();
  print("✅ Transaction committed successfully.");
} catch (err) {
  session.abortTransaction();
  print("❌ Transaction aborted due to error:", err.message);
}
