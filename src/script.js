import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const bakedShadow = textureLoader.load('/textures/bakedShadow.jpg')
// Debug
const gui = new dat.GUI()

const guiParameters = {
    ambientLightColor : 0xffffff,
    directionalLightColor: 0xffffff,
    hemisphereLightSky : 0x0000ff,
    hemisphereLightGround: 0xff0000,
    pointLightColor: 0xffffff,
    rectAreaLightColor: 0xffffff,
    spotLightColor: 0xffffff
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene    
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(guiParameters.ambientLightColor, 0.5)
//ambientLight.color = new THREE.Color('#C25E5E') COLOR CONSTRUCTOR
const ambientLightFolder = gui.addFolder('AmbientLight (minimal)');
//ambientLightFolder.open();
ambientLightFolder.addColor(guiParameters,'ambientLightColor').onChange(() => {
    ambientLight.color.set(guiParameters.ambientLightColor);
});
ambientLightFolder.add(ambientLight,'intensity').min(0).max(1).step(0.0001).setValue(0)
scene.add(ambientLight)


const directionalLight = new THREE.DirectionalLight();
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
scene.add(directionalLight)
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 2
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = - 2
directionalLight.shadow.camera.left = - 2
const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
//scene.add(directionalLightCameraHelper)
const directionalLightFolder = gui.addFolder('directionalLight (moderate)(shadow)');
//directionalLightFolder.open();
directionalLightFolder.addColor(guiParameters,'directionalLightColor').onChange(() => {
    directionalLight.color.set(guiParameters.directionalLightColor);
})
directionalLightFolder.add(directionalLight.position,'x').min(-15).max(15).step(0.001)
directionalLightFolder.add(directionalLight.position,'y').min(-15).max(15).step(0.001)
directionalLightFolder.add(directionalLight.position,'z').min(-15).max(15).step(0.001)
directionalLightFolder.add(directionalLight,'intensity').min(0).max(1).step(0.0001).setValue(0.5)
directionalLightFolder.add(directionalLight.shadow,'radius').min(1).max(20).step(0.0001).name('shadow radius')


const hemisphereLight = new THREE.HemisphereLight(guiParameters.hemisphereLightSky,guiParameters.hemisphereLightGround);
scene.add(hemisphereLight); 
const hemisphereLightFolder = gui.addFolder('HemisphereLight (minimal)');
//hemisphereLightFolder.open();
hemisphereLightFolder.addColor(guiParameters,'hemisphereLightSky').onChange(() => {
    hemisphereLight.color.set(guiParameters.hemisphereLightSky)
}).name('sky light')
hemisphereLightFolder.addColor(guiParameters,'hemisphereLightGround').onChange(() => {
    hemisphereLight.groundColor.set(guiParameters.hemisphereLightGround)
}).name('ground light')
hemisphereLightFolder.add(hemisphereLight.position,'x').min(-5).max(5).step(0.001)
hemisphereLightFolder.add(hemisphereLight.position,'y').min(-5).max(5).step(0.001)
hemisphereLightFolder.add(hemisphereLight.position,'z').min(-5).max(5).step(0.001).setValue(2)
hemisphereLightFolder.add(hemisphereLight,'intensity').min(0).max(5).step(0.0001).setValue(0)


const pointLight = new THREE.PointLight(guiParameters.pointLightColor)
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024
pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 5
scene.add(pointLight)
const pointLightFolder = gui.addFolder('pointLight (moderate)(shadow)');
//pointLightFolder.open();
pointLightFolder.addColor(guiParameters,'pointLightColor').onChange(() => {
    pointLight.color.set(guiParameters.pointLightColor)
})
pointLightFolder.add(pointLight.position,'x').min(-15).max(15).step(0.001)
pointLightFolder.add(pointLight.position,'y').min(-15).max(15).step(0.001)
pointLightFolder.add(pointLight.position,'z').min(-15).max(15).step(0.001).setValue(-2)
pointLightFolder.add(pointLight,'distance').min(0.1).max(20).step(0.0001).setValue(10)
pointLightFolder.add(pointLight,'intensity').min(0).max(1).step(0.0001).setValue(0)


const rectAreaLight = new THREE.RectAreaLight();
scene.add(rectAreaLight);
const rectAreaLightFolder = gui.addFolder('rectAreaLight (high)');
//rectAreaLightFolder.open();
rectAreaLightFolder.addColor(guiParameters,'rectAreaLightColor').onChange(() => {
    rectAreaLight.color.set(guiParameters.rectAreaLightColor)
})
rectAreaLightFolder.add(rectAreaLight,'width').min(0).max(10).step(0.0001).setValue(1)
rectAreaLightFolder.add(rectAreaLight,'height').min(0).max(10).step(0.0001).setValue(1)
rectAreaLightFolder.add(rectAreaLight.position,'x').min(-15).max(15).step(0.001)
rectAreaLightFolder.add(rectAreaLight.position,'y').min(-15).max(15).step(0.001)
rectAreaLightFolder.add(rectAreaLight.position,'z').min(-15).max(15).step(0.001)
rectAreaLightFolder.add(rectAreaLight,'intensity').min(0).max(10).step(0.0001).setValue(0)
//rectAreaLight.lookAt(new THREE.Vector3())


const spotLight = new THREE.SpotLight(guiParameters.spotLightColor, 0.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024
spotLight.shadow.camera.fov = 30
spotLight.shadow.camera.near = 3.5
spotLight.shadow.camera.far = 11
scene.add(spotLight)
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024
const spotLightFolder = gui.addFolder('spotLight (high)(shadow)');
//spotLightFolder.open();
spotLightFolder.addColor(guiParameters,'spotLightColor').onChange(() => {
    spotLight.color.set(guiParameters.spotLightColor)
})
spotLightFolder.add(spotLight.position,'x').min(-15).max(15).step(0.001).setValue(-6)
spotLightFolder.add(spotLight.position,'y').min(-15).max(15).step(0.001)
spotLightFolder.add(spotLight.position,'z').min(-15).max(15).step(0.001)
spotLightFolder.add(spotLight,'angle').min(Math.PI * 0.01).max(Math.PI * 0.25).step(0.0001)
spotLightFolder.add(spotLight,'penumbra').min(0.1).max(1).step(0.0001)
spotLightFolder.add(spotLight,'decay').min(0.1).max(1).step(0.0001)
spotLightFolder.add(spotLight,'distance').min(0.1).max(20).step(0.0001).setValue(10)
spotLightFolder.add(spotLight,'intensity').min(0).max(1).step(0.0001).setValue(0)

//                                                                                                  ********* LIGHT HELPERS ***************
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
//scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
//scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
//scene.add(pointLightHelper)
const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
//scene.add(pointLightCameraHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
//scene.add(spotLightHelper)
window.requestAnimationFrame(() =>
{
    spotLightHelper.update()
})
scene.add(spotLight.target)
const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
//scene.add(spotLightCameraHelper)

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
//rectAreaLight.add(rectAreaLightHelper)
window.requestAnimationFrame(() =>
{
    rectAreaLightHelper.position.copy(rectAreaLight.position)
    rectAreaLightHelper.quaternion.copy(rectAreaLight.quaternion)
    //rectAreaLightHelper.update()
})
/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)
cube.castShadow = true;

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5
torus.castShadow = true;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65
plane.receiveShadow = true;

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()