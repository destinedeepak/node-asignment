import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  form:FormGroup;
  imagePreview: string |ArrayBuffer;


  constructor(public userservice: UserService) { }

  ngOnInit(): void {
  this.form = new FormGroup({
    'fname': new FormControl(null, {validators: [Validators.required]}),
    'lname': new FormControl(null,{validators: [Validators.required]}),
    'email': new FormControl(null,{validators: [Validators.required]}),
    'phoneno': new FormControl(null,{validators: [Validators.required]}),
    'image': new FormControl(null, {validators: [Validators.required]})
  })
  }



  onImagePicked(event:Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
     reader.onload=(e)=>{
       this.imagePreview = reader.result;
     };
     reader.readAsDataURL(file);


  }

  onSubmit(){
    console.log(this.form.value)
    this.userservice.addUser(
      this.form.value.fname,
      this.form.value.lname,
      this.form.value.email,
      this.form.value.phoneno,
      this.form.value.image);


    this.form.reset();
  }

}
