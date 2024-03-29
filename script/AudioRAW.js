var TinySound = function () {
    
// ZzFX - Zuper Zmall Zound Zynth - Micro Edition
// MIT License - Copyright 2019 Frank Force
// https://github.com/KilledByAPixel/ZzFX

// This is a tiny build of zzfx with only a zzfx function to play sounds.
// You can use zzfxV to set volume.
// There is a small bit of optional code to improve compatibility.
// Feel free to minify it further for your own needs!

let zzfx,zzfxV,zzfxX;

// ZzFXMicro - Zuper Zmall Zound Zynth - v1.1.2
zzfxV=.3;    // volume
zzfx= (p=1,k=.05,b=220,e=0,r=0,t=.1,q=0,D=1,u=0,y=0,v=0,z=0,l=0,E=0,A=0,F=0,c=0,w=1,m=0,B=0)=>{let M=Math,R=44100,d=2*M.PI,G=u*=500*d/R/R,C=b*=(1-k+2*k*M.random(k=[]))*d/R,g=0,H=0,a=0,n=1,I=0,J=0,f=0,x,h;e=R*e+9;m*=R;r*=R;t*=R;c*=R;y*=500*d/R**3;A*=d/R;v*=d/R;z*=R;l=R*l|0;for(h=e+m+r+t+c|0;a<h;k[a++]=f)++J%(100*F|0)||(f=q?1<q?2<q?3<q?M.sin((g%d)**3):M.max(M.min(M.tan(g),1),-1):1-(2*g/d%2+2)%2:1-4*M.abs(M.round(g/d)-g/d):M.sin(g),f=(l?1-B+B*M.sin(d*a/l):1)*(0<f?1:-1)*M.abs(f)**D*p*zzfxV*(a<e?a/e:a<e+m?1-(a-e)/m*(1-w):a<e+m+r?w:a<h-c?(h-a-c)/t*w:0),f=c?f/2+(c>a?0:(a<h-c?1:(h-a)/c)*k[a-c|0]/2):f),x=(b+=u+=y)*M.cos(A*H++),g+=x-x*E*(1-1E9*(M.sin(a)+1)%2),n&&++n>z&&(b+=v,C+=v,n=0),!l||++I%l||(b=C,u=G,n||=1);p=zzfxX.createBuffer(1,h,R);p.getChannelData(0).set(k);b=zzfxX.createBufferSource();b.buffer=p;b.connect(zzfxX.destination);b.start();return b}
zzfxX=new(window.AudioContext||webkitAudioContext) // audio context
    
  // Stops the current song and suspends the audio context
  function stop() {
      
  }
  
  function play(n) {
    zzfx(...SOUNDS[n]);
    }
  
    return{
        Play: function(n)
        {
            play(n);
        }
    }
  }

  

