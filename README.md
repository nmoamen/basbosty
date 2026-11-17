# A Little World Made Just For You — بسبوستي

موقع عيد ميلاد رومانسي بالعربي (RTL) — React + Framer Motion + Lucide.

## التعديل
كل المحتوى في **`src/config.js`**: الاسم، تاريخ البداية (للعدّاد الحي)، الذكريات، الأسباب، الجواب، رسالة المفاجأة.
- `birthday.surpriseMode`: `"always"` (مفتوحة دايمًا) أو `"onBirthday"` (الهدية تتفتح يوم ١٩ نوفمبر بس).
- `birthday.turningAge`: رقم العمر — حطّ `null` لو مش عايزه يظهر.
- تواريخ سنين التايم لاين بتتحسب أوتوماتيك من `startDate`.

## التشغيل
```bash
npm install
npm run dev            # http://localhost:5173
npm run dev -- --host  # للتجربة على الموبايل
```

## النشر (مجاني)
```bash
npm run build          # بيطلّع فولدر dist
```
- **Netlify:** اسحب فولدر `dist` على app.netlify.com/drop
- **Vercel:** `npx vercel`
- **GitHub Pages / Cloudflare Pages:** انشر فولدر `dist`


## الموسيقى
يوجد مشغل موسيقى عائم مع ملف MP3 مرفق داخل `public/music/`. المقطوعة ترتيب بيانو رومانسي أصلي للموقع، مدتها حوالي دقيقة و49 ثانية، وتعمل بتكرار هادئ. لا تبدأ إلا بعد ضغط الزائرة على زر التشغيل، ويمكن إيقافها وتغيير مستوى الصوت.

ملف الصوت رُندر باستخدام عيّنة البيانو TimGM6mb SoundFont (مرخّص GPL-2.0)؛ ملف الـSoundFont نفسه غير مضمن في المشروع، والمضمن هو التسجيل الصوتي النهائي فقط.

## النشر على Vercel
- ارفع المشروع إلى GitHub بعد تنفيذ `npm install` و `npm run build` محليًا.
- في Vercel اختر Import Project ثم مستودع GitHub.
- Framework Preset: Vite، وBuild Command: `npm run build`، وOutput Directory: `dist`.

### Music behavior
The romantic piano track starts automatically when the visitor clicks the opening **"افتح الهدية"** button. This is intentional: the click is a user gesture accepted by modern browsers for audio playback. The floating music control remains available to pause/resume and adjust volume.
