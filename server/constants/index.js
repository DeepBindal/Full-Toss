export const IPL_TEAMS = {
  Chennai: "Chennai Super Kings",
  Mumbai: "Mumbai Indians",
  Delhi: "Delhi Capitals",
  Kolkata: "Kolkata Knight Riders",
  Rajasthan: "Rajasthan Royals",
  Bangalore: "Royal Challengers Bangalore",
  Punjab: "Punjab Kings",
  Hyderabad: "Sunrisers Hyderabad",
  Lucknow: "Lucknow Super Giants",
  Ahmedabad: "Gujarat Titans",
};

export const getRandomTeam = () => {
  const teams = Object.values(IPL_TEAMS); // Extract team names
  const randomIndex = Math.floor(Math.random() * teams.length); // Generate random index
  return teams[randomIndex]; // Return the team at the random index
};
