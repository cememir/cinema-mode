"""Chrome Web Store gorselleri: promo karolari + ekran goruntuleri."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

KOK = "/home/muslu/PycharmProjects/MUSLU/WebCinema"
OUT = f"{KOK}/store/assets"
os.makedirs(OUT, exist_ok=True)

LS = "/usr/share/fonts/truetype/liberation"
def sans(s):  return ImageFont.truetype(f"{LS}/LiberationSans-Regular.ttf", s)
def sansb(s): return ImageFont.truetype(f"{LS}/LiberationSans-Bold.ttf", s)
def mono(s):  return ImageFont.truetype(f"{LS}/LiberationMono-Bold.ttf", s)
def dejavu(s):return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", s)

AMBER   = (240, 180, 92)
DARK    = (12, 10, 8)
INK     = (233, 227, 216)
GRAY    = (150, 148, 142)
PAGE_BG = (247, 245, 241)
BAR     = (203, 198, 188)
BAR_HD  = (140, 134, 124)

RR = lambda d, box, r, **kw: d.rounded_rectangle(box, radius=r, **kw)


# ------------------------------------------------------------------ yardimcilar
def paragraf(d, x, y, w, satirlar, h=16, gap=10, renk=BAR):
    """Gri cubuklardan sahte paragraf cizer, alt y degerini dondurur."""
    for sw in satirlar:
        RR(d, (x, y, x + w * sw, y + h), h // 2, fill=renk)
        y += h + gap
    return y - gap


def delikli_karartma(size, hole, alpha, r=14):
    ov = Image.new("RGBA", size, (6, 5, 4, alpha))
    d = ImageDraw.Draw(ov)
    RR(d, hole, r, fill=(0, 0, 0, 0))
    return ov


def cerceve(img, hole, r=14):
    """Amber isilti + ince cerceve."""
    glow = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(glow)
    RR(d, hole, r, outline=AMBER + (150,), width=8)
    glow = glow.filter(ImageFilter.GaussianBlur(12))
    img.alpha_composite(glow)
    d = ImageDraw.Draw(img)
    RR(d, hole, r, outline=AMBER + (255,), width=3)


def hud_ciz(img, cx, y, secili, ipuclari, butonlar=True):
    """Alt ortadaki kontrol hapini cizer."""
    d = ImageDraw.Draw(img)
    fm, fs, fb = mono(15), sans(15), sansb(15)
    fd = dejavu(15)
    pad, gap, bh = 18, 12, 44

    parcalar = [(secili, fm, AMBER), ("|", fs, (255, 255, 255, 40))]
    for tus, ne in ipuclari:
        parcalar.append((tus, fb, INK))
        if ne:
            parcalar.append((ne, fs, GRAY))

    w = sum(d.textlength(t, font=f) + gap for t, f, _ in parcalar) - gap
    btn_w = (3 * 30 + 2 * 6 + gap) if butonlar else 0
    W = int(w + btn_w + pad * 2)
    x0 = int(cx - W / 2)

    RR(d, (x0, y, x0 + W, y + bh), bh // 2, fill=(20, 18, 15, 225),
       outline=(255, 255, 255, 24), width=1)
    tx = x0 + pad
    for t, f, renk in parcalar:
        d.text((tx, y + bh / 2), t, font=f, fill=renk, anchor="lm")
        tx += d.textlength(t, font=f) + gap
    if butonlar:
        for g in ("↑", "↓", "×"):
            d.ellipse((tx, y + 7, tx + 30, y + 37), fill=(58, 54, 46))
            d.text((tx + 15, y + 21), g, font=fd, fill=INK, anchor="mm")
            tx += 36


def tarayici_ustu(d, W):
    """Sahte tarayici ust cubugu."""
    d.rectangle((0, 0, W, 88), fill=(32, 33, 36))
    RR(d, (16, 10, 250, 44), 10, fill=(50, 52, 56))
    d.ellipse((30, 20, 44, 34), fill=(90, 92, 96))
    RR(d, (58, 22, 220, 33), 5, fill=(90, 92, 96))
    RR(d, (16, 52, W - 16, 80), 14, fill=(50, 52, 56))
    d.ellipse((30, 59, 44, 73), fill=(110, 112, 116))
    d.text((56, 66), "example.com/article", font=sans(14), fill=(160, 162, 166), anchor="lm")


def makale_sayfasi():
    """1280x800 sahte makale; (resim, sahnedeki paragraf kutusu) dondurur."""
    img = Image.new("RGBA", (1280, 800), PAGE_BG + (255,))
    d = ImageDraw.Draw(img)
    tarayici_ustu(d, 1280)

    x, w = 330, 620
    # kenar sutunlari (dikkat dagitici alanlar)
    RR(d, (40, 130, 260, 420), 10, fill=(232, 228, 220))
    paragraf(d, 60, 156, 180, [1, .9, .95, .7, 1, .85, .6], h=12, gap=8)
    RR(d, (1030, 130, 1240, 340), 10, fill=(232, 228, 220))
    paragraf(d, 1050, 156, 170, [1, .8, .9, .6], h=12, gap=8)
    RR(d, (1030, 360, 1240, 560), 10, fill=(226, 220, 208))
    d.text((1135, 460), "REKLAM", font=sansb(16), fill=(170, 162, 148), anchor="mm")

    # baslik + paragraflar
    RR(d, (x, 128, x + 460, 158), 8, fill=BAR_HD)
    RR(d, (x, 170, x + 300, 196), 8, fill=BAR_HD)
    y = paragraf(d, x, 230, w, [1, 1, .97, .62])
    lit_top = y + 30
    y = paragraf(d, x, lit_top, w, [1, .96, 1, .93, .55])
    lit_bot = y
    y = paragraf(d, x, y + 30, w, [1, .94, 1, .58])
    paragraf(d, x, y + 30, w, [1, 1, .9, .96, .48])

    pad = 16
    hole = (x - pad, lit_top - pad, x + w + pad, lit_bot + pad)
    return img, hole


# ------------------------------------------------------------------ 1-2: ekran goruntuleri
def ss_odak():
    img, hole = makale_sayfasi()
    img.alpha_composite(delikli_karartma(img.size, hole, 224))
    cerceve(img, hole)
    hud_ciz(img, 640, 736, "p.article",
            [("W/S", "alan   "), ("Q/E", "ışık   "), ("R", "yeniden seç   "),
             ("C", "ortala   "), ("Esc", "çık")])
    img.convert("RGB").save(f"{OUT}/screenshot-1-focus-1280x800.png")


def ss_secim():
    img, hole = makale_sayfasi()
    img.alpha_composite(delikli_karartma(img.size, hole, 112))
    cerceve(img, hole)
    d = ImageDraw.Draw(img)
    # secim etiketi
    t, f = "p.article", mono(14)
    tw = d.textlength(t, font=f)
    RR(d, (hole[0], hole[1] - 34, hole[0] + tw + 18, hole[1] - 8), 6, fill=AMBER)
    d.text((hole[0] + 9, hole[1] - 21), t, font=f, fill=(23, 19, 12), anchor="lm")
    hud_ciz(img, 640, 736, "p.article",
            [("Bir alana tıkla", "   "), ("Esc", "çık")], butonlar=False)
    img.convert("RGB").save(f"{OUT}/screenshot-2-picking-1280x800.png")


# ------------------------------------------------------------------ 3: ayarlar sayfasi
def ss_ayarlar():
    img = Image.new("RGBA", (1280, 800), (26, 23, 18, 255))
    d = ImageDraw.Draw(img)

    # golge + panel
    golge = Image.new("RGBA", img.size, (0, 0, 0, 0))
    RR(ImageDraw.Draw(golge), (330, 130, 950, 670), 24, fill=(0, 0, 0, 160))
    img.alpha_composite(golge.filter(ImageFilter.GaussianBlur(24)))
    RR(d, (320, 120, 940, 660), 20, fill=(23, 19, 12, 255),
       outline=(255, 255, 255, 26), width=1)

    ikon = Image.open(f"{KOK}/chrome/icons/icon128.png").resize((44, 44), Image.LANCZOS)
    img.alpha_composite(ikon, (368, 164))
    d.text((428, 186), "Sinema Modu", font=sansb(30), fill=INK, anchor="lm")

    def kaydirici(y, etiket, deger, oran, not_txt):
        d.text((368, y), etiket, font=sansb(19), fill=INK, anchor="lm")
        d.text((892, y), deger, font=mono(18), fill=AMBER, anchor="rm")
        ty = y + 34
        RR(d, (368, ty, 892, ty + 8), 4, fill=(62, 56, 46))
        RR(d, (368, ty, 368 + 524 * oran, ty + 8), 4, fill=AMBER)
        kx = 368 + 524 * oran
        d.ellipse((kx - 12, ty - 8, kx + 12, ty + 16), fill=AMBER)
        d.text((368, ty + 36), not_txt, font=sans(14), fill=GRAY, anchor="lm")

    kaydirici(270, "Karartma koyuluğu", "0.88", 0.88,
              "Odak modundayken sayfanın geri kalanının ne kadar karanlık olacağı.")
    kaydirici(400, "Nefes payı", "14 px", 0.175,
              "Seçilen alanın etrafında bırakılan boşluk.")

    d.line((368, 540, 892, 540), fill=(255, 255, 255, 22), width=1)
    d.text((368, 588), "Kaydedildi", font=sans(15), fill=GRAY, anchor="lm")
    bt, bf = "Varsayılanlara dön", sans(16)
    bw = d.textlength(bt, font=bf) + 36
    RR(d, (892 - bw, 566, 892, 610), 10, fill=(64, 58, 48))
    d.text((892 - bw / 2, 588), bt, font=bf, fill=INK, anchor="mm")

    img.convert("RGB").save(f"{OUT}/screenshot-3-options-1280x800.png")


# ------------------------------------------------------------------ mini sahne (promolar icin)
def mini_sayfa(w, h, lit_i=1, alpha=210):
    img = Image.new("RGBA", (w, h), PAGE_BG + (255,))
    d = ImageDraw.Draw(img)
    x, cw = int(w * .1), int(w * .8)
    y, bh, gap = int(h * .09), max(8, h // 38), max(6, h // 56)
    RR(d, (x, y, x + cw * .7, y + bh + 4), (bh + 4) // 2, fill=BAR_HD)
    y += bh + 4 + gap * 2
    holes, blok = None, [[1, .92, .6], [1, .95, 1, .5], [1, .88, .65]]
    for i, satirlar in enumerate(blok):
        y0 = y
        for sw in satirlar:
            RR(d, (x, y, x + cw * sw, y + bh), bh // 2, fill=BAR)
            y += bh + gap
        if i == lit_i:
            p = max(8, h // 40)
            holes = (x - p, y0 - p, x + cw + p, y - gap + p)
        y += gap * 2
    img.alpha_composite(delikli_karartma(img.size, holes, alpha, r=10))
    cerceve(img, holes, r=10)
    return img


# ------------------------------------------------------------------ 4-5: promo karolari
def promo_kucuk():
    img = Image.new("RGBA", (440, 280), DARK + (255,))
    d = ImageDraw.Draw(img)
    ikon = Image.open(f"{KOK}/chrome/icons/icon128.png").resize((96, 96), Image.LANCZOS)
    img.alpha_composite(ikon, (172, 42))
    d.text((220, 178), "Cinema Mode", font=sansb(34), fill=INK, anchor="mm")
    d.text((220, 216), "Dim the noise. Read the page.", font=sans(16), fill=GRAY, anchor="mm")
    t, f = "Alt+Shift+S", mono(14)
    tw = d.textlength(t, font=f)
    RR(d, (220 - tw / 2 - 12, 238, 220 + tw / 2 + 12, 264), 13,
       outline=AMBER + (170,), width=1)
    d.text((220, 251), t, font=f, fill=AMBER, anchor="mm")
    img.convert("RGB").save(f"{OUT}/promo-small-440x280.png")


def promo_marquee():
    img = Image.new("RGBA", (1400, 560), DARK + (255,))
    d = ImageDraw.Draw(img)
    # sag: mini sahne
    sahne = mini_sayfa(500, 400)
    maske = Image.new("L", sahne.size, 0)
    RR(ImageDraw.Draw(maske), (0, 0, 500, 400), 16, fill=255)
    img.paste(sahne.convert("RGB"), (810, 80), maske)
    RR(d, (810, 80, 1310, 480), 16, outline=(255, 255, 255, 34), width=2)

    # sol: yazi
    ikon = Image.open(f"{KOK}/chrome/icons/icon128.png").resize((72, 72), Image.LANCZOS)
    img.alpha_composite(ikon, (100, 128))
    d.text((196, 164), "Cinema Mode", font=sansb(64), fill=INK, anchor="lm")
    d.text((102, 268), "Click what you read. Everything else goes dark.",
           font=sans(28), fill=(200, 196, 188), anchor="lm")
    d.text((102, 316), "Tıkladığın alan sahnede kalır, gerisi kararır.",
           font=sans(22), fill=GRAY, anchor="lm")
    t, f = "Alt+Shift+S", mono(22)
    tw = d.textlength(t, font=f)
    RR(d, (102, 372, 102 + tw + 36, 418), 23, outline=AMBER + (190,), width=2)
    d.text((102 + 18 + tw / 2, 395), t, font=f, fill=AMBER, anchor="mm")
    d.text((102 + tw + 56, 395), "Chrome & Firefox  ·  offline  ·  no tracking",
           font=sans(18), fill=GRAY, anchor="lm")
    img.convert("RGB").save(f"{OUT}/promo-marquee-1400x560.png")


ss_odak(); ss_secim(); ss_ayarlar(); promo_kucuk(); promo_marquee()
print("\n".join(sorted(os.listdir(OUT))))
