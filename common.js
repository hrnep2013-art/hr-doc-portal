// ===== ตั้งค่า =====
const CONFIG = {
  API_URL: 'https://script.google.com/macros/s/AKfycbx4gWfPTDPlKd9B0kdGBsnZN_GVxalWvI2OFn3BriTe5rHj8t_ICF9_kJiUAcALlFaK/exec',
};

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const STATUS_TH = { Pending: 'รอเจ้าหน้าที่ตรวจสอบ', WaitDirector: 'รอ ผอ. อนุมัติ', Approved: 'อนุมัติแล้ว รอส่งเอกสาร', Sent: 'ส่งเอกสารแล้ว', Rejected: 'ไม่อนุมัติ' };
const badge = (s) => `<span class="badge b-${esc(s)}">${esc(STATUS_TH[s] || s)}</span>`;

// ส่งเป็น text/plain เพื่อเลี่ยง CORS preflight ของ Apps Script (หน้าหลังบ้านแนบ session อัตโนมัติ)
async function api(action, payload = {}) {
  const session = sessionStorage.getItem('hr_sess') || undefined;
  const res = await fetch(CONFIG.API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, session, payload }),
  });
  const text = await res.text();
  let r;
  try { r = JSON.parse(text); }
  catch (e) { throw new Error('เซิร์ฟเวอร์ตอบกลับผิดรูปแบบ (Apps Script ยังไม่ได้ Deploy เวอร์ชันล่าสุด หรือยังไม่ได้อนุญาตสิทธิ์) — เปิดลิงก์ API_URL ในเบราว์เซอร์เพื่อตรวจระบบ'); }
  if (!r.ok) {
    if (r.error === 'SESSION_EXPIRED') { sessionStorage.removeItem('hr_sess'); location.reload(); throw new Error('เซสชันหมดอายุ'); }
    throw new Error(r.error);
  }
  return r.data;
}

const toB64 = (f) => new Promise((ok, no) => {
  const r = new FileReader();
  r.onload = () => ok(r.result.split(',')[1]);
  r.onerror = no;
  r.readAsDataURL(f);
});
