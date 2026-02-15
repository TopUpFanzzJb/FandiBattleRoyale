let scene,camera,renderer,playerHP=100,enemies=[];
let zoneRadius=80;

const weapons = {
  M4A1:20, SCAR:25, GROZA:30,
  AWM:80, SHOTGUN:50,
  PISTOL:10, KATANA:40, PANCI:5
};

function startGame(){
  lobby.style.display="none";
  hud.style.display="block";
  initGame();
}

function initGame(){
  scene=new THREE.Scene();
  scene.background=new THREE.Color(0x87ceeb);

  camera=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,500);
  camera.position.set(0,3,6); // MIRING TPS
  camera.lookAt(0,1,0);

  renderer=new THREE.WebGLRenderer();
  renderer.setSize(innerWidth,innerHeight);
  document.body.appendChild(renderer.domElement);

  const light=new THREE.DirectionalLight(0xffffff,1);
  light.position.set(5,10,5); scene.add(light);

  const ground=new THREE.Mesh(
    new THREE.PlaneGeometry(300,300),
    new THREE.MeshStandardMaterial({color:0x228b22})
  );
  ground.rotation.x=-Math.PI/2;
  scene.add(ground);

  for(let i=0;i<20;i++) spawnEnemy();
  animate();
}

function spawnEnemy(){
  const e=new THREE.Mesh(
    new THREE.BoxGeometry(1,2,1),
    new THREE.MeshStandardMaterial({color:0xff0000})
  );
  e.hp=50;
  e.position.set((Math.random()-0.5)*150,1,(Math.random()-0.5)*150);
  enemies.push(e); scene.add(e);
}

shoot.onclick=()=>{
  enemies.forEach((e,i)=>{
    if(e.position.distanceTo(camera.position)<20){
      e.hp -= weapons[data.weapon];
      if(e.hp<=0){
        scene.remove(e);
        enemies.splice(i,1);
        data.coin+=50; save();
      }
    }
  });
};

function animate(){
  requestAnimationFrame(animate);

  enemies.forEach(e=>{
    e.lookAt(camera.position);
    e.position.lerp(camera.position,0.002);
    if(e.position.distanceTo(camera.position)<1.5){
      playerHP-=0.1;
      hp.style.width=playerHP+"%";
    }
  });

  // ZONE DAMAGE
  if(camera.position.length()>zoneRadius){
    playerHP-=0.2;
    zone.textContent="DILUAR ZONA!";
  } else zone.textContent="SAFE ZONE";

  renderer.render(scene,camera);
}
