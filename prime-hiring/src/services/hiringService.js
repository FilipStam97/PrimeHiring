import axios from "axios";

const SERVER_URL = "http://localhost:8000";

export async function getRecords() {
  try {
    const res = await axios.get(`${SERVER_URL}/records`);
    const { data } = res;
    return Promise.resolve(data);
  } catch (err) {
    console.log(err);
  }
}

export async function getRecordsByDeveloperID(id) {
  try {
    const res = await axios.get(`${SERVER_URL}/records?developer.id=${id}`);
    const { data } = res;
    return Promise.resolve(data);
  } catch (err) {
    console.log(err);
  }
}

export async function getRecordsOfSelectedDevelopers(dveloperArray) {
  try {
    let recordArray = [];
    dveloperArray.forEach(async (develoepr) => {
      const res = await axios.get(
        `${SERVER_URL}/records?developer.id=${develoepr.id}`
      );
      const { data } = res;
      for await (let record of data) {
        recordArray.push(record);
      }
    });

    return Promise.resolve(recordArray);
  } catch (err) {
    console.log(err);
  }
}

export async function createHiringRecord(data) {
  try {
    await axios.post(`${SERVER_URL}/records`, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return Promise.resolve("Success");
  } catch (err) {
    console.log(err);
  }
}

export async function createMultipleHiringRecords(dataArray) {
    try {
        dataArray.forEach(async (record) => {
            await axios.post(`${SERVER_URL}/records`, record, {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            });
        });
      return Promise.resolve("Success");
    } catch (err) {
      console.log(err);
    }
  }
