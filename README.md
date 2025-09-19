# Distance Matrix Next App

This project is a Next.js application that utilizes the Google Distance Matrix API to calculate commuting times from a single origin to a list of destinations. 

## Features

- User-friendly form for inputting origin and destinations.
- Real-time calculation of commute times using the Google Distance Matrix API.
- API route for handling commute requests.

## Project Structure

```
distance-matrix-next-app
├── src
│   ├── pages
│   │   ├── index.tsx          # Main entry point for the application
│   │   └── api
│   │       └── commute.ts     # API route for handling commute requests
│   ├── components
│   │   └── CommuteForm.tsx    # React component for the commute form
│   ├── services
│   │   └── distanceMatrixService.ts # Service for interacting with the Distance Matrix API
│   └── types
│       └── index.ts           # TypeScript interfaces and types
├── public                      # Public assets
├── package.json                # NPM configuration file
├── tsconfig.json              # TypeScript configuration file
└── README.md                   # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd distance-matrix-next-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Set up your Google Distance Matrix API key. You can do this by creating a `.env.local` file in the root of the project and adding your API key:
   ```
   GOOGLE_DISTANCE_MATRIX_API_KEY=your_api_key_here
   ```

5. Run the development server:
   ```
   npm run dev
   ```

6. Open your browser and go to `http://localhost:3000` to view the application.

## Usage

- Enter your origin and a list of destinations in the form provided.
- Submit the form to see the calculated commute times.

## License

This project is licensed under the MIT License.