export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Sadece POST kullanılabilir." });
  }

  try {
    const { isim, soyisim, gmail, telefon, instagram } = req.body;

    if (!isim || !soyisim || !gmail || !telefon || !instagram) {
      return res.status(400).json({ error: "Tüm alanları doldurun." });
    }

    const response = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/basvurular`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": process.env.SUPABASE_PUBLISHABLE_KEY,
          "Authorization": `Bearer ${process.env.SUPABASE_PUBLISHABLE_KEY}`,
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({
          isim,
          soyisim,
          gmail,
          telefon,
          instagram
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error(error);

      return res.status(500).json({
        error: "Başvuru kaydedilemedi."
      });
    }

    return res.status(200).json({
      success: true
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Sunucu hatası."
    });
  }
}
