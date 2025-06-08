// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// Get button references
const addCubeBtn = document.getElementById('addCubeBtn');
const addSphereBtn = document.getElementById('addSphereBtn');
const addCylinderBtn = document.getElementById('addCylinderBtn');
const addConeBtn = document.getElementById('addConeBtn');
const defineSpaceBtn = document.getElementById('defineSpaceBtn');
const renderRecursiveBtn = document.getElementById('renderRecursiveBtn');

// UI Inputs for Recursive Space Properties
const rsPosXInput = document.getElementById('rsPosX');
const rsPosYInput = document.getElementById('rsPosY');
const rsPosZInput = document.getElementById('rsPosZ');
const rsRotXInput = document.getElementById('rsRotX');
const rsRotYInput = document.getElementById('rsRotY');
const rsRotZInput = document.getElementById('rsRotZ');
const rsScaleXInput = document.getElementById('rsScaleX');
const rsScaleYInput = document.getElementById('rsScaleY');
const rsScaleZInput = document.getElementById('rsScaleZ');
const rsParentSpaceSelect = document.getElementById('rsParentSpaceSelect');

// Array to keep track of added objects in the main scene
const sceneObjects = [];

// Group to hold all recursively rendered objects
const recursiveObjectsGroup = new THREE.Group();
scene.add(recursiveObjectsGroup);

// Global array for recursive spaces
const recursiveSpaces = [];
let nextRecursiveSpaceId = 0;

// RecursiveSpace Class Definition
class RecursiveSpace {
    constructor(id, objectsData, parentId, depth, position = new THREE.Vector3(), rotation = new THREE.Euler(), scale = new THREE.Vector3(1, 1, 1)) {
        this.id = `RS${id}`; // Prefix ID for clarity
        this.objects = objectsData; // Stores { geometryType, geometryParams, materialParams, position, rotation, scale }
        this.parentId = parentId;
        this.depth = depth;
        this.transformations = {
            position: position.clone(),
            rotation: rotation.clone(),
            scale: scale.clone()
        };
        // this.visualRepresentation = null;
    }

    // Method to add a visual representation to the scene (optional)
    // ... (can be kept or removed if not actively used)
}

// Function to update the parent space selector dropdown
function updateParentSpaceSelector() {
    const currentVal = rsParentSpaceSelect.value;
    // Clear existing options (except "Main Scene")
    while (rsParentSpaceSelect.options.length > 1) {
        rsParentSpaceSelect.remove(1);
    }

    recursiveSpaces.forEach(space => {
        const option = document.createElement('option');
        option.value = space.id;
        option.textContent = space.id;
        rsParentSpaceSelect.appendChild(option);
    });
    // Try to restore previous selection
    if (Array.from(rsParentSpaceSelect.options).find(opt => opt.value === currentVal)) {
         rsParentSpaceSelect.value = currentVal;
    } else {
         rsParentSpaceSelect.value = "_scene_"; // Default if previous parent was deleted
    }
}

// Helper function to create meshes
function createMesh(objectDef) {
    let geometry;
    if (objectDef.geometryType === 'Box') {
        geometry = new THREE.BoxGeometry(
            objectDef.geometryParams.width,
            objectDef.geometryParams.height,
            objectDef.geometryParams.depth
        );
    } else if (objectDef.geometryType === 'Sphere') {
        geometry = new THREE.SphereGeometry(
            objectDef.geometryParams.radius,
            objectDef.geometryParams.widthSegments,
            objectDef.geometryParams.heightSegments
        );
    } else if (objectDef.geometryType === 'Cylinder') {
        geometry = new THREE.CylinderGeometry(
            objectDef.geometryParams.radiusTop,
            objectDef.geometryParams.radiusBottom,
            objectDef.geometryParams.height,
            objectDef.geometryParams.radialSegments
        );
    } else if (objectDef.geometryType === 'Cone') {
        geometry = new THREE.ConeGeometry(
            objectDef.geometryParams.radius,
            objectDef.geometryParams.height,
            objectDef.geometryParams.radialSegments
        );
    } else {
        console.warn("Unknown geometry type:", objectDef.geometryType);
        return null; // Or a default placeholder
    }

    const material = new THREE.MeshStandardMaterial({ color: objectDef.materialParams.color });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.copy(objectDef.position);
    mesh.rotation.copy(objectDef.rotation);
    mesh.scale.copy(objectDef.scale);

    return mesh;
}

