import axios from 'axios';

const SERVER_URL = "http://localhost:8000";

export async function getAllDevelopers() {
     try {
    const res = await axios.get(`${SERVER_URL}/developers`);
    const {data} = res;
    return Promise.resolve(data);
     }
     catch(err) {
         console.log(err);
     }

}


export async function getDeveloper(id) {
    try {
   const res = await axios.get(`${SERVER_URL}/developers/${id}`);
   const {data} = res;
   return Promise.resolve(data);
    }
    catch(err) {
        console.log(err);
    }

}

export async function deleteDeveloper(id) {
    try {
    await axios.delete(`${SERVER_URL}/developers/${id}`);
   return Promise.resolve("Succes");
    }
    catch(err) {
        console.log(err);
    }

}


export async function createDeveloper(data) {
    try {
    await axios.post(`${SERVER_URL}/developers`, data, 
   {
    headers:  { 
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
   return Promise.resolve("Success");
    }
    catch(err) {
        console.log(err + "Dssssss");
    }

}

export async function updateDeveloper(id, data) {
    try {
    await axios.put(`${SERVER_URL}/developers/${id}`, data, 
   {
    headers:  { 
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
   return Promise.resolve("Success");
    }
    catch(err) {
        console.log(err + "Dssssss");
    }

}

