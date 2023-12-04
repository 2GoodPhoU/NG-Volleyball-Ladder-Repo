import * as React from "react";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

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

import ng_1 from "../images/ng_1.png";

import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";

import PersonAddAlt1 from "@mui/icons-material/PersonAddAlt1";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export function Dashboard() {
  const [ladderTournaments, setLadderTournaments] = useState([]);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [isUserTeamCaptain, setIsUserTeamCaptain] = useState(false);
  const [userTeamCaptainData, setUserTeamCaptainData] = useState();
  const [joinLadderButtonToggle, setJoinLadderButtonToggle] = useState(false);

  const user = JSON.parse(window.localStorage.getItem("user"));

  // Dialog States (Create Ladder)
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // init Create a Ladder values
  const [ladder, setLadder] = useState("");
  const [teamSize, setTeamSize] = useState(0);
  const [adminInput, setAdminInput] = useState("");
  const [admins, setAdmins] = useState();
  const [dateTimePicker, setDateTimePicker] = useState("2022-04-17T15:30");
  const [password, setPass] = useState("");

  // Reset Form
  const resetForm = () => {
    setLadder("");
    setTeamSize(0);
    setAdminInput("");
    setAdmins([]);
    setPass("");
  };

  const formValid = ladder != "" && password != "";

  // Dialog States (Ladder Info)
  const [open2, setOpen2] = React.useState(false);
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  useEffect(() => {
    isAdmin();
    isTeamCaptain();
    getLadderTournaments();
  }, []);

  async function getLadderTournaments() {
    const { data } = await supabase.from("ladder_tournaments").select();

    setLadderTournaments(data);
  }

  async function isAdmin() {
    if (user === null) {
      console.log("User is not logged in");
      return;
    }

    const { data, error } = await supabase
      .from("admin")
      .select()
      .eq("admin_user_id", user.user_id)
      .eq("still_admin", true);

    console.log(data);
    console.log(user.user_id);

    if (error) console.log(error);
    else if (data === null || data.length === 0)
      console.log("User is not an admin");
    else {
      setIsUserAdmin(true);
      console.log("User is an admin");
    }
  }

  async function isTeamCaptain() {
    if (user === null) {
      console.log("User is not logged in");
      return;
    }

    const { data, error } = await supabase
      .from("teams")
      .select("team_id, team_captain_id")
      .eq("team_captain_id", user.user_id);

    if (error) console.log(error);
    else if (data.length === 0) console.log("User is not a team captain");
    else {
      console.log("User is a team captain");
      console.log(data);
      setIsUserTeamCaptain(true);
      setUserTeamCaptainData(data);
    }
  }

  async function insertLadder(ln, ts, atos, ui) {
    if (!isAdmin) return;

    const { data: ladder_tournaments_data, error: ladder_tournaments_error } =
      await supabase
        .from("ladder_tournaments")
        .insert({ ladder_name: ln, agreed_ToS: atos, team_size: ts })
        .select();

    const { data: ladder_moderators_data, error: ladder_moderators_error } =
      await supabase
        .from("ladder_moderators")
        .insert({
          ladder_id: ladder_tournaments_data[0].ladder_id,
          user_id: user.user_id,
        });

    window.location.reload();
  }

  async function joinLadder(e) {
    // console.log('User Captain Team Id: ' + userTeamCaptainData.teams.team_id);
    console.log(e.i);
    console.log(ladderTournaments[e.i].ladder_id);
    console.log(userTeamCaptainData[0].team_id);

    const { data, error } = await supabase
      .from("ladder_teams")
      .select("ladder_id, wins, teams!inner(team_captain_id)")
      .eq("ladder_id", ladderTournaments[e.i].ladder_id)
      .eq("teams.team_captain_id", user.user_id);

    if (error) console.log(error);
    else if (data.length !== 0) console.log("Team is already in Ladder");
    else {
      const { data2, error2 } = await supabase
        .from("ladder_teams")
        .insert({
          ladder_id: ladderTournaments[e.i].ladder_id,
          team_id: userTeamCaptainData[0].team_id,
        })
        .select();

      console.log("Team has been added to Ladder");
      console.log(data2);
    }
  }

  const handleJoinLadder = (e) => {
    setJoinLadderButtonToggle(!joinLadderButtonToggle);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    console.log(`data is ${data.get("ladder")}`);

    console.log(`${user.user_id} ${user.username} created a ladder`);

    // console.log(JSON.stringify(data.get("calendar")));

    // window.sessionStorage.setItem("datetimepicker", JSON.stringify(dateTimePicker));

    // console.log(`tournament ends ${dateTimePicker}`);

    insertLadder(
      `${data.get("ladder")}`,
      data.get("teamSize"),
      true,
      user.user_id
    );
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
        }}>
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

        {window.localStorage.getItem("user") === null ? (
          <h1> Guest Mode </h1>
        ) : (
          <h1>{user.username}'s Dashboard </h1>
        )}

        {window.localStorage.getItem("user") === null ? (
          /* Dashboard (Guest) */
          <>
            <Button
              variant="contained"
              onClick={handleClickOpen2}
              sx={{ width: "50%", mt: 1, mb: 2 }}>
              Ladder Rules/Info
            </Button>
            <Dialog
              open={open2}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose2}>
              <DialogTitle
                style={{ display: "flex", justifyContent: "center" }}>
                {" "}
                Ladder Rules/Info{" "}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  In a ladder tournament, a higher position team cannot
                  challenge a lower position team. A lower position team can
                  only challenge those 2 positions higher than them. If for some
                  reason a is not able to be challenged, they are able to
                  challenge a team higher, as long as the team is not able to be
                  challenged.
                </DialogContentText>
              </DialogContent>
              <DialogActions
                style={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={handleClose2}>Close</Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          /* Dashboard (Member) */
          <Box>
            <ButtonGroup size="small" sx={{ width: "150%", mt: 1, mb: 2 }}>
              {/* Ladder Rules / Info */}
              <Button variant="contained" onClick={handleClickOpen2}>
                Ladder Rules/Info
              </Button>
              <Dialog
                open={open2}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose2}>
                <DialogTitle
                  style={{ display: "flex", justifyContent: "center" }}>
                  {" "}
                  Ladder Rules/Info{" "}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    In a ladder tournament, a higher position team cannot
                    challenge a lower position team. A lower position team can
                    only challenge those 2 positions higher than them. If for
                    some reason a is not able to be challenged, they are able to
                    challenge a team higher, as long as the team is not able to
                    be challenged.
                  </DialogContentText>
                </DialogContent>
                <DialogActions
                  style={{ display: "flex", justifyContent: "center" }}>
                  <Button onClick={handleClose2}>Close</Button>
                </DialogActions>
              </Dialog>

              {/* Join a Ladder */}
              {isUserTeamCaptain ? (
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleJoinLadder}>
                  Join a Ladder
                </Button>
              ) : null}

              {/* Create a Ladder */}
              {isUserAdmin ? (
                <>
                  {/* Create a Ladder (new) */}
                  <Button onClick={handleClickOpen} variant="contained">
                    Create a Ladder
                  </Button>
                  <Dialog
                    component="form"
                    open={open}
                    onClose={() => {
                      handleClose();
                      resetForm();
                    }}
                    onSubmit={handleSubmit}>
                    <DialogTitle variant="h4" align="center">
                      Create a Ladder
                    </DialogTitle>
                    <DialogContent>
                      {/* Ladder */}
                      <TextField
                        value={ladder}
                        onChange={(e) => setLadder(e.target.value)}
                        label="Ladder Name"
                        name="ladder"
                        id="ladder"
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        required
                        autoFocus
                      />

                      {/* Team Size */}
                      <TextField
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        label="Team Size"
                        name="teamSize"
                        id="teamSize"
                        type="number"
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        required
                        autoFocus
                      />

                      {/* Add Admin */}
                      <TextField
                        value={adminInput}
                        onChange={(e) => setAdminInput(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon />
                            </InputAdornment>
                          ),
                        }}
                        label="Add Moderator"
                        name="admin"
                        id="admin"
                        variant="standard"
                        margin="dense"
                        sx={{ width: "75%" }}
                      />
                      {/* Admin Array */}
                      <Button
                        sx={{ width: "12%", marginTop: 2, float: "right" }}>
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
                        }}>
                        Cancel
                      </Button>

                      <Button
                        type="submit"
                        disabled={!formValid}
                        onClick={handleClose}>
                        Create Ladder
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              ) : null}
            </ButtonGroup>
          </Box>
        )}

        <Typography component="h3">Ladder</Typography>

        <Paper style={{ width: "100%", maxHeight: 300, overflow: "auto" }}>
          <List>
            {ladderTournaments.map((tournament, i) => (
              <ListItem key={i}>
                <ListItemText> {tournament.ladder_name} </ListItemText>
                <ListItemText>
                  {" "}
                  {tournament.team_size} vs {tournament.team_size}{" "}
                </ListItemText>
                {joinLadderButtonToggle ? (
                  <ListItemButton onClick={() => joinLadder({ i })}>
                    <ListItemText>Join</ListItemText>
                  </ListItemButton>
                ) : (
                  <ListItemButton
                    onClick={() =>
                      window.localStorage.setItem(
                        "tournament",
                        JSON.stringify(tournament)
                      )
                    }>
                    <Link to="/Ladder">
                      <ListItemText sx={{ color: "#000" }}>View</ListItemText>
                    </Link>
                  </ListItemButton>
                )}
              </ListItem>
            ))}
          </List>
        </Paper>

        {window.localStorage.getItem("user") === null ? (
          /* Dashboard (Guest) */
          <ButtonGroup size="medium">
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "100%", height: "50%", mt: 3, mb: 2 }}>
              <Link to="/">Back</Link>
            </Button>
          </ButtonGroup>
        ) : (
          /* Dashboard (Member) */
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <ButtonGroup size="large" sx={{ width: "80%", mt: 2, mb: 2 }}>
              <Button type="submit" variant="contained">
                <Link to="/Team">My Teams</Link>
              </Button>

              <Button type="submit" variant="contained">
                <Link to="/Settings">Settings</Link>
              </Button>

              <Button type="submit" variant="contained">
                <Link to="/">Log Out</Link>
              </Button>
            </ButtonGroup>
          </Box>
        )}
      </Box>
    </Container>
  );
}