// Set renderer size and append to container
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Add lights
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

// Set camera position
camera.position.z = 5;

// Add OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Create ground plane
const geometry = new THREE.BoxGeometry(10, 0.2, 10);
const material = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Grey color, reacts to light
const ground = new THREE.Mesh(geometry, material);
ground.position.y = -0.1; // Ensure objects are visually on top
scene.add(ground);

// Shape creation functions
function addCube() {
    const cubeDef = {
        geometryType: 'Box',
        geometryParams: { width: 1, height: 1, depth: 1 },
        materialParams: { color: Math.random() * 0xffffff },
        position: new THREE.Vector3(Math.random() * 4 - 2, 0.5, Math.random() * 4 - 2),
        rotation: new THREE.Euler(),
        scale: new THREE.Vector3(1, 1, 1)
    };
    const cube = createMesh(cubeDef);
    if (cube) {
        scene.add(cube);
        sceneObjects.push(cube);
    }
}

function addSphere() {
    const sphereDef = {
        geometryType: 'Sphere',
        geometryParams: { radius: 0.5, widthSegments: 32, heightSegments: 32 },
        materialParams: { color: Math.random() * 0xffffff },
        position: new THREE.Vector3(Math.random() * 4 - 2, 0.5, Math.random() * 4 - 2),
        rotation: new THREE.Euler(),
        scale: new THREE.Vector3(1, 1, 1)
    };
    const sphere = createMesh(sphereDef);
    if (sphere) {
        scene.add(sphere);
        sceneObjects.push(sphere);
    }
}

function addCylinder() {
    const cylinderDef = {
        geometryType: 'Cylinder',
        geometryParams: { radiusTop: 0.5, radiusBottom: 0.5, height: 1, radialSegments: 32 },
        materialParams: { color: Math.random() * 0xffffff },
        position: new THREE.Vector3(Math.random() * 4 - 2, 0.5, Math.random() * 4 - 2), // Y is half height
        rotation: new THREE.Euler(),
        scale: new THREE.Vector3(1, 1, 1)
    };
    const cylinder = createMesh(cylinderDef);
    if (cylinder) {
        scene.add(cylinder);
        sceneObjects.push(cylinder);
    }
}

function addCone() {
    const coneDef = {
        geometryType: 'Cone',
        geometryParams: { radius: 0.5, height: 1, radialSegments: 32 },
        materialParams: { color: Math.random() * 0xffffff },
        position: new THREE.Vector3(Math.random() * 4 - 2, 0.5, Math.random() * 4 - 2), // Y is half height
        rotation: new THREE.Euler(),
        scale: new THREE.Vector3(1, 1, 1)
    };
    const cone = createMesh(coneDef);
    if (cone) {
        scene.add(cone);
        sceneObjects.push(cone);
    }
}


// Event listeners for buttons
addCubeBtn.addEventListener('click', addCube);
addSphereBtn.addEventListener('click', addSphere);
addCylinderBtn.addEventListener('click', addCylinder);
addConeBtn.addEventListener('click', addCone);
defineSpaceBtn.addEventListener('click', defineNewRecursiveSpace);
renderRecursiveBtn.addEventListener('click', renderRecursiveSpaces);


