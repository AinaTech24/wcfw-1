import { useState, useEffect } from "react";
import api from "../utils/api";

const useTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);

        const res = await api.get("/team");

        let members = [];

        if (Array.isArray(res.data)) {
          members = res.data;
        } else if (Array.isArray(res.data?.data)) {
          members = res.data.data;
        } else {
          console.error("❌ Invalid team API response:", res.data);
        }

        // 🔥 HARD SAFETY — NEVER allow non-array
        setTeamMembers(Array.isArray(members) ? members : []);
        setError(null);
      } catch (err) {
        console.error("Error fetching team members:", err);
        setTeamMembers([]); // 🔥 fallback
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return {
    teamMembers: Array.isArray(teamMembers) ? teamMembers : [], // 🔥 double safety
    loading,
    error,
  };
};

export default useTeam;
