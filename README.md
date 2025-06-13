# اپلیکیشن ترسیم بازگشتی سه‌بعدی | 3D Recursive Drawing Application

این یک اپلیکیشن تحت وب است که به کاربران امکان می‌دهد با افزودن اشکال اولیه و سپس تعریف "فضاهای بازگشتی"، صحنه‌های سه‌بعدی ایجاد کنند. یک فضای بازگشتی محتویات یک فضای والد (چه صحنه اصلی و چه یک فضای بازگشتی دیگر) را کپی کرده و مجموعه جدیدی از تبدیلات (موقعیت، چرخش، مقیاس) را به آن اعمال می‌کند. این قابلیت امکان ایجاد ساختارهای سه‌بعدی پیچیده، تودرتو و فراکتال‌مانند را فراهم می‌کند.

ساخته شده با Three.js.

## نحوه اجرا

1.  این مخزن را کلون کرده یا فایل‌ها را دانلود کنید.
2.  فایل `index.html` را در یک مرورگر وب مدرن که از WebGL پشتیبانی می‌کند باز کنید.

## نحوه استفاده

1.  **افزودن اشکال به صحنه اصلی:**
    *   از دکمه‌های "Add Cube" (افزودن مکعب)، "Add Sphere" (افزودن کره)، "Add Cylinder" (افزودن استوانه) یا "Add Cone" (افزودن مخروط) برای افزودن این اشکال به صحنه اصلی سه‌بعدی استفاده کنید.
    *   این اشکال پایه اولیه طرح‌های بازگشتی شما را تشکیل می‌دهند.
    *   می‌توانید با استفاده از ماوس در صحنه حرکت کنید (کنترل‌های مداری: کلیک چپ و کشیدن برای چرخش، کلیک راست و کشیدن برای جابجایی، چرخ اسکرول برای بزرگنمایی).

2.  **تعریف یک فضای بازگشتی:**
    *   **فضای والد:** در بخش "Recursive Space Properties" (خصوصیات فضای بازگشتی)، از منوی کشویی "Parent Space" (فضای والد) برای انتخاب منبع فضای بازگشتی جدید خود استفاده کنید.
        *   "Main Scene" (صحنه اصلی): فضای جدید یک کپی بازگشتی از تمام اشیاء موجود در بخش اصلی و غیربازگشتی صحنه خواهد بود.
        *   یک "RSX" موجود (مثلاً "RS0"): فضای جدید یک کپی بازگشتی از *تعریف* فضای بازگشتی موجود انتخاب‌شده خواهد بود. این امکان بازگشت چندسطحی را فراهم می‌کند.
    *   **تبدیلات:** `Position` (موقعیت)، `Rotation` (چرخش - به درجه) و `Scale` (مقیاس) را برای فضای بازگشتی جدید تنظیم کنید. این تبدیلات *نسبت به مبدأ فضای والد انتخاب‌شده* هستند.
    *   **Define (تعریف):** روی دکمه "Define Recursive Space" (تعریف فضای بازگشتی) کلیک کنید. این کار تعریف را ثبت کرده و صحنه را به‌طور خودکار رندر می‌کند، شامل سطح بازگشتی جدید.

3.  **رندرینگ:**
    *   فضاهای بازگشتی معمولاً هنگام تعریف به‌طور خودکار رندر می‌شوند.
    *   دکمه "Render Recursive Spaces" (رندر فضاهای بازگشتی) می‌تواند برای فعال‌سازی دستی رندر مجدد تمام فضاهای بازگشتی تعریف‌شده در صورت نیاز استفاده شود.

## ویژگی‌ها

*   افزودن مکعب، کره، استوانه و مخروط.
*   تعریف فضاهای بازگشتی با تبدیلات تحت کنترل کاربر (موقعیت، چرخش، مقیاس).
*   بازگشت چندسطحی: فضاهای بازگشتی می‌توانند بر اساس فضاهای بازگشتی دیگر باشند.
*   کنترل‌های پایه صحنه سه‌بعدی (مداری، جابجایی، بزرگنمایی).

## ساختار پروژه

*   `index.html`: فایل HTML اصلی که ساختار صفحه را تنظیم می‌کند، شامل عناصر رابط کاربری (دکمه‌ها، ورودی‌ها) است و کتابخانه Three.js و اسکریپت `main.js` را بارگیری می‌کند.
*   `main.js`: شامل تمام کدهای جاوااسکریپت برای منطق اپلیکیشن است. این شامل راه‌اندازی صحنه، دوربین، رندرکننده، نورها و کنترل‌های Three.js است. همچنین افزودن اشکال اولیه به صحنه و منطق اصلی برای تعریف و رندر فضاهای بازگشتی را مدیریت می‌کند.

