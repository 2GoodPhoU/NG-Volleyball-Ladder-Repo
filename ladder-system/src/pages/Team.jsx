import * as React from "react";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

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
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";

import ng_1 from "../images/ng_1.png";

import { supabase } from "../supabaseClient";
import PersonAddAlt1 from "@mui/icons-material/PersonAddAlt1";

// Increment Members Array
let nextId = 0;


const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

// export function Team( { user } ) {
export function Team() {
	const [teams, setTeams] = useState([]);

	const user = JSON.parse(window.localStorage.getItem("user"));

	// Dialog State (Create Team)
	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
		window.sessionStorage.setItem("teamMembers", JSON.stringify({"members": [user.user_id]}));
	};
	const handleClose = () => {
		setOpen(false);
	};

	// Dialog State (Ladder Info)
	const [open2, setOpen2] = React.useState(false);
	const handleClickOpen2 = () => {
		setOpen2(true);
	};
	const handleClose2 = () => {
		setOpen2(false);
	};

	const [id, setId] = useState([]);

	// init Create a Team values
	const [team, setTeam] = useState("");
	const [memberInput, setMemberInput] = useState("");
	const [members, setMembers] = useState();
	const [password, setPass] = useState("");

	// Check if Form is Filled
	const formValid = team != "" && password != "";

	useEffect(() => {
		if (window.localStorage.getItem("user") === null) window.location.reload();

		getTeams();
	}, []);

	// var [exists, setExists] = useState(false);
	var [addTeammateClicked, setAddTeammateClicked] = useState(false);

	// useEffect(() => {
	//     let isSubscribed = true;

	// 	const idExists = async (un) => {
	// 		const { data } = await supabase.from("users").select().eq("username", un);

	// 		setId(data);

	// 		console.log(data);

	// 		setAddTeammateClicked(false);

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

		// const { data, error } = await supabase
		// 	.from("teams")
		// 	.insert({
		// 		team_name: tn,
		// 		team_captain_id: tci,
		// 		agreed_ToS: atos,
		// 		recruiting_members: rm,
		// 		team_password: pw,
		// 	})
		// 	.select();

		window.location.reload();
	}

	/* handleSubmit (old)
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(`${user.user_id} ${user.username} created team`);

        insertTeam(`${user.username}'s TEAM`, user.user_id, true, false, 1234);
    }
    */

	/* handleSubmit (new) */
	const handleSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		console.log({
			team: data.get("team"),
			password: data.get("password"),
		});

		console.log(JSON.parse(window.sessionStorage.getItem('teamMembers')).members);

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

	const idExists = async (un) => {
		console.log(`checking if ${un} exists`);

		const { data } = await supabase.from("users").select().eq("username", un);


		window.sessionStorage.setItem('team_member', JSON.stringify(data[0]));

		console.log(data);

		setAddTeammateClicked(false);

		return (data.length === 1) ? true : false;
	};

	// var exists;

	// useEffect(() => {
	// 	if (exists) console.log(`exists is ${exists}`);
	// 	exists = false;
	// });

	// function timeout(delay: number) {
	// 	return new Promise( res => setTimeout(res, delay) );
	// }

	// Add Member to Members
	const addToTeam = async (e) => {
		e.preventDefault();

		setAddTeammateClicked(true);

		console.log("clicked");

		console.log(`member is ${memberInput}`);

		const exists = await idExists(memberInput);

		console.log('does it exist?', exists);

		if (exists) {
			console.log(`exists is ${exists} & team member id is ${JSON.parse(window.sessionStorage.getItem('team_member')).user_id}`);
		
			let ssAddMember = JSON.parse(window.sessionStorage.getItem('team_member')).user_id;
			let ssMembers = JSON.parse(window.sessionStorage.getItem('teamMembers'));

			console.log(`ssMembers is ${JSON.stringify(ssMembers.members[0])}`);
			console.log(`ssAddMember is ${ssAddMember}`);

			ssMembers.members.push(ssAddMember);

			window.sessionStorage.setItem('teamMembers', JSON.stringify(ssMembers));

			let newSSMembers = JSON.parse(window.sessionStorage.getItem('teamMembers'));

			console.log(`newSSMembers is ${JSON.stringify(newSSMembers.members)}`);		

		}

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

				<Box>
					<ButtonGroup size="medium" sx={{ width: "150%", mt: 1, mb: 2 }}>
						{/* Ladder Rules / Info */}
						<Button variant="contained" onClick={handleClickOpen2}>
							Team Rules/Info
						</Button>
						<Dialog
							open={open2}
							TransitionComponent={Transition}
							keepMounted
							onClose={handleClose2}
						>
							<DialogTitle> Team Rules/Info </DialogTitle>
							<DialogContent>
								<DialogContentText>*insert team rules/info*</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose2}>Close</Button>
							</DialogActions>
						</Dialog>

						{/* Create a Team (new) */}
						<Button onClick={handleClickOpen} variant="contained">
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

								<Button
									type="submit"
									disabled={!formValid}
									onClick={handleClose}
								>
									Create Team
								</Button>
							</DialogActions>
						</Dialog>

						{/* Create a Team (Old)
                    <Button
                            type="submit"
                            variant="contained"
                            sx={{ width: '150%', height: '200%', mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                    >
                        Create a Team
                    </Button>
                    */}
					</ButtonGroup>
				</Box>

				<Typography component="h3">Team</Typography>

				<h1> Username: {user.username}</h1>

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
