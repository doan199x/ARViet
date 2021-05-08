import React from 'react'
import { Component } from 'react';
import * as THREE from "three";
import { Color, PixelFormat, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Create() {


    // load 3d model
    // load marker
    let camera, scene, renderer;
    let meshes = [];

    let scene = new THREE.Scene();

    var axesHelper = new THREE.AxesHelper(200);
    scene.background = new THREE.Color(0x838784)
    scene.add(axesHelper);

    const light = new THREE.AmbientLight(0xffffff); // soft white light
    scene.add(light);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.0001, 100);
    camera.position.set(10, 5, 10);

    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    material = new THREE.MeshNormalMaterial();

    // mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);
    // mesh.position.set(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    document.body.appendChild(renderer.domElement);


    //Controls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.screenSpacePanning = true;
    orbitControls.target.set(0, 0, 0);
    var dragControls = new DragControls(meshes, camera, renderer.domElement);
    var loader = new THREE.TextureLoader();
    renderer.domElement.ondragstart = function (event) { event.preventDefault(); return false; };
    dragControls.addEventListener("hoveron", function () {
        orbitControls.enabled = false;
    });
    dragControls.addEventListener("hoveroff", function () {
        orbitControls.enabled = true;
    });

    //Click event
    let raycaster = new THREE.Raycaster();


    // Load an image file into a custom material
    var material = new THREE.MeshLambertMaterial({
        map: loader.load('https://testar11.herokuapp.com/images/charizard.jpg')
    });

    // create a plane geometry for the image with a width of 10
    // and a height that preserves the image's aspect ratio
    var geometry = new THREE.PlaneGeometry(5, 5 * .75);

    // combine our image geometry and material into a mesh
    var mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.set(degreeToRadian(-90), 0, 0);
    scene.add(mesh);
    function degreeToRadian(degree) {
        return degree * Math.PI / 180.0;
    }
    // function onMouseMove(event,scene){
    //     raycaster.setFromCamera({
    //         x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
    //         y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
    //     }, camera);
    //     // const intersects = raycaster.intersectObject(scene.children);
    //     // for (let i=0;i<intersects.length;i++){
    //     //     alert("haha");
    //     // }
    //     // intersects = raycaster.intersectObject(pickableObjects,false);
    //     // intersectedObject = intersects[0].object;
    //     // pickableObjects.forEach((object,i)=>{
    //     //     alert("haha");
    //     // })
    // }

    function show3dModel(httpPath, transformControls) {
        const loader = new GLTFLoader()
        loader.load(
            httpPath,
            function (gltf) {
                meshes.push(gltf.scene);
                scene.add(gltf.scene);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded')
            },
            (error) => {
                console.log(error);
            }
        );
    }
    function animation(time) {
        // mesh.rotation.x = time / 2000;
        // mesh.rotation.y = time / 1000;
        renderer.render(scene, camera);

    }
    window.addEventListener( 'mousemove', onMouseMove, false );
    return (
        <div>
            <button type="button">Alo</button>
            Add file
            <input type="file"></input>
            Add marker
            <input type="file"></input>
            <ul>
                <li onClick={() => show3dModel("https://modelviewer.dev/shared-assets/models/Astronaut.glb")}>Astronaut.glb</li>
                <li onClick={() => show3dModel("http://testar11.herokuapp.com/3dmodel/camchuy.glb")}>warrior.glb</li>
            </ul>
        </div>
    )
}
