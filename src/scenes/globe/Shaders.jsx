export const globeVertexShader = `
varying vec2 vUv;
varying vec3 vertexNormal;

void main() {
    vUv = uv;
    vertexNormal = normalize(normalMatrix * normal);
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
  
    gl_Position = projectedPosition;
}

`;
export const globeFragmentShader = `
varying vec2 vUv;
varying vec3 vertexNormal;

void main() {
    float intensity = 1.05 - dot(vertexNormal, vec3(0, 0, 1));
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);

    gl_FragColor = vec4(atmosphere, 1.0);
}

`;

export const atmosphereVertexShader = `
varying vec3 vertexNormal;

void main() {
    vertexNormal = normalize(normalMatrix * normal);
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
  
    gl_Position = projectedPosition;
}

`;
export const atmosphereFragmentShader = `
varying vec3 vertexNormal;

void main() {
    float intensity = pow(0.65 - dot(vertexNormal, vec3(0, 0, 1)), 2.0);

    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
}

`;
