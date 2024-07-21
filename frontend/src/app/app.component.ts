import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  insuranceForm: FormGroup;
  get primaryHolders(): FormArray {
    return this.insuranceForm.get('primary') as FormArray;
  }

  get secondaryHolders(): FormArray {
    return this.insuranceForm.get('secondary') as FormArray;
  }
  constructor() {
    this.insuranceForm = new FormGroup({
      primary: new FormArray([this.createPrimaryHolder()]),
      secondary: new FormArray([this.createSecondaryHolder()])
    });
  }

  createPrimaryHolder(): FormGroup {
    return new FormGroup({
      insuranceCompanyName: new FormControl('', Validators.required),
      policyNumber: new FormControl('', Validators.required),
      groupName: new FormControl('', Validators.required),
      primaryHolderName: new FormControl('', Validators.required),
      secondaryHolderName: new FormControl(''),
      frontImage: new FormControl(null, Validators.required),
      backImage: new FormControl(null, Validators.required),
      frontImageSrc: new FormControl(''),  
      backImageSrc: new FormControl('')   
    });
  }

  createSecondaryHolder(): FormGroup {
    return new FormGroup({
      insuranceCompanyName: new FormControl(''),
      policyNumber: new FormControl(''),
      groupName: new FormControl(''),
      primaryHolderName: new FormControl(''),
      secondaryHolderName: new FormControl(''),
      frontImage: new FormControl(null),
      backImage: new FormControl(null),
      frontImageSrc: new FormControl(''), 
      backImageSrc: new FormControl('')   
    });

  }

  
  addPrimaryHolder() {
    this.primaryHolders.push(this.createPrimaryHolder());
  }

  addSecondaryHolder() {
    this.secondaryHolders.push(this.createSecondaryHolder());
  }

  deletePrimaryHolder(index: number) {
    this.primaryHolders.removeAt(index);
  }

  deleteSecondaryHolder(index: number) {
    this.secondaryHolders.removeAt(index);
  }

 submitForm(): void {
  debugger;
    if (this.insuranceForm.valid) {
      console.log(this.insuranceForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
  onFileChange(event: any, type: string, holderType: 'primary' | 'secondary', index: number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const src = reader.result as string;
        const control = type === 'frontImage' ? 'frontImageSrc' : 'backImageSrc';
        const formArray = holderType === 'primary' ? this.primaryHolders : this.secondaryHolders;
        formArray.at(index).get(control)?.setValue(src);
      };
      reader.readAsDataURL(file);
    }
  }
  

}
