import {
    Button,
    Card,
    CircularProgress,
    Divider,
    IconButton,
    Input,
    Typography,
    makeStyles,
} from "@material-ui/core";
import clone from "clone";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { productAPI } from "../../../../config/productAPI/";
import TempARContent from "./TempARContent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles((theme) => ({
    btnline: {
        marginTop: "10px",
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
}));
export default function TempARContentList(props) {
    const classes = useStyles();
    const history = useHistory();
    const [tempARContentList, setTempARContentList] = useState(null);
    const [uploadARContent, setUploadARContent] = useState(null);
    // const [currentActionID, setCurrentActionID] = useState(null);
    useEffect(async () => {
        if (props.currentActionID != null) {
            await productAPI.getTempByActionID(props.currentActionID).then((data) => {
                const tempARContentList = clone(data.data);
                setTempARContentList(tempARContentList);
            })
        }
    }, [props.currentActionID]);

    let show3DModel = (URL, contentID) => {
        props.show3DModel(URL, contentID);
    }
    let show2DImage = (URL, contentID) => {
        props.show2DImage(URL, contentID);
    }
    let showVideo = (URL, contentID) => {
        props.showVideo(URL, contentID);
    }
    let showMp3 = (URL, contentID) => {
        props.showMp3(URL, contentID);
    }

    function uploadArContentTemp() {
        if (props.currentActionID != null) {
            let arContentFile = document.getElementById("uploadFileArContent").files[0];
            let formData = new FormData();
            formData.append("file", arContentFile);
            formData.append("actionID", props.currentActionID);
            productAPI.uploadArContentTemp(formData).then((data) => {
                let newList = clone(data.data);
                setTempARContentList(newList);
            });
        }
    }
    return (
        <div>
            <div className={classes.inputLine}>
                <input
                    className={classes.input}
                    id="uploadFileArContent"
                    type="file"
                    onChange={() => uploadArContentTemp()}
                ></input>
            </div>
            <Typography color='secondary' variant='body2'>
                (.glb, .jpg, .png, .mp4, .mp3)
            </Typography>
            <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '5%'}}>
            {/* <Button onClick={() => uploadArContentTemp()}
                style={{ minWidth: "25px" }}
                color="primary" variant="outlined"> Thêm &nbsp; <FontAwesomeIcon icon={faPlus} size="lg" color="#3F51B5" /></Button> */}
            </div>
           
            <div style={{ marginTop: "10px" }}>
                <Typography variant='body2'>Nội dung đã tải lên:</Typography>
            </div>
            <div style={{ borderRadius: "5px", borderWidth: "1px", borderStyle: "dotted", height: "120px", overflow: "auto", width: "90%", marginTop: "10px", marginBottom: "15px" }}>
                {tempARContentList ? (
                    <div className={classes.data}>
                        {tempARContentList
                            .slice(0)
                            .map((ele, i) => (
                                <TempARContent key={i} data={ele} show3DModel={show3DModel} show2DImage={show2DImage} showVideo={showVideo} showMp3={showMp3} />
                            ))}
                    </div>
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    );
}