var TinyMusic = function () {
    
  // zzfx() - the universal entry point -- returns a AudioBufferSourceNode
  zzfx=(...t)=>zzfxP(zzfxG(...t))
  
  // zzfxP() - the sound player -- returns a AudioBufferSourceNode
  zzfxP=(...t)=>{let e=zzfxX.createBufferSource(),f=zzfxX.createBuffer(t.length,t[0].length,zzfxR);t.map((d,i)=>f.getChannelData(i).set(d)),e.buffer=f,e.connect(zzfxX.destination),e.start();return e}
  
  // zzfxG() - the sound generator -- returns an array of sample data
  zzfxG=(q=1,k=.05,c=220,e=0,t=0,u=.1,r=0,F=1,v=0,z=0,w=0,A=0,l=0,B=0,x=0,G=0,d=0,y=1,m=0,C=0)=>{let b=2*Math.PI,H=v*=500*b/zzfxR**2,I=(0<x?1:-1)*b/4,D=c*=(1+2*k*Math.random()-k)*b/zzfxR,Z=[],g=0,E=0,a=0,n=1,J=0,K=0,f=0,p,h;e=99+zzfxR*e;m*=zzfxR;t*=zzfxR;u*=zzfxR;d*=zzfxR;z*=500*b/zzfxR**3;x*=b/zzfxR;w*=b/zzfxR;A*=zzfxR;l=zzfxR*l|0;for(h=e+m+t+u+d|0;a<h;Z[a++]=f)++K%(100*G|0)||(f=r?1<r?2<r?3<r?Math.sin((g%b)**3):Math.max(Math.min(Math.tan(g),1),-1):1-(2*g/b%2+2)%2:1-4*Math.abs(Math.round(g/b)-g/b):Math.sin(g),f=(l?1-C+C*Math.sin(2*Math.PI*a/l):1)*(0<f?1:-1)*Math.abs(f)**F*q*zzfxV*(a<e?a/e:a<e+m?1-(a-e)/m*(1-y):a<e+m+t?y:a<h-d?(h-a-d)/u*y:0),f=d?f/2+(d>a?0:(a<h-d?1:(h-a)/d)*Z[a-d|0]/2):f),p=(c+=v+=z)*Math.sin(E*x-I),g+=p-p*B*(1-1E9*(Math.sin(a)+1)%2),E+=p-p*B*(1-1E9*(Math.sin(a)**2+1)%2),n&&++n>A&&(c+=w,D+=w,n=0),!l||++J%l||(c=D,v=H,n=n||1);return Z}
  
  // zzfxV - global volume
  zzfxV=.3
  
  // zzfxR - global sample rate
  zzfxR=44100
  
  // zzfxX - the common audio context
  zzfxX=new(window.AudioContext||webkitAudioContext);
  
  //! ZzFXM (v2.0.3) | (C) Keith Clark | MIT | https://github.com/keithclark/ZzFXM
  zzfxM=(n,f,t,e=125)=>{let l,o,z,r,g,h,x,a,u,c,d,i,m,p,G,M=0,R=[],b=[],j=[],k=0,q=0,s=1,v={},w=zzfxR/e*60>>2;for(;s;k++)R=[s=a=d=m=0],t.map((e,d)=>{for(x=f[e][k]||[0,0,0],s|=!!f[e][k],G=m+(f[e][0].length-2-!a)*w,p=d==t.length-1,o=2,r=m;o<x.length+p;a=++o){	for(g=x[o],u=o==x.length+p-1&&p||c!=(x[0]||0)|g|0,z=0;z<w&&a;z++>w-99&&u?i+=(i<1)/99:0)h=(1-i)*R[M++]/2||0,b[r]=(b[r]||0)-h*q+h,j[r]=(j[r++]||0)+h*q+h;g&&(i=g%1,q=x[1]||0,(g|=0)&&(R=v[[c=x[M=0]||0,g]]=v[[c,g]]||(l=[...n[c]],l[2]*=2**((g-12)/12),g>0?zzfxG(...l):[])))}m=G});return[b,j]};
  
  song1 = [[[1.8,0,72,,,.2,,4,-2,6,50,.15,,6],[,0,655,,,.09,3,1.65,,,,,.02,3.8,-.1,,.2],[1.2,0,23,,,.2,3,4,,,3,.9,.05],[1.5,0,740,,,.15,2,.2,-.1,-.15,9,.02,,.1,.12,,.06]],[[[3,-1,13,13,13,8,13,,,,,,,,,,,,11,11,11,6,11,,,,,,,,,,,,10,10,10,6,10,,,,,,,,,6,8,10,8,8,8,5,13,,8,8,8,5,13,,,,,,],[,1,25,,25,,,,,,,,,,,,,25,25,,25,,,,,,,25,,,25,,25,25,25,,25,,,,,,,,,,,25,25,25,25,,25,,,,,,,,,,,,,,],[2,-1,13,,25,,13,13,25,13,,13,25,13,13,13,25,,13,,25,,13,13,25,13,,13,25,13,13,13,,,13,,25,,13,13,25,13,,13,25,13,13,13,25,,13,,25,,13,13,25,13,,13,25,13,13,13,25,,]],[[3,-1,13,13,13,8,13,,,,,,,,,,,,11,11,11,6,11,,,,,,,,,,,,10,10,10,6,10,,,,,,,,,6,8,10,8,8,8,5,13,,8,8,8,5,13,8,8,8,5,13],[2,-1,13,,25,,13,13,25,13,,13,25,13,13,13,25,27,11,,23,,11,11,23,11,,11,23,11,11,11,23,22,18,,30,,18,18,30,18,,18,30,18,18,18,30,22,13,,25,,13,13,25,13,,13,25,13,13,13,25,,],[,1,25,,25,,,,,,,,,,,,,25,25,,25,,,,,,,,,,,,,,25,,25,,,,,,,,,,,25,25,25,25,,25,,,,,,,,,,,,,,],[1,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,13,13,13,13,13,13,13,13]],[[3,-1,13,13,13,8,13,,13,15,17,17,15,13,20,20,18,17,18,,,,17,,15,,,,17,,18,,22,22,22,,18,,,,25,25,25,,22,,,18,20,22,20,,,,,,,,,,,,,,,,],[2,-1,13,,25,,13,13,25,13,,13,25,13,13,13,25,27,11,,23,,11,11,23,11,,11,23,11,11,11,23,22,18,,30,,18,18,30,18,,18,30,18,18,18,30,22,13,,25,,13,13,25,13,,13,25,13,13,13,25,,],[,1,25,,,,,,25,25,,25,25,,,,,,25,,,,,,25,25,,25,25,,,,,,25,,,,,,25,25,,25,25,,,,,,25,,,,,,25,25,,25,25,,,,,,],[1,1,,,,,13,,,,,,,,13,,,,,,,,13,,,,,,,,13,,13,,,,,,13,,,,,,,,13,,,,,,,,13,,,,,,,,13,13,,13]],[[3,-1,13,,25,,13,13,25,13,,13,25,13,13,13,25,,11,,23,,11,11,23,11,,11,23,11,11,11,23,,10,,22,,10,10,22,10,,10,22,10,10,6,8,10,20,25,20,20,25,20,,20,25,20,20,20,25,,20,,],[2,-1,13,,25,,13,13,25,13,,13,25,13,13,13,25,,13,,25,,13,13,25,13,,13,25,13,13,13,25,,13,,25,,13,13,25,13,,13,25,13,13,13,25,,13,,25,,13,13,25,13,,13,25,13,13,13,25,,],[,1,25,,,,,,25,25,,25,25,,,,,,25,,,,,,25,25,,25,25,,,,,,25,,,,,,25,25,,25,25,,,,,,25,,,,,,25,25,,25,25,,,,,,],[1,1,,,,,13,,,,,,,,13,,,,,,,,13,,,,,,,,13,,13,,,,,,13,,,,,,,,13,,,,,,,,13,,,,,,,,13,13,,13]],[[3,-1,13,,,,,,8,,17,15,13,,17,15,13,,15,,,,10,13,15,10,13,15,10,13,15,10,13,15,12,,,,,,8,15,,,,,17,15,13,8,13,,,,,,10,8,,20,20,20,20,20,20,20],[2,-1,13,,25,,13,13,25,13,,13,25,13,13,13,25,,15,,27,,15,15,27,15,,15,27,15,15,15,27,32,20,,32,,20,20,32,20,,20,32,20,20,20,32,,13,,25,,13,13,25,20,,20,32,20,20,20,32,,],[,1,25,,,,,,25,25,,25,25,,,,,,25,,,,,,25,25,,25,25,,,,,,25,,,,,,25,25,,25,25,,,,,,25,,,,,,25,25,,25,25,,,,,,],[1,1,,,,,13,,,,,,,,13,,,,,,,,13,,,,,,,,13,,13,,,,,,13,,,,,,,,13,,,,,,,,13,,,,,,,,13,13,,13]],[[3,-1,13,,,,,,8,,17,,,,18,17,15,,18,,,,13,,,,10,,,,6,,,,8,12,15,12,20,,8,12,15,12,20,,22,20,15,,13,,,,,,10,,8,,,,,8,20,8],[2,-1,13,,25,25,13,,25,25,13,,25,25,13,,25,25,15,,27,27,15,,27,27,15,,27,27,15,,27,27,20,,32,32,20,,32,32,20,,32,32,20,,32,32,13,,25,25,13,,25,25,20,,32,32,20,,32,34],[,1,25,,,,,,25,25,,25,25,,,,,,25,,,,,,25,25,,25,25,,,,,,25,,,,,,25,25,,25,25,,,,,,25,,,,,,25,25,,25,25,,,,,,],[1,1,,,,,13,,,,,,,,13,,,,,,,,13,,,,,,,,13,,13,,,,,,13,,,,,,,,13,,,,,,,,13,,,,,,,,13,13,,13]],[[3,-1,13,,,,,,8,,17,,,,18,17,15,,18,,,,13,,,,10,,,,6,,,,8,12,15,12,20,,8,12,15,12,20,,22,20,15,,13,,,,,,10,,8,,,,,8,20,8],[,1,25,,,,,,25,25,,25,25,,,,,,25,,,,,,25,25,,25,25,,,,,,25,,,,,,25,25,,25,25,,,,,,25,,,,,,25,25,,25,25,,,,,,],[1,1,,,,,13,,,,,,,,13,,,,,,,,13,,,,,,,,13,,13,,,,,,13,,,,,,,,13,,,,,,,,13,,,,,,,,13,13,,13]],[[,1,25,,,,,,25,25,,25,25,,,,,,25,,,,,,25,25,,25,25,,,,,,25,,,,,,25,25,,25,25,,,,,,25,,,,25,,,25,,,,25,25,25,25,25],[1,1,,,,,13,,,,,,,,13,,,,,,,,13,,,,,,,,13,,13,,,,,,13,,,,,,,,13,,,,,,,,13,13,,13,,13,13,13,13,13,13,13]]],[0,1,2,2,3,3,2,2,4,4,5,6,6,7,2,2,3]];
  
  currentNode = null;
  currentSong = null;
  currentBuffer = null;
  
  renderSong = song => new Promise(resolve => requestIdleCallback(()=>resolve(zzfxM(...song))));
  
  // Stops the current song and suspends the audio context
  stopSong = async () => {
    if (currentNode) {
      currentNode.stop();
    }
    await zzfxX.suspend()
  }
  
  playSong = async song => {
      if (currentNode) {
        stopSong();
      }
      if (!currentBuffer) {
        currentBuffer = await renderSong(song1);
      }
      currentNode = zzfxP(...currentBuffer);
      currentNode.loop = true;
      await zzfxX.resume();
    }
  
    return{
        Play: function()
        {
            playSong();
        }
    }
  }
  
