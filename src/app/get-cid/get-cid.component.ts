import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetCidService } from '../services/get-cid.service';
import { IgetCid } from '../interfaces/get-cid.interface';

@Component({
  selector: 'app-get-cid',
  templateUrl: './get-cid.component.html',
  styleUrl: './get-cid.component.css'
})
export class GetCidComponent implements OnInit {
  public form!: FormGroup;
  public result!: IgetCid;
  public cid!: String;
  public aux_cid!: String;

  constructor(private fb: FormBuilder, private cidService: GetCidService ) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.form = this.fb.group({
      token: ['', Validators.required],
      iid: ['', [Validators.required]],
      recaptchaToken: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.cidService.getCid(formData).subscribe(response => {
        
        if (response.cid && response.aux_cid) {
          this.cid = response.cid;
          this.aux_cid = response.aux_cid
        }
        if (response.message) {
          alert(`Error: ${response.message}`)
        }
        this.form.reset();
      }, error => {
        console.error('Form submission failed', error);
        if (error.error.message) {
          alert(`Error: ${error.error.message}`)
        }
      });
    }
  }
}
