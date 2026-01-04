import * as THREE from 'three';

/**
 * Three.js Scene Configuration
 * Subtle floating particle sphere for the background
 */

class ThreeScene {
    constructor() {
        this.container = document.getElementById('three-container');
        if (!this.container) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const isMobile = window.innerWidth < 1024;
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: !isMobile, // Disable for performance
            powerPreference: "high-performance"
        });

        this.particles = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.scrollPos = 0;
        this.scrollVelocity = 0;
        this.lastScrollY = 0;
        this.mainObject = null;

        this.init();
    }



    init() {
        // Renderer setup
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        this.camera.position.z = 2.5;

        // Create elements
        this.createParticles();
        this.createMainObject();
        this.addLights();

        // Add events
        window.addEventListener('resize', this.onWindowResize.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('scroll', this.onScroll.bind(this));

        // Start animation
        this.animate();
    }

    createParticles() {
        const isMobile = window.innerWidth < 1024;
        const particlesCount = isMobile ? 400 : 3000;
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);
        const radius = 2.5;

        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;

            // Random spherical distribution with noise
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);

            const r = radius * (0.8 + Math.random() * 0.4);
            positions[i3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = r * Math.cos(phi);

            // Ivory Coast Colors: Orange (#FF8200), White (#FFFFFF), Green (#009A44)
            const rand = Math.random();
            if (rand < 0.33) {
                colors[i3] = 1;      // R (Orangeish)
                colors[i3 + 1] = 0.51; // G
                colors[i3 + 2] = 0;    // B
            } else if (rand < 0.66) {
                colors[i3] = 0;      // R (Greenish)
                colors[i3 + 1] = 0.6;  // G
                colors[i3 + 2] = 0.27; // B
            } else {
                colors[i3] = 1;      // R (White)
                colors[i3 + 1] = 1;    // G
                colors[i3 + 2] = 1;    // B
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.008,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createMainObject() {
        const geometry = new THREE.IcosahedronGeometry(1, 15);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.2,
            roughness: 0.1,
            transmission: 1, // Glass effect
            thickness: 0.5,
            transparent: true,
            wireframe: true,
            opacity: 0.15,
        });

        this.mainObject = new THREE.Mesh(geometry, material);
        this.scene.add(this.mainObject);
    }

    addLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        this.scene.add(pointLight);
    }


    onMouseMove(event) {
        this.mouseX = (event.clientX - window.innerWidth / 2) / 1000;
        this.mouseY = (event.clientY - window.innerHeight / 2) / 1000;
    }

    onScroll() {
        const currentScrollY = window.scrollY;
        this.scrollVelocity = Math.abs(currentScrollY - this.lastScrollY);
        this.lastScrollY = currentScrollY;
        this.scrollPos = currentScrollY / window.innerHeight;
    }


    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        if (window.innerWidth < 1024) {
            // Very simple rotation on mobile
            if (this.particles) this.particles.rotation.y += 0.002;
            if (this.mainObject) this.mainObject.rotation.y += 0.005;
        } else {
            // Smooth mouse movement
            this.targetX += (this.mouseX - this.targetX) * 0.05;
            this.targetY += (this.mouseY - this.targetY) * 0.05;

            if (this.particles) {
                // Base rotation
                const speed = 0.001 + (this.scrollVelocity * 0.0001);
                this.particles.rotation.y += speed;
                this.particles.rotation.x += speed * 0.5;

                // Mouse interaction
                this.particles.rotation.x += (this.targetY - this.particles.rotation.x) * 0.05;
                this.particles.rotation.y += (this.targetX - this.particles.rotation.y) * 0.05;

                // Scroll interaction
                const scrollFactor = this.scrollPos * 0.5;
                this.particles.position.z = -scrollFactor * 4;
                this.particles.rotation.z = scrollFactor * Math.PI * 0.5;

                this.particles.material.opacity = Math.max(0.05, 0.6 - this.scrollPos * 0.4);
            }

            if (this.mainObject) {
                // Rotation complex
                this.mainObject.rotation.y += 0.002;
                this.mainObject.rotation.z += 0.001;

                // Reaction à la souris
                this.mainObject.position.x = this.targetX * 0.5;
                this.mainObject.position.y = -this.targetY * 0.5;

                // Réaction au scroll: scaling et rotation
                const s = 1 + this.scrollPos * 0.5;
                this.mainObject.scale.set(s, s, s);
                this.mainObject.rotation.x = this.scrollPos * Math.PI;

                // Opacité
                this.mainObject.material.opacity = Math.max(0, 0.15 - this.scrollPos * 0.1);
            }
            this.scrollVelocity *= 0.95;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ThreeScene();
});
