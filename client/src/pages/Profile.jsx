import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserTeam } from "../api";
import { IPL_TEAM_STYLES, IPL_TEAMS, iplTeamsMessages } from "../constants";
import { useNavigate } from "react-router-dom";
import toast, { useToaster } from "react-hot-toast";
import { updateUser } from "../features/auth/authSlice";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) navigate("/login-user");
  }, [isAuthenticated]);
  const [selectedTeam, setSelectedTeam] = useState(user.iplTeam);
  const [loading, setLoading] = useState(false);

  const team = user.iplTeam;
  const teamStyles = IPL_TEAM_STYLES[team] || {
    primaryColor: "#19388a",
    secondaryColor: "#4f91cd",
  };

  const handleUpdateTeam = async () => {
    try {
      setLoading(true);
      updateUserTeam({ team: selectedTeam })
        .then((res) => {
          const updatedUser = res.data.data;
          dispatch(updateUser({ user: updatedUser }));
          toast.success(`Team changed successfully. ${iplTeamsMessages[updatedUser.iplTeam]?.fansMessage}`)
          navigate("/");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Failed to update team", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center px-6 py-10 min-h-screen bg-cover"
      style={{
        backgroundColor: teamStyles.secondaryColor,
        color: teamStyles.primaryColor,
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>
        <p className="text-lg font-medium">Hello, {user.username}</p>
        <p>
          Email: <span className="font-light">{user.email}</span>
        </p>
        <p>
          Favorite Team: <span className="font-semibold">{user.iplTeam}</span>
        </p>

        <div className="mt-6">
          <label htmlFor="team" className="block text-sm font-medium mb-2">
            Update Favorite Team
          </label>
          <select
            id="team"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-gray-700"
          >
            {IPL_TEAMS.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
          <button
            onClick={handleUpdateTeam}
            className={`mt-4 w-full bg-[${
              teamStyles.primaryColor
            }] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Team"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
