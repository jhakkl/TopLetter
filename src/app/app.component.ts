import { Component } from '@angular/core';
import {fetchData} from "./mainApi";
import { initializeApp } from "firebase/app";
import { getFirestore,doc, setDoc } from "firebase/firestore";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'TopLetter';
  topLetter: string = "Loading...";
  name:string = "Loading...";
  gdb: any = null;

  async ngOnInit(): Promise<void> {
    const firebaseConfig = {
      apiKey: "AIzaSyDv1F_QS4gtp0OBtPHrE32AwBp1LC5f8lA",
      authDomain: "topletter-jhak.firebaseapp.com",
      projectId: "topletter-jhak",
      storageBucket: "topletter-jhak.appspot.com",
      messagingSenderId: "932339119568",
      appId: "1:932339119568:web:28416ad7e3fccc7c46f5d5",
      measurementId: "G-X48WT47GD4"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);
    this.gdb = db;


    let q: string[] = await fetchData(db);
    console.log(q[0]);
    this.name = q[0];
    this.topLetter = q[1];
  }



  fix(inVar: string): string {
    return "\"" + inVar + "\"";
  }


  uploadName: string = "";
  uploadTopLetter: string = "";



  async saveText(): Promise<void> {
    console.log("Save Text Activated")
    await setDoc(doc(this.gdb, "topletterdata/data"), {
      currentTopLetter: this.uploadTopLetter,
      currentUser: this.uploadName
    });

    location.reload();


  }









}
