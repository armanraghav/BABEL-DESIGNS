-- Run this in Supabase SQL Editor

create extension if not exists "pgcrypto";

create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  tagline text not null,
  description text not null,
  hero_image_url text,
  sort_order integer default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  collection_id uuid not null references public.collections(id) on delete cascade,
  slug text not null unique,
  name text not null,
  price numeric(12,2) not null check (price >= 0),
  description text not null,
  philosophy text not null,
  materials text[] not null default '{}',
  dimensions text not null,
  image_url text,
  gallery text[] default '{}',
  sort_order integer default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.consultancy_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  project_type text,
  timeline text,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  email text,
  notes text,
  status text not null default 'inquiry',
  currency text not null default 'USD',
  total_amount numeric(12,2) not null check (total_amount >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null,
  product_name text not null,
  unit_price numeric(12,2) not null check (unit_price >= 0),
  quantity integer not null check (quantity > 0),
  material text,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.studio_dispatch_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

create index if not exists idx_collections_slug on public.collections(slug);
create index if not exists idx_products_collection_id on public.products(collection_id);
create index if not exists idx_products_active on public.products(active);
create index if not exists idx_orders_created_at on public.orders(created_at desc);
create index if not exists idx_consultancy_created_at on public.consultancy_requests(created_at desc);
create index if not exists idx_studio_dispatch_email on public.studio_dispatch_subscribers(email);

alter table public.collections enable row level security;
alter table public.products enable row level security;
alter table public.consultancy_requests enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.studio_dispatch_subscribers enable row level security;

drop policy if exists "Public read collections" on public.collections;
create policy "Public read collections"
  on public.collections for select
  using (true);

drop policy if exists "Public read active products" on public.products;
create policy "Public read active products"
  on public.products for select
  using (active = true);

drop policy if exists "Public insert consultancy" on public.consultancy_requests;
create policy "Public insert consultancy"
  on public.consultancy_requests for insert
  with check (true);

drop policy if exists "Public insert orders" on public.orders;
create policy "Public insert orders"
  on public.orders for insert
  with check (true);

drop policy if exists "Public insert order items" on public.order_items;
create policy "Public insert order items"
  on public.order_items for insert
  with check (true);

drop policy if exists "Public insert studio dispatch subscribers" on public.studio_dispatch_subscribers;
create policy "Public insert studio dispatch subscribers"
  on public.studio_dispatch_subscribers for insert
  with check (true);
