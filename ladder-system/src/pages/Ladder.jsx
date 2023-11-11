// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { CssBaseline, Box, Typography, Container, TextField, Button, ButtonGroup, Paper, List, ListItem, ListItemText, ListItemButton, Link }from '@mui/material';

import ng_1 from "../images/ng_1.png";

export function Ladder() {

    const thisUser = JSON.parse(window.localStorage.getItem('user'));
    const thisLadder = JSON.parse(window.localStorage.getItem('tournament'));

    const [teamMap, setTeamMap] = useState('');
    const [ongoingMatchMap, setOngoingMatchMap] = useState('');
    const [matchMap, setMatchMap] = useState('');
    const [userTeamCaptainData, setUserTeamCaptainData] = useState();

    const [challenger_id, setChallengerId] = useState();
    const [challenger_score, setChallengerScore] = useState();
    const [challenger_team_name, setChallengerTeamName] = useState('');

    const [opponent_id, setOpponentId] = useState();
    const [opponent_score, setOpponentScore] = useState();
    const [opponent_team_name, setOpponentTeamName] = useState('');
    
    const [completed, setCompleted] = useState('');

    const [isUserTeamCaptain, setIsUserTeamCaptain] = useState(false);
    const [isUserLadderModerator, setIsUserLadderModerator] = useState(false);


    const [isShowMatechesToggled, setIsShowMatchesToggled] = useState(false);
    const [showUpdateSection, setShowUpateSection] = useState(false);

    useEffect(() => {
        isTeamCaptain();
        isLadderModerator();
        getMatches();
        getTeamMap();
        //getAllLadderInfo();
    }, []);

    // async function getAllLadderInfo() {
    //     const { data } = await supabase
    //         .from('ladder_tournaments')
    //         .select('ladder_id, ladder_name, ladder_moderators(user_id), ladder_teams(wins, teams(team_id, team_name, team_captain_id))')
    //         .eq('ladder_id', thisLadder.ladder_id);

    //     console.log('Ladder Info');
    //     console.log(data);

    //     // Check if user is a ladder moderator
    //     for(var index = 0; index < data[0].ladder_moderators.length; index++){
    //         if(data[0].ladder_moderators[index].user_id === thisUser.user_id){
    //             setIsUserLadderModerator(true);
    //         }
    //     }

    //     // Check if user is a team captain
    //     for(var index = 0; index < data[0].ladder_teams.length; index++){
    //         if(data[0].ladder_teams[index].teams.team_captain_id === thisUser.user_id){
    //             setIsUserTeamCaptain(true);
    //             setUserCaptainTeamData(data[0].ladder_teams[index].teams);
    //             console.log(data[0].ladder_teams[index].teams);
    //             break;
    //         }
    //     }
        
    // }

    async function isLadderModerator() {
        if (thisUser === null){
            console.log('User is not logged in');
            return;
        }

        const { data } = await supabase
            .from('ladder_moderators')
            .select('user_id')
            .eq('user_id', thisUser.user_id);

        if (data.length !== 0){
            setIsUserLadderModerator(true);
            console.log('User is a ladder moderator');
        }
        else
            console.log('User is not a ladder moderator');
    }

    async function isTeamCaptain() {
        if (thisUser === null){
            console.log('User is not logged in');
            return;
        }

        const { data } = await supabase
            .from('ladder_teams')
            .select('ladder_id, wins, teams!inner(team_captain_id)')
            .eq('ladder_id', thisLadder.ladder_id)
            .eq('teams.team_captain_id', thisUser.user_id);

        console.log('Team Captain Id');
        console.log(thisUser.user_id);
        console.log(data);
        setUserTeamCaptainData(data[0]);

        setIsUserTeamCaptain(true);
        console.log('User Team Captain Data');
        console.log(userTeamCaptainData);
    }

    async function getTeamMap() {
        const { data , error } = await supabase
            .from('ladder_teams')
            .select('ladder_id, wins, teams(team_id, team_captain_id, team_name)')
            .eq('ladder_id', thisLadder.ladder_id)
            .order('wins', { ascending: false });

        if(error) 
            console.log(error);

        if( data )
            setTeamMap(data);
        // console.log('Team Map');
        // console.log(teamMap);
    }

    async function getMatches() {
        const { data, error } = await supabase
            .from('match_history')
            .select('challenger_id, opponent_id, challenger_score, opponent_score, completed, challenger_team:challenger_id(team_name), opponent_team:opponent_id(team_name)')
            .eq('ladder_id', thisLadder.ladder_id)
            .order('created_at', { ascending: false });

        if(error) 
            console.log(error);
        
        if( data ){
            setMatchMap(data);
            console.log('Match History');
        }
        
        // console.log('Match History');
        // console.log(matchMap);

        // setOngoingMatchMap(data.filter(match => match.completed === false));
        // console.log('Ongoing Match History');
        // console.log(ongoingMatchMap);
    }

    const handleCreateMatch = async (e) => {
        console.log('User Captain Team Id: ' + userTeamCaptainData.teams.team_id);
        console.log(e);
        console.log(e.i);
        console.log(thisLadder.ladder_id);;
        console.log(teamMap[e.i].teams.team_id);

        const{error} = await supabase
            .from('match_history')
            .insert({ 
                ladder_id: thisLadder.ladder_id,
                challenger_id: userTeamCaptainData.teams.team_id, 
                opponent_id: teamMap[e.i].teams.team_id
            });
            
        if(error) {
            console.log(error);
        }
    };

    // Update a match score
    const handleUpdateMatchScore = async (e) => {
        console.log('After');
        console.log(challenger_id);
        console.log(challenger_score);
        console.log(challenger_team_name);
        console.log(opponent_id);
        console.log(opponent_score);
        console.log(opponent_team_name);
        console.log(completed);


        const{ data } = await supabase
            .from('match_history')
            .update({challenger_score: challenger_score, opponent_score: opponent_score, completed: 'true'})
            .eq('ladder_id', thisLadder.ladder_id)
            .eq('challenger_id', challenger_id)
            .eq('opponent_id', opponent_id)
            .select();
        
        // data[0].challenger_team = {team_name: challenger_team_name};
        // data[0].opponent_team = {team_name: opponent_team_name};

        console.log(data);
        

        var winner_id = 0;
        var winner_team_name = 0;

        if(+challenger_score > +opponent_score){
            winner_id = challenger_id;
            winner_team_name = challenger_team_name;
        }
        else{
            winner_id = opponent_id;
            winner_team_name = opponent_team_name;
        }

        console.log('Winner Id: ' + winner_id);
        console.log('Winner Team Name ' + winner_team_name);


        for(var index = 0; index < teamMap.length; index++){
            if(teamMap[index].teams.team_id === winner_id){
                console.log(teamMap[index].wins);
                console.log(teamMap[index].teams.team_id);
                console.log(teamMap[index].teams.team_name);
                break;
            }
        }

        const{ error } = await supabase
            .from('ladder_teams')
            .update({wins: teamMap[index].wins + 1})
            .eq('ladder_id', thisLadder.ladder_id)
            .eq('team_id', winner_id);

        if(error) {
            console.log(error);
        }

        setShowUpateSection(!showUpdateSection);
    
    };

    const handleShowMatches = async (e) => {
        e.preventDefault();
        setIsShowMatchesToggled(!isShowMatechesToggled);
    }

    const setShowUpdateSection = async (e) => {
        setShowUpateSection(!showUpdateSection);

        console.log('Before');
        console.log(e);
        console.log(e.i);
        console.log(matchMap);
        console.log(matchMap[e.i]);
        console.log(matchMap[e.i].challenger_id);
        console.log(matchMap[e.i].challenger_score);
        console.log(matchMap[e.i].challenger_team.team_name);
        console.log(matchMap[e.i].opponent_id);
        console.log(matchMap[e.i].opponent_score);
        console.log(matchMap[e.i].challenger_score);
        console.log(matchMap[e.i].completed);

        setChallengerId(parseInt(matchMap[e.i].challenger_id));
        setChallengerTeamName(matchMap[e.i].challenger_team.team_name);
        setChallengerScore(parseInt(matchMap[e.i].challenger_score));

        setOpponentId(parseInt(matchMap[e.i].opponent_id));
        setOpponentTeamName(matchMap[e.i].opponent_team.team_name);
        setOpponentScore(parseInt(matchMap[e.i].opponent_score));

        setCompleted(matchMap[e.i].completed);

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
                                {/* display team wins */}
                                <ListItemText> {team.wins}</ListItemText>
                                <ListItemButton
                                    onClick={() => window.localStorage.setItem('team', JSON.stringify(team)) }>
                                    <ListItemText> 
                                        {team.teams.team_name} 
                                    </ListItemText>
                                </ListItemButton>
                                { isUserTeamCaptain &&
                                    thisUser.user_id !== team.teams.team_captain_id &&
                                    userTeamCaptainData.wins < team.wins ? (
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
                                        <ListItemText> {match.challenger_team.team_name} vs { match.opponent_team.team_name}</ListItemText>
                                        <ListItemButton>
                                            <ListItemText>
                                                {match.challenger_score} - {match.opponent_score}
                                            </ListItemText>
                                        </ListItemButton>
                                        { isUserLadderModerator ? (
                                            <ListItemButton
                                                onClick = {() => setShowUpdateSection({i})}>
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

                { showUpdateSection ? (
                    <Paper style={{width: '100%', maxHeight: 300, overflow: 'auto'}}>
                        <List>
                            <ListItem>
                                <TextField
                                    //sx= {{marginLeft: 2}}
                                    value={challenger_score}
                                    onChange={(e) => setChallengerScore(e.target.value)}
                                    label={challenger_team_name + ' score'}
                                    id="challenger_score"
                                    name="challenger_score"
                                    autoFocus
                                    required
                                    fullWidth
                                />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    // sx= {{marginLeft: 2}}
                                    value={opponent_score}
                                    onChange={(e) => setOpponentScore(e.target.value)}
                                    label={opponent_team_name + ' score'}
                                    id="opponent_score"
                                    name="opponent_score"
                                    autoFocus
                                    required
                                    fullWidth
                                />
                            </ListItem>
                            <ListItem>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ width: '150%', height: '50%', mt: 3, mb: 2 }}
                                    onClick = {handleUpdateMatchScore}
                                    >
                                    Update
                                </Button>
                            </ListItem>
                        </List>
                    </Paper>
                    ) : (null) }
                </Box>
        </Container>
    )
}