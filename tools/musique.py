# Lit musical libre de droits synthétisé localement (numpy) : beat 100 BPM, basse, nappe.
import numpy as np, wave, sys
SR=44100; dur=float(sys.argv[2]); bpm=100; beat=60/bpm
n=int(SR*dur); t=np.arange(n)/SR; out=np.zeros(n)
def env(x,a,d): return np.where(x<a,x/a,np.exp(-(x-a)/d))
# accords (Am F C G) en Hz
prog=[[220,261.6,329.6],[174.6,220,261.6],[261.6,329.6,392],[196,246.9,293.7]]
bass=[110,87.3,130.8,98]
bar=4*beat
for b in range(int(dur/bar)+1):
    s=b*bar; i=b%4
    seg=(t>=s)&(t<s+bar); tt=t[seg]-s
    pad=sum(np.sin(2*np.pi*f*tt)+0.3*np.sin(2*np.pi*2*f*tt) for f in prog[i])
    out[seg]+=0.05*pad*np.minimum(1,tt/0.3)*np.minimum(1,(bar-tt)/0.3)
    for k in range(8):  # basse en croches
        s2=s+k*beat/2; m=(t>=s2)&(t<s2+beat/2); x=t[m]-s2
        out[m]+=0.18*np.sin(2*np.pi*bass[i]*x)*env(x,0.005,0.12)
for k in range(int(dur/beat)+1):  # kick + hat
    s=k*beat; m=(t>=s)&(t<s+0.35); x=t[m]-s
    out[m]+=0.6*np.sin(2*np.pi*(50+90*np.exp(-x*30))*x)*np.exp(-x*9)
    s3=s+beat/2; m=(t>=s3)&(t<s3+0.05); x=t[m]-s3
    out[m]+=0.08*np.random.randn(m.sum())*np.exp(-x*80)
fade=np.minimum(1,np.minimum(t/1.0,(dur-t)/1.5)); out*=fade
out=out/np.abs(out).max()*0.8
w=wave.open(sys.argv[1],'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((out*32767).astype(np.int16).tobytes()); w.close()
