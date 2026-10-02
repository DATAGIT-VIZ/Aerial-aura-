'use client';
import { type FC, useEffect, useRef } from 'react';
import * as THREE from 'three';

import './Hyperspeed.css';

interface Distortion {
  uniforms: Record<string, { value: any }>;
  getDistortion: string;
  getJS?: (progress: number, time: number) => THREE.Vector3;
}

interface Distortions {
  [key: string]: Distortion;
}

interface Colors {
  roadColor: number;
  islandColor: number;
  background: number;
  shoulderLines: number;
  brokenLines: number;
  leftCars: number[];
  rightCars: number[];
  sticks: number;
}

interface HyperspeedOptions {
  onSpeedUp?: (ev: MouseEvent | TouchEvent) => void;
  onSlowDown?: (ev: MouseEvent | TouchEvent) => void;
  distortion?: string | Distortion;
  length: number;
  roadWidth: number;
  islandWidth: number;
  lanesPerRoad: number;
  fov: number;
  fovSpeedUp: number;
  speedUp: number;
  carLightsFade: number;
  totalSideLightSticks: number;
  lightPairsPerRoadWay: number;
  shoulderLinesWidthPercentage: number;
  brokenLinesWidthPercentage: number;
  brokenLinesLengthPercentage: number;
  lightStickWidth: [number, number];
  lightStickHeight: [number, number];
  movingAwaySpeed: [number, number];
  movingCloserSpeed: [number, number];
  carLightsLength: [number, number];
  carLightsRadius: [number, number];
  carWidthPercentage: [number, number];
  carShiftX: [number, number];
  carFloorSeparation: [number, number];
  colors: Colors;
}

export interface HyperspeedProps {
  effectOptions?: Partial<HyperspeedOptions>;
}

const defaultOptions: HyperspeedOptions = {
  onSpeedUp: () => {},
  onSlowDown: () => {},
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor:    0x080808,
    islandColor:  0x0a0a0a,
    background:   0x000000,
    shoulderLines:0xffffff,
    brokenLines:  0xffffff,
    leftCars:  [0xd856bf, 0x6750a2, 0xc247ac],
    rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
    sticks:    0x03b3c3,
  },
};

function nsin(val: number) {
  return Math.sin(val) * 0.5 + 0.5;
}

const mountainUniforms = {
  uFreq: { value: new THREE.Vector3(3, 6, 10) },
  uAmp: { value: new THREE.Vector3(30, 30, 20) },
};
const xyUniforms = {
  uFreq: { value: new THREE.Vector2(5, 2) },
  uAmp: { value: new THREE.Vector2(25, 15) },
};
const LongRaceUniforms = {
  uFreq: { value: new THREE.Vector2(2, 3) },
  uAmp: { value: new THREE.Vector2(35, 10) },
};
const turbulentUniforms = {
  uFreq: { value: new THREE.Vector4(4, 8, 8, 1) },
  uAmp: { value: new THREE.Vector4(25, 5, 10, 10) },
};
const deepUniforms = {
  uFreq:  { value: new THREE.Vector2(4, 8) },
  uAmp:   { value: new THREE.Vector2(10, 20) },
  uPowY:  { value: new THREE.Vector2(20, 2) },
};

