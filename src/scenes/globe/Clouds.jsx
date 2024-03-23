import { Sphere } from "@react-three/drei";
import { useRef } from "react";

const Clouds = ({
  radius = 4.1,
  widthSegments = 64,
  heightSegments = 64,
  cloudsTexture,
}) => {
  const cloudsRef = useRef();

  useFrame(({ clock }) => {
    if (cloudsRef.current) {
      const cloudsMaterial = cloudsRef.current.material;
      cloudsMaterial.uniforms.time.value = clock.elapsedTime;
    }
  });

  const vertexShader = `
      varying vec3 vPosition;
      varying vec3 vWorldPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

  const fragmentShader = `
    uniform sampler2D cloudTexture;
    uniform float cloudScale;
  
    varying vec3 vWorldPosition;
    varying vec3 vNormal;
  
    void main() {
      vec3 worldPosition = normalize(vWorldPosition);
      vec2 uv = vec2(
        atan(worldPosition.z, worldPosition.x) / (2.0 * 3.14159265359) + 0.5,
        asin(worldPosition.y) / 3.14159265359 + 0.5
      );
      uv *= cloudScale;
      vec4 texColor = texture2D(cloudTexture, uv);
      gl_FragColor = vec4(texColor.rgb, texColor.a);
    }
  `;

  const uniforms = {
    time: { value: 0 },
    cloudsTexture: { value: cloudsTexture },
  };

  return (
    <Sphere
      ref={cloudsRef}
      position={[0, 0, 0]}
      args={[radius, widthSegments, heightSegments]}
    >
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </Sphere>
  );
};
