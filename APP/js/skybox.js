class SkyBox {
    constructor() {

    }

    static load() {
        return new Promise((resolve, reject) => {
            // Llamamos a resolve(...) cuando lo que estabamos haciendo finaliza con éxito, y reject(...) cuando falla.
            // En este ejemplo, usamos setTimeout(...) para simular código asíncrono. 
            // En la vida real, probablemente uses algo como XHR o una API HTML5.

            let materialArray = [];
            let texture_ft = new THREE.TextureLoader().load('./images/Skybox/skybox_0000_front.jpg');
            let texture_bk = new THREE.TextureLoader().load('./images/Skybox/skybox_0002_back.jpg');
            let texture_up = new THREE.TextureLoader().load('./images/Skybox/skybox_0005_up.jpg');
            let texture_dn = new THREE.TextureLoader().load('./images/Skybox/skybox_0004_bottom.jpg');
            let texture_rt = new THREE.TextureLoader().load('./images/Skybox/skybox_0001_right.jpg');
            let texture_lf = new THREE.TextureLoader().load('./images/Skybox/skybox_0003_left.jpg');

            materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
            materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
            materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
            materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
            materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
            materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));


            let skyboxGeo = new THREE.BoxGeometry(100, 100, 100);
            let skybox = new THREE.Mesh(skyboxGeo, materialArray);


            var material = new THREE.MeshBasicMaterial({
                color: new THREE.Color(1, 1, 1)
            });


            var material2 = new THREE.MeshBasicMaterial({ map: texture_ft });
            // for (let i = 0; i < 6; i++)
            //     materialArray[i].side = THREE.BackSide;






            var leftSide, rightSide, topSide, bottomSide, frontSide, backSide;

            leftSide =      new THREE.MeshBasicMaterial({ map: texture_lf });
            rightSide =     new THREE.MeshBasicMaterial({ map: texture_rt });
            topSide =       new THREE.MeshBasicMaterial({ map: texture_up });
            bottomSide =    new THREE.MeshBasicMaterial({ map: texture_dn });
            frontSide =     new THREE.MeshBasicMaterial({ map: texture_ft });
            backSide =      new THREE.MeshBasicMaterial({ map: texture_bk });

            var materials = [
                new THREE.MeshBasicMaterial( { map: texture_rt } ),
                new THREE.MeshBasicMaterial( { map: texture_lf } ),
                new THREE.MeshBasicMaterial( { map: texture_up } ),
                new THREE.MeshBasicMaterial( { map: texture_dn } ),
                new THREE.MeshBasicMaterial( { map: texture_ft } ),
                new THREE.MeshBasicMaterial( { map: texture_bk } )
            ]; 
            for (let i = 0; i < 6; i++) {
                // console.log(materials[i])
                materials[i].side = THREE.BackSide;
            }
            var faceMaterial = new THREE.MeshFaceMaterial( materials );
     
           
            var box = new THREE.BoxGeometry(1000, 1000, 1000);
            let cubo = new THREE.Mesh(box, faceMaterial);
            cubo.name = "sky";
            cubo.position.set(512, 25, 512);
            //app.scene.add(cubo);
            // console.log(box);
            resolve(cubo);



        });
    }

    /*
    
        miPrimeraPromise.then((successMessage) => {
            // succesMessage es lo que sea que pasamos en la función resolve(...) de arriba.
            // No tiene por qué ser un string, pero si solo es un mensaje de éxito, probablemente lo sea.
            console.log("¡Sí! " + successMessage);
        });
    
    */



}
