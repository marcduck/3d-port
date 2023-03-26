import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { Box, CubeCamera, Environment, OrbitControls, PerspectiveCamera, SoftShadows, Sphere, useEnvironment } from '@react-three/drei'


import DefaultScene from '../scene/DefaultScene'



function ThreeScene(){
    const envMap = useEnvironment({ files: './assets/fouriesburg_mountain_cloudy_4k.hdr' })
    // const envMap = useEnvironment({ files: './textures/envmap.hdr' })

    return (
        <>
            <Suspense fallback={null}>
                <Environment map={envMap} background={"both"}   />
                <OrbitControls />
                <PerspectiveCamera envMap={envMap} makeDefault position={[0, 20, 5]} fov={75} near={0.01} far={1000} />
                <pointLight position={[10, 10, 10]} />
                <ambientLight />
                <DefaultScene />
            </Suspense>
        </>
    )
}


function R3fDemo() {
  return (
    <>
        <Canvas shadows={'soft'} className=''>
            <ThreeScene />
        </Canvas>
    </>
  )
}

export default R3fDemo

