import React, { useEffect, useRef, useState } from "react";
import { Component } from "react";
import * as THREE from "three";
import { AnimationMixer, Color, PixelFormat, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import THREEx from "./threex.domevents/threex.domevents";
import TextSprite from "@seregpie/three.text-sprite";
import TextTexture from "@seregpie/three.text-texture";
import TextPlane from '@seregpie/three.text-plane';
import { productAPI } from "../../../config/productAPI";
import e from "cors";
import { API } from "../../../constant/API";
import { useParams } from "react-router";
import ActionList from "./ActionList/ActionList"
import MarkerList from "./MarkerList/MarkerList"
import TempARContentList from "./TempARContentList/TempARContentList"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'
import TextColorPicker from "./TextColorPicker/TextColorPicker"
import TextBackgroundColorPicker from "./TextBackgroundColorPicker/TextBackgroundColorPicker"
import SetCoordinate from "./SetCoordinate/SetCoordinate"
import SetScale from "./SetScale/SetScale"
import SetRotation from "./SetRotation/SetRotation"
import FormVideo from "./FormVideo/FormVideo"
import ButtonText from "./ButtonText/ButtonText"
import FormAudio from "./FormAudio/FormAudio"
import Guide from "./Guide/Guide"
import { ConfigURL } from "../../../config/config"
import { toast } from "react-toastify";
import {
  Button,
  Input,
  makeStyles,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
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
    marginTop: "0%",
  },
  column3: {},
  inline: {
    display: "grid",
    gridTemplateColumns: "35% 65%",
    justifyContent: "",
    marginTop: "5%",
  },
  inline2: {
    display: "grid",
    gridTemplateColumns: "40% 10% 50%",
    justifyContent: "center",
    alignItems: 'center',
    marginTop: "5%",

  },
  inline3: {
    display: "grid",
    gridTemplateColumns: "50% 50%",
    justifyContent: "",
    marginTop: "5%",
    width: "50%"
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
    gridTemplateColumns: "70% 30%",
  },
  inputLine: {
    marginTop: "2%",
    width: '80%',
    display: "grid",
    gridTemplateColumns: "100%",
  },
  btnline: {
    marginTop: "10px",
    width: '80%',
    display: "grid",
    gridTemplateColumns: "70% 30%",
  },
  btn: {
    borderRadius: "30px",
    height: "50px",
    width: "150px",
    backgroundColor: "#f23276",
    color: 'white',
    '&:hover': {
      backgroundColor: '#e4e6e8',
      color: 'black',
    }
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
  let camera, renderer;
  // let arrayTextObject = [];
  let currentID = 0;
  let currentSceneMarkerID = 0;
  let currentText = null;
  let previousTextObjectID = 0;
  const px2m = 0.0002645833;
  let activeAction;
  let mixers = [];
  let isPlayAnimation = false;
  let animationArray = [];
  let scene = new THREE.Scene();
  //state
  const [markerID, setMarkerID] = useState(null);
  const [currentActionID, setCurrentActionID] = useState(null);
  useEffect(async () => {
    if (markerID == null) {
      console.log("load null");
      await productAPI.getMarkerByLessonID(lessonID).then(data => {
        let sceneRender = document.getElementById("sceneRender");
        sceneRender.appendChild(renderer.domElement);
        setMarkerID(data.data[0].markerID);
      })
    } else {
      console.log(markerID);
      let sceneRender = document.getElementById("sceneRender");
      sceneRender.innerHTML = ""
      sceneRender.appendChild(renderer.domElement);
      setEventTransform();
      showMarker();
      getCurrentActionID(markerID);
    }
  }, [markerID])

  useEffect(async () => {
    let sceneRender = document.getElementById("sceneRender");
    sceneRender.innerHTML = ""
    sceneRender.appendChild(renderer.domElement);
    setEventTransform();
    showMarker();
    loadARContentByActionID(currentActionID);
  }, [currentActionID])


  //callback
  let cbsetCurrentMarkerID = (data) => {
    setMarkerID(data);
  }
  let cbsetCurrentActionID = (data) => {
    setCurrentActionID(data);
  }
  //add axes
  var axesHelper = new THREE.AxesHelper(200);
  scene.background = new THREE.Color(0x838784);
  scene.add(axesHelper);

  //grid helper:
  var gridXZ = new THREE.GridHelper(1, 100, 0x000000, 0x000000);
  gridXZ.position.y = 0;
  scene.add(gridXZ);

  //add light
  const light = new THREE.AmbientLight(0xffffff, 1.15); // soft white light
  scene.add(light);

  // add camera
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.0001,
    200
  );
  camera.position.set(0.2, 0.2, 0.2);
  const clock = new THREE.Clock();
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);
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
  animate();
  // window resize
  window.addEventListener("resize", onWindowResize, false);
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);
    animate();
  }
  function animate() {
    requestAnimationFrame(animate);
    let time = clock.getDelta();
    mixers.map(m => m.update(time));
    render();
  }
  function render() {
    renderer.render(scene, camera);
  }
  function showMarker() {
    if (markerID != null) {
      productAPI.getMarker(markerID).then((data) => {
        var img = new Image();
        img.src = data.data[0].URL;
        let imgScale = data.data[0].scale;
        img.onload = function () {
          var loader = new THREE.TextureLoader();
          // Load an image file into a custom material
          var material = new THREE.MeshLambertMaterial({
            map: loader.load(data.data[0].URL)
          });
          var geometry = new THREE.PlaneGeometry(img.width * px2m * imgScale, img.height * px2m * imgScale);
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
  }
  // Set Marker scale
  function setMarkerScale() {
    productAPI.getMarker(markerID).then((data) => {
      let markerScale = document.getElementById("markerScale").value;
      let currentMarkerScale = data.data[0].scale;
      let markerID = data.data[0].markerID;
      let realScale = markerScale / currentMarkerScale;
      let marker = scene.getObjectById(currentSceneMarkerID);
      marker.getObjectById(currentSceneMarkerID).scale.set(realScale, realScale, realScale);
      productAPI.setMarkerScale(markerScale, markerID).then((data) => {

      })
    })
  }
  function getCurrentActionID(currentMarkerID) {
    productAPI.getMarkerID(currentMarkerID).then((data) => {
      setCurrentActionID(data.data[0].actionID);
    })
  }

  function addAction() {
    if (markerID != null) {
      let actionName = document.getElementById("actionName").value;
      if (actionName.length == 0) {
        toast.error('Vui lòng nhập tên hành động muốn thêm!')
      } else {
        productAPI.addAction(actionName, markerID).then((data) => {
          setCurrentActionID(data.data.insertId);
        });
      }
    }
  }
  // show 3D model
  let show3DModel = (URL, contentID) => {
    const loader = new GLTFLoader();
    const draco = new DRACOLoader();
    draco.setDecoderConfig({ type: 'js' });
    draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(draco);
    loader.load(
      URL,
      function (gltf) {
        if (gltf.animations.length > 0) {
          let mixer = new THREE.AnimationMixer(gltf.scene);
          mixers.push(mixer);
          gltf.scene.activeAnimation = mixer.clipAction(gltf.animations[gltf.animations.length - 1]);
          let animationHere = mixer.clipAction(gltf.animations[gltf.animations.length - 1]);
          animationHere.play();
          // animationArray.push(animationHere);
        }
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
            showGuide();
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
  let show2DImage = (URL, contentID) => {
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
      imageTexture.position.set(-0.06, 0.06, -0.06);
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
          showGuide();
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
    textTexture.position.set(0.06, 0.06, -0.06);
    textObject.actionID = currentActionID;
    productAPI.saveText(textObject, textUpdatedContentID).then((data) => {
      textTexture.contentID = data.data.contentID;
      textTexture.type = "2DText";
      textTexture.config = configTextture;
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
        showGuide();
        getFormTextContent();
        currentText = texture;
      },
      false
    );
    return textTexture.id;
  }

  let showVideo = (URL, contentID) => {
    // Create video object
    let video = document.createElement('video');
    video.src = URL; // Set video address
    video.setAttribute("crossorigin", "anonymous");
    let videoTexture = new THREE.VideoTexture(video)
    let videoGeometry = new THREE.PlaneGeometry(1920 * px2m, 1080 * px2m);
    videoTexture.needsUpdate = true;
    let videoMaterial = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      map: videoTexture,
    });
    let videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
    videoMesh.video = video;
    scene.add(videoMesh);
    domEvents.addEventListener(
      videoMesh,
      "dblclick",
      function (event) {
        currentID = videoMesh.id;
        transformControls.detach();
        transformControls.attach(videoMesh);
        transformControls.setMode("translate");
        scene.add(transformControls);
        showFormEdit();
        showGuide();
        showFormVideo();
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
        videoMesh.contentID = data.data.contentID;
        videoMesh.type = "video"
      });
  }

  // Show mp3
  function showMp3(URL, contentID) {
    const loader = new GLTFLoader();
    let speakerModelURL = ConfigURL.serverURL + '/speaker/speaker.glb'
    loader.load(
      speakerModelURL,
      function (gltf) {
        if (gltf.animations.length > 0) {
          let mixer = new THREE.AnimationMixer(gltf.scene);
          mixers.push(mixer);
          gltf.scene.activeAnimation = mixer.clipAction(gltf.animations[0]);
          // let animationHere = mixer.clipAction(gltf.animations[0]);
          // animationHere.play();
        }
        let audio = new Audio(URL);
        gltf.scene.audio = audio;
        scene.add(gltf.scene);
        gltf.scene.position.set(0.1, 0.1, -0.1);
        gltf.scene.scale.set(0.015, 0.015, 0.015);
        gltf.scene.rotation.set(0, degreeToRadian(-30), 0);
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
            showGuide();
            showFormAudio();
            // create new instance of this arcontent and set istemp = false;
          });
        productAPI
          .addNewInstanceARContent({
            contentID: contentID,
            actionID: currentActionID,
          })
          .then((data) => {
            gltf.scene.contentID = data.data.contentID;
            gltf.scene.type = "speaker";
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
      //styles
      document.getElementById("objectList").style.fontSize = "15px";
      document.getElementById("objectList").style.textDecoration = "none";
      document.getElementById("objectList").style.fontWeight = " normal";
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
  let loadARContentByActionID = (actionID) => {
    clearAllContent();
    if (actionID != null) {
      productAPI.getAllARContentChoosen(actionID).then((data) => {
        // loadObjectList();
        let ARContent = data.data;
        for (let i = 0; i < ARContent.length; i++) {
          let filename = ARContent[i].filename;
          if (filename[filename.length - 1] == "b") {
            load3DModel(ARContent[i]);
          } else if (filename[filename.length - 1] == "g") {
            load2DImage(ARContent[i]);
          } else if (filename == "text") {
            load2DText(ARContent[i]);
          } else if (filename[filename.length - 1] == "4") {
            loadVideo(ARContent[i]);
          } else if (filename[filename.length - 1] == "3") {
            loadMp3(ARContent[i]);
          }
        }
      });
    }
  }
  function load3DModel(ARContent) {
    console.log("load dog")
    const loader = new GLTFLoader();
    const draco = new DRACOLoader();
    draco.setDecoderConfig({ type: 'js' });
    draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(draco);
    loader.load(
      ARContent.URL,
      function (gltf) {
        if (gltf.animations.length > 0) {
          let mixer = new THREE.AnimationMixer(gltf.scene);
          mixers.push(mixer);
          gltf.scene.activeAnimation = mixer.clipAction(gltf.animations[gltf.animations.length - 1]);
          let animationHere = mixer.clipAction(gltf.animations[gltf.animations.length - 1]);
          animationHere.play();
          // animationArray.push(animationHere);
        }
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
            showGuide();
          },
          false
        );
      },
      (xhr) => {
        // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
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
      imageTexture.scale.set(ARContent.xScale, ARContent.yScale, ARContent.zScale);
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
          showGuide();
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
            showGuide();
          },
          false
        );
      }
    });
  }
  function loadVideo(ARContent) {
    // Create video object
    let video = document.createElement('video');
    video.src = ARContent.URL; // Set video address
    video.setAttribute("crossorigin", "anonymous");
    let videoTexture = new THREE.VideoTexture(video)
    let videoGeometry = new THREE.PlaneGeometry(1920 * px2m, 1080 * px2m);
    videoTexture.needsUpdate = true;
    let videoMaterial = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      map: videoTexture,
    });
    let videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
    videoMesh.video = video;
    scene.add(videoMesh);
    videoMesh.contentID = ARContent.contentID;
    videoMesh.type = "video"
    scene.add(videoMesh);
    videoMesh.position.set(
      ARContent.xPosition,
      ARContent.yPosition,
      ARContent.zPosition
    );
    videoMesh.rotation.set(
      ARContent.xRotation,
      ARContent.yRotation,
      ARContent.zRotation
    );
    videoMesh.scale.set(ARContent.xScale, ARContent.yScale, ARContent.zScale);
    domEvents.addEventListener(
      videoMesh,
      "dblclick",
      function (event) {
        currentID = videoMesh.id;
        transformControls.detach();
        transformControls.attach(videoMesh);
        transformControls.setMode("translate");
        scene.add(transformControls);
        showFormEdit();
        showFormVideo();
        showGuide();
      },
      false
    );
  }

  function loadMp3(ARContent) {
    const loader = new GLTFLoader();
    let speakerModelURL = ConfigURL.serverURL + '/speaker/speaker.glb';
    loader.load(
      speakerModelURL,
      function (gltf) {
        if (gltf.animations.length > 0) {
          let mixer = new THREE.AnimationMixer(gltf.scene);
          mixers.push(mixer);
          gltf.scene.activeAnimation = mixer.clipAction(gltf.animations[0]);
          // let animationHere = mixer.clipAction(gltf.animations[0]);
        }
        gltf.scene.contentID = ARContent.contentID;
        gltf.scene.type = "speaker"
        let audio = new Audio(ARContent.URL);
        gltf.scene.audio = audio;
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
            showGuide();
            showFormAudio();
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

  function saveAction() {
    if (currentActionID != null) {
      let actionID = currentActionID;
      // Lay tat ca noi dung ma ko phai tam
      productAPI.getAllARContentByActionID(actionID).then((data) => {
        let ARContentArr = data.data;
        // Neu noi dung k phai tam, so sanh contentid voi contentid con trong scene neu trung thi update
        for (let i = 0; i < ARContentArr.length; i++) {
          ARContentArr[i].getUpdated = false;
          for (let j = 0; j < scene.children.length; j++) {
            if (scene.children[j].contentID == ARContentArr[i].contentID) {
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
              ARContentArr[i].getUpdated = true;
              productAPI.updateARContent(ARContent).then((data) => {
                // console.log(data);
              });
            }
          }
        }
        ARContentArr.map((element, i) => {
          if (element.getUpdated == false) {
            console.log(element.contentID);
            deleteARContent(element.contentID);
          }
        })
      });
    }
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
            document.getElementById("xPosition").disabled = true;
            document.getElementById("yPosition").disabled = true;
            document.getElementById("zPosition").disabled = true;
            document.getElementById("xScale").disabled = true;
            document.getElementById("yScale").disabled = true;
            document.getElementById("zScale").disabled = true;
            document.getElementById("xRotation").disabled = true;
            document.getElementById("yRotation").disabled = true;
            document.getElementById("zRotation").disabled = true;
            hideGuide();
            let currentObject = scene.getObjectById(currentID);
            if (currentObject.config !== undefined) {
              document.getElementById("fixButton").style.display = "none"
            }
            if (currentObject.video !== undefined) {
              document.getElementById("formVideo").style.display = "none"
            }
            if (currentObject.audio !== undefined) {
              document.getElementById("formAudio").style.display = "none"
            }
            //disable input
            transformControls.detach();
            scene.remove(transformControls);
          }
          break;
        case "Delete":
          if (currentID != 0) {
            document.getElementById("xPosition").disabled = true;
            document.getElementById("yPosition").disabled = true;
            document.getElementById("zPosition").disabled = true;
            document.getElementById("xScale").disabled = true;
            document.getElementById("yScale").disabled = true;
            document.getElementById("zScale").disabled = true;
            document.getElementById("xRotation").disabled = true;
            document.getElementById("yRotation").disabled = true;
            document.getElementById("zRotation").disabled = true;
            let currentObject = scene.getObjectById(currentID);
            if (currentObject.config !== undefined) {
              document.getElementById("fixButton").style.display = "none"
            }
            if (currentObject.video !== undefined) {
              document.getElementById("formVideo").style.display = "none";
              let video = scene.getObjectById(currentID).video;
              video.pause();
            }
            if (currentObject.audio !== undefined) {
              document.getElementById("formAudio").style.display = "none";
              let audio = scene.getObjectById(currentID).audio;
              audio.pause();

            }
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
            hideGuide();
            hideFixButton();
          }
      }
    });
  }
  function deleteARContent(contentID) {
    productAPI
      .deleteARContent(contentID)
      .then((data) => {
      });
  }

  function showFormEdit() {
    showPosition();
    showScale();
    showRotation();
  }
  function showPosition() {
    if (currentID != 0) {
      document.getElementById("xPosition").disabled = false;
      document.getElementById("yPosition").disabled = false;
      document.getElementById("zPosition").disabled = false;
      let currentObject = scene.getObjectById(currentID);
      let cmPositionX = currentObject.position.x * 100;
      let roundCmPositionX = cmPositionX.toFixed(2);
      let cmPositionY = currentObject.position.y * 100;
      let roundCmPositionY = cmPositionY.toFixed(2);
      let cmPositionZ = currentObject.position.z * 100;
      let roundCmPositionZ = cmPositionZ.toFixed(2);
      document.getElementById("xPosition").value = roundCmPositionX;
      document.getElementById("yPosition").value = roundCmPositionY;
      document.getElementById("zPosition").value = roundCmPositionZ;
    }
  }
  function showScale() {
    document.getElementById("xScale").disabled = false;
    document.getElementById("yScale").disabled = false;
    document.getElementById("zScale").disabled = false;
    if (currentID != 0) {
      let currentObject = scene.getObjectById(currentID);
      document.getElementById("xScale").value = parseFloat(currentObject.scale.x).toFixed(2);
      document.getElementById("yScale").value = parseFloat(currentObject.scale.y).toFixed(2);
      if (currentObject.type == "2DImage" || currentObject.type == "2DText" || currentObject.type == "video") {
        document.getElementById("zScale").value = 1;
        document.getElementById("zScale").disabled = true;
      } else {
        document.getElementById("zScale").value = parseFloat(currentObject.scale.z).toFixed(2);
        document.getElementById("zScale").disabled = false;
      }
    }
  }
  function showRotation() {
    if (currentID != 0) {
      document.getElementById("xRotation").disabled = false;
      document.getElementById("yRotation").disabled = false;
      document.getElementById("zRotation").disabled = false;
      let currentObject = scene.getObjectById(currentID);
      let rotationX = radianToDegree(currentObject.rotation.x);
      let rotationY = radianToDegree(currentObject.rotation.y);
      let rotationZ = radianToDegree(currentObject.rotation.z);
      document.getElementById("xRotation").value = parseFloat(rotationX).toFixed(2);
      document.getElementById("yRotation").value = parseFloat(rotationY).toFixed(2);
      document.getElementById("zRotation").value = parseFloat(rotationZ).toFixed(2);
    }
  }
  function setPosition() {
    let currentObject = scene.getObjectById(currentID);
    let xPosition = document.getElementById("xPosition").value;
    let yPosition = document.getElementById("yPosition").value;
    let zPosition = document.getElementById("zPosition").value;

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
    let xMPosition = xPosition / 100;
    let yMPosition = yPosition / 100;
    let zMPosition = zPosition / 100;
    currentObject.position.set(xMPosition, yMPosition, zMPosition);
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
    let xRotation = document.getElementById("xRotation").value.trim();
    let yRotation = document.getElementById("yRotation").value.trim();
    let zRotation = document.getElementById("zRotation").value.trim();
    if (xRotation.length == 0) {
      xRotation = 0;
      document.getElementById("xRotation").value = 0;
    }
    if (yRotation.length == 0) {
      yRotation = 0;
      document.getElementById("yRotation").value = 0;
    }
    if (zRotation.length == 0) {
      zRotation = 0;
      document.getElementById("zRotation").value = 0;
    }
    currentObject.rotation.set(degreeToRadian(xRotation), degreeToRadian(yRotation), degreeToRadian(zRotation));
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
  function playVideo() {
    let video = scene.getObjectById(currentID).video;
    video.play();
  }
  function pauseVideo() {
    let video = scene.getObjectById(currentID).video;
    video.pause();
  }
  function playAudio() {
    let audio = scene.getObjectById(currentID).audio;
    audio.loop = true;
    audio.play();
    let animation = scene.getObjectById(currentID).activeAnimation;
    animation.play();
    animation.paused = false;
  }
  function pauseAudio() {
    let audio = scene.getObjectById(currentID).audio;
    audio.pause();
    let animation = scene.getObjectById(currentID).activeAnimation;
    animation.paused = true;
  }
  function restartAudio() {
    let audio = scene.getObjectById(currentID).audio;
    audio.currentTime = 0;
  }
  function showFormVideo() {
    document.getElementById("formVideo").style.display = "flex";
  }
  function showFormAudio() {
    document.getElementById("formAudio").style.display = "flex";
  }
  function degreeToRadian(degree) {
    return (degree * Math.PI) / 180.0;
  }
  function radianToDegree(radian) {
    return (radian * 180.0) / Math.PI;
  }
  function showGuide() {
    document.getElementById("guide").style.display = "flex"
  }
  function hideGuide() {
    document.getElementById("guide").style.display = "none"
  }
  function hideFixButton() {
    document.getElementById("fixButton").style.display = "none"
  }
  function test() {
    let audio = new Audio("https://testar11.herokuapp.com/audio/test.mp3");
    audio.play();
  }
  function showColorTextPicker() {
    document.getElementById("colorTextPicker").style.display = "block";
  }
  return (
    <div>
      {/* <Button onClick={() => test()}>Test</Button> */}
      <div className={classes.grid}>
        <div className={classes.column2}>
          <div>
            {markerID ? ( <div style = {{marginLeft: '10%'}}>
              <MarkerList lessonID={lessonID} cbsetCurrentActionID={cbsetCurrentActionID} 
              cbsetCurrentMarkerID={cbsetCurrentMarkerID} showMarker={showMarker}></MarkerList>

            </div>
            ) : (<div></div>)}
          </div>
          <div className={classes.scene} id="sceneRender"></div>
          <div>
            <Guide currentActionID={currentActionID}></Guide>
          </div>
          <div>
            <FormVideo playVideo={playVideo} pauseVideo={pauseVideo} currentActionID={currentActionID}></FormVideo>
          </div>
          <div>
            <FormAudio playAudio={playAudio} pauseAudio={pauseAudio} restartAudio={restartAudio} currentActionID={currentActionID}></FormAudio>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: '5%'}}
            id="form-edit-3d"
          >
            <Button
              color="secondary"
              className = {classes.btn}
              onClick={() => saveAction()}
            >
              Lưu hành động
            </Button>
          </div>
        </div>
        <div className={classes.column1}>
          <div>
            <Typography className={classes.title} >1. Thêm hành động</Typography>
          </div>
          <div>
            <ActionList loadARContentByActionID={loadARContentByActionID} cbsetCurrentActionID={cbsetCurrentActionID} markerID={markerID}></ActionList>
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
          <div style={{ marginTop: "5%" }}>
            <Typography className={classes.title}>2. Nội dung AR </Typography>
          </div>
          <div>
            <TempARContentList currentActionID={currentActionID} markerID={markerID} show3DModel={show3DModel} show2DImage={show2DImage} showVideo={showVideo} showMp3={showMp3}></TempARContentList>
          </div>
        </div>
        <div className={classes.column3}>
          <Typography className={classes.title}>3. Thêm văn bản</Typography>
          <div className={classes.inline}>
            <Typography>Nội dung: </Typography>
            <TextareaAutosize
              className={classes.input2}
              rowsMin={5}
              aria-label="empty textarea"
              placeholder="Mỗi dòng tối đa 70 kí tự"
              id="text"
            ></TextareaAutosize>
          </div>
          <div className={classes.inline}>
            <Typography>Font chữ: </Typography>
            <select className={classes.input2} id="font">
            <option value="arial">Arial</option>
              {/* <option value="timenewromans">Time new romans</option> */}
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
              <option value="70">70</option>
              <option value="90">90</option>
              <option value="100">100</option>
            </select>
          </div>
          <div>
            <TextColorPicker></TextColorPicker>
          </div>
          <div>
            <TextBackgroundColorPicker></TextBackgroundColorPicker>
          </div>
          <div className={classes.inline2}>
            <Typography>Trong suốt: </Typography>
            <div style={{ marginTop: "-10px", marginLeft: "3%" }}>
              <input type="checkbox" id="isTransparent"></input>
            </div>
            <ButtonText show2DText={show2DText} update2DText={update2DText} currentActionID={currentActionID}></ButtonText>
          </div>
          <div style={{ marginTop: "5%" }}>
            <Typography className={classes.title}> 4. Vị trí (cm)</Typography>
          </div>
          <div>
            <SetCoordinate setPosition={setPosition} currentActionID={currentActionID}></SetCoordinate>
          </div>
          <div className={classes.inline}>
            <Typography className={classes.title}> 5. Tỉ lệ</Typography>
          </div>
          <div>
            <SetScale setScale={setScale} currentActionID={currentActionID}></SetScale>
          </div>
          <div>
            <Typography className={classes.title}>6. Góc xoay (&#8451;)</Typography>
          </div>
          <div>
            <SetRotation setRotation={setRotation} currentActionID={currentActionID}></SetRotation>
          </div>
          <div className={classes.inline}></div>
          <br></br>
        </div>
      </div>
    </div>
  );
}