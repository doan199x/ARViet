import React, { useEffect } from "react";
import { Component } from "react";
import * as THREE from "three";
import { Color, PixelFormat, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import THREEx from "./threex.domevents/threex.domevents";
import TextSprite from "@seregpie/three.text-sprite";
import TextTexture from "@seregpie/three.text-texture";
import TextPlane from '@seregpie/three.text-plane';
import { productAPI } from "../../../config/productAPI";
import e from "cors";
import { API } from "../../../constant/API";
import { useParams } from "react-router";
import {
  Button,
  Input,
  makeStyles,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";

const axios = require("axios");
//styles
const useStyles = makeStyles((theme) => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "70% 15% 15%",
    margin: "0%",
  },
  column1: {

  },
  column2: {
    marginTop: "5%",
  },
  column3: {},
  inline: {
    display: "grid",
    gridTemplateColumns: "35% 65%",
    justifyContent: "",
    marginTop: "5%",
  },
  line: {
    marginTop: "5%",
    width: '80%',
    display: "grid",
    gridTemplateColumns: "80% 20%",
  },
  xline: {
    marginTop: "5%",
    width: '80%',
    display: "grid",
    gridTemplateColumns: "20% 80%",
  },
  btnline: {
    width: '80%',
    display: "grid",
    gridTemplateColumns: "80% 10%",
  },
  input: {
    marginTop: "5%",
    marginLeft: "%",
  },
  input2: {
    marginTop: "1%",
    marginLeft: "5%",
  },
  title: {
    color: '#2763c5',
    fontWeight: 'bold'
  },
}));