const distortions: Distortions = {
  mountainDistortion: {
    uniforms: mountainUniforms,
    getDistortion: `
      uniform vec3 uAmp; uniform vec3 uFreq;
      #define PI 3.14159265358979
      float nsin(float val){ return sin(val)*0.5+0.5; }
      vec3 getDistortion(float progress){
        float f=0.02;
        return vec3(
          cos(progress*PI*uFreq.x+uTime)*uAmp.x - cos(f*PI*uFreq.x+uTime)*uAmp.x,
          nsin(progress*PI*uFreq.y+uTime)*uAmp.y - nsin(f*PI*uFreq.y+uTime)*uAmp.y,
          nsin(progress*PI*uFreq.z+uTime)*uAmp.z - nsin(f*PI*uFreq.z+uTime)*uAmp.z
        );
      }`,
    getJS: (p, t) => {
      const f=0.02, uF=mountainUniforms.uFreq.value, uA=mountainUniforms.uAmp.value;
      return new THREE.Vector3(
        Math.cos(p*Math.PI*uF.x+t)*uA.x - Math.cos(f*Math.PI*uF.x+t)*uA.x,
        nsin(p*Math.PI*uF.y+t)*uA.y - nsin(f*Math.PI*uF.y+t)*uA.y,
        nsin(p*Math.PI*uF.z+t)*uA.z - nsin(f*Math.PI*uF.z+t)*uA.z,
      ).multiply(new THREE.Vector3(2,2,2)).add(new THREE.Vector3(0,0,-5));
    },
  },
  xyDistortion: {
    uniforms: xyUniforms,
    getDistortion: `
      uniform vec2 uFreq; uniform vec2 uAmp;
      #define PI 3.14159265358979
      vec3 getDistortion(float progress){
        float f=0.02;
        return vec3(
          cos(progress*PI*uFreq.x+uTime)*uAmp.x - cos(f*PI*uFreq.x+uTime)*uAmp.x,
          sin(progress*PI*uFreq.y+PI/2.+uTime)*uAmp.y - sin(f*PI*uFreq.y+PI/2.+uTime)*uAmp.y,
          0.
        );
      }`,
    getJS: (p, t) => {
      const f=0.02, uF=xyUniforms.uFreq.value, uA=xyUniforms.uAmp.value;
      return new THREE.Vector3(
        Math.cos(p*Math.PI*uF.x+t)*uA.x - Math.cos(f*Math.PI*uF.x+t)*uA.x,
        Math.sin(p*Math.PI*uF.y+t+Math.PI/2)*uA.y - Math.sin(f*Math.PI*uF.y+t+Math.PI/2)*uA.y,
        0,
      ).multiply(new THREE.Vector3(2,0.4,1)).add(new THREE.Vector3(0,0,-3));
    },
  },
  LongRaceDistortion: {
    uniforms: LongRaceUniforms,
    getDistortion: `
      uniform vec2 uFreq; uniform vec2 uAmp;
      #define PI 3.14159265358979
      vec3 getDistortion(float progress){
        float c=0.0125;
        return vec3(
          sin(progress*PI*uFreq.x+uTime)*uAmp.x - sin(c*PI*uFreq.x+uTime)*uAmp.x,
          sin(progress*PI*uFreq.y+uTime)*uAmp.y - sin(c*PI*uFreq.y+uTime)*uAmp.y,
          0.
        );
      }`,
    getJS: (p, t) => {
      const c=0.0125, uF=LongRaceUniforms.uFreq.value, uA=LongRaceUniforms.uAmp.value;
      return new THREE.Vector3(
        Math.sin(p*Math.PI*uF.x+t)*uA.x - Math.sin(c*Math.PI*uF.x+t)*uA.x,
        Math.sin(p*Math.PI*uF.y+t)*uA.y - Math.sin(c*Math.PI*uF.y+t)*uA.y,
        0,
      ).multiply(new THREE.Vector3(1,1,0)).add(new THREE.Vector3(0,0,-5));
    },
  },
  turbulentDistortion: {
    uniforms: turbulentUniforms,
    getDistortion: `
      uniform vec4 uFreq; uniform vec4 uAmp;
      float nsin(float val){ return sin(val)*0.5+0.5; }
      #define PI 3.14159265358979
      float getDistortionX(float p){
        return cos(PI*p*uFreq.r+uTime)*uAmp.r + pow(cos(PI*p*uFreq.g+uTime*(uFreq.g/uFreq.r)),2.)*uAmp.g;
      }
      float getDistortionY(float p){
        return -nsin(PI*p*uFreq.b+uTime)*uAmp.b - pow(nsin(PI*p*uFreq.a+uTime/(uFreq.b/uFreq.a)),5.)*uAmp.a;
      }
      vec3 getDistortion(float progress){
        return vec3(getDistortionX(progress)-getDistortionX(0.0125), getDistortionY(progress)-getDistortionY(0.0125), 0.);
      }`,
    getJS: (p, t) => {
      const uF=turbulentUniforms.uFreq.value, uA=turbulentUniforms.uAmp.value;
      const gX=(x:number)=>Math.cos(Math.PI*x*uF.x+t)*uA.x+Math.pow(Math.cos(Math.PI*x*uF.y+t*(uF.y/uF.x)),2)*uA.y;
      const gY=(x:number)=>-nsin(Math.PI*x*uF.z+t)*uA.z-Math.pow(nsin(Math.PI*x*uF.w+t/(uF.z/uF.w)),5)*uA.w;
      return new THREE.Vector3(gX(p)-gX(p+0.007), gY(p)-gY(p+0.007), 0)
        .multiply(new THREE.Vector3(-2,-5,0)).add(new THREE.Vector3(0,0,-10));
    },
  },
  turbulentDistortionStill: {
    uniforms: turbulentUniforms,
    getDistortion: `
      uniform vec4 uFreq; uniform vec4 uAmp;
      float nsin(float val){ return sin(val)*0.5+0.5; }
      #define PI 3.14159265358979
      float getDistortionX(float p){ return cos(PI*p*uFreq.r)*uAmp.r+pow(cos(PI*p*uFreq.g*(uFreq.g/uFreq.r)),2.)*uAmp.g; }
      float getDistortionY(float p){ return -nsin(PI*p*uFreq.b)*uAmp.b-pow(nsin(PI*p*uFreq.a/(uFreq.b/uFreq.a)),5.)*uAmp.a; }
      vec3 getDistortion(float progress){ return vec3(getDistortionX(progress)-getDistortionX(0.02),getDistortionY(progress)-getDistortionY(0.02),0.); }`,
  },
  deepDistortionStill: {
    uniforms: deepUniforms,
    getDistortion: `
      uniform vec2 uFreq; uniform vec2 uAmp; uniform vec2 uPowY;
      float nsin(float val){ return sin(val)*0.5+0.5; }
      #define PI 3.14159265358979
      float getDistortionX(float p){ return sin(p*PI*uFreq.x)*uAmp.x*2.; }
      float getDistortionY(float p){ return pow(abs(p*uPowY.x),uPowY.y)+sin(p*PI*uFreq.y)*uAmp.y; }
      vec3 getDistortion(float progress){ return vec3(getDistortionX(progress)-getDistortionX(0.02),getDistortionY(progress)-getDistortionY(0.05),0.); }`,
  },
  deepDistortion: {
    uniforms: deepUniforms,
    getDistortion: `
      uniform vec2 uFreq; uniform vec2 uAmp; uniform vec2 uPowY;
      float nsin(float val){ return sin(val)*0.5+0.5; }
      #define PI 3.14159265358979
      float getDistortionX(float p){ return sin(p*PI*uFreq.x+uTime)*uAmp.x; }
      float getDistortionY(float p){ return pow(abs(p*uPowY.x),uPowY.y)+sin(p*PI*uFreq.y+uTime)*uAmp.y; }
      vec3 getDistortion(float progress){ return vec3(getDistortionX(progress)-getDistortionX(0.02),getDistortionY(progress)-getDistortionY(0.02),0.); }`,
    getJS: (p, t) => {
      const uF=deepUniforms.uFreq.value, uA=deepUniforms.uAmp.value, uP=deepUniforms.uPowY.value;
      const gX=(x:number)=>Math.sin(x*Math.PI*uF.x+t)*uA.x;
      const gY=(x:number)=>Math.pow(x*uP.x,uP.y)+Math.sin(x*Math.PI*uF.y+t)*uA.y;
      return new THREE.Vector3(gX(p)-gX(p+0.01), gY(p)-gY(p+0.01), 0)
        .multiply(new THREE.Vector3(-2,-4,0)).add(new THREE.Vector3(0,0,-10));
    },
  },
};

