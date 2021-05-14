import React from 'react'
import { Component } from 'react';
import * as THREE from "three";
import { Color, PixelFormat, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import THREEx from "./threex.domevents/threex.domevents";
import TextSprite from '@seregpie/three.text-sprite';
import TextTexture from '@seregpie/three.text-texture';
import { productAPI } from "../../../config/productAPI";
import e from 'cors';
import { API } from '../../../constant/API';
const axios = require('axios');

export default function Create() {
    // load 3d model
    // load marker
    const maBaiGiang = 1;
    const maDiemDanhDau = 1;


    let camera, renderer;
    let arrayTextObject = [];

    let currentID = 0;
    let currentMarkerID = 0;

    let scene = new THREE.Scene();
    let maHanhDongHienTai = 0;

    //add axes

    var axesHelper = new THREE.AxesHelper(200);
    scene.background = new THREE.Color(0x838784)
    scene.add(axesHelper);

    //grid helper:
    var gridXZ = new THREE.GridHelper(30, 30, 0x000000, 0x000000);
    gridXZ.position.y = 0;
    scene.add(gridXZ);

    //add light

    const light = new THREE.AmbientLight(0xffffff); // soft white light
    scene.add(light);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.0001, 100);
    camera.position.set(10, 5, 10);


    let scene2 = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    function animation(time) {
        renderer.render(scene, camera);
    }
    // add domEvents
    let domEvents = new THREEx.DomEvents(camera, renderer.domElement);

    //orbit control
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.screenSpacePanning = true;
    orbitControls.target.set(0, 0, 0);

    // transform control
    const transformControls = new TransformControls(camera, renderer.domElement);
    transformControls.addEventListener('dragging-changed', function (event) {
        orbitControls.enabled = !event.value
    })
    // transformControls.addEventListener('objectChange', function (event) {
    //     showToaDo();
    //     showTiLe();
    //     showGocQuay();
    // })


    //---------------------------------------------------
    //window resize
    window.addEventListener('resize', onWindowResize, false)
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        animation()
    }
    document.addEventListener('DOMContentLoaded', function () {
        // init scene
        let sceneRender = document.getElementById("sceneRender");
        sceneRender.appendChild(renderer.domElement);
        let scene2 = document.getElementById("scene2");
        showMarker();
        showTiLeMarker();
        getMaHanhDongKhoiTao();
        loadArContent();
        loadDanhSachHanhDong();
        setEventTransform();
    }, false);

    //Upload marker
    function uploadMarker() {
        let markerFile = document.getElementById("uploadFileMarker").files[0];
        let formData = new FormData();
        formData.append("file", markerFile);
        formData.append("maDiemDanhDau", maDiemDanhDau);
        productAPI.uploadMarker(formData).then((data) => {
            showMarker();
        })
    }
    function showMarker() {
        // check co marker chua
        productAPI.getMarker(maBaiGiang, maDiemDanhDau).then((data) => {
            if (data.data.length == 0) {
            } else {
                // Load marker
                var img = new Image();
                img.src = data.data[0].URL;
                img.onload = function () {
                    var loader = new THREE.TextureLoader();
                    // Load an image file into a custom material
                    var material = new THREE.MeshLambertMaterial({
                        map: loader.load(data.data[0].URL)
                    });
                    var geometry = new THREE.PlaneGeometry(4, 4 * img.height / img.width);
                    // combine our image geometry and material into a mesh
                    var marker = new THREE.Mesh(geometry, material);
                    marker.rotation.set(degreeToRadian(-90), 0, 0);
                    scene.remove(scene.getObjectById(currentMarkerID));
                    currentMarkerID = marker.id;
                    scene.add(marker);
                }
            }
        })
        // hien thi ra marker dau tien
    }
    // Set Marker scale
    function setTiLeMarker() {
        if (currentMarkerID == 0) {
            alert("ban chua tai len marker");
        } else {
            let tiLeMarker = document.getElementById("tiLeMarker").value;
            let currentMarkerObject = scene.getObjectById(currentMarkerID);
            currentMarkerObject.scale.set(tiLeMarker, tiLeMarker, tiLeMarker);
        }
    }

    function showTiLeMarker() {
        let tiLeMarker = document.getElementById("tiLeMarker");
        if (currentMarkerID == 0) {
            tiLeMarker.value = 1;
        } else {
            let currentMarkerObject = scene.getObjectById(currentMarkerID);
            tiLeMarker = currentMarkerObject.scale.x;
        }
    }
    function getMaHanhDongKhoiTao() {
        productAPI.getMaHanhDongKhoiTao(maDiemDanhDau).then((data) => {
            maHanhDongHienTai = data.data.maHanhDongKhoiTao;
            loadDanhSachDoiTuong();
        })
    }

    //Upload arContent
    function uploadArContent() {
        console.log(maHanhDongHienTai);
        let arContentFile = document.getElementById("uploadFileArContent").files[0];
        let formData = new FormData();
        formData.append("file", arContentFile);
        formData.append("maHanhDongHienTai", maHanhDongHienTai);
        productAPI.uploadArContent(formData).then((data) => {
            getMaHanhDongKhoiTao();
            loadArContent();
        })
    }

    // Load arContent
    function loadArContent() {
        let arContentList = document.getElementById("arContentList");
        //get All
        productAPI.getArContent(maDiemDanhDau).then((data) => {
            let arContent = data.data;
            arContentList.innerHTML = "";
            for (let i = 0; i < arContent.length; i++) {
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(arContent[i].filename));
                let id = document.createAttribute("id");
                id.value = arContent[i].filename;
                li.setAttributeNode(id);
                arContentList.appendChild(li);
                if (arContent[i].URL[arContent[i].URL.length - 1] == 'b') {
                    document.getElementById(arContent[i].filename).onclick = function () {
                        show3dModel(arContent[i].URL, arContent[i].MaNoiDung);
                    }
                } else if (arContent[i].URL[arContent[i].URL.length - 1] == 'g') {
                    document.getElementById(arContent[i].filename).onclick = function () {
                        show2DImage(arContent[i].URL, arContent[i].MaNoiDung);
                    }
                }

            }
        })
    }
    function loadDanhSachDoiTuong() {
        let danhSachDoiTuong = document.getElementById("danhSachDoiTuong");
        danhSachDoiTuong.innerHTML = "";
        productAPI.getArContentDuocChon(maHanhDongHienTai).then((data) => {
            console.log(maHanhDongHienTai);
            let arContent = data.data;
            for (let i = 0; i < arContent.length; i++) {
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(arContent[i].filename));
                danhSachDoiTuong.appendChild(li);
            }
        })
    }
    function show3dModel(httpPath, MaNoiDung) {
        const loader = new GLTFLoader()
        loader.load(
            httpPath,
            function (gltf) {
                scene.add(gltf.scene)
                domEvents.addEventListener(gltf.scene, 'dblclick', function (event) {
                    transformControls.detach();
                    transformControls.attach(gltf.scene);
                    transformControls.setMode("translate");
                    scene.add(transformControls);
                    currentID = gltf.scene.id;
                    showFormEdit();
                }, false)
                // create new instance arcontent duoc chon
                productAPI.updateDuocChonArContent({ MaNoiDung: MaNoiDung, MaHanhDong: maHanhDongHienTai }).then((data) => {
                    // update List danh sách hành dongUI
                    let danhSachHanhDong = document.getElementById("danhSachDoiTuong");
                    let hanhDongLi = document.createElement("li");
                    hanhDongLi.appendChild(document.createTextNode(data.data.filename));
                    danhSachHanhDong.appendChild(hanhDongLi);
                })
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded')
            },
            (error) => {
                console.log(error);
            }
        );
    }
    function loadDanhSachHanhDong() {
        productAPI.loadHanhDong(maDiemDanhDau).then((data) => {
            let hanhDongArr = data.data;
            let danhSachHanhDong = document.getElementById("danhSachHanhDong");
            danhSachHanhDong.innerHTML = "";
            for (let i = 0; i < hanhDongArr.length; i++) {
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(hanhDongArr[i].NoiDung));
                let id = document.createAttribute("id");
                id.value = hanhDongArr[i].MaHanhDong + hanhDongArr[i].NoiDung;
                li.setAttributeNode(id);
                danhSachHanhDong.appendChild(li);
                document.getElementById(id.value).onclick = function () {
                    loadNoiDungARByHanhDong(hanhDongArr[i].MaHanhDong);
                }
            }
        })
    }
    function loadNoiDungARByHanhDong(maHanhDong) {
        maHanhDongHienTai = maHanhDong;
        productAPI.getNoiDungARByHanhDong(maHanhDong).then((data) => {
            loadDanhSachDoiTuong();
            console.log(data);
        })
    }
    function show2DImage(URL, MaNoiDung) {
        var img = new Image();
        img.src = URL;
        img.onload = function () {
            var loader = new THREE.TextureLoader();
            // Load an image file into a custom material
            var material = new THREE.MeshLambertMaterial({
                map: loader.load(URL),
                side: THREE.DoubleSide
            });
            var geometry = new THREE.PlaneGeometry(4, 4 * img.height / img.width);
            // combine our image geometry and material into a mesh
            var imageTexture = new THREE.Mesh(geometry, material);
            scene.add(imageTexture);
            domEvents.addEventListener(imageTexture, 'dblclick', function (event) {
                transformControls.detach();
                transformControls.attach(imageTexture);
                transformControls.setMode("translate");
                scene.add(transformControls);
                currentID = imageTexture.id;
            }, false)
            // create new instance arcontent duoc chon
            productAPI.updateDuocChonArContent({ MaNoiDung: MaNoiDung, MaHanhDong: maHanhDongHienTai }).then((data) => {
                // update List danh sách hành dongUI
                let danhSachDoiTuong = document.getElementById("danhSachDoiTuong");
                let hanhDongLi = document.createElement("li");
                hanhDongLi.appendChild(document.createTextNode(data.data.filename));
                danhSachDoiTuong.appendChild(hanhDongLi);
            })
        }
    }
    // setText
    function setText2D() {
        let fontChu = document.getElementById("fontChu").value;
        let textObject = {
            noiDung: document.getElementById("noiDung").value,
            coChu: document.getElementById("coChu").value,
            mauChu: document.getElementById("mauChu").value,
            mauNen: document.getElementById("mauNen").value,
            transparent: false
        }
        let configTextture = {
            alignment: 'center',
            color: textObject.mauChu,
            fontFamily: textObject.fontChu,
            fontSize: parseInt(textObject.coChu),
            text: [textObject.noiDung].join('\n')
        }
        if (document.getElementById("trongSuot").checked == true) {
            textObject.transparent = true;
        } else {
            configTextture.backgroundColor = textObject.mauNen
        }
        if (fontChu == 'timenewsroman') {
            configTextture.fontFamily = '\"Times New Roman\", Times, serif';
            textObject.fontChu = '\"Times New Roman\", Times, serif';
        } else if (fontChu == 'Arial') {
            configTextture.fontFamily = "Arial, Helvetica, sans-serif";
            texture.fontChu = "Arial, Helvetica, sans-serif";
        }
        let texture = new TextTexture(configTextture);
        let material = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: textObject.transparent,
            side: THREE.DoubleSide
        });
        var geometry = new THREE.PlaneGeometry(texture.width / 50, texture.height / 50);
        var textTexture = new THREE.Mesh(geometry, material);
        texture.redraw();
        scene.add(textTexture);
        domEvents.addEventListener(textTexture, 'dblclick', function (event) {
            transformControls.detach();
            transformControls.attach(textTexture);
            transformControls.setMode("translate");
            scene.add(transformControls);
            currentID = textTexture.id;
        }, false)
        textObject.ID = textTexture.id;
        textObject.maHanhDong = maHanhDongHienTai;
        arrayTextObject.push(textObject);
    }

    //Them hanh dong
    function themHanhDong() {
        let noiDung = document.getElementById("hanhDong").value;
        productAPI.themHanhDong(noiDung, maDiemDanhDau).then((data) => {
            loadDanhSachHanhDong();
        })
    }
    function showFormEdit() {
        showToaDo();
        showTiLe();
        showGocQuay();
        document.getElementById("form-edit-3d").style.display = "block"
    }
    function showToaDo() {
        let currentObject = scene.getObjectById(currentID);
        document.getElementById('toaDoX').value = currentObject.position.x;
        document.getElementById('toaDoY').value = currentObject.position.y;
        document.getElementById('toaDoZ').value = currentObject.position.z;
    }
    function showTiLe() {
        let currentObject = scene.getObjectById(currentID);
        document.getElementById('tiLeX').value = currentObject.scale.x;
        document.getElementById('tiLeY').value = currentObject.scale.y;
        document.getElementById('tiLeZ').value = currentObject.scale.z;
    }
    function showGocQuay() {
        let currentObject = scene.getObjectById(currentID);
        document.getElementById('xoayTrucX').value = radianToDegree(currentObject.rotation.x);
        document.getElementById('xoayTrucY').value = radianToDegree(currentObject.rotation.y);
        document.getElementById('xoayTrucZ').value = radianToDegree(currentObject.rotation.z);
    }
    function setToaDo() {
        let currentObject = scene.getObjectById(currentID);
        let toaDoX = document.getElementById('toaDoX').value.trim();
        let toaDoY = document.getElementById('toaDoY').value.trim();
        let toaDoZ = document.getElementById('toaDoZ').value.trim();
        if (toaDoX.length == 0 || toaDoY.length == 0 || toaDoZ.length == 0) {
            alert("Vui long nhap du toa do");
            setTimeout(setToaDo, 10000);
        } else {
            currentObject.position.set(toaDoX, toaDoY, toaDoZ);
        }
    }
    function setTiLe() {
        let currentObject = scene.getObjectById(currentID);
        let tiLeX = document.getElementById('tiLeX').value.trim();
        let tiLeY = document.getElementById('tiLeY').value.trim();
        let tiLeZ = document.getElementById('tiLeZ').value.trim();
        if (tiLeX.length == 0 || tiLeY.length == 0 || tiLeZ.length == 0) {
            alert("Vui long nhap du ti le");
            setTimeout(setTiLe, 10000);
        } else {
            currentObject.scale.set(tiLeX, tiLeY, tiLeZ);
        }
    }
    function setGocXoay() {
        let currentObject = scene.getObjectById(currentID);
        let xoayTrucX = document.getElementById('xoayTrucX').value.trim();
        let xoayTrucY = document.getElementById('xoayTrucY').value.trim();
        let xoayTrucZ = document.getElementById('xoayTrucZ').value.trim();
        if (xoayTrucX.length == 0 || xoayTrucY.length == 0 || xoayTrucZ.length == 0) {
            alert("Vui long nhap du ti le");
            setTimeout(setGocXoay, 10000);
        } else {
            xoayTrucX = degreeToRadian(parseFloat(xoayTrucX));
            xoayTrucY = degreeToRadian(parseFloat(xoayTrucY));
            xoayTrucZ = degreeToRadian(parseFloat(xoayTrucZ));
            currentObject.rotation.set(xoayTrucX, xoayTrucY, xoayTrucZ);
        }
    }
    function degreeToRadian(degree) {
        return degree * Math.PI / 180.0;
    }
    function radianToDegree(radian) {
        return radian * 180.0 / Math.PI
    }

    function setEventTransform() {
        window.addEventListener('keydown', function (event) {
            switch (event.key) {
                case "t":
                    if (currentID != 0) {
                        let currentObject = scene.getObjectById(currentID);
                        transformControls.detach();
                        transformControls.attach(currentObject);
                        transformControls.setMode("translate");
                        scene.add(transformControls);
                    }
                    break
                case "r":
                    if (currentID != 0) {
                        let currentObject = scene.getObjectById(currentID);
                        transformControls.detach();
                        transformControls.attach(currentObject);
                        transformControls.setMode("rotate");
                        scene.add(transformControls);
                    }
                    break
                case "s":
                    if (currentID != 0) {
                        let currentObject = scene.getObjectById(currentID);
                        transformControls.detach();
                        transformControls.attach(currentObject);
                        transformControls.setMode("scale");
                        scene.add(transformControls);
                    }
                    break
                case "Escape":
                    if (currentID != 0) {
                        transformControls.detach();
                        scene.remove(transformControls);
                    }
                    break
                case "Delete":
                    if (currentID != 0) {
                        let currentObject = scene.getObjectById(currentID);
                        transformControls.detach();
                        scene.remove(currentObject);
                        console.log(currentObject);
                        scene.remove(transformControls);
                        console.log(currentID);
                        for (let i = 0; i < arrayTextObject.length; i++) {
                            if (currentID == arrayTextObject[i].ID) {
                                arrayTextObject.splice(i, 1);
                                break;
                            }
                        }
                    }
            }
        })
    }

    return (
        <div>
            <p>Tải lên điểm đánh dấu</p>
            <input id="uploadFileMarker" type="file"></input>
            <button onClick={() => uploadMarker()}>Hoàn tất</button>
            <p>Tải file nội dung AR (Chấp nhận glb và gltf cho mô hình 3D, jpg,png cho hình ảnh, mp4 cho phim và mp3 cho audio</p>
            <input id="uploadFileArContent" type="file"></input>
            <button onClick={() => uploadArContent()}>Hoàn tất</button>
            <p>Danh sách nội dung đã tải</p>
            <ul id="arContentList">

            </ul>
            <p>Danh sách đối tượng</p>
            <ul id="danhSachDoiTuong">
                <li><label> Đối tượng - </label>
                    <select>
                        <option value="volvo">Cấp 1</option>
                        <option value="saab">Cấp 2</option>
                    </select>
                    <select>
                        <option value="volvo">Xem định nghĩa</option>
                        <option value="saab">Xem cấu tạo</option>
                    </select>
                </li>
            </ul>
            <label>Thêm hành động</label>
            <input type="text" id="hanhDong"></input>
            <button onClick={() => themHanhDong()}>Thêm</button>
            <p>Danh sách hành động</p>
            <ul id="danhSachHanhDong">
            </ul>
            <p>Thêm văn bản</p>
            <label>Nội dung</label>
            <textarea id="noiDung"></textarea>
            <label>Font chữ</label>
            <select id="fontChu">
                <option value="timenewromans">Time new romans</option>
                <option value="arial">Arial</option>
            </select>
            <label>Cỡ chữ</label>
            <select id="coChu">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
            </select>
            <label>Màu chữ</label>
            <input id="mauChu" type="text"></input>
            <label>Màu nền</label>
            <input id="mauNen" type="text"></input>
            <label>Trong suốt</label>
            <input type="checkbox" id="trongSuot"></input>
            <button onClick={() => setText2D()}>Thêm</button>
            <br></br>
            <label>Tỉ lệ marker: </label>
            <input id="tiLeMarker" type="number" min="0" onBlur={() => setTiLeMarker()}></input>
            <div id="form-edit-3d" style={{ display: "none" }}>
                <p>Vị trí</p>
                <label>Tọa độ X:</label>
                <input id="toaDoX" type="number" step="any" onBlur={() => setToaDo()}></input>
                <label>Tọa độ Y:</label>
                <input id="toaDoY" type="number" step="any" onBlur={() => setToaDo()}></input>
                <label>Tọa độ Z:</label>
                <input id="toaDoZ" type="number" step="any" onBlur={() => setToaDo()}></input>
                <p>Tỉ lệ</p>
                <label>Tỉ lệ X:</label>
                <input id="tiLeX" type="number" step="any" onBlur={() => setTiLe()}></input>
                <label>Tỉ lệ Y:</label>
                <input id="tiLeY" type="number" step="any" onBlur={() => setTiLe()}></input>
                <label>Tỉ lệ Z:</label>
                <input id="tiLeZ" type="number" step="any" onBlur={() => setTiLe()}></input>
                <p>Góc xoay</p>
                <label>Xoay trục X:</label>
                <input id="xoayTrucX" type="number" step="any" onBlur={() => setGocXoay()}></input>
                <label>Xoay trục Y:</label>
                <input id="xoayTrucY" type="number" step="any" onBlur={() => setGocXoay()}></input>
                <label>Xoay trục Z:</label>
                <input id="xoayTrucZ" type="number" step="any" onBlur={() => setGocXoay()}></input>
            </div>
            <br></br>
            <div id="sceneRender">

            </div>
            <div id="scene2">

            </div>
        </div>
    )
}