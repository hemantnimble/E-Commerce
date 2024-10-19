'use client'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

interface ModelProps {
    path: string;
}

const Model = ({ path }: ModelProps) => {
    const { scene } = useGLTF(path);
    return <primitive object={scene} scale={3} />;
};

function Model3d() {
    return (
        <div className="w-full h-full">
            <Canvas>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[0, 5, 5]} intensity={1} />
                    <Model path="/assets/sofa3d.glb" />
                    <OrbitControls enableZoom={true} />
                </Suspense>
            </Canvas>
        </div>)
}

export default Model3d