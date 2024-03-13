import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';
import './style.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

document.addEventListener('DOMContentLoaded', () => {
  // Your Three.js code here
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg')
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.set(0,100,0);

  camera.lookAt(new THREE.Vector3(0, 0, 0));

  renderer.render(scene, camera);

  const orbit = new THREE.Object3D();
  scene.add(orbit);

  const earthTexture = new THREE.TextureLoader().load('earth.jpg');
  const normalTexture = new THREE.TextureLoader().load('normal.jpg');

  const  geometry = new THREE.SphereGeometry(9,20,16,0,6.283185,0,3.14592);
  const material = new THREE.MeshStandardMaterial({map : earthTexture});
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(10,0,70);
  orbit.add(sphere);

  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(-5,-5,5);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  const geometrys = new THREE.SphereGeometry(0.2,24,24);
  const materials = new THREE.MeshBasicMaterial({color : 0xffffff});

  const moonTexture = new THREE.TextureLoader().load('/moon.jpg');
  
  const geo = new THREE.SphereGeometry(4,32,16);
  const map = new THREE.MeshStandardMaterial( { map : moonTexture, normalmap :normalTexture})
  const moon = new THREE.Mesh( geo, map);
  sphere.add(moon);

  moon.position.set(10,0,60);

  //const lightHelper = new THREE.PointLightHelper(pointLight)
  //const gridHelper = new THREE.GridHelper(200, 50);
  //scene.add(lightHelper, gridHelper)

  const controls = new OrbitControls(camera, renderer.domElement);

  function addStar() {
    const star = new THREE.Mesh(geometrys, materials);

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(250));
    
    star.position.set(x,y,z);
    scene.add(star);
    }

  Array(200).fill().forEach(addStar);
  
  
  function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.01;

    orbit.rotation.y += 0.003;

    moon.rotation.x += 0.005;
    moon.rotation.y += 0.0075;
    moon.rotation.z += 0.005;

    //controls.update();
    renderer.render(scene, camera);
    
  }

  animate()
});


