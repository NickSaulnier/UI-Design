import React, { useState, useEffect, useRef } from 'react';
import { CardDeck } from 'reactstrap';
import { NOTE_TYPE } from '../data/data.js';
import Note from './Note.js';

const NoteDeck = props => {
    const [visibleCards, setVisibleCards] = useState([]);
    let cardProjects = useRef([]);
    let titlePlaceholders = useRef([]);

    let getAllNotesInOneArray;
    let setTitlePlaceholdersOneProject;
    let setTitlePlaceholderAllProjects;

    useEffect(() => {
        cardProjects.current = [];
        titlePlaceholders.current = [];
        if (props.projectSelected !== null) {
            setTitlePlaceholdersOneProject();
            setVisibleCards(props.appData[props.projectSelected]);
        } else {
            setTitlePlaceholderAllProjects();
            getAllNotesInOneArray();
        }
    }, [props.projectSelected, props.appData, getAllNotesInOneArray, setTitlePlaceholdersOneProject, setTitlePlaceholderAllProjects])

    getAllNotesInOneArray = () => {
        let newVisibleCards = [];
        Object.keys(props.appData).forEach(projectName => {
            for (let note of props.appData[projectName]) {
                newVisibleCards.push(note);
            }
        })
        setVisibleCards(newVisibleCards);
    }

    setTitlePlaceholdersOneProject = () => {
        for (let note of props.appData[props.projectSelected]) {
            cardProjects.current.push(props.projectSelected);
            if (note.type === NOTE_TYPE.TEXT) {
                titlePlaceholders.current.push(note.title);
            } else {
                titlePlaceholders.current.push(note.url);
            } 
        }
    }

    setTitlePlaceholderAllProjects = () => {
        Object.keys(props.appData).forEach(projectName => {
            for (let note of props.appData[projectName]) {
                cardProjects.current.push(projectName);
                if (note.type === NOTE_TYPE.TEXT) {
                    titlePlaceholders.current.push(note.title);
                } else {
                    titlePlaceholders.current.push(note.url);
                } 
            }
        })
    }

    const getNote = (note, project, title, i) => {
        return(
            <Note id="note-component"
                  key={i}
                  appData={props.appData}
                  noteTitle={title}
                  noteType={note.type}
                  noteText={note.text} 
                  noteObject={note}
                  projectSelected={project}
                  updateDataObj={props.updateDataObj} 
                  noteIdx={i} />
        )
    }

    return (
        <CardDeck>
            {
                visibleCards.map((note, i) => (
                    getNote(note, cardProjects.current[i], titlePlaceholders.current[i], i)
                ))
            }
        </CardDeck>
    );
}

export default NoteDeck;