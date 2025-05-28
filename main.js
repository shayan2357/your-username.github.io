import * as THREE from 'https://cdn.skypack.dev/three';

const canvas = document.getElementById('background-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0d0d0d);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 50;

// Lights
const light = new THREE.PointLight(0x00ffff, 2, 100);
light.position.set(10, 10, 20);
scene.add(light);

// Floating chart-like boxes
const geometry = new THREE.BoxGeometry(4, 4, 4);
const material = new THREE.MeshStandardMaterial({ color: 0x00ffff });
const boxes = [];

for (let i = 0; i < 30; i++) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(
    (Math.random() - 0.5) * 100,
    (Math.random() - 0.5) * 100,
    (Math.random() - 0.5) * 100
  );
  scene.add(mesh);
  boxes.push(mesh);
}

// Animate
function animate() {
  requestAnimationFrame(animate);

  boxes.forEach((box, i) => {
    box.rotation.x += 0.005 + i * 0.0001;
    box.rotation.y += 0.005 + i * 0.0001;
  });

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
