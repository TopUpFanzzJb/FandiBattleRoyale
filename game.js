let scene, camera, renderer;
let enemies = [];
let playerHP = 100;

function startGame(){
  document.getElementById("lobby").style.display = "none";
  document.getElementById("hud").style.display = "block";
  initGame();
}

function initGame(){
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);

  camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
  camera.position.set(0,1.6,5);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff,1);
  light.position.set(5,10,5);
  scene.add(light);

  // MAP LUAS
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(300,300),
    new THREE.MeshStandardMaterial({color:0x228b22})
  );
  ground.rotation.x = -Math.PI/2;
  scene.add(ground);

  // SPAWN MUSUH
  for(let i=0;i<15;i++){
    spawnEnemy();
  }

  animate();
}

function spawnEnemy(){
  const e = new THREE.Mesh(
    new THREE.BoxGeometry(1,2,1),
    new THREE.MeshStandardMaterial({color:0xff0000})
  );
  e.position.set(
    (Math.random()-0.5)*100,
    1,
    (Math.random()-0.5)*100
  );
  enemies.push(e);
  scene.add(e);
}

// SHOOT
document.getElementById("shoot").onclick = ()=>{
  enemies.forEach((e,i)=>{
    if(e.position.distanceTo(camera.position)<15){
      scene.remove(e);
      enemies.splice(i,1);
    }
  });
};

function animate(){
  requestAnimationFrame(animate);

  enemies.forEach(e=>{
    e.lookAt(camera.position);
    e.position.lerp(camera.position,0.002);

    if(e.position.distanceTo(camera.position)<1.5){
      playerHP -= 0.1;
      document.getElementById("hp").style.width = playerHP+"%";
    }
  });

  renderer.render(scene,camera);
  }
