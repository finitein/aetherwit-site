-- ============================================
-- Aetherwit Site - Supabase Database Setup
-- 在新项目的 SQL Editor 中执行此脚本
-- ============================================

-- ─── 1. profiles 表 ───
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT,
  resident_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ─── 2. beta_signups 表 ───
CREATE TABLE IF NOT EXISTS beta_signups (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE beta_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert beta_signups" ON beta_signups
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated can read beta_signups" ON beta_signups
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "No delete beta_signups" ON beta_signups
  FOR DELETE USING (false);

-- ─── 3. contact_messages 表 ───
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert contact_messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated can read contact_messages" ON contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "No delete contact_messages" ON contact_messages
  FOR DELETE USING (false);
