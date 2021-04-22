import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {CardType} from "../api/auth-api";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import s from './windowCard.module.css'
import {Button} from "@material-ui/core";


type TestType = {
    name: string | null
    sendGrade: Function
    card: CardType | null
    answer: string | null
}
const SimpleCard: React.FC<TestType> = ({
                                            name, sendGrade,
                                            card, answer

                                        }) => {
    const [editMode, setEditMode] = useState(false)
    const serverAnswerStatus = useSelector<AppRootStateType, boolean>(state => state.cards.serverAnswerStatus)

    return (
        <Card className={s.containerCard}>
            <CardContent>

                <Typography variant="h3" component="h1">
                        {name}

                </Typography>
                {editMode && <span>{answer}</span>}
            </CardContent>
            <div>
                <Button onClick={(e) => {
                    setEditMode(false)
                    sendGrade(e, card!._id)
                }} data-grade={1} disabled={serverAnswerStatus} variant="contained">1
                </Button>

                <Button onClick={(e) => {
                    setEditMode(false)
                    sendGrade(e, card!._id)
                }} data-grade={2} disabled={serverAnswerStatus} variant="contained">2
                </Button>
                <Button onClick={(e) => {
                    setEditMode(false)
                    sendGrade(e, card!._id)
                }} data-grade={3} disabled={serverAnswerStatus} variant="contained">3
                </Button>
                <Button onClick={(e) => {
                    setEditMode(false)
                    sendGrade(e, card!._id)
                }} data-grade={4} disabled={serverAnswerStatus} variant="contained">4
                </Button>
                <Button onClick={(e) => {
                    setEditMode(false)
                    sendGrade(e, card!._id)
                }} data-grade={5} disabled={serverAnswerStatus} variant="contained">5
                </Button>

                    <div style={{textAlign:'center'}}>
                <Button variant="outlined" onClick={() => setEditMode(true)} >
                    Show answer
                </Button>
                </div>
            </div>


        </Card>
    );
}
export default SimpleCard;