## منطق اصلی در `main.js`

*   **راه‌اندازی صحنه**: صحنه، دوربین، رندرکننده و نورپردازی Three.js را مقداردهی اولیه می‌کند. کنترل‌های مداری برای ناوبری و یک صفحه زمین اضافه می‌کند.
*   **ایجاد اشکال**: توابعی مانند `addCube()`، `addSphere()` و غیره، اشکال هندسی پایه را ایجاد و به صحنه اصلی اضافه می‌کنند. این اشیاء در آرایه `sceneObjects` ردیابی می‌شوند.
*   **تعریف فضای بازگشتی**: تابع `defineNewRecursiveSpace()` مرکزی است. داده‌های شیء را از یک فضای والد انتخاب‌شده (چه صحنه اصلی یا یک فضای بازگشتی دیگر) ثبت می‌کند. این تعریف را به همراه تبدیلات تعریف‌شده توسط کاربر (موقعیت، چرخش، مقیاس) ذخیره می‌کند. هر فضای بازگشتی یک نمونه از کلاس `RecursiveSpace` است و به آرایه `recursiveSpaces` اضافه می‌شود.
*   **رندر فضاهای بازگشتی**: تابع `renderRecursiveSpaces()` رندرهای بازگشتی قبلی را پاک کرده و سپس در تعاریف `recursiveSpaces` پیمایش می‌کند. گروه‌هایی از اشیاء را بر اساس این تعاریف ایجاد می‌کند و تبدیلات مشخص‌شده را به‌صورت سلسله‌مراتبی اعمال می‌کند. اگر والد یک فضای بازگشتی، فضای بازگشتی دیگری باشد، گروه آن به عنوان فرزند به گروه والد اضافه می‌شود و ساختار تودرتو را ایجاد می‌کند.

## انتشار با GitHub Pages

می‌توانید این پروژه را به راحتی با استفاده از GitHub Pages به عنوان یک وب‌سایت زنده منتشر کنید:

1.  به مخزن خود در GitHub بروید.
2.  به تب "Settings" (تنظیمات) بروید.
3.  در منوی سمت چپ، بخش "Pages" را انتخاب کنید.
4.  در بخش "Source" (منبع)، شاخه `main` (یا هر شاخه‌ای که فایل‌های پروژه در آن قرار دارد) را انتخاب کرده و پوشه `/ (root)` را انتخاب کنید.
5.  روی "Save" کلیک کنید.

پس از چند دقیقه، وب‌سایت شما در آدرسی مانند زیر در دسترس خواهد بود:
`https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`

(دقت کنید که `YOUR_USERNAME` و `YOUR_REPOSITORY_NAME` را با نام کاربری و نام مخزن خود جایگزین کنید.)

---
<br/>

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

## Project Structure

*   `index.html`: The main HTML file, sets up the page structure, includes UI elements (buttons, inputs), and loads the Three.js library and the `main.js` script.
*   `main.js`: Contains all the JavaScript code for the application logic. This includes setting up the Three.js scene, camera, renderer, lights, and controls. It handles adding primitive shapes to the scene and the core logic for defining and rendering recursive spaces.

## Core Logic in `main.js`

*   **Scene Setup**: Initializes the Three.js scene, camera, renderer, and lighting. Adds orbit controls for navigation and a ground plane.
*   **Shape Creation**: Functions like `addCube()`, `addSphere()`, etc., create and add basic geometric shapes to the main scene. These objects are tracked in the `sceneObjects` array.
*   **Recursive Space Definition**: The `defineNewRecursiveSpace()` function is central. It captures object data from a selected parent space (either the main scene or another recursive space). It stores this definition along with user-defined transformations (position, rotation, scale). Each recursive space is an instance of the `RecursiveSpace` class and is added to the `recursiveSpaces` array.
*   **Rendering Recursive Spaces**: The `renderRecursiveSpaces()` function clears previous recursive renderings and then iterates through the `recursiveSpaces` definitions. It creates groups of objects based on these definitions, applying the specified transformations hierarchically. If a recursive space's parent is another recursive space, its group is added as a child to the parent's group, creating the nested structure.

## Publishing with GitHub Pages

You can easily publish this project as a live website using GitHub Pages:

1.  Go to your repository on GitHub.
2.  Go to the "Settings" tab.
3.  In the left-hand menu, select the "Pages" section.
4.  Under "Source," select the `main` branch (or whichever branch your project files are on) and choose the `/ (root)` folder.
5.  Click "Save."

After a few minutes, your website will be available at a URL like:
`https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`

(Make sure to replace `YOUR_USERNAME` and `YOUR_REPOSITORY_NAME` with your actual username and repository name.)
