### Built With

This App has been created with.

-   [React](https://es.reactjs.org/)
-   [Next.js](https://nextjs.org/)
-   [TailwindCSS](https://tailwindcss.com/)
-   [React Hook Form](https://react-hook-form.com/)
-   [React Tostify](https://fkhadra.github.io/react-toastify/introduction)
-   [ApexCharts](https://apexcharts.com/)
-   [Prisma](https://www.prisma.io/)
-   [SWR](https://swr.vercel.app/es-ES)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

You need to have Node.js installed

-   [Node.js](https://nodejs.org/es/)
-   [Typescript](https://www.typescriptlang.org/)

### Installation

1. Clone the repo
    ```sh
    https://github.com/
    ```
2. Install packages
    ```sh
    npm install
    ```
3. Run prisma seed to generate data
    ```sh
    npx prisma db seed
    ```
4. Create a .env file and enter the required data

    ```sh
    DATABASE_URL=XXXXXX
    GOOGLE_CLIENT_ID=XXXXXXX
    GOOGLE_CLIENT_SECRET=XXXXXXX
    NEXTAUTH_URL=XXXXX
    SECRET=XXXXXX

    ```

5. Run dev server

    ```sh
    npm run dev
    ```

6. Run the production build
    ```sh
    npm run build
    ```
