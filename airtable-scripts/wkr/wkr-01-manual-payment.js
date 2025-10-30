const inputConfig = input.config();
console.log(inputConfig);

const table = base.getTable("Manual Payments");
let queryResult = await table.selectRecordAsync(inputConfig.recordId, { 
    fields: ["ID", "Email", "First Name", "Last Name", "Mobile Number", "Membership", "Created Time"]
});

const payor = {
    "airtableRecordId": inputConfig.recordId,
    "manualPaymentTableId": queryResult?.getCellValue("ID"),
    "email": queryResult?.getCellValue("Email")?.trim(),
    "firstName": queryResult?.getCellValue("First Name"),
    "lastName": queryResult?.getCellValue("Last Name"),
    "mobileNumber": queryResult?.getCellValue("Mobile Number"),
    "membership": queryResult?.getCellValue("Membership").name,
    "createdTime": queryResult?.getCellValue("Created Time")
};

console.log(payor);

try {
    // Manual Payments: 02 Send Email Confirmation (make.com)
    let response = await fetch('<INSERT WEBHOOK URL>', {
        method: 'POST',
        body: JSON.stringify(payor),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log(response.status);
} catch (error) {
    console.error(error, Date.now());
}