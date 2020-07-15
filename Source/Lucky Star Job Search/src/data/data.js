export const EMPLOYMENT_TYPE = {
    FULL_TIME: "Full-time",
    PART_TIME: "Part-time",
    CONTRACT: "Contract"
}

const searchableLanguages = [
    "Python",
    "Java",
    "C#",
    "C",
    "JavaScript",
    "Julia"
]

const users = [
    {
        username: "newuser",
        password: "newuser",
        onboardingComplete: false,
        savedJobs: []
    },
    {
        username: "expert",
        password: "expert",
        onboardingComplete: true,
        savedJobs: [
            {
                id: "1",
                company: "Non-disclosed",
                title: "Java Developer",
                description: "Looking for coder.",
                timesSaved: 2,
                type: EMPLOYMENT_TYPE.FULL_TIME,
                skills: [
                    "Java"
                ]
            }
        ]
    }
]

const jobs = [
    {
        id: "0",
        company: "Initech",
        title: "Entry-Level Python Developer",
        description: "Looking for excellent developers with a can-do attitude.",
        timesSaved: 0,
        type: EMPLOYMENT_TYPE.FULL_TIME,
        skills: [
            "Python"
        ]
    },
    {
        id: "1",
        company: "Non-disclosed",
        title: "Java Developer",
        description: "Looking for coder.",
        timesSaved: 2,
        type: EMPLOYMENT_TYPE.FULL_TIME,
        skills: [
            "Java"
        ]
    },
    {
        id: "2",
        company: "NEMA",
        title: "Web Application Developer",
        description: "Seeking web developers with C# experience.",
        timesSaved: 1,
        type: EMPLOYMENT_TYPE.PART_TIME,
        skills: [
            "C#"
        ]
    },
    {
        id: "3",
        company: "Maven Companies",
        title: "C Linux Developer",
        description: "C Linux developer. Must have skills.",
        timesSaved: 3,
        type: EMPLOYMENT_TYPE.CONTRACT,
        skills: [
            "C"
        ]
    },
    {
        id: "4",
        company: "Initrode",
        title: "Scientific Applications Developer",
        description: "Seeking a developer for high-performance scientific applications.",
        timesSaved: 0,
        type: EMPLOYMENT_TYPE.FULL_TIME,
        skills: [
            "C",
            "Python"
        ]
    }
]

export const login = (username, password) => {
    for (let user in users) {
        if (username === users[user].username && password === users[user].password) {
            return {
                id: user,
                onboardingComplete: users[user].onboardingComplete
            };
        }
    }
    return {}
}

export const getSavedJobsForUser = currentUser => {
    return users[currentUser].savedJobs;
}

export const addSavedJobForUser = (currentUser, jobId) => {
    let newSavedJobs = [...users[currentUser].savedJobs];

    for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].id === jobId) {
            newSavedJobs.push(jobs[i]);
            incrementTimesSavedForJob(i);
        }
    }

    users[currentUser].savedJobs = newSavedJobs;
}

export const deleteSavedJobForUser = (currentUser, jobId) => {
    let newSavedJobsForUser = [];

    for (let i = 0; i < users[currentUser].savedJobs.length; i++) {
        if (users[currentUser].savedJobs[i].id === jobId) {
            decrementTimesSavedForJob(i);
        } else {
            newSavedJobsForUser.push(users[currentUser].savedJobs[i]);
        }
    }

    users[currentUser].savedJobs = newSavedJobsForUser;
}

export const userCompletedOnboarding = userId => {
    users[userId].onboardingComplete = true;
    return true;
}

export const getAllJobs = () => {
    return jobs;
}

export const getAllSearchableLanguages = () => {
    return searchableLanguages;
}

const incrementTimesSavedForJob = jobId => {
    jobs[jobId].timesSaved = jobs[jobId].timesSaved + 1;
}

const decrementTimesSavedForJob = jobId => {
    jobs[jobId].timesSaved = jobs[jobId].timesSaved - 1;
}