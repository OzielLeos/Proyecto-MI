import { FBXLoader } from '../../jsm/loaders/FBXLoader.js';
class App {
    constructor() {
        // Grab window properties
        let width = window.innerWidth;
        let height = window.innerHeight;
        let pixelRatio = window.devicePixelRatio;
        let aspect = width / height;
        // Setup three.js
        this.camera = new THREE.PerspectiveCamera(45, aspect, 0.5, 1500);
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ antialias: false });
        this.renderer.setPixelRatio(pixelRatio);
        this.renderer.setSize(width, height);
        document.body.appendChild(this.renderer.domElement);
        // Catch resize events
        window.onresize = (evt) => {
            this.resize(window.innerWidth, window.innerHeight);
        };
    }

    /* Resize viewport */
    resize(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    /* Start the main loop */
    start() {
        this.loop();
    }

    loop() {
        requestAnimationFrame(() => this.loop());
        this.update();
        this.render();
    }

    update() {
        // Dispatch update event for listeners
        window.dispatchEvent(new CustomEvent('app-update', {}));
    }

    render() {
        let scene = this.scene;
        let camera = this.camera;
        let renderer = this.renderer;

        renderer.render(scene, camera);
    }
}


window.onload = function () {
    let app = new App();

    // Let there be light
    let light = new THREE.DirectionalLight(0xe0e0e0);
    light.position.set(1, 1, 0).normalize();
    app.scene.add(light);


    let controls = new FirstPersonControls(app);

    ///
    var material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(1, 1, 1)
    });
    var box = new THREE.BoxGeometry(10, 10, 10);
    let cubo = new THREE.Mesh(box, material);
    cubo.name = "cubo";
    cubo.position.set(512, 25, 512);
    //app.scene.add(cubo);
    ///
    SkyBox.load().then((successMessage) => {
        // succesMessage es lo que sea que pasamos en la función resolve(...) de arriba.
        // No tiene por qué ser un string, pero si solo es un mensaje de éxito, probablemente lo sea.
        //console.log("¡Sí! " + successMessage);
        console.log("sky done");
        app.scene.add(successMessage);
    });


    Terrain.fromImage('images/terrain.png').then(function (terrain) {

        app.terrain = terrain;

        var loader = new THREE.TextureLoader();

        // var texture = loader.load('images/texture.png');
        var texture = loader.load('images/SkyBox/skybox_0004_bottom.jpg');

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        let textrepeat = 50;
        texture.repeat.set(terrain.width / textrepeat, terrain.height / textrepeat);

        app.scene.add(terrain.build(texture));

        // Scale terrain peaks
        terrain.mesh.scale.y = 15.0;

        // Start in middle of terrain
        controls.position.x = terrain.width / 2;
        controls.position.z = terrain.height / 2;

        window.addEventListener('app-update', function (evt) {
            controls.update();
        });

        app.start();
    }).catch(function (e) {
        throw e;
    });



};
