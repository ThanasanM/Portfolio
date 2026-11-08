const SUPABASE_URL = 'https://hmdsarozcfjyggzmzerl.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_BHVlz-YQnX6Ahe4kB4Bj1g_ShT-iBK0';
 
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
 
// ดึงทุกแถวของตาราง เรียงใหม่ → เก่า (ถ้าตารางไม่มีคอลัมน์ที่ใช้เรียง จะดึงแบบปกติแทน)
async function fetchAll(table, orderBy = 'created_at') {
    let res = orderBy
        ? await sb.from(table).select('*').order(orderBy, { ascending: false })
        : await sb.from(table).select('*');
 
    if (res.error && orderBy) res = await sb.from(table).select('*');
    if (res.error) console.error(`Error fetching ${table}:`, res.error.message);
    return res.data || [];
}
 
async function fetchProfile() {
    const { data, error } = await sb.from('profile').select('*').eq('id', 1).single();
    if (error) console.error('Error fetching profile:', error.message);
    return data;
}
 