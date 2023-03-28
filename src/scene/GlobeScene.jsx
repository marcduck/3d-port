import { Box, OrbitControls, Sphere, Stars, useHelper } from '@react-three/drei'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import React, { useRef } from 'react'
import { AdditiveBlending, BackSide, DoubleSide, PointLightHelper, TextureLoader } from 'three'

const globeVertexShader = `
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

`
const globeFragmentShader = `
varying vec2 vUv;
varying vec3 vertexNormal;

void main() {
    float intensity = 1.05 - dot(vertexNormal, vec3(0, 0, 1));
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);

    gl_FragColor = vec4(atmosphere, 1.0);
}

`

const atmosphereVertexShader = `
varying vec3 vertexNormal;

void main() {
    vertexNormal = normalize(normalMatrix * normal);
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
  
    gl_Position = projectedPosition;
}

`
const atmosphereFragmentShader = `
varying vec3 vertexNormal;

void main() {
    float intensity = pow(0.65 - dot(vertexNormal, vec3(0, 0, 1)), 2.0);

    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
}

`

function Globe({scale=1, children, segments=128}) {





    return <Sphere 
        args={[5, segments*2, segments]} 
        scale={scale}
        >{children}
    </Sphere>
}

function Spin({children}) {
    const ref = useRef();
    useFrame(() => {
        ref.current.rotation.y += 0.0005;
    });

    return <group ref={ref}>{children}</group>
}

function House({position, children}) {
    return <group>
        <Box args={[0.3, 0.3, 0.4]} position={[5, 1, 0]}>
            <meshLambertMaterial color={"grey"} />
        </Box>
    </group>
}


function GlobeScene(){

    const colorMap = useLoader(TextureLoader, '/textures/1_earth_8k.jpg')
    const nightColorMap = useLoader(TextureLoader, '/textures/5_night_8k.jpg')
    const bumpMap = useLoader(TextureLoader, '/textures/elev_bump_8k.jpg')
    const citiesMap = useLoader(TextureLoader, '/textures/cities_8k.png')

    const point = useRef()

    useHelper(point, PointLightHelper, 'cyan' )
    return (
      <>

        <pointLight ref={point} intensity={0.3} position={[20, 0, 0]} />
        <ambientLight intensity={0.4} />
        <OrbitControls enablePan={false} />
        <perspectiveCamera 
            makeDefault 
            fov={75} 
            far={1000} 
            near={0.1} 
            position={[0, 0, 0]}
            />
        
        <Spin>
            {/* Earth - radius:  */}
            <Globe segments={256} >
                <meshPhongMaterial 
                    map={colorMap} 
                    displacementMap={bumpMap} 
                    displacementScale={2}
                    // displacementBias}
                    
                />
            </Globe >
            <House />

            {/* Inner atmosphere */}
            <Globe scale={1.01} >
            <shaderMaterial  
                vertexShader={globeVertexShader}
                fragmentShader={globeFragmentShader}
                blending={AdditiveBlending}

            />
            </Globe >
            {/* Outer Atmosphere */}
            <Globe 
                scale={1.2}
            >
                <shaderMaterial  
                    vertexShader={atmosphereVertexShader}
                    fragmentShader={atmosphereFragmentShader}
                    blending={AdditiveBlending}
                    side={BackSide}
                />
            </Globe>
        </Spin>

        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      </>
    )
  }

export default GlobeScene