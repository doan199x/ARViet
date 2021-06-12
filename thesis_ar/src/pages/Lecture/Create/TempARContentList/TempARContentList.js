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
            <div>
                <input
                    className={classes.input}
                    id="uploadFileArContent"
                    type="file"
                ></input>
            </div>
            <Typography color='secondary' variant='body2'>
                (Hỗ trợ: .glb, .jpg, .png, .mp4, .mp3)
            </Typography>
            <Button onClick={() => uploadArContentTemp()}
                style={{ minWidth: "25px" }}
                color="primary" variant="outlined"><FontAwesomeIcon icon={faPlus} size="lg" color="#3F51B5" /></Button>
            <div style={{marginTop: "10px"}}>
                <Typography>Nội dung đã tải lên:</Typography>
            </div>
            <div style={{ height: "120px", overflow: "auto", width: "90%", marginTop: "10px", marginBottom: "15px" }}>
                {tempARContentList ? (
                    <div className={classes.data}>
                        {tempARContentList
                            .slice(0)
                            .map((ele, i) => (
                                <TempARContent key={i} data={ele} show3DModel={show3DModel} show2DImage={show2DImage} showVideo={showVideo} />
                            ))}
                    </div>
                ) : (
                    <p></p>
                )}
            </div>
            <hr style={{ width: "80%", marginLeft: "0px" }} />
        </div>
    );
}
