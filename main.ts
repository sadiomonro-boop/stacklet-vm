import{readFileSync as R,readdirSync as N,mkdirSync as K,writeFileSync as W}from"node:fs";
let e=process.env,I=e.MAKEFUN_INPUT_DIR||"/input",U=e.MAKEFUN_OUTPUT_DIR||"/output";
for(let d of N(I)){
let P=R(I+"/"+d+"/program.bin"),Q=R(I+"/"+d+"/input.bin"),S=[],C=[],M=[],O=[],p=0,q=0,t=0,E=-1;
for(;E<0;){
if(t>=1e6){E=10;break}
if(p<0||p>=P.length){E=9;break}
let o=P[p];
if((0xf0003001f00077fff00ffn>>BigInt(o)&1n)==0n){E=5;break}
let L=o==1?1:o==2?4:o>47&&o<52?2:0;
if(p+1+L>P.length){E=9;break}
let U=o==7?3:o==5||o==6||o>15&&o<35&&o!=23&&o!=27&&o!=31||o==65?2:o==3||o==4||o==23||o==27||o>48&&o<51||o==64||o>79&&o<82||o==83?1:0;
let V=o==6||o==7?3:o==4||o==5?2:o==1||o==2||o==82||o>15&&o<35||o==64?1:0;
if(S.length<U){E=2;break}
if(S.length-U+V>256){E=3;break}
let x=p+1+L;t++;
if(o==0){E=0;break}
if(o<3)S.push(o==1?P[p+1]<<24>>24:P.readInt32LE(p+1));
else if(o==3)S.pop();
else if(o==4)S.push(S[S.length-1]);
else if(o==5){let a=S.pop(),b=S.pop();S.push(a,b)}
else if(o==6)S.push(S[S.length-2]);
else if(o==7){let a=S[S.length-3];S[S.length-3]=S[S.length-2];S[S.length-2]=S[S.length-1];S[S.length-1]=a}
else if(o<35){
if(o==23||o==27){let a=S.pop();S.push(o==23?-a|0:~a)}
else{let b=S.pop(),a=S.pop();
if(o>18&&o<23&&!b){E=4;break}
S.push(o==16?(a+b)|0:o==17?(a-b)|0:o==18?Math.imul(a,b):o==19?a/b|0:o==20?a%b:o==21?(a>>>0)/(b>>>0)|0:o==22?((a>>>0)%(b>>>0))|0:o==24?a&b:o==25?a|b:o==26?a^b:o==28?a<<b:o==29?a>>b:o==30?(a>>>b)|0:o==32?a==b?1:0:o==33?a<b?1:0:(a>>>0)<(b>>>0)?1:0)}}
else if(o<53){
let j=(P[p+1]|P[p+2]<<8)<<16>>16;
if(o==48)p=x+j;
else if(o==49||o==50){let v=S.pop();p=(o==49?v==0:v!=0)?x+j:x}
else if(o==51){if(C.length>63){E=7;break}C.push(x);p=j&65535}
else{if(!C.length){E=8;break}p=C.pop()}
continue}
else if(o==64){let a=S.pop();if(a>>>0>255){E=6;break}S.push(M[a]|0)}
else if(o==65){let a=S.pop(),v=S.pop();if(a>>>0>255){E=6;break}M[a]=v}
else if(o==80){let s=""+S.pop();if(O.length+s.length>65536){E=11;break}for(let k of s)O.push(k.charCodeAt(0))}
else if(o==81){if(O.length>65535){E=11;break}O.push(S.pop()&255)}
else if(o==82)S.push(q<Q.length?Q[q++]:-1);
else{E=S.pop()&255;break}
p=x}
K(U+"/"+d,{recursive:true});
W(U+"/"+d+"/stdout.bin",Buffer.from(O));
W(U+"/"+d+"/exit.txt",""+E)}
