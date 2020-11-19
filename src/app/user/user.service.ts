import { Injectable } from '@angular/core';
import { User } from './user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] =[];

  constructor(private http: HttpClient) { }

  addUser(fname: string, lname:string, email: string, phoneno:string, image:File){

   const userData = new FormData();
   userData.append("fname", fname)
   userData.append("lname", lname)
   userData.append("email", email)
   userData.append("phoneno", phoneno)
   userData.append("image", image, fname)
   this.http
   .post<{message:string, user:JSON}>('http://localhost:3000/user',
   userData
   )
   .subscribe(responseData=>{
     alert(responseData.message);
   })
  }
}
