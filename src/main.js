import './style.css'
import * as THREE from 'three';

// CONFIGURACIÓN ESCENA
const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

// 5 GRUPOS PARA TUS 5 ESCENAS
const sceneGroup1 = new THREE.Group();
const sceneGroup2 = new THREE.Group();
const sceneGroup3 = new THREE.Group();
const sceneGroup4 = new THREE.Group();
const sceneGroup5 = new THREE.Group();

// Posicionamos los grupos verticalmente para el scroll
const objectsDistance = 4;
sceneGroup2.position.y = -objectsDistance * 1;
sceneGroup3.position.y = -objectsDistance * 2;
sceneGroup4.position.y = -objectsDistance * 3;
sceneGroup5.position.y = -objectsDistance * 4;

scene.add(sceneGroup1, sceneGroup2, sceneGroup3, sceneGroup4, sceneGroup5);

/**
 * AQUÍ DEBES AGREGAR TUS ELEMENTOS A CADA GRUPO
 * Ejemplo: sceneGroup1.add(tuModelo1);
 */

// Placeholder para visualización (puedes borrar esto al poner tus escenas)
const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc, wireframe: true });
sceneGroup1.add(new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.4, 16, 60), material));
sceneGroup2.add(new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material));
sceneGroup3.add(new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 1.5), material));
sceneGroup4.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1), material));
sceneGroup5.add(new THREE.Mesh(new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16), material));

// LUCES
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(1, 1, 3);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));

// TAMAÑO Y CÁMARA
const sizes = { width: window.innerWidth, height: window.innerHeight };
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 6;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(sizes.width, sizes.height);

// MANEJO DE SCROLL
let scrollY = window.scrollY;
window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
});

// ANIMACIÓN
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Animación suave de la cámara siguiendo el scroll
  camera.position.y = -scrollY / sizes.height * objectsDistance;

  // Animación sutil de rotación para todos los grupos
  [sceneGroup1, sceneGroup2, sceneGroup3, sceneGroup4, sceneGroup5].forEach((group) => {
    group.rotation.y = elapsedTime * 0.2;
    group.rotation.x = elapsedTime * 0.1;
  });

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

tick();