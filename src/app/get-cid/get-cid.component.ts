import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetCidService } from '../services/get-cid.service';
import { IgetCid } from '../interfaces/get-cid.interface';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-get-cid',
  templateUrl: './get-cid.component.html',
  styleUrl: './get-cid.component.css'
})
export class GetCidComponent implements OnInit {
  public form!: FormGroup;
  public result: Array<String> = [];
  public cid!: String;
  public aux_cid!: String;

  constructor(private fb: FormBuilder, private cidService: GetCidService, private toast: ToastrService,  private loading: LoadingService ) { }

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
      this.loading.show()
      const formData = this.form.value;
      this.cidService.getCid(formData).subscribe(response => {
        
        if (response.cid && response.aux_cid) {
          this.cid = response.cid;
          this.aux_cid = response.aux_cid
          this.result = this.aux_cid.split('-');
          console.log(this.result);
          this.loading.hide()
          this.toast.success("ID de confirmación obtenido con exito!", 'Success')
        }
        if (response.message) {
          this.loading.hide()
          this.toast.error(`${response.message}`,'Error');
        }
        this.form.get('recaptchaToken')?.reset();
      }, error => {
        console.error('Form submission failed', error);
        if (error.error.message) {
          this.loading.hide()
          this.toast.error(`${error.error.message}`,'Error');
          this.form.get('recaptchaToken')?.reset();
        }
      });
    }
  }
}