const distortion_uniforms = {
  uDistortionX: { value: new THREE.Vector2(80, 3) },
  uDistortionY: { value: new THREE.Vector2(-40, 2.5) },
};
const distortion_vertex = `
  #define PI 3.14159265358979
  uniform vec2 uDistortionX; uniform vec2 uDistortionY;
  float nsin(float val){ return sin(val)*0.5+0.5; }
  vec3 getDistortion(float progress){
    progress=clamp(progress,0.,1.);
    return vec3(
      uDistortionX.r*nsin(progress*PI*uDistortionX.g-PI/2.),
      uDistortionY.r*nsin(progress*PI*uDistortionY.g-PI/2.),
      0.
    );
  }`;

function random(base: number | [number, number]): number {
  if (Array.isArray(base)) return Math.random()*(base[1]-base[0])+base[0];
  return Math.random()*base;
}
function pickRandom<T>(arr: T | T[]): T {
  if (Array.isArray(arr)) return arr[Math.floor(Math.random()*arr.length)];
  return arr;
}
function lerp(current: number, target: number, speed=0.1, limit=0.001): number {
  let change=(target-current)*speed;
  if (Math.abs(change)<limit) change=target-current;
  return change;
}

const carLightsFragment = `
  #define USE_FOG
  ${THREE.ShaderChunk['fog_pars_fragment']}
  varying vec3 vColor; varying vec2 vUv; uniform vec2 uFade;
  void main(){
    float alpha=smoothstep(uFade.x,uFade.y,vUv.x);
    gl_FragColor=vec4(vColor,alpha);
    if(gl_FragColor.a<0.0001)discard;
    ${THREE.ShaderChunk['fog_fragment']}
  }`;

const carLightsVertex = `
  #define USE_FOG
  ${THREE.ShaderChunk['fog_pars_vertex']}
  attribute vec3 aOffset; attribute vec3 aMetrics; attribute vec3 aColor;
  uniform float uTravelLength; uniform float uTime;
  varying vec2 vUv; varying vec3 vColor;
  #include <getDistortion_vertex>
  void main(){
    vec3 transformed=position.xyz;
    float radius=aMetrics.r, myLength=aMetrics.g, speed=aMetrics.b;
    transformed.xy*=radius; transformed.z*=myLength;
    transformed.z+=myLength-mod(uTime*speed+aOffset.z,uTravelLength);
    transformed.xy+=aOffset.xy;
    float progress=abs(transformed.z/uTravelLength);
    transformed.xyz+=getDistortion(progress);
    vec4 mvPosition=modelViewMatrix*vec4(transformed,1.);
    gl_Position=projectionMatrix*mvPosition;
    vUv=uv; vColor=aColor;
    ${THREE.ShaderChunk['fog_vertex']}
  }`;

