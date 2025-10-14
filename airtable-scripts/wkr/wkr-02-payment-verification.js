const inputConfig = input.config();
console.log(inputConfig);

const table = base.getTable("Manual Payments");
let queryResult = await table.selectRecordAsync(inputConfig.recordId, { 
    fields: ["ID", "Email", "First Name", "Last Name", "Mobile Number",
            "Membership", "Payment Verified?", "Verified Date", "Last Modified Time",
            "Mode of Payment"]
});

const payor = {
    "airtableRecordId": inputConfig.recordId,
    "manualPaymentTableId": queryResult?.getCellValue("ID"),
    "email": queryResult?.getCellValue("Email"),
    "firstName": queryResult?.getCellValue("First Name"),
    "lastName": queryResult?.getCellValue("Last Name"),
    "mobileNumber": queryResult?.getCellValue("Mobile Number"),
    "membership": queryResult?.getCellValue("Membership").name,
    "paymentVerificationStatus": queryResult?.getCellValue("Payment Verified?").name,
    "reviewDate": queryResult?.getCellValue("Verified Date"),
    "lastUpdatedTime": queryResult?.getCellValue("Last Modified Time"),
    "modeOfPayment": queryResult?.getCellValue("Mode of Payment").name
};

console.log(payor);

try {
    // Manual Payments: 03 Payment Verification Process
    let response = await fetch('https://hook.us2.make.com/kvpeg3p68dtpnud3rixapd6x235ocdqn', {
        method: 'POST',
        body: JSON.stringify(payor),
        headers: {
            'Content-Type': 'application/json',
            'x-make-apikey': input.secret("AirTable to Make API Key")
        },
    });
    console.log(response.status);
} catch (error) {
    console.error(error, Date.now());
}