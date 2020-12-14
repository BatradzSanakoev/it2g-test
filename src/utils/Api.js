const BASE_URL = 'https://5fd074f71f23740016631a58.mockapi.io';

const getCases = () => {
    return fetch(`${BASE_URL}/todolist`, {
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((res) => {
            if (res.ok) return res.json();
            else return Promise.reject(res.statusText);
        });
};

const getCase = (caseId) => {
    return fetch(`${BASE_URL}/todolist/${caseId}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((res) => {
            if (res.ok) return res.json();
            else return Promise.reject(res.statusText);
        })
        .then((res) => {
            return res;
        });
};

const createCase = (caseName, caseDescription) => {
    return fetch(`${BASE_URL}/todolist/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            caseName: caseName,
            caseDescription: caseDescription,
            createdAt: new Date().toLocaleString('ru', { month: 'long', day: 'numeric', year: 'numeric' }),
            caseCheck: false
        })
    })
        .then((res) => {
            if (res.ok) return res.json();
            else return Promise.reject(res.statusText);
        });
};

const editCase = ({ id, caseCheck }) => {
    return fetch(`${BASE_URL}/todolist/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            caseCheck: caseCheck
        })
    })
        .then((res) => {
            if (res.ok) return res.json();
            else return Promise.reject(res.statusText);
        });
};

const deleteCase = (caseId) => {
    return fetch(`${BASE_URL}/todolist/${caseId}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((res) => {
            if (res.ok) return res.json();
            else return Promise.reject(res.statusText);
        });
};

export default { getCases, getCase, createCase, editCase, deleteCase };