const sideSticksVertex = `
  #define USE_FOG
  ${THREE.ShaderChunk['fog_pars_vertex']}
  attribute float aOffset; attribute vec3 aColor; attribute vec2 aMetrics;
  uniform float uTravelLength; uniform float uTime;
  varying vec3 vColor;
  mat4 rotationY(in float angle){
    return mat4(cos(angle),0,sin(angle),0, 0,1,0,0, -sin(angle),0,cos(angle),0, 0,0,0,1);
  }
  #include <getDistortion_vertex>
  void main(){
    vec3 transformed=position.xyz;
    float width=aMetrics.x, height=aMetrics.y;
    transformed.xy*=vec2(width,height);
    float time=mod(uTime*60.*2.+aOffset,uTravelLength);
    transformed=(rotationY(3.14/2.)*vec4(transformed,1.)).xyz;
    transformed.z+=-uTravelLength+time;
    float progress=abs(transformed.z/uTravelLength);
    transformed.xyz+=getDistortion(progress);
    transformed.y+=height/2.; transformed.x+=-width/2.;
    vec4 mvPosition=modelViewMatrix*vec4(transformed,1.);
    gl_Position=projectionMatrix*mvPosition;
    vColor=aColor;
    ${THREE.ShaderChunk['fog_vertex']}
  }`;

const sideSticksFragment = `
  #define USE_FOG
  ${THREE.ShaderChunk['fog_pars_fragment']}
  varying vec3 vColor;
  void main(){
    gl_FragColor=vec4(vColor,1.);
    ${THREE.ShaderChunk['fog_fragment']}
  }`;

const roadMarkings_vars = `
  uniform float uLanes; uniform vec3 uBrokenLinesColor; uniform vec3 uShoulderLinesColor;
  uniform float uShoulderLinesWidthPercentage; uniform float uBrokenLinesWidthPercentage; uniform float uBrokenLinesLengthPercentage;`;

const roadMarkings_fragment = `
  uv.y=mod(uv.y+uTime*0.05,1.);
  float laneWidth=1.0/uLanes;
  float brokenLineWidth=laneWidth*uBrokenLinesWidthPercentage;
  float laneEmptySpace=1.-uBrokenLinesLengthPercentage;
  float brokenLines=step(1.0-brokenLineWidth,fract(uv.x*2.0))*step(laneEmptySpace,fract(uv.y*10.0));
  float sideLines=step(1.0-brokenLineWidth,fract((uv.x-laneWidth*(uLanes-1.0))*2.0))+step(brokenLineWidth,uv.x);
  brokenLines=mix(brokenLines,sideLines,uv.x);`;

const roadBaseFragment = `
  #define USE_FOG
  varying vec2 vUv; uniform vec3 uColor; uniform float uTime;
  #include <roadMarkings_vars>
  ${THREE.ShaderChunk['fog_pars_fragment']}
  void main(){
    vec2 uv=vUv; vec3 color=vec3(uColor);
    #include <roadMarkings_fragment>
    gl_FragColor=vec4(color,1.);
    ${THREE.ShaderChunk['fog_fragment']}
  }`;

const islandFragment = roadBaseFragment
  .replace('#include <roadMarkings_fragment>','')
  .replace('#include <roadMarkings_vars>','');

const roadFragment = roadBaseFragment
  .replace('#include <roadMarkings_fragment>',roadMarkings_fragment)
  .replace('#include <roadMarkings_vars>',roadMarkings_vars);

const roadVertex = `
  #define USE_FOG
  uniform float uTime;
  ${THREE.ShaderChunk['fog_pars_vertex']}
  uniform float uTravelLength; varying vec2 vUv;
  #include <getDistortion_vertex>
  void main(){
    vec3 transformed=position.xyz;
    vec3 distortion=getDistortion((transformed.y+uTravelLength/2.)/uTravelLength);
    transformed.x+=distortion.x; transformed.z+=distortion.y; transformed.y+=-1.*distortion.z;
    vec4 mvPosition=modelViewMatrix*vec4(transformed,1.);
    gl_Position=projectionMatrix*mvPosition;
    vUv=uv;
    ${THREE.ShaderChunk['fog_vertex']}
  }`;

function resizeRendererToDisplaySize(
  renderer: THREE.WebGLRenderer,
  setSize: (w: number, h: number, u: boolean) => void
) {
  const canvas=renderer.domElement;
  const width=canvas.clientWidth, height=canvas.clientHeight;
  if (width<=0||height<=0) return false;
  const needResize=canvas.width!==width||canvas.height!==height;
  if (needResize) setSize(width,height,false);
  return needResize;
}

