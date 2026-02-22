import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ParticleField = ({ count = 20 }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // --- Scene Setup ---
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
        camera.position.z = 800;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xffffff, 0);
        containerRef.current.appendChild(renderer.domElement);

        // --- Premium Soft Bokeh Texture ---
        const createBokehTexture = () => {
            const size = 256;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            const center = size / 2;

            const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.4)');
            gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.05)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, size, size);

            return new THREE.CanvasTexture(canvas);
        };

        // --- Institutional Orbs ---
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        const opacities = new Float32Array(count);
        const wanderOffsets = new Float32Array(count * 3);

        const range = 1200;
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * range * 2.5;
            positions[i3 + 1] = (Math.random() - 0.5) * range * 1.5;
            positions[i3 + 2] = (Math.random() - 0.5) * range * 0.5;

            scales[i] = Math.random() * 80 + 40; // Extremely large, soft orbs
            opacities[i] = Math.random() * 0.4 + 0.1;

            wanderOffsets[i3] = Math.random() * 1000;
            wanderOffsets[i3 + 1] = Math.random() * 1000;
            wanderOffsets[i3 + 2] = Math.random() * 1000;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
        geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uTexture: { value: createBokehTexture() },
                uColor: { value: new THREE.Color(0xe0e7ff) }, // Very soft Indigo-50/100
            },
            vertexShader: `
        attribute float scale;
        attribute float opacity;
        varying float vOpacity;
        uniform float uTime;
        void main() {
          vOpacity = opacity;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = scale * (1000.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
            fragmentShader: `
        varying float vOpacity;
        uniform sampler2D uTexture;
        uniform vec3 uColor;
        void main() {
          vec4 texColor = texture2D(uTexture, gl_PointCoord);
          gl_FragColor = vec4(uColor, texColor.a * vOpacity);
        }
      `,
            transparent: true,
            depthTest: false,
            blending: THREE.AdditiveBlending
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // --- Animation Logic ---
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        const clock = new THREE.Clock();

        const animate = () => {
            const time = clock.getElapsedTime();
            material.uniforms.uTime.value = time;

            const positions = geometry.attributes.position.array;
            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                // Slow drifting wander
                positions[i3] += Math.sin(time * 0.1 + wanderOffsets[i3]) * 0.2;
                positions[i3 + 1] += Math.cos(time * 0.15 + wanderOffsets[i3 + 1]) * 0.2;
            }

            geometry.attributes.position.needsUpdate = true;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, [count]);

    return (
        <div className="absolute inset-0 w-full h-full bg-[#f8fafc]">
            {/* Visual background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-slate-50/50" />
            <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" />
        </div>
    );
};

export default ParticleField;
