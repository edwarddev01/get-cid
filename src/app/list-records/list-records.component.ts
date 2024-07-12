import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../services/loading.service';
import { Irecord } from '../interfaces/record.interface';
@Component({
  selector: 'app-list-records',
  templateUrl: './list-records.component.html',
  styleUrl: './list-records.component.css',
})
export class ListRecordsComponent implements OnInit {
  public records: Irecord[] = [];
  public recordsFilterd: Irecord[] = [];
  public page2!: number;
  public total2!: number;
  public searchText: string = '';

  constructor(
    private adminService: AdminService,
    private toast: ToastrService,
    private loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords() {
    this.loading.show();
    this.adminService.getAllRecords().subscribe(
      (response) => {
        if (response) {
          this.records = response;
        }
        this.getRecordsFiltered();
        this.loading.hide();
      },
      (error) => {
        console.log(`Error al obtener records: ${error}`);
        this.toast.error('No se pudo obtener los records', 'Error');
        this.loading.hide();
      }
    );
  }

  async copyToClipboard(copyText: string, text: string) {
    try {
      await navigator.clipboard.writeText(copyText);
      this.toast.success(`${text} copiado correctamente!`, 'Success');
    } catch (err) {
      console.error('Failed to copy: ', err);
      this.toast.error(`Error al copiar ${text}}!`, 'Error');
    }
  }

  getRecordsFiltered(): void {
    this.recordsFilterd = [];
    this.recordsFilterd = this.records.filter((record) =>
      record.iid.includes(this.searchText)
    );
  }
  formatedCID(cid: string){
    let aux_cid = "";
    let i = 1;

    for (let index = 0; index < cid.length; index++) {
      const element = cid[index];
      if (i < 6) {
        aux_cid += element;
        i++;
      } else {
        aux_cid += element + "-";
        i = 1;
      }
    }
    return aux_cid.substring(0, aux_cid.length - 1);
  }
}
