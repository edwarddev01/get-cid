import { Component, OnInit   } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../services/loading.service';
import { Itoken } from '../interfaces/token.interface';
//import { ListTokensComponent } from '../list-tokens/list-tokens.component';

@Component({
  selector: 'app-generate-token',
  templateUrl: './generate-token.component.html',
  styleUrl: './generate-token.component.css'
})

export class GenerateTokenComponent implements OnInit  {
  public formToken!: FormGroup;
  public result!: Itoken;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private toast: ToastrService,
    private loading: LoadingService,
  ) {}
  ngOnInit(): void {
      this.initForm();
  }
 
  
  initForm() {
    this.formToken = this.fb.group({
      valid: new FormControl(1, [Validators.required, Validators.min(1)]),
    });
  }

  onSubmitToken() {
    if (this.formToken.valid) {
      this.loading.show();
      this.adminService.genarateToken(this.formToken.value).subscribe(
        (response) => {
          if (response && response.status == 'ok') {
            this.result = response;
            //this.listTokens.getTokens();
            this.toast.success('Token generado correctamente!', 'Success');
          }
          this.loading.hide();
        },
        (error) => {
          console.log('Error token ', error);
          this.loading.hide();
          this.toast.error(`${error.error.message}`, 'Error');
        }
      );
    } else {
      this.toast.error(`Verifique los datos del formulario!!`, 'Error');
    }
  }
  
}
