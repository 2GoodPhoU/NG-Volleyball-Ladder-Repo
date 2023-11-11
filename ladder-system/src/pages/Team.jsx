<<<<<<< Updated upstream
import { Link } from "react-router-dom";

=======
import * as React from "react";
>>>>>>> Stashed changes
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

<<<<<<< Updated upstream
import { CssBaseline, Box, Typography, Container, Button, ButtonGroup, Paper, List, ListItem, ListItemText, ListSubheader, ListItemButton } from '@mui/material';
=======
import {
	CssBaseline,
	Box,
	Typography,
	Container,
	Button,
	ButtonGroup,
	Paper,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
	TextField,
} from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
>>>>>>> Stashed changes

import ng_1 from "../images/ng_1.png";

import { supabase } from "../supabaseClient";
<<<<<<< Updated upstream
=======
import PersonAddAlt1 from "@mui/icons-material/PersonAddAlt1";

// Increment Members Array
let nextId = 0;
>>>>>>> Stashed changes

// export function Team( { user } ) {
export function Team() {
	const [teams, setTeams] = useState([]);

	const user = JSON.parse(window.localStorage.getItem("user"));
	let teamM = window.sessionStorage.setItem("teamMembers", [user.user_id]);

<<<<<<< Updated upstream
    useEffect(() => {
        if (window.localStorage.getItem('user') === null)
            window.location.reload();
=======
	// Dialog State
	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const [id, setId] = useState([]);

	// init Create a Team values
	const [team, setTeam] = useState("");
	const [memberInput, setMemberInput] = useState("");
	const [members, setMembers] = useState([user.user_id]);
	const [password, setPass] = useState("");

	// Check if Form is Filled
	const formValid = team != "" && password != "";

	useEffect(() => {
		if (window.localStorage.getItem("user") === null) window.location.reload();
>>>>>>> Stashed changes

		getTeams();
	}, []);

<<<<<<< Updated upstream
    async function getTeams() {
        const { data } = await supabase
        .from('teams')
        .select()
        .eq('team_captain_id', user.user_id);
=======
	var [exists, setExists] = useState(false);
	var [addTeammateClicked, setAddTeammateClicked] = useState(false);
>>>>>>> Stashed changes

	// useEffect(() => {
    //     let isSubscribed = true;

<<<<<<< Updated upstream
    async function insertTeam(tn, tci, atos, rm, pw) {
        const { data, error } = await supabase
        .from('teams')
        .insert({ team_name: tn, team_captain_id: tci, agreed_ToS: atos, recruiting_members: rm, team_password: pw })
        .select();
=======
	// 	const idExists = async (un) => {
	// 		const { data } = await supabase.from("users").select().eq("username", un);
>>>>>>> Stashed changes

	// 		setId(data);

<<<<<<< Updated upstream
    const handleSubmit = (e) => {
        e.preventDefault();
=======
	// 		console.log(data);
>>>>>>> Stashed changes

	// 		setAddTeammateClicked(false);

<<<<<<< Updated upstream
        insertTeam(`${user.username}'s TEAM`, user.user_id, true, false, 1234);
    }

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
=======
	// 		if (data.length === 1) setExists(true);
	// 	};

	// 	if (isSubscribed && addTeammateClicked) {
	// 		idExists(memberInput);
	// 		console.log("what is exists?", exists);
	// 		console.log("what is member?", memberInput);
	// 	}

    //     if (exists) {
    //         console.log('exists');
    //     }

    //     return () => isSubscribed = false;
	// }, [addTeammateClicked]);

	async function getTeams() {
		const { data } = await supabase
			.from("teams")
			.select()
			.eq("team_captain_id", user.user_id);

		setTeams(data);
	}

	async function insertTeam(tn, tci, atos, rm, pw) {
		const { data, error } = await supabase
			.from("teams")
			.insert({
				team_name: tn,
				team_captain_id: tci,
				agreed_ToS: atos,
				recruiting_members: rm,
				team_password: pw,
			})
			.select();

		window.location.reload();
	}
>>>>>>> Stashed changes

	/* handleSubmit (new) */
	const handleSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		console.log({
			team: data.get("team"),
			members,
			password: data.get("password"),
		});

<<<<<<< Updated upstream
                <ButtonGroup size="medium">
                    <Button
                            type="submit"
                            variant="contained"
                            sx={{ width: '150%', height: '200%', mt: 3, mb: 2 }}
                    >
                        <Link to="/">
                            Team Rules/Info
                        </Link>
                    </Button>
                
=======
		console.log(`${user.user_id} ${user.username} created team`);

		insertTeam(
			data.get("team"),
			user.user_id,
			true,
			false,
			data.get("password")
		);

		// Reset Fields
		resetForm();
	};

	// Reset Form
	const resetForm = () => {
		setTeam("");
		setMemberInput("");
		setMembers([]);
		setPass("");
		nextId = 0;
	};

	// Add Member to Members
	const addToTeam = (e) => {
		e.preventDefault();

		// console.log("contents", member);

		setAddTeammateClicked(true);

        console.log('clicked');

		// // Add Member to Array
		// if (exists) {
		// 	console.log("what is exists inside addToTeam?", exists);
		// 	console.log("what is id inside addToTeam?", id);
		// 	// console.log(`${id[0].username} is added and has user_id of ${id[0].user_id}`);
		// 	// var grabMembers = window.localStorage.getItem('user');
		// 	// grabMembers.append(0);
		// 	// window.sessionStorage.setItem('user', grabMembers);

		// 	// setMembers([
		// 	//     ...members,
		// 	//     id[0].user_id
		// 	// ]);
		// } else console.log("user does not exist");

		// // Testing (WARNING: FIRST ADD IS EMPTY)
		// console.log(members);

		// // Reset Member Form Field (FIX)
		document.getElementById("member").value = "";
		setMemberInput("");
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Box
					component="img"
					sx={{
						height: 150,
						width: 400,
						maxHeight: { xs: 150, md: 150 },
						maxWidth: { xs: 400, md: 400 },
						paddingBottom: 2,
					}}
					src={ng_1}
					alt="Northrop Grumman logo"
				/>

				<Typography component="h1" variant="h5">
					Teams
				</Typography>

				<ButtonGroup size="medium">
					<Button
						type="submit"
						variant="contained"
						sx={{ width: "150%", height: "200%", mt: 3, mb: 2 }}
					>
						<Link to="/">Team Rules/Info</Link>
					</Button>

					{/* Create a Team (new) */}
					<Button
						onClick={handleClickOpen}
						variant="contained"
						sx={{ width: "150%", mt: 3, mb: 2 }}
					>
						Create a Team
					</Button>
					<Dialog
						component="form"
						open={open}
						onClose={() => {
							handleClose();
							resetForm();
						}}
						onSubmit={handleSubmit}
					>
						<DialogTitle variant="h4" align="center">
							Create a Team
						</DialogTitle>
						<DialogContent>
							{/* Team */}
							<TextField
								value={team}
								onChange={(e) => setTeam(e.target.value)}
								label="Team Name"
								name="team"
								id="team"
								variant="outlined"
								margin="dense"
								fullWidth
								required
								autoFocus
							/>

							{/* Add Member */}
							<TextField
								value={memberInput}
								onChange={(e) => setMemberInput(e.target.value)}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<PersonIcon />
										</InputAdornment>
									),
								}}
								label="Add Member"
								name="member"
								id="member"
								variant="standard"
								margin="dense"
								sx={{ width: "75%" }}
							/>
							{/* Member Array */}
							<Button
								sx={{ width: "12%", marginTop: 2, float: "right" }}
								onClick={addToTeam}
							>
								<PersonAddAlt1 />
							</Button>

							{/* Password */}
							<TextField
								value={password}
								onChange={(e) => setPass(e.target.value)}
								label="Team Password"
								name="password"
								id="password"
								variant="outlined"
								margin="dense"
								fullWidth
								required
							/>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={() => {
									handleClose();
									resetForm();
								}}
							>
								Cancel
							</Button>

							<Button type="submit" disabled={!formValid} onClick={handleClose}>
								Create Team
							</Button>
						</DialogActions>
					</Dialog>

					{/* Create a Team (Old)
>>>>>>> Stashed changes
                    <Button
                            type="submit"
                            variant="contained"
                            sx={{ width: '150%', height: '200%', mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                    >
                        Create a Team
                    </Button>
<<<<<<< Updated upstream
                </ButtonGroup>
=======
                    */}
				</ButtonGroup>

				<Typography component="h3">Team</Typography>
>>>>>>> Stashed changes

				<h1> Username: {user.username}</h1>

<<<<<<< Updated upstream
                <h1> Username: { user.username }</h1>

                <Paper style={{width: '100%', maxHeight: 300, overflow: 'auto'}}>
                    { teams.length === 0 ? (
                        <h1>NOTHING HERE</h1>
                    ) : (
                        <List>
                            {teams.map((team, i) =>
                                <ListItem key={ i }>
                                    <ListItemText> { team.team_name }</ListItemText>
                                    <ListItemText> { team.team_wins } . { team.team_losses } </ListItemText>
                                    <ListItemButton selected={false}>
                                        <Link to="/Team">
                                            <ListItemText>
                                                View
                                            </ListItemText>
                                        </Link>
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </List>
                    )}
                </Paper>

                <ButtonGroup size="medium">
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ width: '150%', height: '50%', mt: 3, mb: 2 }}
                    >
                        <Link to="/Dashboard">
                            Back
                        </Link>
                    </Button>
                </ButtonGroup>
            </Box>
        </Container>
    )
}
=======
				<Paper style={{ width: "100%", maxHeight: 300, overflow: "auto" }}>
					{teams.length === 0 ? (
						<h1>NOTHING HERE</h1>
					) : (
						<List>
							{teams.map((team, i) => (
								<ListItem key={i}>
									<ListItemText> {team.team_name}</ListItemText>
									<ListItemText>
										{" "}
										{team.team_wins} . {team.team_losses}{" "}
									</ListItemText>
									<ListItemButton selected={false}>
										<Link to="/Team">
											<ListItemText>View</ListItemText>
										</Link>
									</ListItemButton>
								</ListItem>
							))}
						</List>
					)}
				</Paper>

				<ButtonGroup size="medium">
					<Button
						type="submit"
						variant="contained"
						sx={{ width: "150%", height: "50%", mt: 3, mb: 2 }}
					>
						<Link to="/Dashboard">Back</Link>
					</Button>
				</ButtonGroup>
			</Box>
		</Container>
	);
}
>>>>>>> Stashed changes