class CarLights {
  webgl: App; options: HyperspeedOptions;
  colors: number[] | THREE.Color; speed: [number,number]; fade: THREE.Vector2;
  mesh!: THREE.Mesh<THREE.InstancedBufferGeometry, THREE.ShaderMaterial>;

  constructor(webgl: App, options: HyperspeedOptions, colors: number[]|THREE.Color, speed: [number,number], fade: THREE.Vector2) {
    this.webgl=webgl; this.options=options; this.colors=colors; this.speed=speed; this.fade=fade;
  }

  init() {
    const o=this.options;
    const curve=new THREE.LineCurve3(new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,-1));
    const geometry=new THREE.TubeGeometry(curve,40,1,8,false);
    const instanced=new THREE.InstancedBufferGeometry().copy(geometry as any) as THREE.InstancedBufferGeometry;
    instanced.instanceCount=o.lightPairsPerRoadWay*2;
    const laneWidth=o.roadWidth/o.lanesPerRoad;
    const aOffset:number[]=[],aMetrics:number[]=[],aColor:number[]=[];
    const colorArray:THREE.Color[]=Array.isArray(this.colors)
      ? this.colors.map(c=>new THREE.Color(c))
      : [new THREE.Color(this.colors)];

    for (let i=0;i<o.lightPairsPerRoadWay;i++) {
      const radius=random(o.carLightsRadius), length=random(o.carLightsLength), spd=random(this.speed);
      const carLane=i%o.lanesPerRoad;
      let laneX=carLane*laneWidth-o.roadWidth/2+laneWidth/2;
      const carWidth=random(o.carWidthPercentage)*laneWidth;
      laneX+=random(o.carShiftX)*laneWidth;
      const offsetY=random(o.carFloorSeparation)+radius*1.3, offsetZ=-random(o.length);
      aOffset.push(laneX-carWidth/2,offsetY,offsetZ, laneX+carWidth/2,offsetY,offsetZ);
      aMetrics.push(radius,length,spd, radius,length,spd);
      const color=pickRandom<THREE.Color>(colorArray);
      aColor.push(color.r,color.g,color.b, color.r,color.g,color.b);
    }

    instanced.setAttribute('aOffset',new THREE.InstancedBufferAttribute(new Float32Array(aOffset),3,false));
    instanced.setAttribute('aMetrics',new THREE.InstancedBufferAttribute(new Float32Array(aMetrics),3,false));
    instanced.setAttribute('aColor',new THREE.InstancedBufferAttribute(new Float32Array(aColor),3,false));

    const dist=this.options.distortion;
    const material=new THREE.ShaderMaterial({
      fragmentShader:carLightsFragment, vertexShader:carLightsVertex, transparent:true,
      uniforms:Object.assign(
        { uTime:{value:0}, uTravelLength:{value:o.length}, uFade:{value:this.fade} },
        this.webgl.fogUniforms,
        (typeof dist==='object' ? dist.uniforms : {})||{}
      ),
    });
    material.onBeforeCompile=shader=>{
      shader.vertexShader=shader.vertexShader.replace(
        '#include <getDistortion_vertex>',
        typeof dist==='object' ? dist.getDistortion : ''
      );
    };
    const mesh=new THREE.Mesh(instanced,material);
    mesh.frustumCulled=false;
    this.webgl.scene.add(mesh);
    this.mesh=mesh;
  }

  update(time: number) {
    if (this.mesh.material.uniforms.uTime) this.mesh.material.uniforms.uTime.value=time;
  }
}

class LightsSticks {
  webgl: App; options: HyperspeedOptions;
  mesh!: THREE.Mesh<THREE.InstancedBufferGeometry, THREE.ShaderMaterial>;

  constructor(webgl: App, options: HyperspeedOptions) { this.webgl=webgl; this.options=options; }