export default function Create() {
  //style
  const classes = useStyles();
  //params
  const param = useParams();

  const lessonID = param.lecid;
  const markerID = param.markerid;
  let camera, renderer;
  // let arrayTextObject = [];

  let currentID = 0;
  let currentSceneMarkerID = 0;
  let currentActionID = 0;
  let currentText = null;
  let previousTextObjectID = 0;
  const px2m = 0.0002645833;

  let scene = new THREE.Scene();
  // let maHanhDongHienTai = 0;

  //add axes
  var axesHelper = new THREE.AxesHelper(200);
  scene.background = new THREE.Color(0x838784);
  scene.add(axesHelper);

  //grid helper:
  var gridXZ = new THREE.GridHelper(1, 100, 0x000000, 0x000000);
  gridXZ.position.y = 0;
  scene.add(gridXZ);

  //add light
  const light = new THREE.AmbientLight(0xffffff); // soft white light
  scene.add(light);

  // add camera
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.0001,
    200
  );
  camera.position.set(0.1, 0.1, 0.1);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  //renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);
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
  transformControls.addEventListener("dragging-changed", function (event) {
    orbitControls.enabled = !event.value;
  });
  transformControls.addEventListener("objectChange", function (event) {
    showFormEdit();
  });

  // window resize
  window.addEventListener("resize", onWindowResize, false);
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / 1.7, window.innerHeight / 1.7);
    animation();
  }
  useEffect(() => {
    // init scene
    let sceneRender = document.getElementById("sceneRender");
    sceneRender.appendChild(renderer.domElement);
    setEventTransform();
    showMarker();
    loadActionList();
    getCurrentActionID();
    loadTempARContentList();
  })

  //Upload marker
  function uploadMarker() {
    let markerFile = document.getElementById("uploadFileMarker").files[0];
    let formData = new FormData();
    formData.append("file", markerFile);
    formData.append("markerID", markerID);
    productAPI.uploadMarker(formData).then((data) => {
      showMarker();
    });
  }
  function showMarker() {
    // get marker roi show ra.
    productAPI.getMarker(markerID).then((data) => {
      var img = new Image();
      img.src = data.data[0].URL;
      img.onload = function () {
        var loader = new THREE.TextureLoader();
        // Load an image file into a custom material
        var material = new THREE.MeshLambertMaterial({
          map: loader.load(data.data[0].URL)
        });
        var geometry = new THREE.PlaneGeometry(img.width * px2m, img.height * px2m);
        // combine our image geometry and material into a mesh
        var marker = new THREE.Mesh(geometry, material);
        marker.rotation.set(degreeToRadian(-90), 0, 0);
        if (currentSceneMarkerID != 0) {
          scene.remove(scene.getObjectById(currentSceneMarkerID));
        }
        currentSceneMarkerID = marker.id;
        scene.add(marker);

        // show ti le marker
        let markerScale = document.getElementById('markerScale');
        markerScale.value = data.data[0].scale;
      }
    });
  }
  // Set Marker scale
  function setMarkerScale() {
    let markerScale = document.getElementById("markerScale").value;
    let marker = scene.getObjectById(currentSceneMarkerID);
    marker.getObjectById(currentSceneMarkerID).scale.set(markerScale, markerScale, markerScale);
  }
  function loadActionList() {
    productAPI.loadMarker(markerID).then((data) => {
      let actionArr = data.data;
      let actionList = document.getElementById("actionList");
      actionList.innerHTML = "";
      for (let i = 0; i < actionArr.length; i++) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(actionArr[i].name));
        let id = document.createAttribute("id");
        id.value = actionArr[i].actionID + actionArr[i].name;
        li.setAttributeNode(id);
        actionList.appendChild(li);
        document.getElementById(id.value).onclick = function () {
          loadARContentByActionID(actionArr[i].actionID);
        };
      }
    });
  }

  function getCurrentActionID() {
    if (currentActionID == 0) {
      // get id action khoi tao
      productAPI.getMarkerID(markerID).then((data) => {
        currentActionID = data.data[0].actionID;
        loadObjectList();
        loadARContentByActionID(currentActionID);
      })
    }
  }

  function addAction() {
    let actionName = document.getElementById("actionName").value;
    productAPI.addAction(actionName, markerID).then((data) => {
      currentActionID = data.data.insertId;
      loadActionList();
    });
  }

  //Upload arContent temp
  function uploadArContentTemp() {
    let arContentFile = document.getElementById("uploadFileArContent").files[0];
    let formData = new FormData();
    formData.append("file", arContentFile);
    formData.append("actionID", currentActionID);
    productAPI.uploadArContentTemp(formData).then((data) => {
      loadTempARContentList();
    });
  }

  // Load danh sach noi dung da tai TempARContentList
  function loadTempARContentList() {
    let tempARContentList = document.getElementById("tempARContentList");
    //get All
    productAPI.getTempARContent(markerID).then((data) => {
      let ARContent = data.data;
      tempARContentList.innerHTML = "";
      for (let i = 0; i < ARContent.length; i++) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(ARContent[i].filename));
        let id = document.createAttribute("id");
        id.value = ARContent[i].filename + ARContent[i].contentID;
        li.setAttributeNode(id);
        tempARContentList.appendChild(li);
        if (ARContent[i].URL[ARContent[i].URL.length - 1] == "b") {
          document.getElementById(id.value).onclick = function () {
            show3dModel(ARContent[i].URL, ARContent[i].contentID);
          };
        } else if (ARContent[i].URL[ARContent[i].URL.length - 1] == "g") {
          document.getElementById(id.value).onclick = function () {
            show2DImage(ARContent[i].URL, ARContent[i].contentID);
          };
        }
      }
    });
  }

  // show 3D model
  function show3dModel(URL, contentID) {
    const loader = new GLTFLoader();
    loader.load(
      URL,
      function (gltf) {
        scene.add(gltf.scene);
        domEvents.addEventListener(
          gltf.scene,
          "dblclick",
          function (event) {
            currentID = gltf.scene.id;
            transformControls.detach();
            transformControls.attach(gltf.scene);
            transformControls.setMode("translate");
            scene.add(transformControls);
            showFormEdit();
            // create new instance of this arcontent and set istemp = false;
          });
        productAPI
          .addNewInstanceARContent({
            contentID: contentID,
            actionID: currentActionID,
          })
          .then((data) => {
            gltf.scene.contentID = data.data.contentID;
            gltf.scene.type = "3DModel";
            addObjectList(data.data.filename, data.data.contentID);
          },
            false
          );
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //Show 2D image
  function show2DImage(URL, contentID) {
    var img = new Image();
    img.src = URL;
    img.onload = function () {
      var loader = new THREE.TextureLoader();
      // Load an image file into a custom material
      var material = new THREE.MeshLambertMaterial({
        map: loader.load(URL),
        side: THREE.DoubleSide,
      });
      var geometry = new THREE.PlaneGeometry(img.width * px2m, img.height * px2m);
      // combine our image geometry and material into a mesh
      var imageTexture = new THREE.Mesh(geometry, material);
      scene.add(imageTexture);
      domEvents.addEventListener(
        imageTexture,
        "dblclick",
        function (event) {
          currentID = imageTexture.id;
          transformControls.detach();
          transformControls.attach(imageTexture);
          transformControls.setMode("translate");
          scene.add(transformControls);
          showFormEdit();
        },
        false
      );
      // create new instance arcontent duoc chon
      productAPI
        .addNewInstanceARContent({
          contentID: contentID,
          actionID: currentActionID,
        })
        .then((data) => {
          imageTexture.contentID = data.data.contentID;
          imageTexture.type = "2DImage"
          addObjectList(data.data.filename, data.data.contentID);
        });
    };
  }

  // show 2D Text
  function show2DText(textUpdatedContentID) {
    let font = document.getElementById("font").value;
    let textObject = {
      text: document.getElementById("text").value,
      size: document.getElementById("size").value,
      color: document.getElementById("color").value,
      backgroundColor: document.getElementById("backgroundColor").value,
      isTransparent: false,
      font: font,
    };
    let configTextture = {
      alignment: "center",
      color: textObject.color,
      fontFamily: textObject.font,
      fontSize: parseInt(textObject.size),
      text: [textObject.text].join("\n"),
    };
    if (document.getElementById("isTransparent").checked == true) {
      textObject.isTransparent = true;
    } else {
      configTextture.backgroundColor = textObject.backgroundColor;
    }
    if (font == "timenewromans") {
      configTextture.fontFamily = '"Times New Roman", Times, serif';
    } else if (font == "arial") {
      configTextture.fontFamily = "Arial, Helvetica, sans-serif";
    }
    let texture = new TextTexture(configTextture);
    let material = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: textObject.isTransparent,
      side: THREE.DoubleSide,
    });
    var geometry = new THREE.PlaneGeometry(
      texture.width * px2m,
      texture.height * px2m
    );
    var textTexture = new THREE.Mesh(geometry, material);
    texture.redraw();
    scene.add(textTexture);
    textObject.actionID = currentActionID;
    productAPI.saveText(textObject, textUpdatedContentID).then((data) => {
      textTexture.contentID = data.data.contentID;
      textTexture.type = "2DText";
      textTexture.config = configTextture;
      addObjectList(data.data.filename, data.data.contentID);
    });
    domEvents.addEventListener(
      textTexture,
      "dblclick",
      function (event) {
        currentID = textTexture.id;
        transformControls.detach();
        transformControls.attach(textTexture);
        transformControls.setMode("translate");
        scene.add(transformControls);
        showFormEdit();
        getFormTextContent();
        currentText = texture;
      },
      false
    );
    return textTexture.id;
  }

  // load objects list in the scene
  function loadObjectList() {
    let objectList = document.getElementById("objectList");
    objectList.innerHTML = "";
    productAPI.getAllARContentChoosen(currentActionID).then((data) => {
      let ARContent = data.data;
      for (let i = 0; i < ARContent.length; i++) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(ARContent[i].filename + ` - ` + ARContent[i].contentID));
        objectList.appendChild(li);
      }
    });
  }
  function addObjectList(filename, contentID) {
    let objectList = document.getElementById("objectList");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(filename + ` - ` + contentID));
    objectList.appendChild(li);
  }
  function clearAllContent() {
    let length = scene.children.length;
    transformControls.detach();
    for (let i = 0; i < length; i++) {
      if (scene.children[i].contentID !== undefined) {
        domEvents.removeEventListener(
          scene.children[i],
          "dblclick",
          function () { },
          false
        );
        scene.remove(scene.children[i]);
        length--;
        i--;
      }
    }
  }
  function loadARContentByActionID(actionID) {
    currentActionID = actionID;
    clearAllContent();
    productAPI.getAllARContentChoosen(actionID).then((data) => {
      loadObjectList();
      let ARContent = data.data;
      for (let i = 0; i < ARContent.length; i++) {
        let filename = ARContent[i].filename;
        if (filename[filename.length - 1] == "b") {
          load3DModel(ARContent[i]);
        } else if (filename[filename.length - 1] == "g") {
          load2DImage(ARContent[i]);
        } else if (filename == "text") {
          load2DText(ARContent[i]);
        }
      }
    });
  }
  function load3DModel(ARContent) {
    const loader = new GLTFLoader();
    loader.load(
      ARContent.URL,
      function (gltf) {
        gltf.scene.contentID = ARContent.contentID;
        gltf.scene.type = "3DModel"
        scene.add(gltf.scene);
        gltf.scene.position.set(
          ARContent.xPosition,
          ARContent.yPosition,
          ARContent.zPosition
        );
        gltf.scene.rotation.set(
          ARContent.xRotation,
          ARContent.yRotation,
          ARContent.zRotation
        );
        gltf.scene.scale.set(ARContent.xScale, ARContent.yScale, ARContent.zScale);
        domEvents.addEventListener(
          gltf.scene,
          "dblclick",
          function (event) {
            currentID = gltf.scene.id;
            transformControls.detach();
            transformControls.attach(gltf.scene);
            transformControls.setMode("translate");
            scene.add(transformControls);
            showFormEdit();
          },
          false
        );
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );
  }
  function load2DImage(ARContent) {
    var img = new Image();
    img.src = ARContent.URL;
    img.onload = function () {
      var loader = new THREE.TextureLoader();
      // Load an image file into a custom material
      var material = new THREE.MeshLambertMaterial({
        map: loader.load(ARContent.URL),
        side: THREE.DoubleSide,
      });
      var geometry = new THREE.PlaneGeometry(img.width * px2m, img.height * px2m);
      // combine our image geometry and material into a mesh
      var imageTexture = new THREE.Mesh(geometry, material);
      imageTexture.contentID = ARContent.contentID;
      imageTexture.type = "2DImage"
      scene.add(imageTexture);
      imageTexture.position.set(
        ARContent.xPosition,
        ARContent.yPosition,
        ARContent.zPosition
      );
      imageTexture.rotation.set(
        ARContent.xRotation,
        ARContent.yRotation,
        ARContent.zRotation
      );
      imageTexture.scale.set(ARContent.xScale, ARContent.yScale, ARContent.zS);
      domEvents.addEventListener(
        imageTexture,
        "dblclick",
        function (event) {
          currentID = imageTexture.id;
          transformControls.detach();
          transformControls.attach(imageTexture);
          transformControls.setMode("translate");
          scene.add(transformControls);
          showFormEdit();
        },
        false
      );
    };
  }
  function load2DText(ARContent) {
    productAPI.getTextARContent(ARContent.contentID).then((data) => {
      let isTransparent = false;
      if (data.data.length > 0) {
        let textARContent = data.data[0];
        let configTextture = {
          alignment: "center",
          color: textARContent.color,
          fontFamily: textARContent.font,
          fontSize: textARContent.size,
          text: [textARContent.text].join("\n"),
        };
        if (textARContent.isTransparent == true) {
          isTransparent = true;
        } else {
          configTextture.backgroundColor = textARContent.backgroundColor;
        }
        if (textARContent.font == "timenewromans") {
          configTextture.fontFamily = '"Times New Roman", Times, serif';
        } else if (textARContent.font == "arial") {
          configTextture.FontFamily = "Arial, Helvetica, sans-serif";
        }
        let texture = new TextTexture(configTextture);
        let material = new THREE.MeshLambertMaterial({
          map: texture,
          transparent: isTransparent,
          side: THREE.DoubleSide,
        });
        var geometry = new THREE.PlaneGeometry(
          texture.width * px2m,
          texture.height * px2m
        );
        var textTexture = new THREE.Mesh(geometry, material);
        texture.redraw();
        textTexture.contentID = ARContent.contentID;
        textTexture.type = "2DText";
        textTexture.config = configTextture;
        scene.add(textTexture);
        textTexture.position.set(
          ARContent.xPosition,
          ARContent.yPosition,
          ARContent.zPosition
        );
        textTexture.rotation.set(
          ARContent.xRotation,
          ARContent.yRotation,
          ARContent.zRotation
        );
        textTexture.scale.set(
          ARContent.xScale,
          ARContent.yScale,
          ARContent.zScale
        );
        domEvents.addEventListener(
          textTexture,
          "dblclick",
          function (event) {
            currentID = textTexture.id;
            transformControls.detach();
            transformControls.attach(textTexture);
            transformControls.setMode("translate");
            scene.add(transformControls);
            currentText = texture;
            getFormTextContent();
            showFormEdit();
          },
          false
        );
      }
    });
  }

  function saveAction() {
    // Lam chung chua lam text
    let actionID = currentActionID;
    productAPI.getAllARContentByActionID(actionID).then((data) => {
      let ARContentArr = data.data;
      let contenIDFileArr = [];
      // let maNoiDungTextArr = [];
      for (let i = 0; i < ARContentArr.length; i++) {
        contenIDFileArr.push(ARContentArr[i].contentID);
      }
      for (let i = 0; i < contenIDFileArr.length; i++) {
        for (let j = 0; j < scene.children.length; j++) {
          if (scene.children[j].contentID == contenIDFileArr[i]) {
            let ARContent = {
              contentID: scene.children[j].contentID,
              xPosition: scene.children[j].position.x,
              yPosition: scene.children[j].position.y,
              zPosition: scene.children[j].position.z,
              xRotation: scene.children[j].rotation.x,
              yRotation: scene.children[j].rotation.y,
              zRotation: scene.children[j].rotation.z,
              xScale: scene.children[j].scale.x,
              yScale: scene.children[j].scale.y,
              zScale: scene.children[j].scale.z,
            };
            productAPI.updateARContent(ARContent).then((data) => {
              // console.log(data);
            });
          }
        }
      }
    });
  }
  function setEventTransform() {
    window.addEventListener("keydown", function (event) {
      switch (event.key) {
        case "t":
          if (currentID != 0) {
            let currentObject = scene.getObjectById(currentID);
            transformControls.detach();
            transformControls.attach(currentObject);
            transformControls.setMode("translate");
            scene.add(transformControls);
          }
          break;
        case "r":
          if (currentID != 0) {
            let currentObject = scene.getObjectById(currentID);
            transformControls.detach();
            transformControls.attach(currentObject);
            transformControls.setMode("rotate");
            scene.add(transformControls);
          }
          break;
        case "s":
          if (currentID != 0) {
            let currentObject = scene.getObjectById(currentID);
            transformControls.detach();
            transformControls.attach(currentObject);
            transformControls.setMode("scale");
            scene.add(transformControls);
          }
          break;
        case "Escape":
          if (currentID != 0) {
            let currentObject = scene.getObjectById(currentID);
            if (currentObject.config !== undefined) {
              document.getElementById("fixButton").style.display = "none"
            }
            transformControls.detach();
            scene.remove(transformControls);
          }
          break;
        case "Delete":
          if (currentID != 0) {
            deleteARContent();
            let currentObject = scene.getObjectById(currentID);
            transformControls.detach();
            scene.remove(currentObject);
            scene.remove(transformControls);
            domEvents.removeEventListener(
              currentObject,
              "dblclick",
              function () { },
              false
            );
            currentID = 0;
          }
      }
    });
  }
  function deleteARContent() {
    let contentID = scene.getObjectById(currentID).contentID;
    productAPI
      .deleteARContent(contentID)
      .then((data) => {
        loadObjectList();
      });
  }

  function showFormEdit() {
    showPosition();
    showScale();
    showRotation();
  }
  function showPosition() {
    if (currentID != 0) {
      let currentObject = scene.getObjectById(currentID);
      document.getElementById("xPosition").value = currentObject.position.x;
      document.getElementById("yPosition").value = currentObject.position.y;
      document.getElementById("zPosition").value = currentObject.position.z;
    }
  }
  function showScale() {
    if (currentID != 0) {
      let currentObject = scene.getObjectById(currentID);
      document.getElementById("xScale").value = currentObject.scale.x;
      document.getElementById("yScale").value = currentObject.scale.y;
      if (currentObject.type == "2DImage" || currentObject.type == "2DText") {
        document.getElementById("zScale").value = 1;
        document.getElementById("zScale").disabled = true;
      } else {
        document.getElementById("zScale").value = currentObject.scale.z;
      }
    }
  }
  function showRotation() {
    if (currentID != 0) {
      let currentObject = scene.getObjectById(currentID);
      document.getElementById("xRotation").value = radianToDegree(
        currentObject.rotation.x
      );
      document.getElementById("yRotation").value = radianToDegree(
        currentObject.rotation.y
      );
      document.getElementById("zRotation").value = radianToDegree(
        currentObject.rotation.z
      );
    }
  }
  function setPosition() {
    let currentObject = scene.getObjectById(currentID);
    let xPosition = document.getElementById("xPosition").value.trim();
    let yPosition = document.getElementById("yPosition").value.trim();
    let zPosition = document.getElementById("zPosition").value.trim();

    if (xPosition.length == 0) {
      xPosition = 0;
      document.getElementById("xPosition").value = 0;
    }
    if (yPosition.length == 0) {
      yPosition = 0;
      document.getElementById("yPosition").value = 0;
    }
    if (zPosition.length == 0) {
      zPosition = 0;
      document.getElementById("zPosition").value = 0;
    }
    currentObject.position.set(xPosition, yPosition, zPosition);
  }
  function setScale() {
    let currentObject = scene.getObjectById(currentID);
    let xScale = document.getElementById("xScale").value.trim();
    let yScale = document.getElementById("yScale").value.trim();
    let zScale = document.getElementById("zScale").value.trim();
    if (xScale.length == 0) {
      xScale = 1;
      document.getElementById("xScale").value = 1;
    }
    if (yScale.length == 0) {
      yScale = 1;
      document.getElementById("yScale").value = 1;
    }
    if (zScale.length == 0) {
      zScale = 1;
      document.getElementById("zScale").value = 1;
    }
    currentObject.scale.set(xScale, yScale, zScale);
  }
  function setRotation() {
    let currentObject = scene.getObjectById(currentID);
    let xRotaion = document.getElementById("xRotaion").value.trim();
    let yRotaion = document.getElementById("yRotaion").value.trim();
    let zRotaion = document.getElementById("zRotaion").value.trim();
    if (xRotaion.length == 0) {
      xRotaion = 0;
      document.getElementById("xRotaion").value = 0;
    }
    if (yRotaion.length == 0) {
      yRotaion = 0;
      document.getElementById("yRotaion").value = 0;
    }
    if (zRotaion.length == 0) {
      zRotaion = 0;
      document.getElementById("zRotaion").value = 0;
    }
    currentObject.rotation.set(xRotaion, yRotaion, zRotaion);
  }

  function getFormTextContent() {
    let currentTextture = scene.getObjectById(currentID);
    document.getElementById("text").value = currentTextture.config.text;
    document.getElementById("size").value = currentTextture.config.fontSize;
    document.getElementById("color").value = currentTextture.config.color;
    if (currentTextture.config.backgroundColor === undefined) {
      document.getElementById("backgroundColor").value = "";
    } else {
      document.getElementById("backgroundColor").value = currentTextture.config.backgroundColor;
    }
    let font = currentTextture.config.fontFamily
    if (font == '"Times New Roman", Times, serif') {
      document.getElementById("font").value = "timenewromans";
    } else if (font == "Arial, Helvetica, sans-serif") {
      document.getElementById("font").value = "arial";
    }
    let fixButton = document.getElementById("fixButton");
    fixButton.style.display = "block";
  }

  function update2DText() {
    previousTextObjectID = currentID;
    let previousTextObject = scene.getObjectById(previousTextObjectID);
    let textObjectID = show2DText(previousTextObject.contentID);
    let currentTextObject = scene.getObjectById(textObjectID);
    // set position
    currentTextObject.position.set(previousTextObject.position.x, previousTextObject.position.y, previousTextObject.position.z)
    // set scale
    currentTextObject.scale.set(previousTextObject.scale.x, previousTextObject.scale.y, previousTextObject.scale.z)
    // set rotation
    currentTextObject.rotation.set(previousTextObject.rotation.x, previousTextObject.rotation.y, previousTextObject.rotation.z)
    // remove previous object from scene
    domEvents.removeEventListener(
      previousTextObject,
      "dblclick",
      function () { },
      false
    );
    currentID = 0;
    transformControls.detach();
    scene.remove(transformControls);
    scene.remove(previousTextObject);

    document.getElementById("fixButton").style.display = "none";

  }
  function degreeToRadian(degree) {
    return (degree * Math.PI) / 180.0;
  }
  function radianToDegree(radian) {
    return (radian * 180.0) / Math.PI;
  }
  return (
    <div>
      <div className={classes.grid}>
      <div className={classes.column2}>
          <div className={classes.scene} id="sceneRender"></div>
          <div
            style={{ display: "flex", justifyContent: "center" , marginTop: '5%'}}
            id="form-edit-3d"
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => saveAction()}
            >
              Lưu điểm đánh dấu
            </Button>
          </div>
        </div>
        <div className={classes.column1}>
          <div>
            <Typography className={classes.title} >1. Thêm hành động</Typography>
          </div>
          <div className={classes.btnline}>
            <input className={classes.input} placeholder = "Tên hành động" type="text" id="actionName"></input>
            <Button
              style={{ marginTop: "13%", marginLeft: "10%", width: '10px' }}
              variant="outlined"
              color="primary"
              onClick={() => addAction()}
            >
              +
            </Button>
          </div>
          <div>
            <Typography>Hành động đã tạo:</Typography>
          </div>
          <div>
            <ul id="actionList"></ul>
          </div>
          <div>
            <Typography className={classes.title}>2. Điểm đánh dấu</Typography>
          </div>
          <div style = {{marginTop: '-10%'}} >
            <Typography color='secondary' variant='caption'>
              (Hỗ trợ: .jpg, .png)
            </Typography>
          </div>
          <div className={classes.line}>
            <input
              className={classes.input}
              id="uploadFileMarker"
              type="file"
            ></input>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5%",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => uploadMarker()}
            >
              Hoàn tất
            </Button>
          </div>
          <div className={classes.xline}>
            <Typography>Tỉ lệ: </Typography>
          <input
              id="markerScale"
              type="number"
              min="0"
              className={classes.input2}
              onBlur={() => setMarkerScale()}
            ></input>
            </div>
          <div>
            <Typography className={classes.title}>3. Nội dung AR </Typography>
          </div>
          <div style = {{marginTop: '-10%'}} >
            <Typography color='secondary' variant='caption'>
              (Hỗ trợ: .glb, .gltf, .jpg, .png, .mp4, .mp3.)
            </Typography>
          </div>
          <div className={classes.line}>
            <input
              className={classes.input}
              id="uploadFileArContent"
              type="file"
            ></input>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5%",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => uploadArContentTemp()}
            >
              Hoàn tất
            </Button>
          </div>
          <div className={classes.line}>
            <Typography>Nội dung đã tải: </Typography>
          </div>
          <div className={classes.line}>
            <ul id="tempARContentList"></ul>
          </div>
          <div className={classes.line}>
            <Typography>Đối tượng: </Typography>
          </div>
          <div className={classes.line}>
            <ul id="objectList"></ul>
          </div>
        </div>
        <div className={classes.column3}>
          <Typography className={classes.title}>4. Thêm văn bản</Typography>
          <div className={classes.inline}>
            <Typography>Nội dung: </Typography>
            <TextareaAutosize
              className={classes.input2}
              aria-label="empty textarea"
              placeholder="Nội dung"
              id="text"
            ></TextareaAutosize>
          </div>
          <div className={classes.inline}>
            <Typography>Font chữ: </Typography>
            <select className={classes.input2} id="font">
              <option value="timenewromans">Time new romans</option>
              <option value="arial">Arial</option>
            </select>
          </div>
          <div className={classes.inline}>
            <Typography>Cỡ chữ: </Typography>
            <select className={classes.input2} id="size">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className={classes.inline}>
            <Typography>Màu chữ: </Typography>
            <input className={classes.input2} id="color" type="text"></input>
          </div>
          <div className={classes.inline}>
            <Typography>Màu nền: </Typography>
            <input className={classes.input2} id="backgroundColor" type="text"></input>
          </div>
          <div className={classes.inline}>
            <Typography>Độ trong: </Typography>
            <div style={{ marginTop: "-7%" }}>
              <input type="checkbox" id="isTransparent"></input>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => show2DText(0)}
              >
                Thêm
              </Button>
              <Button
                id="fixButton" style={{ display: "none" }}
                variant="outlined"
                color="secondary"
                onClick={() => update2DText()}
              >
                Sửa
              </Button>
            </div>
          </div>
          <div className={classes.inline}>
            <Typography className={classes.title}> 5. Vị trí</Typography>
          </div>
          <div className={classes.inline}>
            <Typography>Tọa độ X:</Typography>
            <input
              id="xPosition"
              type="number"
              step="any"
              className={classes.input2}
              onBlur={() => setPosition()}
            ></input>
          </div>
          <div className={classes.inline}>
            <Typography>Tọa độ Y:</Typography>
            <input
              id="yPosition"
              type="number"
              step="any"
              className={classes.input2}
              onBlur={() => setPosition()}
            ></input>
          </div>
          <div className={classes.inline}>
            <Typography>Tọa độ Z:</Typography>
            <input
              id="zPosition"
              type="number"
              step="any"
              className={classes.input2}
              onBlur={() => setPosition()}
            ></input>
          </div>
          <div className={classes.inline}>
            <Typography className={classes.title}> 6. Tỉ lệ</Typography>
          </div>
          <div className={classes.inline}>
            <Typography>Tỉ lệ X:</Typography>
            <input
              id="xScale"
              type="number"
              step="any"
              className={classes.input2}
              onBlur={() => setScale()}
            ></input>
          </div>
          <div className={classes.inline}>
            <Typography>Tỉ lệ Y:</Typography>
            <input
              id="yScale"
              type="number"
              step="any"
              className={classes.input2}
              onBlur={() => setScale()}
            ></input>
          </div>
          <div className={classes.inline}>
            <Typography>Tỉ lệ Z:</Typography>
            <input
              id="zScale"
              type="number"
              step="any"
              className={classes.input2}
              onBlur={() => setScale()}
            ></input>
          </div>
          <div>
            <Typography className={classes.title}>7. Góc xoay</Typography>
          </div>
          <div className={classes.inline}>
            <Typography>Trục X:</Typography>
            <input
              id="xRotation"
              type="number"
              step="any"
              className={classes.input2}
              onBlur={() => setRotation()}
            ></input>
          </div>
          <div className={classes.inline}>
            <Typography>Trục Y:</Typography>
            <input
              id="yRotation"
              type="number"
              step="any"
              className={classes.input2}
              onBlur={() => setRotation()}
            ></input>
          </div>
          <div className={classes.inline}>
            <Typography>Trục Z:</Typography>
            <input
              id="zRotation"
              type="number"
              step="any"
              className={classes.input2}
              onBlur={() => setRotation()}
            ></input>
          </div>
          <div className={classes.inline}></div>
          <br></br>
        </div>
      </div>
    </div>
  );
}