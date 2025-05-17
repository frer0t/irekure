# irekure

A platform for citizen feedback and government response tracking.

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **UI Components**: Custom components with Radix UI primitives

## Supabase Integration

This project uses Supabase for database, authentication, and storage
capabilities.

### Setup

1. Create a Supabase project at [https://supabase.com](https://supabase.com)
2. Copy your Supabase URL and anon key from the project API settings
3. Add them to your `.env` file:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Authentication

The project includes ready-to-use authentication:

- Server-side auth in `/app/auth-example/page.tsx`
- Client-side auth in `/app/auth-client-example/page.tsx`

### Database Operations

Example of database operations can be found in `/app/db-example/page.tsx`.

To create tables in your Supabase database:

1. Go to the SQL Editor in your Supabase dashboard
2. Create your tables using SQL, for example:

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows authenticated users to read all profiles
CREATE POLICY "Allow all authenticated users to read profiles" ON profiles
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create a policy that allows users to update their own profiles
CREATE POLICY "Allow users to update their own profiles" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

### Usage in Components

#### Server Components

```tsx
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function Page() {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase.from("your_table").select();

  return <div>{/* Your component using the data */}</div>;
}
```

#### Client Components

```tsx
"use client";

import { useSupabase } from "@/providers/SupabaseProvider";
import { useEffect, useState } from "react";

export default function ClientComponent() {
  const { supabase } = useSupabase();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from("your_table").select();
      setData(data);
    }

    fetchData();
  }, [supabase]);

  return <div>{/* Your component using the data */}</div>;
}
```

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Deployment

The application is ready to deploy on Vercel or any platform supporting Next.js
applications.