  init() {
    const o=this.options;
    const geometry=new THREE.PlaneGeometry(1,1);
    const instanced=new THREE.InstancedBufferGeometry().copy(geometry as any) as THREE.InstancedBufferGeometry;
    const totalSticks=o.totalSideLightSticks;
    instanced.instanceCount=totalSticks;
    const stickoffset=o.length/(totalSticks-1);
    const aOffset:number[]=[],aColor:number[]=[],aMetrics:number[]=[];
    const colorArray:THREE.Color[]=Array.isArray(o.colors.sticks)
      ? (o.colors.sticks as unknown as number[]).map(c=>new THREE.Color(c))
      : [new THREE.Color(o.colors.sticks)];

    for (let i=0;i<totalSticks;i++) {
      const width=random(o.lightStickWidth), height=random(o.lightStickHeight);
      aOffset.push((i-1)*stickoffset*2+stickoffset*Math.random());
      const color=pickRandom<THREE.Color>(colorArray);
      aColor.push(color.r,color.g,color.b);
      aMetrics.push(width,height);
    }

    instanced.setAttribute('aOffset',new THREE.InstancedBufferAttribute(new Float32Array(aOffset),1,false));
    instanced.setAttribute('aColor',new THREE.InstancedBufferAttribute(new Float32Array(aColor),3,false));
    instanced.setAttribute('aMetrics',new THREE.InstancedBufferAttribute(new Float32Array(aMetrics),2,false));

    const dist=this.options.distortion;
    const material=new THREE.ShaderMaterial({
      fragmentShader:sideSticksFragment, vertexShader:sideSticksVertex, side:THREE.DoubleSide,
      uniforms:Object.assign(
        { uTravelLength:{value:o.length}, uTime:{value:0} },
        this.webgl.fogUniforms,
        (typeof dist==='object' ? dist.uniforms : {})||{}
      ),
    });
    material.onBeforeCompile=shader=>{
      shader.vertexShader=shader.vertexShader.replace(
        '#include <getDistortion_vertex>',
        typeof dist==='object' ? dist.getDistortion : ''
      );
    };
    const mesh=new THREE.Mesh(instanced,material);
    mesh.frustumCulled=false;
    this.webgl.scene.add(mesh);
    this.mesh=mesh;
  }

  update(time: number) {
    if (this.mesh.material.uniforms.uTime) this.mesh.material.uniforms.uTime.value=time;
  }
}

class Road {
  webgl: App; options: HyperspeedOptions; uTime:{value:number};
  leftRoadWay!:THREE.Mesh; rightRoadWay!:THREE.Mesh; island!:THREE.Mesh;

  constructor(webgl: App, options: HyperspeedOptions) {
    this.webgl=webgl; this.options=options; this.uTime={value:0};
  }

  createPlane(side: number, width: number, isRoad: boolean) {
    const o=this.options;
    const geometry=new THREE.PlaneGeometry(isRoad?o.roadWidth:o.islandWidth, o.length, 20, 100);
    let uniforms:Record<string,{value:any}>={
      uTravelLength:{value:o.length},
      uColor:{value:new THREE.Color(isRoad?o.colors.roadColor:o.colors.islandColor)},
      uTime:this.uTime,
    };
    if (isRoad) {
      uniforms=Object.assign(uniforms,{
        uLanes:{value:o.lanesPerRoad},
        uBrokenLinesColor:{value:new THREE.Color(o.colors.brokenLines)},
        uShoulderLinesColor:{value:new THREE.Color(o.colors.shoulderLines)},
        uShoulderLinesWidthPercentage:{value:o.shoulderLinesWidthPercentage},
        uBrokenLinesLengthPercentage:{value:o.brokenLinesLengthPercentage},
        uBrokenLinesWidthPercentage:{value:o.brokenLinesWidthPercentage},
      });
    }
    const dist=this.options.distortion;
    const material=new THREE.ShaderMaterial({
      fragmentShader:isRoad?roadFragment:islandFragment, vertexShader:roadVertex, side:THREE.DoubleSide,
      uniforms:Object.assign(uniforms, this.webgl.fogUniforms, (typeof dist==='object'?dist.uniforms:{})||{}),
    });
    material.onBeforeCompile=shader=>{
      shader.vertexShader=shader.vertexShader.replace(
        '#include <getDistortion_vertex>',
        typeof dist==='object'?dist.getDistortion:''
      );
    };
    const mesh=new THREE.Mesh(geometry,material);
    mesh.rotation.x=-Math.PI/2;
    mesh.position.z=-o.length/2;
    mesh.position.x+=(o.islandWidth/2+o.roadWidth/2)*side;
    this.webgl.scene.add(mesh);
    return mesh;
  }

  init() {
    this.leftRoadWay=this.createPlane(-1,this.options.roadWidth,true);
    this.rightRoadWay=this.createPlane(1,this.options.roadWidth,true);
    this.island=this.createPlane(0,this.options.islandWidth,false);
  }

  update(time: number) { this.uTime.value=time; }
}

class App {
  container: HTMLElement; options: HyperspeedOptions;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera; scene: THREE.Scene;
  timer: THREE.Timer; assets: Record<string,any>; disposed: boolean;
  road: Road; leftCarLights: CarLights; rightCarLights: CarLights; leftSticks: LightsSticks;
  fogUniforms: Record<string,{value:any}>;
  fovTarget: number; speedUpTarget: number; speedUp: number; timeOffset: number; hasValidSize: boolean;

