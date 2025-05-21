## Getting Started

# Installing packages:

```bash
npm install
```

# Create an .env file and add backend url
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

Run the application:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

User Interface Overview:
The screen displays four interactive buttons with a results panel below, each serving the following functions:

Single Create Button – Initiates a single create request.

Single Read Button – Retrieves the current status with a single read request.

Bulk Create Button – Executes over 1,000 create requests in bulk.

Bulk Read Button – Fetches the current status for multiple entries with over 1,000 read requests.

The results panel displays the output of each operation.
