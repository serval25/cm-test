export const requestsMock: any = [
	{
		name: "Budgeting 2023",
		inputs: [
		  "Employee salaries 2022",
		  "Demographics data",
		  "Benefits numbers 2022"
		],
		results: "New dataset",
		requestorId: "0",
		submittedTimestampUs: "1667912875000000",
		comment: [],
		status: "PENDING"
	},
	{
		name: "Salary distribution October",
		inputs: [
		"Engineers salaries June",
		"Managers salaries June",
		"Demographics data"
		],
		results: "New dataset",
		requestorId: "1",
		submittedTimestampUs: "1667932874000000",
		comment: [],
		status: "PENDING"
	},
	{
		"name": "Total insurance cost Q3",
		"inputs": [
		  "Insurance data July",
		  "Insurance data August",
		  "Insurance data September",
		  "Insurance data October",
		  "Managers salaries June",
		  "Demographics data"
		],
		"results": "Plaintext",
		"requestorId": "0",
		"submittedTimestampUs": "1668032772000000",
		"comment": [
		  "Looks good to me!"
		],
		"status": "APPROVED"
	},
	{
		"name": "Salary distribution Q4",
		"inputs": [
		  "Salary distribution October",
		  "Salary distribution November",
		  "Salary distribution December"
		],
		"results": "New dataset",
		"requestorId": "1",
		"submittedTimestampUs": "1668432183000000",
		"comment": [
		  "Processing request...",
		  "Access denied"
		],
		"status": "REJECTED"
	},
	{
		"name": "Total fun activities",
		"inputs": [
		  "Fun activities in Europe",
		  "Fun activities in the US"
		],
		"results": "Plaintext",
		"requestorId": "01",
		"submittedTimestampUs": "1665432183000000",
		"comment": [
		  "Processing request..."
		],
		"status": "PENDING"
	},
	{
		name: "Total fun activities",
		inputs: [
			"Employee salaries 2022",
			"Employee salaries 2021"
		],
		results: "Plaintext",
		requestorId: "3e5",
		submittedTimestampUs: "1665332183000000",
		comment: [
			"Incorrect request"
		],
		status: "REJECTED"
	}
];