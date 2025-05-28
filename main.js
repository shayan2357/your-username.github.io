import * as THREE from 'https://cdn.skypack.dev/three';

const canvas = document.getElementById('background-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0d0d0d);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 60;

const light = new THREE.PointLight(0x00ffff, 3, 100);
light.position.set(20, 20, 20);
scene.add(light);

// Load texture
const loader = new THREE.TextureLoader();
const coins = ['btc', 'eth', 'sol', 'bnb'];

const coinMeshes = [];

coins.forEach((name, i) => {
  loader.load(`https://cryptologos.cc/logos/${name}-logo.png`, texture => {
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const geometry = new THREE.PlaneGeometry(10, 10);
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100
    );

    scene.add(mesh);
    coinMeshes.push(mesh);
  });
});

// Glowing cubes
const boxGeo = new THREE.BoxGeometry(3, 3, 3);
const boxMat = new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x00ffff, emissiveIntensity: 0.6 });
const cubes = [];

for (let i = 0; i < 20; i++) {
  const box = new THREE.Mesh(boxGeo, boxMat);
  box.position.set(
    (Math.random() - 0.5) * 80,
    (Math.random() - 0.5) * 80,
    (Math.random() - 0.5) * 80
  );
  scene.add(box);
  cubes.push(box);
}

// Animate
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', e => {
  mouseX = (e.clientX / window.innerWidth) - 0.5;
  mouseY = (e.clientY / window.innerHeight) - 0.5;
});

function animate() {
  requestAnimationFrame(animate);

  camera.position.x += (mouseX * 20 - camera.position.x) * 0.05;
  camera.position.y += (-mouseY * 20 - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  cubes.forEach(c => {
    c.rotation.x += 0.01;
    c.rotation.y += 0.01;
  });

  coinMeshes.forEach(coin => {
    coin.rotation.z += 0.003;
  });

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
