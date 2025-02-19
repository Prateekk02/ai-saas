# Content Catalyst

## Overview
**Content Catalyst** is a Next.js-based platform designed to integrate **video processing and AI-powered transformations** to enhance digital content workflows. The application supports **user authentication, media storage, AI-driven transformations, and automated processing.**

## Tech Stack
- **Frontend & Backend:** Next.js, TypeScript
- **Authentication:** Clerk
- **Database:** PostgreSQL, Prisma
- **Media Storage:** Cloudinary
- **AI Processing:** FalAI
- **UI Components:** DaisyUI

## Features
### 🔹 User Authentication
- Secure and seamless authentication using **Clerk**
- User management with JWT-based session handling

### 🔹 Media Management
- Video and image storage using **Cloudinary**
- Optimized media delivery with Cloudinary’s fetch upload feature

### 🔹 AI-Powered Transformations
- Video and image processing using **FalAI**
- Asynchronous media transformation with webhook callbacks

### 🔹 Scalability & Security
- Optimized performance for production-ready deployments
- Secure environment variable management and error handling

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (v18+ recommended)
- PostgreSQL database
- Cloudinary account
- Clerk account

### Clone the Repository
```sh
 git clone https://github.com/your-username/content-catalyst.git
 cd content-catalyst
```

### Install Dependencies
```sh
npm install
```

### Configure Environment Variables
Create a `.env.local` file and add the required credentials:
```
DATABASE_URL=your_postgresql_url
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
CLERK_API_KEY=your_clerk_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FALAI_API_KEY=your_falai_api_key
```

### Run the Development Server
```sh
npm run dev
```
The application will be available at **http://localhost:3000**.

## Deployment
The project can be easily deployed on **Vercel**:
1. Push the repository to GitHub.
2. Connect the repository to Vercel.
3. Set up environment variables in the Vercel dashboard.
4. Deploy the project with a single click.

## Future Scope
- Enable **image cropping for social media posts** (Facebook, Twitter, etc.).
- Develop a **centralized post creator** for automated publishing on multiple platforms (Twitter, LinkedIn, etc.).

## Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

## License
This project is licensed under the **MIT License**.

