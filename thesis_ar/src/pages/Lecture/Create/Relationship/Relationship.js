import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { productAPI } from "../../../../config/productAPI";
import React, { useContext, useEffect, useState } from "react";
import { Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    inline: {
        display: "grid",
        gridTemplateColumns: "80%",
        justifyContent: "",
        marginTop: "5%",
    },
}));

export default function ButtonText(props) {
    const classes = useStyles();
    const [change, setChange] = React.useState(0);
    const [gotten, setGotten] = React.useState(false);
    const [elementArr, setElementArr] = React.useState([]);
    // const [currentMarkerID, setCurrentMarkerID] = useState(null);
    const [currenObject, setCurrentObject] = React.useState(null);
    useEffect(async () => {
        console.log(change);
        if (change == 0) {
        } else {
            if (gotten == false) {
                let currentOptionID = document.getElementById("optionFatherContent").value;
                props.elementArr.map((elementArr, i) => {
                    if (elementArr.contentID == currentOptionID) {
                        props.elementArr.splice(i, 1);
                        let ZeroOption = document.createElement('option');
                        ZeroOption.value = null;
                        ZeroOption.text = "Không";
                        document.getElementById("optionFatherContent").appendChild(ZeroOption);
                    }
                })
                props.deleteOptionSelf();
                setGotten(true);
            }
        }

    }, [change]);
    useEffect(async () => {
        console.log(props.elementArr);

    }, [props.changeRelation]);
    function getOption() {
        setElementArr(props.elementArr);
        setChange(change + 1);
    }
    function changeOption() {
        props.setFather();
    }
    return (
        <div>
            <div>
                <Typography>Tên đối tượng: </Typography>
                <Typography variant="subtitle2" id="contentName"> </Typography>
            </div>
            <div style={{ marginTop: "5%"}}>
                <Typography>Nội dung AR gốc: </Typography>
            </div>
            <div className={classes.inline} style={{ marginTop: "-0.1%"}}>
                <select id="optionFatherContent" onClick={() => getOption()} onChange={() => changeOption()}>
                    <option selected value={null}>Không</option>
                    {elementArr.map((e, key) => {
                        return <option key={key} value={e.contentID}>{e.contentName}</option>;
                    })}
                </select>
            </div>
        </div>
    );
}
