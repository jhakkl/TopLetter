import firebase from "firebase/compat";

interface dataStore {
  currentTopLetter?: string | null;
  currentUser?: string | null;
}
import { collection, getDocs } from "firebase/firestore";

export async function fetchData(q: any): Promise<any> {

  let dataInResponse: dataStore = {
    currentTopLetter: null,
    currentUser: null
  };

  const apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=UqYeFMh9VswzcX8aEUKrHmuZS22a1B8nJsbVLSLc&date=2014-10-01'; // Replace this with the actual API endpoint

  try {

    let qq: string[] | null = null;
    const response = await getDocs(collection(q, "topletterdata"));
      response.forEach((doc) => {
          qq = [`${doc.data()["currentUser"]}`, `${doc.data()["currentTopLetter"]}`];

      });

      return qq;

    //dataInResponse = await response;

    if (response.empty) {
      throw new Error('Failed to fetch data');
    }

    console.log(dataInResponse)
    return dataInResponse;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
