# irekure

A platform for citizen feedback and government response tracking in Rwanda.

## About the Project

Irekure is a comprehensive platform designed to bridge communication between
citizens and government institutions in Rwanda. It allows citizens to submit
complaints or feedback and track their progress, while providing government
officials with tools to manage, respond to, and resolve these issues
efficiently.

The interface is primarily in Kinyarwanda to serve the local population.

## Key Features

- **Public-facing Portal**
  - Submit complaints/feedback with file attachments
  - Track complaint status using unique ticket IDs
  - View government responses to complaints
  - Responsive design for mobile and desktop access
- **Admin Dashboard**
  - Overview of submitted complaints with statistics
  - Visualization of data through charts and graphs
  - Complaint management system
  - Status updates and response capabilities
  - User management for government officials

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theming
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage for file uploads
- **UI Components**: Custom components built on Radix UI primitives
- **Data Visualization**: Recharts for dashboard analytics
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation

## Project Structure

- **/app** - Main application pages using Next.js App Router
  - **/submit** - Public complaint submission interface
  - **/track** - Public complaint tracking interface
  - **/dashboard** - Admin interface for managing complaints
  - **/api** - API routes for data operations
- **/components** - Reusable UI components
  - **/common** - Common components like navbar and footer
  - **/landing** - Landing page specific components
  - **/ui** - UI primitives and basic components
- **/lib** - Utility functions and libraries
  - **/supabase** - Supabase client configuration
  - **/axios** - Axios client setup
  - **/zod** - Form validation schemas
- **/types** - TypeScript type definitions
- **/constants** - Application constants

## Supabase Integration

This project uses Supabase for database, authentication, and storage
capabilities.

### Database Schema

The application relies on the following main tables:

- **complaints** - Stores user-submitted complaints with metadata
- **categories** - Categories for classifying complaints
- **answers** - Government responses to complaints
- **organizations** - Government institutions managing complaints
- **profiles** - User profiles with roles

### Setup

1. Create a Supabase project at [https://supabase.com](https://supabase.com)
2. Copy your Supabase URL and anon key from the project API settings
3. Add them to your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_API_URL=your-api-url
```

## Authentication Implementation

Authentication is handled through Supabase Auth with custom middleware to
protect routes:

- Public routes: Home page, submission form, tracking page
- Protected routes: Dashboard and admin interfaces
- Authentication flow uses SSR for secure server-side validation

## File Upload Implementation

The platform supports file uploads for complaints with the following features:

- Multiple file upload support
- File type validation (images, PDFs, DOCs)
- Size limit of 10MB per file
- Files stored in Supabase Storage

## Development

```bash
# Install dependencies
pnpm install

# Start development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Localization

The application interface is primarily in Kinyarwanda with English variable
names to better serve the target audience in Rwanda.
