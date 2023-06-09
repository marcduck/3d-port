import { Box, OrbitControls, Sphere, Stars, useGLTF, useHelper } from '@react-three/drei'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { AdditiveBlending, BackSide, TextureLoader, Vector3 } from 'three'

import colorMapImg from '/textures/1_earth_8k.jpg'
import cloudsColorMapImg from '/textures/fair_clouds_8k.jpg'
import moonColorMapImg from '/textures/moon_1k.jpg'
import bumpMapImg from '/textures/elev_bump_8k.jpg'

import satteliteModelGltf from '/models/satellite_-_low_poly.glb'

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

function Globe({scale=1, children, segments=128, renderOrder=0, castShadow=false, receiveShadow=false, }) {





    return <Sphere 
        renderOrder={renderOrder}
        castShadow
        receiveShadow
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

const Clouds = ({radius = 4.1, widthSegments = 64, heightSegments = 64, cloudsTexture}) => {
    const cloudsRef = useRef();
  
    useFrame(({clock}) => {
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
      <Sphere ref={cloudsRef} position={[0, 0, 0]} args={[radius, widthSegments, heightSegments]}>

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

function ObjectOnSurface({mesh, latitude=45, longitude=-90}) {
    // latitude and longitude in degrees

    // convert latitude and longitude to radians
    const latRad = (latitude / 180) * Math.PI;
    const lonRad = (longitude / 180) * Math.PI;

    // calculate the position vector of the cube
    const x = 4 * Math.cos(latRad) * Math.cos(lonRad);
    const y = 4 * Math.sin(latRad);
    const z = 4 * Math.cos(latRad) * Math.sin(lonRad);


    // create the cube mesh and set its position and rotation
    // const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // cube.position.set(x, y, z);
    // cube.lookAt(0, 0, 0);

    return <Box args={[0.2, 0.4, 0.6]} position={[x, y, z]} rotateOnWorldAxis={["x", latRad]} >
      <meshLambertMaterial color={0xffffff} />
    </Box>

}


function SatelliteModel(props) {
  const { nodes, materials } = useGLTF(satteliteModelGltf);
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 180, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.SatelliteSatellite_mat}
        />
      </group>
    </group>
  );
}


const Satellite = ({ radius = 4, altitude = 1, speed = -0.1, latitude=0, scale=1 }) => {
  const [intensity, setIntensity] = useState(0);
  const pointLightRef = useRef();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIntensity((intensity) => (intensity > 0 ? 0 : 1));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);


  const groupRef = useRef();
  const width = 0.04
  const length = 0.06

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const orbitRadius = radius + altitude;
    const orbitPosition = new Vector3(
      orbitRadius * Math.cos(elapsedTime * speed),
      latitude,
      orbitRadius * Math.sin(elapsedTime * speed)
    );
    groupRef.current.position.copy(orbitPosition);
    pointLightRef.current.position.copy(orbitPosition);
  });

  return (
    <group ref={groupRef}>
        <SatelliteModel scale={0.01*scale} />
        <pointLight
        ref={pointLightRef}
        color="red"
        intensity={intensity*scale}
        distance={9*scale}/>
        <mesh>
          <sphereGeometry args={[0.015*scale, 16, 16]} />
          <meshStandardMaterial color={intensity ? 0xff0000 : 0x330000} />
        </mesh> 
    </group>
  );
};

function GlobeScene({showPerf, setShowPerf}){

    const colorMap = useLoader(TextureLoader, colorMapImg)
    const moonColorMap = useLoader(TextureLoader, moonColorMapImg)
    // const nightColorMap = useLoader(TextureLoader, '/textures/5_night_8k.jpg')
    // const citiesMap = useLoader(TextureLoader, '/textures/cities_8k.png')
    const bumpMap = useLoader(TextureLoader, bumpMapImg)
    const cloudsColorMap = useLoader(TextureLoader, cloudsColorMapImg)

    const point = useRef()

    // useHelper(point, PointLightHelper, 'cyan' )
    return (
      <>

        <pointLight ref={point} intensity={0.3} position={[20, 0, 0]} />
        <ambientLight intensity={0.4} />
        <OrbitControls enablePan={false} />

        
        <Spin>
            {/* Earth - radius:  */}
            <Globe segments={256} renderOrder={-1} castShadow receiveShadow >
                <meshPhongMaterial 
                    map={colorMap} 
                    displacementMap={bumpMap} 
                    displacementScale={3}
                    // displacementBias}
                    
                />
            </Globe >
            {/* Earth - radius:  */}
            
            {/* <Clouds radius={4.1} cloudsTexture={cloudsColorMap} /> */}
            <ObjectOnSurface />
            <Satellite scale={0.6} />
            <Satellite latitude={3.5} radius={2} speed={0.5} scale={0.4} />

            {/* Inner atmosphere */}
            <Globe scale={1.01} renderOrder={0} >
            <shaderMaterial  
                vertexShader={globeVertexShader}
                fragmentShader={globeFragmentShader}
                blending={AdditiveBlending}

            />
            </Globe >
            {/* Outer Atmosphere */}
            <Globe 
                    renderOrder={-2}

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