-- Chạy đoạn SQL này trong Supabase -> SQL Editor nếu bạn muốn đồng bộ dữ liệu cho cả lớp 12A2
create table if not exists public.wishes (
  id text primary key,
  teacher_name text not null,
  sender_name text not null,
  category text not null default 'chu-nhiem',
  theme_id text not null default 'chalkboard',
  message text not null,
  likes integer not null default 0,
  date_label text not null default '20/11',
  created_at timestamptz not null default now()
);

create table if not exists public.letter_stats (
  id text primary key,
  hearts integer not null default 122
);

insert into public.letter_stats (id, hearts)
values ('letter-12a2', 122)
on conflict (id) do nothing;

-- Cho phép mọi người đọc, thêm lời chúc và thả tim công khai
alter table public.wishes enable row level security;
alter table public.letter_stats enable row level security;

create policy "Public read wishes" on public.wishes for select using (true);
create policy "Public insert wishes" on public.wishes for insert with check (true);
create policy "Public update wishes" on public.wishes for update using (true);

create policy "Public read letter_stats" on public.letter_stats for select using (true);
create policy "Public update letter_stats" on public.letter_stats for update using (true);
