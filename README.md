## Introduction

This is a simple Todo application built with Next.js, leveraging SWR for data fetching, Neon PostgreSQL for database management, and Drizzle ORM for database interaction. It allows users to create, update, and delete todo items.

## Features

- Add new todos
- Toggle completion status of todos
- Delete todos
- Optimistic UI updates with SWR

### Step 1: Clone the Repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/todo-app.git
```

### Step 2: Install Dependencies

Install the necessary dependencies by running the following commands:

```bash
cd todo-app
npm install
```

### Step 3: Set Up Environment Variables

Set up environment variables by creating a `.env` file in the root of your project and copying the contents from the `env.example` file. Make sure to fill in the actual values for the database URL and Clerk credentials.

### Step 4: Run the Application

Start the development server using the following command:

```bash
npm run dev
```

## Usage

- Add a new todo by entering the task in the input field and clicking the "Create" button or pressing Enter.
- Toggle the completion status of a todo by clicking the checkbox next to it.
- Delete a todo by clicking the trash icon.

## Technologies Used

- Next.js
- SWR
- Neon PostgreSQL
- Drizzle ORM

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements!