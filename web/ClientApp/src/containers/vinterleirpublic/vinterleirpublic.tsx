import React, { useEffect, useState } from 'react';
import { getVinterleirGradeStatistic, getVinterleirUsers, VinterleirGradeStatistic, VinterleirUser } from '../../services/vinterleirService';
import VinterleirPublicGrades from './gradetab';
import VinterleirPublicSearch from './searchtab';
import styles from './vinterleirpublic.module.css';


function VinterleirPublic() {
    const [users, setUsers] = useState<VinterleirUser[]>([]);
    const [showUsers, setShowUsers] = useState<VinterleirUser[]>([]);
    const [search, setSearch] = useState<string>("");
    const [searchClub, setSearchClub] = useState("");
    const [errors, setErrors] = useState<boolean>(false);
    const [showingGrades, setShowingGrades] = useState<boolean>(false);
    const [grades, setGrades] = useState<VinterleirGradeStatistic[]>([]);
    const [gradeErrors, setGradeErrors] = useState<boolean>(false);


    useEffect(() => {
        getVinterleirUsers().then(x => {
            setUsers(x);
            setErrors(false);
        }).catch(() => {
            setErrors(true);
        });

        getVinterleirGradeStatistic()
        .then(y => {
            setGrades(y);
            console.log(y);
            setGradeErrors(false);
        })
        .catch(e => {
            setGradeErrors(true);
        });
    }, []);

    useEffect(() => {
        setFilter(search, searchClub);
    }, [users, search, searchClub])


    function setFilter(search: string, club: string) {
        if(search === "" && club === "") {
            setShowUsers(users);
            return;
        }

        const filteredUsers = users.filter(x => 
            (
                x.club.toLowerCase().includes(club.toLowerCase()) && x.name.toLowerCase().includes(search.toLowerCase()))
            );
        if(filteredUsers != null) {
            setShowUsers(filteredUsers);
        }
        else {
            setShowUsers([]);
        }
    }


    return (
        <div className={`${styles.vinterleirPublicGrid} slideLeft`}>
            <div>
                <h1>Deltagere på vinterleir</h1>
            </div>
            <div className={styles.tab}>
                <button className={`${!showingGrades ? styles.activeButton : ""}`} onClick={() => setShowingGrades(false)}>Søk</button>
                <button className={`${showingGrades ? styles.activeButton : ""}`} onClick={() => setShowingGrades(true)}>Beltegrader</button>
            </div>

            {
                showingGrades
                ? <VinterleirPublicGrades grades={grades} error={gradeErrors}/>
                : <VinterleirPublicSearch errors={errors} search={search}  searchClub={searchClub} setSearch={setSearch} setSearchClub={setSearchClub} showUsers={showUsers} users={users}/>
            }
        </div>
    )
}

export default VinterleirPublic;