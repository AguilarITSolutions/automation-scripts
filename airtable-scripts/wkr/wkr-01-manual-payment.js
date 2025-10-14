// Manual Payments: 01 Send Data to Make.com if Member
const inputConfig = input.config();
console.log(inputConfig);

const table = base.getTable("Manual Payments");
let queryResult = await table.selectRecordAsync(inputConfig.recordId, { 
    fields: ["ID", "Email", "First Name", "Last Name", "Mobile Number", "Mode of Payment", "Membership", "Created Time"]
});

const payor = {
    "airtableRecordId": inputConfig.recordId,
    "manualPaymentTableId": queryResult?.getCellValue("ID"),
    "email": queryResult?.getCellValue("Email"),
    "firstName": queryResult?.getCellValue("First Name"),
    "lastName": queryResult?.getCellValue("Last Name"),
    "mobileNumber": queryResult?.getCellValue("Mobile Number"),
    "membership": queryResult?.getCellValue("Membership").name,
    "createdTime": queryResult?.getCellValue("Created Time"),
    "modeOfPayment": queryResult?.getCellValue("Mode of Payment").name
};

console.log(payor);

try {
    // Manual Payments: 02 Send Email Confirmation (make.com)
    let response = await fetch('', {
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