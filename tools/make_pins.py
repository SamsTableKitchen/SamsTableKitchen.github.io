from PIL import Image, ImageDraw, ImageFont
import os
F='/usr/share/fonts/truetype/sand-box/google/'
def font(path,size,w=None):
    f=ImageFont.truetype(F+path,size)
    if w: 
        try: f.set_variation_by_axes([w])
        except Exception: pass
    return f
PINS=[('bourbon-chicken','r-bourbon-chicken','Bourbon Chicken','Sticky, sweet and savory'),
('pellet-grill-smoked-chicken-drumsticks','h-drumsticks-plate','Smoked Chicken Drumsticks','On the pellet grill'),
('strawberry-lemonade-cookies','h-lemonade-cookies','Strawberry Lemonade Cookies','Bright, soft and chewy')]
BG=(250,247,242);INK=(43,43,43);OL=(107,127,58);TE=(196,104,61)
for slug,img,title,sub in PINS:
    src=max([f'images/{img}.jpg',f'images/{img}.webp'],key=lambda p:Image.open(p).size[0] if os.path.exists(p) else 0)
    im=Image.open(src).convert('RGB')
    W=1000;ph=min(1000,round(im.height*W/im.width))
    # cover-crop to W x ph (only crops if image taller than 1:1)
    s=max(W/im.width,ph/im.height);r=im.resize((round(im.width*s),round(im.height*s)),Image.LANCZOS)
    x=(r.width-W)//2;y=(r.height-ph)//2;r=r.crop((x,y,x+W,y+ph))
    c=Image.new('RGB',(1000,1500),BG);c.paste(r,(0,0));d=ImageDraw.Draw(c)
    d.rectangle([0,ph,1000,ph+10],fill=OL)
    top=ph+10;area=1500-top
    k=font('Lato/Lato-Bold.ttf',30);t=None
    for sz in range(96,40,-4):
        t=font('Playfair Display/PlayfairDisplay-VariableFont_wght.ttf',sz,700)
        words=title.split();lines=[''];
        for wd in words:
            tr=(lines[-1]+' '+wd).strip()
            if d.textlength(tr,font=t)<=860: lines[-1]=tr
            else: lines.append(wd)
        if len(lines)<=2 and sz*1.2*len(lines)+200<area: break
    sf=font('Lato/Lato-Italic.ttf',36);uf=font('Lato/Lato-Bold.ttf',26)
    lh=round(sz*1.18);block=40+24+len(lines)*lh+20+44
    y=top+(area-block-50)//2
    d.text((500,y),'R E C I P E',font=k,fill=TE,anchor='mt');y+=64
    for ln in lines: d.text((500,y),ln,font=t,fill=INK,anchor='mt');y+=lh
    y+=14;d.text((500,y),sub,font=sf,fill=(95,95,95),anchor='mt')
    d.text((500,1440),'SAMSTABLEKITCHEN.COM',font=uf,fill=OL,anchor='mt')
    c.save(f'images/pins/{slug}.jpg',quality=86,optimize=True,progressive=True);print(slug,src,ph,sz)
