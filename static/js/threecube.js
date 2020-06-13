//SCENE
var scene = new THREE.Scene();

// //CAMERA 
//camera's Field of View - portion of scene visible at any time(degrees)
var fov = 75;
//camera's aspect ration 
var aspectRatio = window.innerWidth/window.innerHeight;
//camera's near and far planes - only objects within those 2 will be rendered in the scene
var nearPlane = 0.1;
var farPlane = 1000;
//create camera using attributes 
var camera = new THREE.PerspectiveCamera( fov, aspectRatio, nearPlane, farPlane);
//camera position - default is 0,0,0 - would mean camera is inside the geometry you create 
    //positioning outside in the z dimension 
camera.position.z = 5;

//RENDER
 //creating our canvas with a renderer 
var renderer = new THREE.WebGLRenderer();
//size of canvas
renderer.setSize( window.innerWidth, window.innerHeight );
//adding canvas to DOM 
document.body.appendChild( renderer.domElement );

//CREATE THE CUBE ******

//IMAGE
//creating texture/image for cube
var loader = new THREE.CubeTextureLoader();
loader.setPath('static/textures/cube/');
// Load an image file into a custom material for cube texture
var textureCube = loader.load( [
    'px.png', 'nx.png',
    'py.png', 'ny.png',
    'pz.png', 'nz.png'
] );
//Line geometry to create cube + dimension
var geometry = new THREE.BoxGeometry(3, 3,3);
//material that colours in the cube with the pic(texture)
var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );
//mesh object that applies material onto the geometry 
var cube = new THREE.Mesh( geometry, material );
//adding scene to cube 
scene.add( cube );

//ANIMATION
//animate function to loop over that renders the rotating cube 
var animate = function () {
    requestAnimationFrame( animate );
    //rotating cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};
//call function 
animate();