import { useState, useEffect } from 'react';
import axios from 'axios';

const useTeam = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                setLoading(true);
                const res = await axios.get('/api/team');
                setTeamMembers(res.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching team members:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, []);

    return { teamMembers, loading, error };
};

export default useTeam;
