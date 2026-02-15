// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.y = 1.6;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({ color: 0x444444 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Player movement
const keys = {};
document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

// Enemy
const enemy = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
enemy.position.set(0, 0.5, -10);
scene.add(enemy);

// Bullet
const bullets = [];
document.addEventListener("click", () => {
  const bullet = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xffff00 })
  );
  bullet.position.copy(camera.position);
  bullet.velocity = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
  bullets.push(bullet);
  scene.add(bullet);
});

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Game Loop
function animate() {
  requestAnimationFrame(animate);

  const speed = 0.1;
  if (keys["w"]) camera.position.z -= speed;
  if (keys["s"]) camera.position.z += speed;
  if (keys["a"]) camera.position.x -= speed;
  if (keys["d"]) camera.position.x += speed;

  bullets.forEach((b, i) => {
    b.position.add(b.velocity.clone().multiplyScalar(0.5));

    if (b.position.distanceTo(enemy.position) < 1) {
      scene.remove(enemy);
      alert("Musuh Kalah!");
    }
  });

  renderer.render(scene, camera);
}

animate();
