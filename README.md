# 3D Recursive Drawing Application

This is a web-based application that allows users to create 3D scenes by adding primitive shapes and then defining "recursive spaces." A recursive space takes the contents of a parent space (either the main scene or another recursive space) and duplicates it, applying a new set of transformations (position, rotation, scale). This allows for the creation of complex, nested, and fractal-like 3D structures.

Built with Three.js.

## How to Run

1.  Clone this repository or download the files.
2.  Open the `index.html` file in a modern web browser that supports WebGL.

## How to Use

1.  **Adding Shapes to the Main Scene:**
    *   Use the "Add Cube", "Add Sphere", "Add Cylinder", or "Add Cone" buttons to add these shapes to the main 3D scene.
    *   These shapes will form the initial basis for your recursive designs.
    *   You can navigate the scene using your mouse (orbit controls: left-click-drag to rotate, right-click-drag to pan, scroll wheel to zoom).

2.  **Defining a Recursive Space:**
    *   **Parent Space:** In the "Recursive Space Properties" section, use the "Parent Space" dropdown to select the source for your new recursive space.
        *   "Main Scene": The new space will be a recursive copy of all objects currently in the main, non-recursive part of the scene.
        *   An existing "RSX" (e.g., "RS0"): The new space will be a recursive copy of the *definition* of the selected existing recursive space. This enables multi-level recursion.
    *   **Transformations:** Set the `Position`, `Rotation` (in degrees), and `Scale` for the new recursive space. These transformations are *relative to the origin of the selected parent space*.
    *   **Define:** Click the "Define Recursive Space" button. This captures the definition and automatically renders the scene, including the new recursive level.

3.  **Rendering:**
    *   Recursive spaces are typically rendered automatically when defined.
    *   The "Render Recursive Spaces" button can be used to manually trigger a re-render of all defined recursive spaces if needed.

## Features

*   Add Cubes, Spheres, Cylinders, and Cones.
*   Define recursive spaces with user-controlled transformations (position, rotation, scale).
*   Multi-level recursion: Recursive spaces can be based on other recursive spaces.
*   Basic 3D scene controls (orbit, pan, zoom).
