// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { CssBaseline, Box, Typography, Container, Button, ButtonGroup, Paper, List, ListItem, ListItemText, ListItemButton, Link }from '@mui/material';

import ng_1 from "../images/ng_1.png";

export function Ladder() {

    const thisUser = JSON.parse(window.localStorage.getItem('user'));
    const thisLadder = JSON.parse(window.localStorage.getItem('tournament'));

    const [teamMap, setTeamMap] = useState('');
    const [matchMap, setMatchMap] = useState('');
    const [userTeamData, setUserTeamData] = useState();

    const matchMap2 = [
        { id: 'Challenger Id' , name: 'Challenger Team Name', score: 'Challenger Score' },
        { id: 'Opponent Id' , name: 'Opponent Team Name', score: 'Opponent Score'},
    ];


    const [challengerTeamId, setChallengerTeamId] = useState('');
    const [opponentTeamId, setOpponentTeamId] = useState('');
    const [challengerName, setChallengerName] = useState('');
    const [opponentName, setOpponentName] = useState('');
    const [challengerScore, setChallengerScore] = useState('');
    const [opponentScore, setOpponentScore] = useState('');

    const [formError, setFormError] = useState('');
    const [isUserTeamCaptain, setIsUserTeamCaptain] = useState(false);
    const [isUserLadderModerator, setIsUserLadderModerator] = useState(false);


    const [isShowMatechesToggled, setIsShowMatchesToggled] = useState(false);
    const [isUpdateButtonToggled, setIsUpdateButtonToggled] = useState(false);

    useEffect(() => {
        isLadderModerator();
        isTeamCaptain();
        getMatches();
        getTeamMap();
        getUserTeamData();
    }, []);

    async function isLadderModerator() {
        const { data, error } = await supabase
            .from('ladder_moderators')
            .select('user_id')
            .eq('user_id', thisUser.user_id);

        if (data.length === 0)
            console.log('User is not a ladder moderator');
        else
            setIsUserLadderModerator(true);
    }

    async function isTeamCaptain() { 
        const { data, error } = await supabase
            .from('teams')
            .select('team_captain_id')
            .eq('team_captain_id', thisUser.user_id);

        if (data.length === 0)
            console.log('User is not a team captain in this ladder');
        else 
            setIsUserTeamCaptain(true);
    }

    async function getUserTeamData() {
        const{data, error} = await supabase
            .from('teams')
            .select('team_id, team_captain_id, team_name')
            .eq('team_captain_id', thisUser.user_id);

        setUserTeamData(data);
    }

    async function getTeamMap() {
        const { data } = await supabase
            .from('ladder_teams')
            .select('ladder_id, teams(team_id, team_name)');
        
        setTeamMap(data);
    }

    // Create a match
    // attempted to make something like this
    // SELECT m.ladder_id, m.challenger_id, c.teams.team_name AS "challenger_name", m.challenger_score, o.teams.teams.team_name AS "opponent_name", m.opponent_score
    // FROM match_history m, teams c , teams o
    // WHERE m.challenger_id = c.teams.team_id
    //   AND m.opponent_id = o.teams.team_id;
    async function getMatches() {
        const { data, error } = await supabase
            .from('match_history')
            .select('ladder_id, challenger_id, opponent_id, challenger_score, opponent_score')
            .eq('ladder_id', thisLadder.ladder_id);

        console.log('Match History');
        console.log(data);
        setMatchMap(data);
    }

    const handleCreateMatch = async (e) => {
        console.log('User Captain Team Id: ' + userTeamData[0].team_id);
        console.log(e);
        console.log(e.i);
        console.log(thisLadder.ladder_id);;
        console.log(teamMap[e.i].teams.team_id);

        const{data, error} = await supabase
            .from('match_history')
            .insert({ 
                ladder_id: thisLadder.ladder_id,
                challenger_id: userTeamData[0].team_id, 
                opponent_id: teamMap[e.i].teams.team_id
            })
            .select();

    
        if(error) {
            console.log(error);
            setFormError('Match not created');
        }
    
        if(data) {
            console.log(data);
            setFormError('Match created');
        }
    };

    const handleShowMatches = async (e) => {
        e.preventDefault();
        setIsShowMatchesToggled(!isShowMatechesToggled);
    }

    const handleUpateButton = async (e) => {
        setIsUpdateButtonToggled(!isUpdateButtonToggled);

        // Update matchMap2
        matchMap2[0].id = matchMap[e.i].challenger_id;
        matchMap2[0].score = matchMap[e.i].challenger_score;
        console.log(matchMap2[0].id);
        console.log(matchMap2[0].score);
        matchMap2[1].id = matchMap[e.i].opponent_id;
        matchMap2[1].score = matchMap[e.i].opponent_score;
        console.log(matchMap2[1].id);
        console.log(matchMap2[1].score);

        // const { data, error } = await supabase
        //     .from('teams')
        //     .select('team_id, team_name')
        //     .or(`team_id.eq.${matchMap2[0].id},team_id.eq.${matchMap2[1].id}`);
        // console.log(data);
        console.log(teamMap);

        for(var teamMapIndex = 0; teamMapIndex < teamMap.length; teamMapIndex++){
            for(var matchMap2Index = 0; matchMap2Index < matchMap2.length; matchMap2Index++){
                if(teamMap[teamMapIndex].teams.team_id === matchMap2[matchMap2Index].id){
                    matchMap2[matchMap2Index].name = teamMap[teamMapIndex].teams.team_name;
                    break;
                }
            }   
        }

        console.log(matchMap2[0].name);
        console.log(matchMap2[1].name);
        console.log(matchMap2);

        
    }

    // // Delete a match
    // const handleDeleteMatch = async (e) => {
    //     e.preventDefault();
    
    //     if(!challengerTeamId || !opponentTeamId) {
    //         setFormError('Missing Credentials');
    //         return;
    //     }
    
    //     const{data, error} = await supabase
    //         .from('match_history')
    //         .delete()
    //         .eq('ladder_id', ladderId)
    //         .eq('challenger_id', challengerTeamId)
    //         .eq('opponent_id', opponentTeamId);
    
    //     if(error) {
    //         console.log(error);
    //         setFormError('Match not deleted');
    //     }
    
    //     if(data) {
    //         console.log(data);
    //         setFormError('Match deleted');
    //     }
    // };

    // // Update a match score
    // const handleUpdateMatchScore = async (e) => {
    //     e.preventDefault();
    
    //     if(!challengerTeamId || !opponentTeamId) {
    //         setFormError('Missing Credentials');
    //         return;
    //     }
    
    //     const{data, error} = await supabase
    //         .from('match_history')
    //         .update({challenger_score: challengerScore, opponent_score: opponentScore})
    //         .eq('ladder_id', ladderId)
    //         .eq('challenger_id', challengerTeamId)
    //         .eq('opponent_id', opponentTeamId);
    
    //     if(error) {
    //         console.log(error);
    //         setFormError('Match not updated');
    //     }
    
    //     if(data) {
    //         console.log(data);
    //         setFormError('Match updated');
    //     }
    // };


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* NG Logo */}
                <Box
                    component="img"
                    sx={{
                        height: 150,
                        width: 400,
                        maxHeight: { xs: 150, md: 150 },
                        maxWidth: { xs: 400, md: 400 },
                        paddingBottom: 2
                    }}
                    src= {ng_1} 
                    alt="Northrop Grumman logo"
                />
                <Typography component="h1" variant="h5">
                    Ladder
                </Typography>

                { window.localStorage.getItem('tournament') === null ? (
                    <h1> Guest Mode </h1>
                ) : (
                    <h1> { thisLadder.ladder_name } </h1>
                )}

                <Typography component="h3">
                    Ladder
                </Typography>

                <Paper style={{width: '100%', maxHeight: 300, overflow: 'auto'}}>
                    <List>
                        { teamMap && teamMap.map((team, i) =>
                            <ListItem key={i}>
                                <ListItemText> {i + 1} </ListItemText>
                                <ListItemButton
                                    onClick={() => window.localStorage.setItem('team', JSON.stringify(team)) }>
                                    <ListItemText> 
                                        {team.teams.team_name} 
                                    </ListItemText>
                                </ListItemButton>
                                { isUserTeamCaptain ? (
                                    <ListItemButton
                                    onClick = {() => handleCreateMatch({i})}>
                                    <ListItemText>
                                        Challenge
                                    </ListItemText>
                                </ListItemButton>
                                ) : (
                                    null
                                )}
                            </ListItem>
                        )}
                    </List>
                </Paper>

                <ButtonGroup size="medium">
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ width: '150%', height: '50%', mt: 3, mb: 2 }}
                        onClick = {handleShowMatches}
                        >
                        Show Matches
                    </Button>
                </ButtonGroup>

                { isShowMatechesToggled ? (
                        <Paper style={{width: '100%', maxHeight: 300, overflow: 'auto'}}>
                        {matchMap.length !== 0 ? (
                            <List>
                                { matchMap && matchMap.map((match, i) =>
                                    <ListItem key={i}>
                                        <ListItemText> {i + 1} </ListItemText>
                                        <ListItemButton>
                                            <ListItemText>
                                                {match.challenger_score} - {match.opponent_score}
                                            </ListItemText>
                                        </ListItemButton>
                                        { isUserLadderModerator ? (
                                            <ListItemButton
                                                onClick = {() => handleUpateButton({i})}>
                                                <ListItemText>
                                                    Update
                                                </ListItemText>
                                            </ListItemButton>
                                        ) : (null) }
                                    </ListItem>
                                )}
                            </List>
                        ) : (null)}
                    </Paper>
                    ) : (null)}

                { isUpdateButtonToggled ? (
                    null
                    ) : (null) }
                </Box>
        </Container>
    )
}