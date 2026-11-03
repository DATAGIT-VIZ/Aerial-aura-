"""Recolour the hero drone video: red accents -> brand gold, body -> black.

Prints an ffmpeg filtergraph. Usage (from the repo root, needs ffmpeg 7+):

    python3 scripts/recolor-drone.py > /tmp/drone-fg.txt
    ffmpeg -c:v libvpx-vp9 -i <original-drone.webm> -/filter_complex /tmp/drone-fg.txt \
      -c:v libvpx-vp9 -pix_fmt yuva420p -auto-alt-ref 0 -crf 30 -b:v 0 -row-mt 1 -cpu-used 2 -an \
      public/video/drone-gold.webm

The original (red) drone.webm is not in this repo; it lives in the source project at
~/Developer/aerial-aura/public/video/drone.webm.

`-c:v libvpx-vp9` before `-i` matters: ffmpeg's built-in VP9 decoder drops the alpha channel.
"""

# Same gold ramp as the hero light trails (components/Hyperspeed.tsx).
LO, MID, HI = (126, 93, 34), (201, 154, 67), (251, 239, 196)  # #7E5D22  #C99A43  #FBEFC4

BODY_GAMMA = 1.25   # >1 pushes the gunmetal body darker, keeping highlights
BODY_GAIN = 0.9
MASK_OFFSET = 10    # how much redder than green/blue a pixel must be to count as an accent
MASK_RANGE = 45     # softness of that threshold
GLOW_SIGMA = 14     # bloom radius around the gold accents
GLOW_BASE = 0.6     # bloom strength...
GLOW_PULSE = 0.25   # ...breathing +/- this on a 2.5 s cycle (divides the 10 s loop, so it stays seamless)

PRE = (
    "st(0,r(X,Y));st(1,g(X,Y));st(2,b(X,Y));"
    f"st(3,clip((ld(0)-max(ld(1),ld(2))-{MASK_OFFSET})/{MASK_RANGE},0,1));"  # red-ness mask
    "st(4,clip(ld(0)/255*1.2,0,1));"                                         # accent brightness
)


def gold(i):
    c1, c2, c3 = LO[i], MID[i], HI[i]
    return (
        f"if(lt(ld(4),0.35),{c1}*ld(4)/0.35,"
        f"if(lt(ld(4),0.7),{c1}+({c2}-{c1})*(ld(4)-0.35)/0.35,"
        f"{c2}+({c3}-{c2})*(ld(4)-0.7)/0.3))"
    )


def main_channel(i):
    body = f"255*pow((0.299*ld(0)+0.587*ld(1)+0.114*ld(2))/255,{BODY_GAMMA})*{BODY_GAIN}"
    return PRE + f"st(5,{body});st(6,{gold(i)});ld(5)*(1-ld(3))+ld(6)*ld(3)"


def glow_channel(i):
    k = f"({GLOW_BASE}+{GLOW_PULSE}*sin(2*PI*T/2.5))"
    return PRE + f"{gold(i)}*ld(3)*{k}"


def geq(fn):
    return f"geq=r='{fn(0)}':g='{fn(1)}':b='{fn(2)}':a='alpha(X,Y)'"


print(
    "[0:v]format=gbrap,split[o1][o2];"
    f"[o1]{geq(main_channel)}[main];"
    f"[o2]{geq(glow_channel)},gblur=sigma={GLOW_SIGMA}:planes=7[glow];"
    "[main][glow]blend=c0_mode=screen:c1_mode=screen:c2_mode=screen:c3_mode=normal:c3_opacity=1,"
    "format=rgba"
)