  constructor(container: HTMLElement, options: HyperspeedOptions) {
    this.options=options;
    if (!this.options.distortion) {
      this.options.distortion={ uniforms:distortion_uniforms, getDistortion:distortion_vertex };
    }
    this.container=container; this.hasValidSize=false;
    const initW=Math.max(1,container.offsetWidth), initH=Math.max(1,container.offsetHeight);
    this.renderer=new THREE.WebGLRenderer({ antialias:false, alpha:true });
    this.renderer.setSize(initW,initH,false);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(this.renderer.domElement);
    this.camera=new THREE.PerspectiveCamera(options.fov,initW/initH,0.1,10000);
    this.camera.position.z=-5; this.camera.position.y=8; this.camera.position.x=0;
    this.scene=new THREE.Scene(); this.scene.background=null;
    const fog=new THREE.Fog(options.colors.background,options.length*0.2,options.length*500);
    this.scene.fog=fog;
    this.fogUniforms={ fogColor:{value:fog.color}, fogNear:{value:fog.near}, fogFar:{value:fog.far} };
    this.timer=new THREE.Timer(); this.timer.connect(document);
    this.assets={}; this.disposed=false;
    this.road=new Road(this,options);
    this.leftCarLights=new CarLights(this,options,options.colors.leftCars,options.movingAwaySpeed,new THREE.Vector2(0,1-options.carLightsFade));
    this.rightCarLights=new CarLights(this,options,options.colors.rightCars,options.movingCloserSpeed,new THREE.Vector2(1,0+options.carLightsFade));
    this.leftSticks=new LightsSticks(this,options);
    this.fovTarget=options.fov; this.speedUpTarget=0; this.speedUp=0; this.timeOffset=0;
    this.tick=this.tick.bind(this); this.init=this.init.bind(this); this.setSize=this.setSize.bind(this);
    this.onMouseDown=this.onMouseDown.bind(this); this.onMouseUp=this.onMouseUp.bind(this);
    this.onTouchStart=this.onTouchStart.bind(this); this.onTouchEnd=this.onTouchEnd.bind(this);
    this.onContextMenu=this.onContextMenu.bind(this); this.onWindowResize=this.onWindowResize.bind(this);
    window.addEventListener('resize',this.onWindowResize);
    if (container.offsetWidth>0&&container.offsetHeight>0) this.hasValidSize=true;
  }

  onWindowResize() {
    const w=this.container.offsetWidth, h=this.container.offsetHeight;
    if (w<=0||h<=0) { this.hasValidSize=false; return; }
    this.renderer.setSize(w,h); this.camera.aspect=w/h; this.camera.updateProjectionMatrix();
    this.hasValidSize=true;
  }

  initPasses() { /* no postprocessing — render directly */ }

  loadAssets(): Promise<void> {
    return Promise.resolve();
  }

  init() {
    this.initPasses();
    const o=this.options;
    this.road.init();
    this.leftCarLights.init(); this.leftCarLights.mesh.position.setX(-o.roadWidth/2-o.islandWidth/2);
    this.rightCarLights.init(); this.rightCarLights.mesh.position.setX(o.roadWidth/2+o.islandWidth/2);
    this.leftSticks.init(); this.leftSticks.mesh.position.setX(-(o.roadWidth+o.islandWidth/2));
    this.container.addEventListener('mousedown',this.onMouseDown);
    this.container.addEventListener('mouseup',this.onMouseUp);
    this.container.addEventListener('mouseout',this.onMouseUp);
    this.container.addEventListener('touchstart',this.onTouchStart,{passive:true});
    this.container.addEventListener('touchend',this.onTouchEnd,{passive:true});
    this.container.addEventListener('touchcancel',this.onTouchEnd,{passive:true});
    this.container.addEventListener('contextmenu',this.onContextMenu);
    this.tick();
  }

  onMouseDown(ev: MouseEvent) { if (this.options.onSpeedUp) this.options.onSpeedUp(ev); this.fovTarget=this.options.fovSpeedUp; this.speedUpTarget=this.options.speedUp; }
  onMouseUp(ev: MouseEvent) { if (this.options.onSlowDown) this.options.onSlowDown(ev); this.fovTarget=this.options.fov; this.speedUpTarget=0; }
  onTouchStart(ev: TouchEvent) { if (this.options.onSpeedUp) this.options.onSpeedUp(ev); this.fovTarget=this.options.fovSpeedUp; this.speedUpTarget=this.options.speedUp; }
  onTouchEnd(ev: TouchEvent) { if (this.options.onSlowDown) this.options.onSlowDown(ev); this.fovTarget=this.options.fov; this.speedUpTarget=0; }
  onContextMenu(ev: MouseEvent) { ev.preventDefault(); }