// Function to define a new recursive space
function defineNewRecursiveSpace() {
    const parentId = rsParentSpaceSelect.value;
    let capturedObjectsData;
    let depth = 0;

    if (parentId === '_scene_') {
        capturedObjectsData = sceneObjects.map(obj => {
            let geometryType = null;
            let geometryParams = null;

            if (obj.geometry instanceof THREE.BoxGeometry) geometryType = 'Box';
            else if (obj.geometry instanceof THREE.SphereGeometry) geometryType = 'Sphere';
            else if (obj.geometry instanceof THREE.CylinderGeometry) geometryType = 'Cylinder';
            else if (obj.geometry instanceof THREE.ConeGeometry) geometryType = 'Cone';

            if (geometryType) {
                geometryParams = { ...obj.geometry.parameters };
            }

            return {
                geometryType: geometryType,
                geometryParams: geometryParams,
                materialParams: { color: obj.material.color.getHex() },
                position: obj.position.clone(),
                rotation: obj.rotation.clone(),
                scale: obj.scale.clone()
            };
        }).filter(obj => obj.geometryType !== null); // Filter out any unrecognized objects
        depth = 0;
    } else {
        const parentSpace = recursiveSpaces.find(rs => rs.id === parentId);
        if (!parentSpace) {
            console.error("Parent recursive space not found!");
            return;
        }
        // Deep copy of parent's object definitions
        capturedObjectsData = JSON.parse(JSON.stringify(parentSpace.objects));
        // THREE.JS specific objects (Vector3, Euler) are not correctly cloned by JSON.stringify/parse
        // We need to manually reconstruct them.
        capturedObjectsData.forEach(objDef => {
            objDef.position = new THREE.Vector3(objDef.position.x, objDef.position.y, objDef.position.z);
            objDef.rotation = new THREE.Euler(objDef.rotation._x, objDef.rotation._y, objDef.rotation._z, objDef.rotation._order);
            objDef.scale = new THREE.Vector3(objDef.scale.x, objDef.scale.y, objDef.scale.z);
        });

        depth = parentSpace.depth + 1;
    }

    const userPosition = new THREE.Vector3(parseFloat(rsPosXInput.value), parseFloat(rsPosYInput.value), parseFloat(rsPosZInput.value));
    const userRotation = new THREE.Euler(
        THREE.MathUtils.degToRad(parseFloat(rsRotXInput.value)),
        THREE.MathUtils.degToRad(parseFloat(rsRotYInput.value)),
        THREE.MathUtils.degToRad(parseFloat(rsRotZInput.value)),
        'XYZ'
    );
    const userScale = new THREE.Vector3(parseFloat(rsScaleXInput.value), parseFloat(rsScaleYInput.value), parseFloat(rsScaleZInput.value));

    const newSpace = new RecursiveSpace(nextRecursiveSpaceId++, capturedObjectsData, parentId, depth, userPosition, userRotation, userScale);
    recursiveSpaces.push(newSpace);
    console.log(`Defined Recursive Space ID: ${newSpace.id}, Parent: ${parentId}, Depth: ${depth}`, newSpace);

    updateParentSpaceSelector();
    renderRecursiveSpaces();
}

// Function to render all defined recursive spaces (Hierarchical)
function renderRecursiveSpaces() {
    // Clear previously rendered recursive objects
    while (recursiveObjectsGroup.children.length > 0) {
        recursiveObjectsGroup.remove(recursiveObjectsGroup.children[0]);
    }

    const renderedSpaceGroups = {}; // To store mapping from space.id to its THREE.Group

    // Sort by depth to ensure parents are processed before children (optional but can simplify logic)
    const sortedSpaces = [...recursiveSpaces].sort((a, b) => a.depth - b.depth);

    sortedSpaces.forEach(space => {
        const spaceGroup = new THREE.Group();
        spaceGroup.name = space.id; // For easier debugging in console
        spaceGroup.position.copy(space.transformations.position);
        spaceGroup.rotation.copy(space.transformations.rotation);
        spaceGroup.scale.copy(space.transformations.scale);

        space.objects.forEach(objectDef => {
            const mesh = createMesh(objectDef); // createMesh uses objectDef's local transforms
            if (mesh) {
                spaceGroup.add(mesh);
            }
        });

        renderedSpaceGroups[space.id] = spaceGroup;

        if (space.parentId === '_scene_') {
            recursiveObjectsGroup.add(spaceGroup); // Add to the main recursive container
        } else {
            const parentGroup = renderedSpaceGroups[space.parentId];
            if (parentGroup) {
                parentGroup.add(spaceGroup);
            } else {
                // This case should ideally not happen if sorted or processed in multiple passes
                console.warn(`Parent group ${space.parentId} not found for ${space.id}. Adding to root.`);
                recursiveObjectsGroup.add(spaceGroup);
            }
        }
    });
    console.log("Rendered recursive spaces hierarchically into recursiveObjectsGroup.");
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

// Initial setup
updateParentSpaceSelector();
