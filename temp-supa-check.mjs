import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const raw = fs.readFileSync('.env', 'utf8').replace(/^\uFEFF/, '');
const map = Object.fromEntries(raw.split(/\r?\n/).filter(Boolean).map((l) => { const i = l.indexOf('='); return [l.slice(0,i), l.slice(i+1)]; }));
const url = map.VITE_SUPABASE_URL;
const key = map.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(url, key, { auth: { persistSession: false } });
const { data, error } = await supabase.from('collections').select('id,slug,name').limit(1);
console.log({ url, keyPrefix: key?.slice(0, 18), error, data });
