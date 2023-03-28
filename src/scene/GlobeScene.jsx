import { Box, OrbitControls, Sphere, Stars, useHelper } from '@react-three/drei'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import React, { useRef } from 'react'
import { AdditiveBlending, BackSide, DoubleSide, MultiplyBlending, NormalBlending, PointLightHelper, TextureLoader } from 'three'

import colorMapImg from '/textures/1_earth_8k.jpg'
import moonColorMapImg from '/textures/moon_1k.jpg'
import bumpMapImg from '/textures/elev_bump_8k.jpg'

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

function Globe({scale=1, children, segments=128, renderOrder=0}) {





    return <Sphere 
        renderOrder={renderOrder}
        castShadow
        args={[4, segments*2, segments]} 
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

function Moon({ segments = 32, scale = 1, children, showPerf, setShowPerf }) {
    const moonRef = useRef();
  
    useFrame(({ clock }) => {
      const t = clock.getElapsedTime(); // Get time elapsed since animation started
      const moonRadius = 15; // Distance from earth to moon
      const moonSpeed = 0.05; // Speed at which the moon orbits the earth
      const moonX = Math.sin(t * moonSpeed) * moonRadius; // Calculate x coordinate
      const moonZ = Math.cos(t * moonSpeed) * moonRadius; // Calculate z coordinate
  
      // Set position of moon relative to earth
      moonRef.current.position.set(moonX, 0, moonZ);
    });
  
    return (
      <Sphere 
        onClick={() => setShowPerf(!showPerf)} 
        ref={moonRef} 
        args={[1, segments * 2, segments]} 
        scale={scale} 
        rotation={[0,45,60]}
        renderOrder={-2}
      >
        {children}
      </Sphere>
    );
  }

function House({position, children}) {
    return <group>
        <Box castShadow args={[0.3, 0.3, 0.4]} position={[5, 1, 0]}>
            <meshLambertMaterial color={"grey"}  />
        </Box>
    </group>
}

function positionOnSurface() {
    // latitude and longitude in degrees
    const latitude = 45;
    const longitude = -90;

    // convert latitude and longitude to radians
    const latRad = (latitude / 180) * Math.PI;
    const lonRad = (longitude / 180) * Math.PI;

    // calculate the position vector of the cube
    const x = 4 * Math.cos(latRad) * Math.cos(lonRad);
    const y = 4 * Math.sin(latRad);
    const z = 4 * Math.cos(latRad) * Math.sin(lonRad);

    // create the cube geometry and material
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

    // create the cube mesh and set its position and rotation
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(x, y, z);
    cube.lookAt(0, 0, 0);

    return cube

}

function GlobeScene({showPerf, setShowPerf}){

    const colorMap = useLoader(TextureLoader, colorMapImg)
    const moonColorMap = useLoader(TextureLoader, moonColorMapImg)
    // const nightColorMap = useLoader(TextureLoader, '/textures/5_night_8k.jpg')
    // const citiesMap = useLoader(TextureLoader, '/textures/cities_8k.png')
    const bumpMap = useLoader(TextureLoader, bumpMapImg)

    const point = useRef()

    useHelper(point, PointLightHelper, 'cyan' )
    return (
      <>

        <pointLight ref={point} intensity={0.3} position={[20, 0, 0]} />
        <ambientLight intensity={0.4} />
        <OrbitControls enablePan={false} />

        
        <Spin>
            {/* Earth - radius:  */}
            <Globe segments={256} >
                <meshPhongMaterial 
                    map={colorMap} 
                    displacementMap={bumpMap} 
                    displacementScale={3}
                    // displacementBias}
                    
                />
            </Globe >
            {/* Earth - radius:  */}


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
                    renderOrder={-1}

                scale={1.2}
            >
                <shaderMaterial  
                    vertexShader={atmosphereVertexShader}
                    fragmentShader={atmosphereFragmentShader}
                    blending={AdditiveBlending}
                    side={BackSide}
                    depthTest={false}
                />
            </Globe>
        </Spin>
        <Moon showPerf={showPerf} setShowPerf={setShowPerf} >
            <meshLambertMaterial map={moonColorMap} />
        </Moon >

        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      </>
    )
  }

export default GlobeScene