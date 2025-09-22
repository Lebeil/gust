// gradient.frag
#pragma glslify: noise = require('glsl-noise/simplex/3d')

uniform float uTime;
uniform float uScrollProgress;
uniform vec3 uColourPalette[4];  // Color palette
uniform float uUvScale; 
uniform float uUvDistortionIterations;
uniform float uUvDistortionIntensity;

varying vec2 vUv;

vec3 cosineGradientColour(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
return clamp(a + 0.5 * b * cos(3.14159 * (c * t + d)), 0.0, 1.0);
}

void main() {
  vec2 uv = vUv;
  uv.y -= uScrollProgress;
  uv *= uUvScale;

  for (float i = 0.0; i < uUvDistortionIterations; i++) {
    uv += noise(vec3(uv - i * 0.2, uTime + i * 32.)) * uUvDistortionIntensity;
  }

float n = noise(vec3(uv * 1.0, sin(uTime))) * 0.5 + 0.5;

vec3 colour = vec3(0.0);
float totalWeight = 0.0;

for (int i = 0; i < 4; i++) {
  // Each color has its own offset into the noise
  float offset = float(i) * 10.0;
  float weight = 1.0 - abs(n - float(i) / 3.0); // inverse distance to normalized slot
  weight = max(weight, 0.0); // avoid negatives
  colour += uColourPalette[i] * weight;
  totalWeight += weight;
}

colour /= totalWeight;

  gl_FragColor = vec4(colour, 1.0);
}