  update(delta: number) {
    const lp=Math.exp(-(-60*Math.log2(1-0.1))*delta);
    this.speedUp+=lerp(this.speedUp,this.speedUpTarget,lp,0.00001);
    this.timeOffset+=this.speedUp*delta;
    const time=this.timer.getElapsed()+this.timeOffset;
    this.rightCarLights.update(time); this.leftCarLights.update(time);
    this.leftSticks.update(time); this.road.update(time);
    let updateCamera=false;
    const fovChange=lerp(this.camera.fov,this.fovTarget,lp);
    if (fovChange!==0) { this.camera.fov+=fovChange*delta*6; updateCamera=true; }
    const dist=this.options.distortion;
    if (typeof dist==='object'&&dist.getJS) {
      const d=dist.getJS(0.025,time);
      this.camera.lookAt(new THREE.Vector3(this.camera.position.x+d.x,this.camera.position.y+d.y,this.camera.position.z+d.z));
      updateCamera=true;
    }
    if (updateCamera) this.camera.updateProjectionMatrix();
  }

  render(delta: number) { this.renderer.render(this.scene, this.camera); }

  dispose() {
    this.disposed=true; this.timer.dispose();
    this.scene.traverse(obj=>{
      const o=obj as unknown as THREE.Mesh;
      if (!o.isMesh) return;
      o.geometry?.dispose();
      if (Array.isArray(o.material)) o.material.forEach(m=>m.dispose());
      else (o.material as THREE.Material)?.dispose();
    });
    this.scene.clear();
    this.renderer.dispose(); this.renderer.forceContextLoss();
    this.renderer.domElement?.parentNode?.removeChild(this.renderer.domElement);
    window.removeEventListener('resize',this.onWindowResize);
    this.container.removeEventListener('mousedown',this.onMouseDown);
    this.container.removeEventListener('mouseup',this.onMouseUp);
    this.container.removeEventListener('mouseout',this.onMouseUp);
    this.container.removeEventListener('touchstart',this.onTouchStart);
    this.container.removeEventListener('touchend',this.onTouchEnd);
    this.container.removeEventListener('touchcancel',this.onTouchEnd);
    this.container.removeEventListener('contextmenu',this.onContextMenu);
  }

  setSize(width: number, height: number, updateStyles: boolean) {
    this.renderer.setSize(width, height, updateStyles);
  }

  tick() {
    if (this.disposed) return;
    if (!this.hasValidSize) {
      const w=this.container.offsetWidth, h=this.container.offsetHeight;
      if (w>0&&h>0) {
        this.renderer.setSize(w,h,false); this.camera.aspect=w/h; this.camera.updateProjectionMatrix();
        this.hasValidSize=true; this.timer.reset();
      } else { requestAnimationFrame(this.tick); return; }
    }
    if (resizeRendererToDisplaySize(this.renderer,this.setSize)) {
      const canvas=this.renderer.domElement;
      if (this.hasValidSize) { this.camera.aspect=canvas.clientWidth/canvas.clientHeight; this.camera.updateProjectionMatrix(); }
    }
    if (this.hasValidSize) {
      this.timer.update();
      const delta=this.timer.getDelta();
      this.render(delta); this.update(delta);
    }
    requestAnimationFrame(this.tick);
  }
}

const AERIAL_AURA_OPTIONS: Partial<HyperspeedOptions> = {
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 9,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  movingAwaySpeed:   [55, 75],
  movingCloserSpeed: [-110, -150],
  colors: {
    roadColor:     0x080A0C,
    islandColor:   0x0B0D10,
    background:    0x000000,
    shoulderLines: 0x1a1f25,
    brokenLines:   0x1a1f25,
    // copper brand + drone engine glow: deep crimson → brand copper → vivid amber
    leftCars:  [0x8B1208, 0xC1682E, 0xE84A18],
    // sky brand + drone propeller teal: dark teal → brand sky → bright cyan
    rightCars: [0x0D6E94, 0x59D6F2, 0x8AE8FF],
    sticks:    0x59D6F2,
  },
};

const Hyperspeed: FC<HyperspeedProps> = ({ effectOptions = AERIAL_AURA_OPTIONS }) => {
  const hyperspeed = useRef<HTMLDivElement>(null);
  const appRef = useRef<App | null>(null);

  useEffect(() => {
    if (appRef.current) {
      appRef.current.dispose();
      appRef.current = null;
      const c=hyperspeed.current;
      if (c) while (c.firstChild) c.removeChild(c.firstChild);
    }
    const container = hyperspeed.current;
    if (!container) return;
    const options: HyperspeedOptions = {
      ...defaultOptions,
      ...effectOptions,
      colors: { ...defaultOptions.colors, ...effectOptions.colors },
    };
    if (typeof options.distortion==='string') {
      options.distortion=distortions[options.distortion];
    }
    const myApp=new App(container,options);
    appRef.current=myApp;
    myApp.loadAssets().then(myApp.init);
    return () => { appRef.current?.dispose(); };
  }, [effectOptions]);

  return <div id="lights" ref={hyperspeed} />;
};

export default Hyperspeed;
