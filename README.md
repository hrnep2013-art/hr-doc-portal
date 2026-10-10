# hr-doc-portal
ระบบขอเอกสาร กลุ่มบริหารทรัพยากรบุคคล — หน้าเว็บ static (Vercel) + Google Apps Script เป็น API
- `index.html` หน้าผู้ขอ (ไม่ต้องล็อกอิน, ติ๊กรับทราบ PDPA + รับรองเอกสารตนเอง) · `privacy.html` ประกาศความเป็นส่วนตัว (ร่าง ต้องเติมช่องไฮไลต์)
- `admin.html` หลังบ้าน (ล็อกอินชื่อผู้ใช้/รหัสผ่าน) · `common.js` ตั้งค่า API_URL · `style.css` ธีม
- ไม่ใช้ LINE / ไม่ส่ง PDF อัตโนมัติ: เจ้าหน้าที่ส่งอีเมลเองจากใบงานในหลังบ้าน
- Deploy: Vercel → Framework Preset = Other
